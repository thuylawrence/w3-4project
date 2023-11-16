const { application } = require('express');
const { MongoDBCollectionNamespace, MongoDBNamespace } = require('mongodb');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('restaurants').find();
    //console.log(result);
    result.toArray().then((restaurants) => {
    //console.log(restaurants);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurants);
    });
   //data = await result.toArray();
   //console.log(data);
   //test = "something is not working";
   //res.json(test);
   

};
const getSingle = async (req, res) => {
    const restaurant_id = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('restaurants').find({_id: restaurant_id});
    result.toArray().then((restaurants) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(restaurants[0]);
    });
};

const createRestaurant = async (req, res) => {
    const restaurant = {
        id: req.body.id,
        address: {
            borough: req.body.borough,
        },
        cuisine: req.body.cuisine,
        grades: req.body.grades, // Assuming this is an array in the request body
        name: req.body.name,
        restaurant_id: req.body.restaurant_id
    };
    
    
    const response = await mongodb.getDatabase().db().collection('restaurants').insertOne(restaurant);
    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
    
}
// const updateUser = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
//     const user = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         favoriteColor: req.body.favoriteColor,
//         birthday: req.body.birthday
//     };
    
//     try {
//         const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId}, user);
//         console.log(response);
//         console.log(userId);
//         if (response.matchedCount === 0) {
//             return res.status(404).json({ error: 'User not found.' });
//         }

//         if (response.modifiedCount > 0) {
//             return res.status(200).send();
//         } else {
//             return res.status(200).json({ message: 'No changes made to the user.' });
//         }
//     } catch (error) {
//         console.error('Update User Error:', error); // Log the error for server-side inspection
//         return res.status(500).json({ error: 'An error occurred while updating the user.' });
//     }
// }

    

// const deleteUser = async (req, res) => {
//     const userId = new ObjectId(req.params.id);
    
//     const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId });
//     if (response.deletedCount > 0) {
//         res.status(200).send();
//     } else {
//         res.status(500).json(response.error || 'Some error occurred while deleting the user.');
//     }
    
// }

module.exports = {
    getAll,
    getSingle,
    createRestaurant,
    
};