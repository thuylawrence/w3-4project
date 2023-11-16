const router = require('express').Router();

router.get('/', (reg, res) => { res.send('Hello World')});

router.use('/restaurants', require('./restaurants'));

module.exports = router;

