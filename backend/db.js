const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB database
const connectToDB = async() => {
    try {
        const poolConnection = await mongoose.connect('mongodb://localhost:27017/restaurant_rater');
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


// const ratingSchema = new mongoose.Schema({
//     rating_name: { type: String, required: true },
//     score: { type: int, required: true },
//     restaurant_id: { type:int, required: true },
//     rating_id: { type:int, required: true },
//     comments: { type: String },
// });
// const RatingModel = mongoose.model('rating', ratingSchema);

// const userSchema = new mongoose.Schema({
//     user_name: { type: String, required: true },
//     full_name: { type: String },
//     hashed_password: { type: String, required: true },
//     user_email: { type: String, required: true},
//     user_id: { type:int, required: true },
//     accountCreated: { type: Date, required: true },
// });
// const UserModel = mongoose.model('user', userSchema);

// const contactSchema = new mongoose.Schema({
//     contact_name: { type: String, required: true },
//     contact_email: { type: String, required: true},
//     contact_phone: { type: int, required: true },
//     contact_id: { type: int, required: true },
//     message: { type: String, required: true },
// });
// const contactModel = mongoose.model('contact', contactSchema);

// app.use(express.json()); // Middleware for parsing JSON bodies