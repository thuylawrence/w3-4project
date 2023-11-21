//const { application } = require('express');
//const { MongoDBCollectionNamespace, MongoDBNamespace } = require('mongodb');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try{
        const result = await mongodb.getDatabase().db().collection('neighborhoods').find();
        const neighborhoods = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(neighborhoods);
    } catch (error) {
        res.status(500).json({ error: error.message || 'An error occurred while retrieving neighborhoods.' });
    }
};
       
const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid restaurant id to find a neighborhood');
    }
    const neighborhood_Id = new ObjectId(req.params.id)

    await mongodb.getDatabase()
    .db()
    .collection('neighborhoods')
    .find({ _id: neighborhood_Id })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};
        
const createNeighborhood = async (req, res) => {
    
    const neighborhood = {
        name: req.body.name,
        geometry: req.body.geometry
    };
    const response = await mongodb.getDatabase().db().collection('neighborhoods').insertOne(neighborhood);
    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the neighborhood.');
    }
    
};
   
const updateNeighborhood = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid neighborhood id to update a neighborhood.');
      }
    const neighborhood_Id = new ObjectId(req.params.id);
    const updateData = {
        name: req.body.name,
        geometry: req.body.geometry 
        
    };
    
    try {
        const response = await mongodb.getDatabase().db().collection('neighborhoods').replaceOne({_id: neighborhood_Id}, updateData);
        console.log(response);
        
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Neighborhood not found.' });
        }

        if (response.modifiedCount > 0) {
            return res.status(200).send();
        } else {
            return res.status(200).json({ message: 'No changes made to the neighborhood.' });
        }
    } catch (error) {
        console.error('Update Neighborhood Error:', error); // Log the error for server-side inspection
        return res.status(500).json({ error: 'An error occurred while updating the neighborhood.' });
    }
}
const deleteNeighborhood = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid neighborhood id to delete a neighborhood.');
      }
    const neighborhood_Id = new ObjectId(req.params.id);
    
    const response = await mongodb.getDatabase().db().collection('neighborhoods').deleteOne({_id: neighborhood_Id });
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the neighborhood.');
    }
    
};
module.exports = {
    getAll,
    getSingle,
    createNeighborhood,
    updateNeighborhood,
    deleteNeighborhood
};
   




        
    
    





    

