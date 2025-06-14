const { Section, WhatWeDoImage, WhoWeAreContent, Service, Team, Project, Partner } = require('../models');

// Create a new Section
exports.createSection = async (req, res) => {
  try {
    const section = await Section.create(req.body);
    res.status(201).json(section);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Sections with pagination
exports.getAllSections = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const sections = await Section.findAndCountAll({
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    res.status(200).json({
      data: sections.rows,
      total: sections.count,
      page: parseInt(page),
      totalPages: Math.ceil(sections.count / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing Section
exports.updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    await section.update(req.body);
    res.status(200).json(section);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Section
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    await section.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
