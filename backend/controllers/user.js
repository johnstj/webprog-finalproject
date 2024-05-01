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

        console.log(password)
        console.log(hash)

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

                try {
                    const token = jwt.sign(username, process.env.ACCESS_TOKEN, { });
                    /*res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                    });*/
                    res.status(200).send({
                        message: `Logged in ${user.user_name}!`,
                        user: {
                            username: user.user_name,
                            email: user.user_email
                        },
                        token
                    });

                    console.log(`Welcome ${username}!`);
                }
                catch(err) {
                    console.log(err);
                    res.status(401).send({
                        message: 'Failure assigning token!'
                    });
                }
            }
            catch(err) {
                console.log(err);
                res.status(401).send({
                    message: 'Failure saving user!'
                });
            }
        }
    });
}

async function checkUser(req, res) {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ user_name: username });
    console.log('what in ' + user);
    if(user === null) {
        res.status(401).send({
            message: 'Username not found!'
        });
    }
    else {
        console.log(user)
    
        const hashedPassword = await bcrypt.compare(password, user.hashed_password);
        if(hashedPassword) {
            try {
                const token = jwt.sign(username, process.env.ACCESS_TOKEN, { });
                    /*res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                    });*/
                res.status(200).send({
                    message: `Logged in ${user.user_name}!`,
                    user: {
                        username: user.user_name,
                        email: user.user_email
                    },
                    token
                });

                console.log(`Welcome ${username}!`);
                //return res.redirect('/');
            }
            catch(err) {
                console.log(err);
                res.status(401).send({
                    message: 'Failure assigning token!'
                });
            }
        }
        else {
            console.log('Password incorrect!');
            res.status(401).send({
                message: 'Password incorrect!'
            });
        }
    }
}

module.exports = {
    storeUser,
    checkUser
};