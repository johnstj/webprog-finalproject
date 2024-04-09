var express = require('express');
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    contact_name: { bsonType: String },
    contact_email: { bsonType: String },
    contact_phone: { bsonType: Number },
    message: { bsonType: String }
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
        const savedContact = await newContact.save();
        res.send(savedContact);
        console.log(savedContact);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    storeContact
};