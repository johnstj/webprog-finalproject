var express = require('express');
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    user_id: { type: String },
    score: { type: Number },
    restaurant_id: { type: String },
    comments: { type: String },
});
const RatingModel = mongoose.model('rating', ratingSchema);

async function storeRating(req, res) {
    const { user_id, score, restaurant_id, comments } = req.body;
    let newRating = new RatingModel({
        user_id: user_id,
        score: score,
        restaurant_id: restaurant_id,
        comments: comments
    });

    try {
        const savedRating = await newRating.save();
        res.send(savedRating);
        console.log(savedRating);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    storeRating
};