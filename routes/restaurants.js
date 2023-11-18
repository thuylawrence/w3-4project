const express = require('express');
const router = express.Router();

const restaurantsController = require('../controllers/restaurants');
const validation = require('../middleware/validate')

router.get('/', restaurantsController.getAll);

router.get('/:id', restaurantsController.getSingle);

router.post('/', validation.saveRestaurant,restaurantsController.createRestaurant);

router.put('/:id', validation.saveRestaurant,restaurantsController.updateRestaurant);

router.delete('/:id', restaurantsController.deleteRestaurant);

module.exports = router;
