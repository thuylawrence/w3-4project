const express = require('express');
const router = express.Router();

// Corrected the variable name to match the import
const customersController = require('../controllers/customers');
const validation = require('../middleware/validate');

router.get('/', customersController.getAll);

router.get('/:id', customersController.getSingle);

// Fixed the reference to customerController in the post and put routes
router.post('/', validation.saveCustomer, customersController.createCustomer);

router.put('/:id', validation.saveCustomer, customersController.updateCustomer);

router.delete('/:id', customersController.deleteCustomer);

module.exports = router;
