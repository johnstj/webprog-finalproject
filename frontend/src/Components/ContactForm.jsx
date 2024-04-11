import React, { useState, useEffect } from 'react';
import './ContactForm.css';

async function sendFormData(name, email, msg, phone) {
    await fetch('http://localhost:3001/createUser', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            contact_name: name,
            contact_email: email,
            contact_phone: phone,
            message: msg
        }),
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': '*',
        // },
    })
    .then(function() {
        document.getElementById("userMsgHeader").innerHTML = `Hello ${name}!`;
        document.getElementById("userMsgText").innerHTML = `Thank you for visiting my page. I have received your message, and will get back to you at ${email}. Have a good day!`;
        document.getElementById("userMsg").style.display = "block";
    })
    .catch(function(err) {
        document.getElementById("userMsgHeader").innerHTML = `Hello ${name}!`;
        document.getElementById("userMsgText").innerHTML = `Error sending: ${err}`;
        document.getElementById("userMsg").style.display = "block";
    })
}

const ContactForm = () => {
    useEffect(() => {
        document.getElementById("contactSubmit").addEventListener('click', function(event) {
            event.preventDefault();
    
            let name = document.forms["contactForm"]["contactName"].value;
            let email = document.forms["contactForm"]["contactEmail"].value;
            let msg = document.forms["contactForm"]["contactMsg"].value;
            let phone = document.forms["contactForm"]["contactPhone"].value;
    
            if(validateName(name) & validateEmail(email) & validatePhone(phone) & validateMsg(msg)) {
                sendFormData(name, email, msg, phone);
            }
    
        });
    
        function validateName(name) {
            if(!/^[^0-9]+$/.test(name) || name === "") {
                document.getElementById("nameValidation").style.display = "block";
                return false;
            }
            else {
                document.getElementById("nameValidation").style.display = "none";
                return true;
            }
        }
    
        function validateEmail(email) {
            if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) || email === "") {
                document.getElementById("emailValidation").style.display = "block";
                return false;
            }
            else {
                document.getElementById("emailValidation").style.display = "none";
                return true;
            }
        }
    
        function validateMsg(msg) {
            if(msg === "") {
                document.getElementById("msgValidation").style.display = "block";
                return false;
            }
            else {
                document.getElementById("msgValidation").style.display = "none";
                return true;
            }
        }
    
        function validatePhone(phone) {
            if(phone === "") {
                document.getElementById("phoneValidation").style.display = "block";
                return false;
            }
            else {
                document.getElementById("phoneValidation").style.display = "none";
                return true;
            }
        }
    });

    return (
        <div class="contentArea">
            <div class="contactForm" id="contact">
                <div class="flex-container">
                    <div class="infoTitle">
                        <h2>Contact Form</h2>
                    </div>
                    <div class="infoBox">
                        <form id="contactForm" name="contactForm">
                            <label for="name">Name: </label>
                            <input type="text" id="name" name="contactName" required/><br/>
                            <div class="validationText" id="nameValidation">
                                <p>Enter a name, no numbers allowed.</p>
                            </div>
                            <label for="email">Email: </label>
                            <input type="email" id="email" name="contactEmail" required/><br/>
                            <div class="validationText" id="emailValidation">
                                <p>Enter a valid email.</p>
                            </div>
                            <label for="msg">Message: </label>
                            <textarea cols="80" rows="10" id="msg" name="contactMsg" required></textarea><br/>
                            <div class="validationText" id="msgValidation">
                                <p>Enter a message.</p>
                            </div>
                            <label for="phone">Phone Number: </label>
                            <input type="tel" id="phone" name="contactPhone" required/><br/>
                            <div class="validationText" id="phoneValidation">
                                <p>Enter a phone number.</p>
                            </div>
                            <br/>
                            <button type="button" id="contactSubmit" name="contactSubmit">
                                Submit
                            </button>
                        </form>
                    </div>
                    <br/>
                    <div class="infoBox">
                        <div id="userMsg">
                            <h3 id="userMsgHeader"></h3>
                            <p id="userMsgText"></p>
                        </div>
                        <h3>Email me!</h3>
                        <p>Email: johnst79@students.rowan.edu</p>
                        <div>
                            <h3>Follow me on social media!</h3>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" alt="Instagram" width="20px"/>
                            <a href="https://www.instagram.com/joeyj02/">My Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;
