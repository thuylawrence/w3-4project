const express = require('express');
const router = express.Router();

const accountsControllers = require('../controllers/accounts');
const validation = require('../middleware/validate');

const isAuthenticated = require("../middleware/authenticate")

router.get('/', accountsControllers.getAll);

router.get('/:id', accountsControllers.getSingle);


router.post('/', isAuthenticated, validation.saveAccount, accountsControllers.createAccount);

router.put('/:id', isAuthenticated, validation.saveAccount, accountsControllers.updateAccount);

router.delete('/:id', isAuthenticated, accountsControllers.deleteAccount);

module.exports = router;