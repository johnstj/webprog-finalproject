import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";

async function sendFormData(username, password) {
    await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(function() {
        
    })
    .catch(function(err) {
        
    })
}

const Login = () => {
    useEffect(() => {
        document.getElementById("loginSubmit").addEventListener('click', function(event) {
            event.preventDefault();
    
            let username = document.forms["loginForm"]["loginUserName"].value;
            let password = document.forms["loginForm"]["loginPassword"].value;
    
            if(validateUserName(username) & validatePassword(password)) {
                sendFormData(username, password);
            }
    
        });
    
        function validateUserName(username) {
            if(username === "") {
                document.getElementById("usernameValidation").style.display = "block";
                return false;
            }
            else {
                document.getElementById("usernameValidation").style.display = "none";
                return true;
            }
        }

        function validatePassword(password) {
            if(password.length > 6 || password === "") {
                document.getElementById("passwordValidation").style.display = "block";
                return false;
            }
            else {
                document.getElementById("passwordValidation").style.display = "none";
                return true;
            }
        }
    });

    return (
        <div class="contentArea">
            <div class="loginForm" id="login">
                <div class="flex-container">
                    <div class="infoTitle">
                        <h2>Login</h2>
                    </div>
                    <div class="infoBox">
                        <form id="loginForm" name="Form">
                            <label for="username">Username: </label>
                            <input type="text" id="username" name="loginUserName" required/><br/>
                            <div class="validationText" id="usernameValidation">
                                <p>Enter a username.</p>
                            </div>
                            <label for="password">Password: </label>
                            <input type="text" id="password" name="loginPassword" required/><br/>
                            <div class="validationText" id="passwordValidation">
                                <p>Enter a password with length 6 or more.</p>
                            </div>
                            <br/>
                            <button type="button" id="loginSubmit" name="loginSubmit">
                                Submit
                            </button>
                        </form>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
    );
}

export default Login;
