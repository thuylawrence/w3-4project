//const { application } = require('express');
//const { MongoDBCollectionNamespace, MongoDBNamespace } = require('mongodb');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try{
        const result = await mongodb.getDatabase().db().collection('customers').find();
        result.toArray().then((customers) => {
            res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers);
        });
        
      
    } catch (error) {
        console.error("Error in getAll:", error);
        res.status(500).json({ error: error.message || 'An error occurred while retrieving customers.' });
    }
};
       
const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Must use a valid customer id to find a customer' });
    }

    const customer_Id = new ObjectId(req.params.id);

    try {
        const customer = await mongodb.getDatabase()
            .db()
            .collection('customers')
            .findOne({ _id: customer_Id });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customer);
    } catch (err) {
        console.error('Error fetching single customer:', err);
        res.status(500).json({ message: err.message || 'An error occurred while retrieving the customer.' });
    }
};

        
const createCustomer = async (req, res) => {
 
    const creatData = {
        username: req.body.username,
        name: req.body.name,
        address: req.body.address,
        birthdate: req.body.birthdate,
        email: req.body.email,
        accounts: req.body.accounts, 
        tier_and_details: req.body.tier_and_details
    };
    try {
        const response = await mongodb.getDatabase().db().collection('customers').insertOne(creatData);
        if (response.acknowledged) {
            res.status(201).json({ message: "Customer created successfully", id: response.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create customer.' });
        }
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'An error occurred while creating the customer.' });
    }
    
};
   
const updateCustomer = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid customer id to update a customer.');
      }
    const customer_Id = new ObjectId(req.params.id);
    const updateData = {
        username: req.body.username,
        name: req.body.name,
        address: req.body.address,
        birthdate: req.body.birthdate,
        email: req.body.email,
        accounts: req.body.accounts,
        tier_and_details: req.body.tier_and_details
        
    };
    
    try {
        const response = await mongodb.getDatabase().db().collection('customers').replaceOne({_id: customer_Id}, updateData);
        console.log(response);
        
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Customer not found.' });
        }

        if (response.modifiedCount > 0) {
            return res.status(200).send();
        } else {
            return res.status(200).json({ message: 'No changes made to the customer.' });
        }
    } catch (error) {
        console.error('Update Customer Error:', error); 
        return res.status(500).json({ error: 'An error occurred while updating the customer.' });
    }
}
const deleteCustomer = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid customer id to delete a customer.');
      }
    const customer_Id = new ObjectId(req.params.id);
    
    const response = await mongodb.getDatabase().db().collection('customers').deleteOne({_id: customer_Id });
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the customer.');
    }
    
};
module.exports = {
    getAll,
    getSingle,
    createCustomer,
    updateCustomer,
    deleteCustomer
};
   




        
    
    





    

