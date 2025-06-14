const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');


// Owner routes
router.post('/', ownerController.createOwner);
router.get('/', ownerController.getAllOwners);
router.get('/latest', ownerController.getOwner);
router.put('/:id', ownerController.updateOwner);
router.delete('/:id', ownerController.deleteOwner);

module.exports = router;