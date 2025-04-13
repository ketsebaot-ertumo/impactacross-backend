const { Trainings, Users } = require('../models');
const { validationResult } = require('express-validator');
const slugify = require('slugify');
const validator = require('validator');

exports.createTraining = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  try {
    const data = req.body;
    data.slug = slugify(data.title, { lower: true, strict: true });

    const training = await Trainings.create(data);
    res.status(201).json({ message: 'Training created successfully', training });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all
exports.getAllTrainingPosts = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        const postCount = await Trainings.count();
        const totalPages = Math.ceil(postCount / pageSize);

        const posts = await Trainings.findAll({
            where: {name: "trainings"},
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


// Get a post by ID
exports.getTrainingPostById = async (req, res) => {
    const { id } = req.params;
    if (!id || !validator.isUUID(id)) {
      return res.status(404).json({ success: false, message: "Missing an id or invalid format." });
    }
    try {
      const post = await Trainings.findByPk(id,{
        where: {name: "trainings"},
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
exports.getTrainingPostForUser = async (req, res) => {
    const userId = req.user.id || req.params.id;
    if (!userId || !validator.isUUID(userId)) {
        return res.status(404).json({ success: false, message: "Missing an id or invalid format." });
    }
    try {
        const { page, limit } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const pageSize = parseInt(limit, 10) || 10;
        const postCount = await Trainings.count();
        const totalPages = Math.ceil(postCount / pageSize);

        const posts = await Trainings.findAll({
            where: { userId, name: "trainings"},
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

// Get latest post
exports.getLatestTrainingPost = async (req, res) => {
    try {
      const post = await Trainings.findOne({
        where: {name: "trainings"},
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


// update training
exports.updateTraining = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !validator.isUUID(id)) {
      return res.status(404).json({ success: false, message: "Missing an id or invalid format." });
    }
    const training = await Trainings.findByPk(id, { where: {name: "trainings"},});
    if (!training) return res.status(404).json({ message: 'Training not found' });

    const updates = req.body;
    if (updates.title) updates.slug = slugify(updates.title, { lower: true, strict: true });

    await training.update(updates);
    return res.status(200).json({ message: 'Training updated', training });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update training' });
  }
};

exports.deleteTraining = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || !validator.isUUID(id)) {
      return res.status(404).json({ success: false, message: "Missing an id or invalid format." });
    }
    const training = await Trainings.findByPk(id, { where: {name: "trainings"},});
    if (!training) return res.status(404).json({ message: 'Training not found' });

    await training.destroy();
    return res.status(200).json({ message: 'Training deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete training' });
  }
};
