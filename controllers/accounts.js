const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const accounts = await mongodb.getDatabase().db().collection('accounts').find().toArray();
        res.status(200).json(accounts);
    } catch (error) {
        console.error("Error in getAll:", error);
        res.status(500).json({ error: error.message || 'An error occurred while retrieving accounts.' });
    }
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid account id format' });
    }

    const accountId = new ObjectId(req.params.id);

    try {
        const account = await mongodb.getDatabase().db().collection('accounts').findOne({ _id: accountId });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (err) {
        console.error('Error fetching single account:', err);
        res.status(500).json({ message: err.message || 'An error occurred while retrieving the account.' });
    }
};

const createAccount = async (req, res) => {
    const createData = {
        account_id: req.body.account_id,
        limit: req.body.limit,
    };

    try {
        const response = await mongodb.getDatabase().db().collection('accounts').insertOne(createData);
        if (response.acknowledged) {
            res.status(201).json({ message: "Account created successfully", id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create account.' });
        }
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ message: 'An error occurred while creating the account.' });
    }
};

const updateAccount = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid account id format' });
    }

    const accountId = new ObjectId(req.params.id);
    const updateData = {
        account_id: req.body.account_id,
        limit: req.body.limit,
    };

    try {
        const response = await mongodb.getDatabase().db().collection('accounts').replaceOne({ _id: accountId }, updateData);
        if (response.matchedCount === 0) {
            return res.status(404).json({ message: 'Account not found.' });
        }
        if (response.modifiedCount === 0) {
            return res.status(200).json({ message: 'No changes made to the account.' });
        }
        res.status(200).send();
    } catch (error) {
        console.error('Update Customer Error:', error);
        res.status(500).json({ message: 'An error occurred while updating the account.' });
    }
};

const deleteAccount = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid account id format' });
    }

    const customerId = new ObjectId(req.params.id);

    try {
        const response = await mongodb.getDatabase().db().collection('accounts').deleteOne({ _id: customerId });
        if (response.deletedCount === 0) {
            return res.status(404).json({ message: 'Account not found or already deleted.' });
        }
        res.status(200).send();
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ message: 'An error occurred while deleting the account.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createAccount,
    updateAccount,
    deleteAccount
};
