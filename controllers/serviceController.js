const { Service } = require('../models');

// Create a new Service
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Services for a section with pagination
exports.getAllServices = async (req, res) => {
  const { sectionId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const services = await Service.findAndCountAll({
      where: { section_id: sectionId },
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    res.status(200).json({
      data: services.rows,
      total: services.count,
      page: parseInt(page),
      totalPages: Math.ceil(services.count / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing Service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    await service.update(req.body);
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    await service.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
