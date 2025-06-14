const { Owner, Phone, Location, OwnerLink } = require('../models');

// Create a new Owner
exports.createOwner = async (req, res) => {
  try {
    const owner = await Owner.create(req.body);
    res.status(201).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get the most recently created owner
exports.getOwner = async (req, res) => {
  try {
    const owner = await Owner.findOne({
      include:[
        { model: OwnerLink, as: "links" },
        { model: Phone, as: "phones" },
        { model: Location, as: "locations" },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!owner) {
      return res.status(404).json({success: false, message: 'No owner found' });
    }

    res.status(200).json({success: true,  data: owner });
  } catch (error) {
    res.status(500).json({ success:false, error: error.message });
  }
};


// Get all owners with pagination
exports.getAllOwners = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const owners = await Owner.findAndCountAll({
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    res.status(200).json({
      data: owners.rows,
      total: owners.count,
      page: parseInt(page),
      totalPages: Math.ceil(owners.count / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing Owner
exports.updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByPk(id);
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    await owner.update(req.body);
    res.status(200).json(owner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an Owner
exports.deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByPk(id);
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }
    await owner.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







// // Example: controllers/ownerController.js
// const { Owner, Phone, Location, OwnerLink } = require('../models');

// exports.createOwner = async (req, res) => {
//   try {
//     const owner = await Owner.create(req.body, {
//       include: [Phone, Location, OwnerLink],
//     });
//     res.status(201).json(owner);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getOwners = async (req, res) => {
//   const limit = parseInt(req.query.limit) || 10;
//   const offset = parseInt(req.query.offset) || 0;
//   try {
//     const owners = await Owner.findAndCountAll({
//       limit,
//       offset,
//       include: [Phone, Location, OwnerLink],
//     });
//     res.status(200).json(owners);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateOwner = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [updated] = await Owner.update(req.body, { where: { id } });
//     if (updated) {
//       const updatedOwner = await Owner.findByPk(id);
//       res.status(200).json(updatedOwner);
//     } else {
//       res.status(404).json({ error: 'Owner not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteOwner = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Owner.destroy({ where: { id } });
//     if (deleted) {
//       res.status(204).send();
//     } else {
//       res.status(404).json({ error: 'Owner not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
