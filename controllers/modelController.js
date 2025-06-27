
// Similar controller structure applies for: 
// Section, Phone, Location, OwnerLink, WhatWeDoImage, WhoWeAreContent, Service, Team, TeamLink, Project, Partner, Blog, Publication, Multimedia, Training, AboutUs, Expertise

const { sequelize } = require("../models/index");
const { getPublicIdFromUrl, cloudinary } = require("../utils/cloudinary");
const streamifier = require('streamifier');


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
      return res.status(500).json({ success: false, error: "Internal server error.", details: error.message});
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
    return res.status(500).json({ success: false, error: "Internal server error.", details: error.message});
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
    return res.status(500).json({ success: false, error: "Internal server error.", details: error.message});
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
      order: [['createdAt', 'DESC']],
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
    return res.status(500).json({ success: false, error: "Internal server error.", details: error.message});
  }
};



// === CREATE A NEW DATA ===
exports.createModel = (Model) => async (req, res) => {
  let uploadedImage = null;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, error: "Missing required fields." });
  }

  const {
    image, image_url, imageURL, logo_url, mediaURL, ...rest
  } = req.body;

  const imageFields = {
    image, image_url, imageURL, logo_url, mediaURL
  };

  const t = await sequelize.transaction();
  try {
    const existingItem = await Model.findOne({ where: rest, transaction: t });
    if (existingItem) {
      return res.status(400).json({ success: false, message: "Item already exists." });
    }

    // Find the field key which has base64 string (data URL)
    const fieldKey = Object.keys(imageFields).find((key) => {
      const val = imageFields[key];
      return val && typeof val === "string" && val.trim().startsWith("data:");
    });

    if (fieldKey) {
      const base64Str = imageFields[fieldKey];
      const base64Data = base64Str.replace(/^data:[A-Za-z-+/]+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // Upload via streamifier and cloudinary upload_stream
      uploadedImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "ImpactAcross/images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
      });
    }

    const itemData = { ...rest };
    if (uploadedImage?.secure_url && fieldKey) {
      itemData[fieldKey] = uploadedImage.secure_url;
    }

    const item = await Model.create(itemData, {transaction: t});

    await t.commit();
    return res.status(201).json({
      success: true, message: "Successfully Created.", data: item,
    });

  } catch (error) {
    await t.rollback();
    console.error("Error while creating item:", error);
    if (uploadedImage?.public_id) {
      await cloudinary.uploader.destroy(uploadedImage.public_id);
    }
    return res.status(500).json({ success: false, error: "Internal server error.", details: error.message});
  }
};


// === UPDATE ===
exports.updateModel = (Model) => async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, error: 'Missing a required field ID.' });
  }

  const t = await sequelize.transaction();
  let uploadedImage = null;

  try {
    const record = await Model.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
    if (!record) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    const {
      image, image_url, imageURL, logo_url, mediaURL, ...rest
    } = req.body;

    const imageFields = {
      image, image_url, imageURL, logo_url,mediaURL,
    };

    const fieldKey = Object.keys(imageFields).find((key) => {
      const val = imageFields[key];
      return val && typeof val === "string" && val.trim().startsWith("data:");
    });

    if (fieldKey) {
      const base64Str = imageFields[fieldKey];
      const base64Data = base64Str.replace(/^data:[A-Za-z-+/]+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      uploadedImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "ImpactAcross/images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
      });

      // Delete old image if exists
      const oldImageUrl = record[fieldKey];
      if (oldImageUrl) {
        const publicId = oldImageUrl.split("/").slice(-1)[0].split(".")[0];
        await cloudinary.uploader.destroy(`ImpactAcross/images/${publicId}`);
      }
      rest[fieldKey] = uploadedImage.secure_url;
    }
    
    const [count, rows] = await Model.update(req.body, {
      where: { id }, transaction: t, returning: true
    });

    await t.commit();

    if (count === 0 || !rows[0]) {
      return res.status(409).json({ success: false, message: "No changes were applied."});
    }

    return res.status(200).json({
      success: true, message: "Successfully updated.", data: rows[0]
    });

  } catch (error) {
    await t.rollback();
    console.error("Error during update:", error);
    if (uploadedImage?.public_id) {
      await cloudinary.uploader.destroy(uploadedImage.public_id);
    }
    return res.status(500).json({ success: false, error: "Internal server error.", details: error.message});
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

      await record.destroy({ where: { id }, transaction: t});
      const imageUrl = record.image_url || record.imageURL || record.logo_url || record.mediaURL;
      if (imageUrl) {
        const publicId = getPublicIdFromUrl(imageUrl);
        await cloudinary.uploader.destroy(publicId);
      }

      await t.commit();
      return res.status(200).send({sucess: true, message: 'Successfully Deleted.'});
    } catch (error) {
      await t.rollback();
      console.log("Error occur on delete:", error)
      return res.status(500).json({ success: false, error: "Internal server error.", details: error.message});
    }
  };
  