var express = require('express');
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    user_id: { type: String },
    score: { type: Number },
    restaurant_name: { type: String },
    restaurant_zipcode: { type: String },
    comments: { type: String },
});
const RatingModel = mongoose.model('rating', ratingSchema);

async function storeRating(req, res) {
    const { user_id, score, restaurant_name, restaurant_zipcode, comments } = req.body;
    let newRating = new RatingModel({
        user_id: user_id,
        score: score,
        restaurant_name: restaurant_name,
        restaurant_zipcode: restaurant_zipcode,
        comments: comments
    });

    try {
        await newRating.save();
        res.status(200).send({
            message: `Successfully submitted ${restaurant_name} rating!`
        });
    }
    catch(err) {
        res.status(401).send({
            message: 'Failure assigning token!'
        });
    }
}

async function getRatingByName(req, res) {
    const { name } = req.params;

    const ratings = await RatingModel.find({ restaurant_name: name });

    if(ratings === null) {
        res.status(401).send({
            ratings: ''
        });
    }
    else {
        res.status(200).send({
            ratings: ratings
        });
    }
}

async function getRatingByZip(req, res) {
    const { zipcode } = req.params;

    const ratings = await RatingModel.find({ restaurant_zipcode: zipcode });

    if(ratings === null) {
        res.status(401).send({
            ratings: ''
        });
    }
    else {
        res.status(200).send({
            ratings: ratings
        });
    }
}

module.exports = {
    storeRating,
    getRatingByName
};