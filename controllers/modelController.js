// Similar controller structure applies for: 
// Section, Phone, Location, OwnerLink, WhatWeDoImage, WhoWeAreContent, Service, Team, TeamLink, Project, Partner

const { sequelize } = require("../models/index");
const { getPublicIdFromUrl, cloudinary } = require("../utils/cloudinary");

// === GET BY NAME ===
exports.getModelByValue = (Model, fieldName, include = []) => async (req, res) => {
    const { value } = req.params;
    const fieldName = req.query.field || 'key';

    if (!value) {
      return res.status(400).json({success: false, error: 'Missing a required field ID.' });
    }

    try {
      // const data = await Model.findOne({
        const data = await Model.findAll({
        where: { [fieldName]: value },
        include,
      });
  
      if (!data) {
        return res.status(404).json({ success: false, message: `${Model.name} not found for ${fieldName}: ${value}` });
      }
  
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error occurred while getting model by value:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  };


  
// === GET BY ID ===
exports.getModelById = (Model, include = []) => async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({success: false, error: 'Missing a required field ID.' });
  }
  
  try {
    const data = await Model.findByPk(id,{ include});

    if (!data) {
      return res.status(404).json({ success: false, message: `${Model.name} not found for ${fieldName}: ${value}` });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error occurred while getting model by value:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


  // === GET LATEST ===
exports.getLatestModel = (Model, include = []) => async (req, res) => {
  try {
    // const data = await Model.findOne({
      const data = await Model.findOne({
        order: [['createdAt', 'DESC']],
        include,
    });

    if (!data) {
      return res.status(404).json({ success: false, message: `${Model.name} not found for ${fieldName}: ${value}` });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error occurred while getting model by value:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
  


// === CREATE A NEW DATA ===
exports.createModel = (Model) => async (req, res) => {
    try {
      const existingItem = Model.findOne(req.body);
      if(existingItem){
        return res.status(400).json({success: false, message: "Item already exist."})
      }
      const item = await Model.create(req.body);
      return res.status(201).json({success: true, data: item});
    } catch (error) {
      console.log("Error occur while creating Items:", error)
      return res.status(500).json({success: false, error: error.message });
    }
  };
  

  // === GET ALL DATA ===
  exports.getAllModels = (Model, include = []) => async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const data = await Model.findAndCountAll({
        include,
        limit: parseInt(limit),
        offset: (page - 1) * limit,
      });

      return res.status(200).json({
        success: true,
        data: data.rows,
        pagination: { 
          total: data.count, 
          page: parseInt(page), 
          pageSize: data.rows.length, 
          totalPages: Math.ceil(data.count / limit),},
      });
    } catch (error) {
      console.log("Error occure while geting all data:", error)
      return res.status(500).json({success: false, error: error.message });
    }
  };
  
  // === UPDATE ===
  exports.updateModel = (Model) => async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({success: false, error: 'Missing a required field ID.' });
    }

    const t = await sequelize.transaction();
    try {
      const record = await Model.findByPk(id, {lock: t.LOCK.UPDATE, transaction: t});
      if (!record) {
        await t.rollback();
        return res.status(404).json({success: false, error: 'Item not found' });
      }

      const [updated] = await Model.update(req.body, { where: { id }, transaction: t });

      await t.commit();
      if (updated) {
        const updatedItem = await Model.findByPk(id);
        return res.status(200).json(updatedItem);
      } else {
        return res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      await t.rollback();
      console.log("Error occur on update:", error)
      return res.status(500).json({ success:false, error: error.message });
    }
  };
  
  // === DELETE AN ITEM ====
  exports.deleteModel = (Model) => async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({success: false, error: 'Missing a required field ID.' });
    }

    const t = await sequelize.transaction();
    try {
      const record = await Model.findByPk(id, {lock: t.LOCK.UPDATE, transaction: t});
      if (!record) {
        await t.rollback();
        return res.status(404).json({success: false, error: 'Item not found' });
      }

      // 'image_url', 'imageURL', 'logo_url', 'fileURL', 'mediaURL', "video_url"
      const imageUrl = record.image_url || record.imageURL || record.logo_url || record.mediaURL || record.video_url || record.fileURL;
      if (imageUrl) {
        const publicId = getPublicIdFromUrl(imageUrl);
        await cloudinary.uploader.destroy(publicId);
      }

      const deleted = await Model.destroy({ where: { id }, transaction: t});

      await t.commit();
      if (deleted) {
        return res.status(204).send({sucess: true, message: 'Successfully Deleted.'});
      } else {
        return res.status(404).json({success: false,  error: 'Item not found' });
      }
    } catch (error) {
      await t.rollback();
      console.log("Error occur on delete:", error)
      return res.status(500).json({success: false, message: 'Server Error', error: error.message });
    }
  };
  