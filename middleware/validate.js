
const validator = require('../validator');

const saveCustomer = (req, res, next) => {
    const validationRule = {
        username: 'required|string',
        name: 'required|string',
        address: 'required|string',
        birthdate: 'required|date',  
        email: 'required|email', 
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

const saveAccount = (req, res, next) => {
    const accountValidationRule = {
        
        account_id: 'required|numeric', 
        limit: 'required|numeric' 
    };

    validator(req.body, accountValidationRule, {}, (err, status) => {
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
    saveCustomer,
    saveAccount
};
