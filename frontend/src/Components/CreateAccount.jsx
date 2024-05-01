import React, { useState, useEffect } from 'react';
import './CreateAccount.css';
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const [error, setError] = useState('');

    async function sendAccountData(username, fullname, email, password) {
        setError('');
    
        const result = await fetch('http://localhost:3001/users/createUser', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                username: username, 
                fullname: fullname, 
                email: email, 
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            localStorage.setItem("token", data.token);
            console.log('success');
            window.location.replace("http://localhost:3000/rate");
        })
        .catch(err => {
            setError('Your username or password is incorrect!');
            console.error('Login error', err);
        });
    }

    let errMsg;
    useEffect(() => {
        document.getElementById("accountSubmit").addEventListener('click', function(event) {
            event.preventDefault();
    
            let username = document.forms["accountForm"]["accountUserName"].value;
            let password = document.forms["accountForm"]["accountPassword"].value;
            let email = document.forms["accountForm"]["accountEmail"].value;
            let fullname = document.forms["accountForm"]["accountFullName"].value;
    
            if(validateUserName(username) & validatePassword(password) & validateEmail(email) & validateName(fullname)) {
                errMsg = sendAccountData(username, fullname, email, password);
                if(!(errMsg === undefined)) {document.getElementById("invalidMsg").style.display = "block";}
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

        function validatePassword(password) {
            if(password.length < 6 || password === "") {
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
            <div class="accountForm" id="createAccount">
                <div class="flex-container">
                    <div class="infoTitle">
                        <h2>Create Account</h2>
                    </div>
                    <div class="infoBox">
                        <div class="validationText" id="invalidMsg">
                            <p>{errMsg}</p>
                        </div>
                        <form id="accountForm" name="Form">
                            <label for="username">Username: </label>
                            <input type="text" id="username" name="accountUserName" required/><br/>
                            <div class="validationText" id="usernameValidation">
                                <p>Enter a username.</p>
                            </div>
                            <br/>
                            <label for="password">Password: </label>
                            <input type="text" id="password" name="accountPassword" required/><br/>
                            <div class="validationText" id="passwordValidation">
                                <p>Enter a password with length 6 or more.</p>
                            </div>
                            <br/>
                            <label for="fullname">Full Name: </label>
                            <input type="text" id="accountFullName" name="accountFullName" required/><br/>
                            <div class="validationText" id="nameValidation">
                                <p>Enter a full name with no numbers.</p>
                            </div>
                            <br />
                            <label for="email">Email: </label>
                            <input type="text" id="accountEmail" name="accountEmail" required/><br/>
                            <div class="validationText" id="emailValidation">
                                <p>Enter an email.</p>
                            </div>
                            <br />
                            <button type="button" id="accountSubmit" name="accountSubmit">
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

export default CreateAccount;
