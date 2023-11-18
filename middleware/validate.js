
const validator = require('../validator');

const saveRestaurant = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        'address.street': 'required|string',
        'address.city': 'required|string',
        'address.zipcode': 'required|string',
        cuisine: 'required|string',
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveRestaurant
};
