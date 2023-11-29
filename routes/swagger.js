const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
router.use('/api-docs', isAuthenticated, swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));



module.exports = router;