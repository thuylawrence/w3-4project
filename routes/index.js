const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/restaurants', require('./restaurants'));

module.exports = router;




