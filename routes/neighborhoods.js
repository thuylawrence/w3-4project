const express = require('express');
const router = express.Router();

// Corrected the variable name to match the import
const neighborhoodsController = require('../controllers/neighborhoods');
const validation = require('../middleware/validate');

router.get('/', neighborhoodsController.getAll);

router.get('/:id', neighborhoodsController.getSingle);

// Fixed the reference to neighborhoodsController in the post and put routes
router.post('/', validation.saveNeighborhood, neighborhoodsController.createNeighborhood);

router.put('/:id', validation.saveNeighborhood, neighborhoodsController.updateNeighborhood);

router.delete('/:id', neighborhoodsController.deleteNeighborhood);

module.exports = router;
