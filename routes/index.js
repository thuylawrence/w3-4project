const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/customers', require('./customers'));

module.exports = router;




