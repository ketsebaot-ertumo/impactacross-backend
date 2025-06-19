// Similar controller structure applies for: 
// Section, Phone, Location, OwnerLink, WhatWeDoImage, WhoWeAreContent, Service, Team, TeamLink, Project, Partner


// === GET BY NAME ===
exports.getModelByValue = (Model, fieldName, include = []) => async (req, res) => {
    const { value } = req.params;
    const fieldName = req.query.field || 'key';
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
  


// create
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
    try {
      const { id } = req.params;
      const [updated] = await Model.update(req.body, { where: { id } });
      if (updated) {
        const updatedItem = await Model.findByPk(id);
        res.status(200).json(updatedItem);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteModel = (Model) => async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Model.destroy({ where: { id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  