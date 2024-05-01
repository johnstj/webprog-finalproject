var express = require('express');
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    contact_name: { type: String },
    contact_email: { type: String },
    contact_phone: { type: Number },
    message: { type: String }
});
const ContactModel = mongoose.model('contact', contactSchema);

async function storeContact(req, res) {
    const { name, email, phone, message } = req.body;
    let newContact = new ContactModel({
        contact_name: name,
        contact_email: email,
        contact_phone: phone,
        message: message
    });

    try {
        await newContact.save();
        res.header(`Access-Control-Allow-Origin`, `*`);
        res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
        res.header(`Access-Control-Allow-Headers`, `Content-Type`);
        res.send("Successfully saved contact!");
        console.log(`${contact_name} saved!`);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    storeContact
};