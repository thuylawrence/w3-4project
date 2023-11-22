const express = require('express');
const router = express.Router();

const customersControllers = require('../controllers/customers');
const validation = require('../middleware/validate');

router.get('/', customersControllers.getAll);

router.get('/:id', customersControllers.getSingle);


router.post('/', validation.saveCustomer, customersControllers.createCustomer);

router.put('/:id', validation.saveCustomer, customersControllers.updateCustomer);

router.delete('/:id', customersControllers.deleteCustomer);

module.exports = router;
