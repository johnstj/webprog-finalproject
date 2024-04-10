const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

//local db mongodb://localhost:27017/restaurant_rater

// Connect to MongoDB database
const connectToDB = async() => {
    try {
        const poolConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
        // close connection only when we're certain application is finished
        // poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectToDB();

// // Schema & Model
// const restaurantSchema = new mongoose.Schema({
//     restaurant_name: { type: String, required: true },
//     ratings: { type: Array, required: true },
//     restaurant_id: { type: int, required: true },
//     location: { type: String, required: true },
// });
// const RestaurantModel = mongoose.model('restaurant', restaurantSchema);

// app.use(express.json()); // Middleware for parsing JSON bodies