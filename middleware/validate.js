
const validator = require('../validator');

const saveNeighborhood = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        'geometry.type': 'required|string',
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
    saveNeighborhood
};
