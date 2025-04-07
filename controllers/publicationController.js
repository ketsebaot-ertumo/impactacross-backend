const { sequelize, Publications } = require("../models");
const validator = require('validator');

// Get all post with pagination
exports.getAllPost = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        const postCount = await Publications.count();
        const totalPages = Math.ceil(postCount / pageSize);

        const publications = await Publications.findAll({
            where: {name: "publication"},
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize,
            order: [['createdAt', 'DESC']],
        }); // Sorting by createdAt in ascending order
        return res.status(200).json({ 
            success: true, 
            data: publications,
            pagination: { total: postCount, page: pageNumber, pageSize, totalPages,}
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success:false, message: "Error fetching data", error: error.message });
    }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
    const { id } = req.params;
    if (!id || !validator.isUUID(id)) {
      return res.status(404).json({ success: false, message: "Missing an id or invalid format." });
    }
    try {
      const publication = await Publications.findByPk(id,{
        where: {name: "publication"},
      });
      if (!publication) {
        return res.status(404).json({ success: false, message: "Post not found." });
      }
      return res.status(200).json({ success:true, data: publication });
    } catch (error) {
        console.error(error)
        return res.status(500).json({success:false, message: "Error fetching a post", error: error.message });
    }
};  

// Get post for a specific user
exports.getPostForUser = async (req, res) => {
    const userId = req.user.id || req.params.id;
    if (!userId || !validator.isUUID(userId)) {
        return res.status(404).json({ success: false, message: "Missing an id or invalid format." });
    }
    try {
        const { page, limit } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        const postCount = await Publications.count();
        const totalPages = Math.ceil(postCount / pageSize);

        const publications = await Publications.findAll({
            where: { userId, name: "publication"},
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize,
            order: [['createdAt', 'DESC']],
        }); // Sorting by createdAt in ascending order
        return res.status(200).json({ 
            success: true, 
            data: publications,
            pagination: { total: postCount, page: pageNumber, pageSize, totalPages,}
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success:false, error: "Error fetching posts", details: error.message });
    }
}; 

// Get latest post
exports.getLatestPost = async (req, res) => {
    try {
      const publication = await Publications.findOne({
        where: {name: "publication"},
        order: [['createdAt', 'DESC']],
      });
      if (!publication) {
        return res.status(404).json({ success: false, message: "Post not found." });
      }
      return res.status(200).json({ success:true, data: publication });
    } catch (error) {
        console.error(error)
        return res.status(500).json({success:false, message: "Error fetching a latest post", error: error.message });
    }
};

//Create a new post with transaction support
exports.createPost = async (req, res) => {
    const { title, content, status } = req.body;
    const userId = req.user.id;
    if (!title || !content || !userId) {
        return res.status(400).json({success: false, message: "Missing the equired fields." });
    }
    const transaction = await sequelize.transaction(); 
    try {
        const existingPost = await Publications.findOne({ where: { title, content, userId, name: "publication" }, transaction });
        if (existingPost) {
            await transaction.rollback();
            return res.status(409).json({success: false, message: "A post already exists for this author" });
        }
        const publishedAt = (status === "published") ? new Date() : null;
        const data = await Publications.create(req.body, 
            { transaction }
        );
        await transaction.commit();
        return res.status(201).json({ success: true, message: "Post created successfully", data });

    } catch (error) {
        console.error(error)
        await transaction.rollback();
        return res.status(500).json({ success: false, message: "Failed to create post", error: error.message });
    }
};

// Update a post with transaction and row locking
exports.updatePost = async (req, res) => {
    const { ...updates } = req.body;
    const id = req.params.id;
    if (!id || !validator.isUUID(id)) {
        return res.status(404).json({ success: false, message: "Missing an id or invalid format." });
    }
    const t = await sequelize.transaction();
    try {
        const publication = await Publications.findByPk(id, { where: {name: "publication"}, transaction: t, lock: t.LOCK.UPDATE});
        if (!publication) {
            await t.rollback();
            return res.status(404).json({ success: false, message: 'Post not found.' });
        }
        const [updatedCount, [data]] = await Publications.update(updates, { where: { id }, returning: true, transaction: t,});
        if (updatedCount === 0) {
            await t.rollback();
            return res.status(304).json({ success: false, message: 'Post has no update!' });
        }
        await t.commit();
        return res.status(200).json({ success: true, message: 'Updated successfully.', data,});
    } catch (error) {
        await t.rollback();
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to update a post.', error: error.message });
    }
};
      

// Delete a post with transaction support
exports.deletePost = async (req, res) => {
    const id = req.params.id;
    if (!id || !validator.isUUID(id)) {
        return res.status(404).json({ success: false, message: "Missing an id or invalid format." });
    }
    const t = await sequelize.transaction();
    try {
        const publication = await Publications.findByPk(id, { where: {name: "publication"}, transaction: t, lock: t.LOCK.UPDATE});
        if (!publication) {
            await t.rollback();
            return res.status(404).json({ error: "Post not found" });
        }
        await publication.destroy({ transaction });
        await t.commit();
        return res.status(200).json({ success:true, message: "Post deleted successfully" });
    } catch (error) {
        await t.rollback();
        console.error(error)
        return res.status(500).json({ error: "Error deleting post", details: error.message });
    }
};
