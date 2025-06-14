const { Team, TeamLink } = require('../models');

// Create a new Team
exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Teams with pagination
exports.getAllTeams = async (req, res) => {
  const { sectionId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const teams = await Team.findAndCountAll({
      where: { section_id: sectionId },
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    res.status(200).json({
      data: teams.rows,
      total: teams.count,
      page: parseInt(page),
      totalPages: Math.ceil(teams.count / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing Team
exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    await team.update(req.body);
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Team
exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    await team.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
