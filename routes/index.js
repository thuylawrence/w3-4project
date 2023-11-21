const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/neighborhoods', require('./neighborhoods'));

module.exports = router;




