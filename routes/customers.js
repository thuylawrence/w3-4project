const express = require('express');
const router = express.Router();

const customersControllers = require('../controllers/customers');
const validation = require('../middleware/validate');

const isAuthenticated = require("../middleware/authenticate");

router.get('/', customersControllers.getAll);

router.get('/:id', customersControllers.getSingle);


router.post('/', isAuthenticated, validation.saveCustomer, customersControllers.createCustomer);

router.put('/:id', isAuthenticated, validation.saveCustomer, customersControllers.updateCustomer);

router.delete('/:id', isAuthenticated, customersControllers.deleteCustomer);

module.exports = router;
