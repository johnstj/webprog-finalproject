var express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
app.use(express.json());

const userSchema = new mongoose.Schema({
    user_name: { type: String },
    full_name: { type: String },
    hashed_password: { type: String },
    user_email: { type: String },
    account_created: { type: Date },
});
const UserModel = mongoose.model('user', userSchema);

async function storeUser(req, res) {
    const { username, fullname, email, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10, async function(err, hash) {
        if(err) {
            console.log(err);
        }
        else {
            let newUser = new UserModel({
                user_name: username,
                full_name: fullname,
                hashed_password: hashedPassword,
                user_email: email,
                account_created: new Date()
            });
        
            try {
                const savedUser = await newUser.save();
        
                console.log(savedUser);
            }
            catch(err) {
                console.log(err);
            }
        }
    });
}

module.exports = {
    storeUser
};