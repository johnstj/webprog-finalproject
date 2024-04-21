var express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    const hashedPassword = await bcrypt.hash(password, 10, async function(err, hash) {
        if(err) {
            console.log(err);
            return res.send('failure!');
        }
        else {
            let newUser = new UserModel({
                user_name: username,
                full_name: fullname,
                hashed_password: hash,
                user_email: email,
                account_created: new Date()
            });
        
            try {
                const savedUser = await newUser.save();

                console.log(`${username} saved!`);

                const token = jwt.sign(username, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                });
                return res.redirect('/rate');
            }
            catch(err) {
                console.log(err);
                return res.send('failure!');
            }
        }
    });
}

async function checkUser(req, res) {
    const { username, password } = req.body;
    const record = UserModel.find({ user_name: username });
    const hashedPassword = await bcrypt.compare(password, record.hashedPassword, async function(err, hash) {
        if(err) {
            console.log(err);
            return res.send('Could not hash password! Aborting for security reasons!');
        }
        else {
            const record = db.collection.find({ user_name: username, hashed_password: hash });
            if(typeof record != 'undefined') {
                try {
                    const token = jwt.sign(record, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                    });
                    console.log(`Welcome ${username}!`);
                    return res.redirect('/');
                }
                catch(err) {
                    console.log(err);
                    return res.send('Failure assigning token!');
                }
            }
            else {
                res.send("Invalid username or password!");
            }
        }
    });
}

module.exports = {
    storeUser,
    checkUser
};