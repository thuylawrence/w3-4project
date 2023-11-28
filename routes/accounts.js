const express = require('express');
const router = express.Router();

const accountsControllers = require('../controllers/accounts');
const validation = require('../middleware/validate');

router.get('/', accountsControllers.getAll);

router.get('/:id', accountsControllers.getSingle);


router.post('/', validation.saveAccount, accountsControllers.createAccount);

router.put('/:id', validation.saveAccount, accountsControllers.updateAccount);

router.delete('/:id', accountsControllers.deleteAccount);

module.exports = router;