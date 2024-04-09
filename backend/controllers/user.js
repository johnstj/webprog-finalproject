var express = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: { type: String },
    full_name: { type: String },
    hashed_password: { type: String },
    user_email: { type: String },
    account_created: { type: Date },
});
const UserModel = mongoose.model('user', userSchema);

async function storeUser(req, res) {
    const { username, fullname, email, hashedPassword, accountCreated } = req.body;
    let newUser = new UserModel({
        user_name: username,
        full_name: fullname,
        hashed_password: hashedPassword,
        user_email: email,
        account_created: accountCreated
    });

    try {
        const savedUser = await newUser.save();
        res.send(savedUser);
        console.log(savedUser);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    storeUser
};