const { Multimedias, Users } = require("../models");
const validator = require('validator');

// Create a new multimedia entry
exports.createMultimedia = async (req, res) => {
  try {
    const { userId, title, description, mediaType, mediaURL, thumbnailURL, fileSize, mimeType, status, publishedAt,} = req.body;

    const multimedia = await Multimedias.create(req.body);

    res.status(201).json({ success: true, data: multimedia });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ success: false, message: "Failed to create multimedia." });
  }
};

// Get all multimedia
exports.getAllMultimediaPosts = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        const postCount = await Multimedias.count();
        const totalPages = Math.ceil(postCount / pageSize);

        const posts = await Multimedias.findAll({
            where: {name: "multimedias"},
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize,
            order: [['createdAt', 'DESC']],
        });

        if(!posts || !posts.length){
            return res.status(404).json({ success: false, message: "Post not found." });
        }
        return res.status(200).json({ 
            success: true, 
            data: posts,
            pagination: { total: postCount, page: pageNumber, pageSize, totalPages,}
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success:false, message: "Error fetching data", error: error.message });
    }
};


// Get latest post
exports.getLatestMultimediaPost = async (req, res) => {
    try {
      const post = await Multimedias.findOne({
        where: {name: "multimedias"},
        order: [['createdAt', 'DESC']],
      });
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found." });
      }
      return res.status(200).json({ success:true, data: post });
    } catch (error) {
        console.error(error)
        return res.status(500).json({success:false, message: "Error fetching a latest post", error: error.message });
    }
};


// Get a post by ID
exports.getMultimediaPostById = async (req, res) => {
    console.log("\n\nid:\n\n")
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ success: false, message: "Missing an id or invalid format." });
    }
    try {
      const post = await Multimedias.findByPk(id,{
        where: {name: "multimedias"},
      });
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found." });
      }
      return res.status(200).json({ success:true, data: post });
    } catch (error) {
        console.error(error)
        return res.status(500).json({success:false, message: "Error fetching a post", error: error.message });
    }
};  


// Get post for a specific user
exports.getMultimediaPostForUser = async (req, res) => {
    const userId = req.user.id || req.params.id;
    if (!userId || !validator.isUUID(userId)) {
        return res.status(404).json({ success: false, message: "Missing an id or invalid format." });
    }
    try {
        const { page, limit } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        const postCount = await Multimedias.count();
        const totalPages = Math.ceil(postCount / pageSize);

        const posts = await Multimedias.findAll({
            where: { userId, name: "multimedias"},
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize,
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({ 
            success: true, 
            data: posts,
            pagination: { total: postCount, page: pageNumber, pageSize, totalPages,}
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success:false, error: "Error fetching posts", details: error.message });
    }
}; 

// Update multimedia
exports.updateMultimedia = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ success: false, message: "Missing an id or invalid format." });
    }
    const updated = await Multimedias.update(req.body, {
      where: { id,  name: "multimedias", },
      returning: true,
    });

    if (!updated[0]) {
      return res.status(404).json({ success: false, message: "Multimedia not found." });
    }

    res.status(200).json({ success: true, message: "Multimedia updated successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update multimedia." });
  }
};

// Delete multimedia
exports.deleteMultimedia = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ success: false, message: "Missing an id or invalid format." });
    }
    const deleted = await Multimedias.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Multimedia not found." });
    }

    res.status(200).json({ success: true, message: "Multimedia deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete multimedia." });
  }
};
