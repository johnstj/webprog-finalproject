import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [error, setError] = useState('');

    async function sendLoginData(username, password) {
        setError('');
    
        const result = await fetch('http://localhost:3001/users/login', {
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
            window.location.reload();
        })
        .catch(err => {
            setError('Your username or password is incorrect!');
            console.error('Login error', err);
        });
    }

    let errMsg;
    useEffect(() => {
        document.getElementById("loginSubmit").addEventListener('click', function(event) {
            event.preventDefault();
    
            let username = document.forms["loginForm"]["loginUserName"].value;
            let password = document.forms["loginForm"]["loginPassword"].value;
    
            if(validateUserName(username) & validatePassword(password)) {
                errMsg = sendLoginData(username, password);
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
            <div class="loginForm" id="login">
                <div class="flex-container">
                    <div class="infoTitle">
                        <h2>Login</h2>
                    </div>
                    <div class="infoBox">
                        <div class="validationText" id="invalidMsg">
                            <p>{errMsg}</p>
                        </div>
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
