//const { application } = require('express');
//const { MongoDBCollectionNamespace, MongoDBNamespace } = require('mongodb');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try{
        const result = await mongodb.getDatabase().db().collection('restaurants').find();
        const restaurants = await result.toArray();
       
        //console.log(restaurants);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while retrieving restaurants.' });
    }
};
   
   

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid restaurant id to find a restaurant');
    }
    const restaurant_Id = new ObjectId(req.params.id)
    mongodb
    .getDb()
    .db()
    .collection('restaurants')
    .find({ _id: restaurant_Id })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};



const createRestaurant = async (req, res) => {
    
    const restaurant = {
        id: req.body.id,
        address: {
            borough: req.body.borough,
        },
        cuisine: req.body.cuisine,
        grades: req.body.grades, 
        name: req.body.name,
        restaurant_id: req.body.restaurant_id
    };
    
    
    const response = await mongodb.getDatabase().db().collection('restaurants').insertOne(restaurant);
    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the restaurant.');
    }
    
};




const updateRestaurant = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid restaurant id to update a restaurant.');
      }
    const restaurant_Id = new ObjectId(req.params.id);
    const restaurant = {
        id: req.body.id,
        address: {
            borough: req.body.borough,
        },
        cuisine: req.body.cuisine,
        grades: req.body.grades, 
        name: req.body.name,
        restaurant_id: req.body.restaurant_id
        
    };
    
    try {
        const response = await mongodb.getDatabase().db().collection('restaurants').replaceOne({_id: restaurant_Id}, restaurant);
        console.log(response);
        
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Restaurant not found.' });
        }

        if (response.modifiedCount > 0) {
            return res.status(200).send();
        } else {
            return res.status(200).json({ message: 'No changes made to the restaurant.' });
        }
    } catch (error) {
        console.error('Update Restaurant Error:', error); // Log the error for server-side inspection
        return res.status(500).json({ error: 'An error occurred while updating the restaurant.' });
    }
}

    

const deleteRestaurant = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid restaurant id to delete a restaurant.');
      }
    const restaurant_Id = new ObjectId(req.params.id);
    
    const response = await mongodb.getDatabase().db().collection('restaurants').deleteOne({_id: restaurant_Id });
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the restaurant.');
    }
    
}

module.exports = {
    getAll,
    getSingle,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};