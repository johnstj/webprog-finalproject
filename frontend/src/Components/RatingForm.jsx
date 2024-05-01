import React, { useState, useEffect } from 'react';
import './RatingForm.css';

const RatingForm = () => {
    useEffect(() => {
        async function sendFormData(user_id, score, restaurant_name, restaurant_zipcode, comments) {
            await fetch('http://localhost:3001/rating/submitRating', {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    user_id: user_id,
                    score: score,
                    restaurant_name: restaurant_name,
                    restaurant_zipcode: restaurant_zipcode,
                    comments: comments
                }),
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            })
            .then(function() {
                document.getElementById("userMsgHeader").innerHTML = `Rating submitted!`;
                document.getElementById("userMsg").style.display = "block";
            })
            .catch(function(err) {
                document.getElementById("userMsgHeader").innerHTML = `Error submitting: ${err}`;;
                document.getElementById("userMsg").style.display = "block";
            })
        }

        document.getElementById("ratingSubmit").addEventListener('click', function(event) {
            event.preventDefault();
    
            let user_id = 3;
            let score = document.forms["ratingForm"]["restaurantScore"].value;
            let restaurant_name = document.forms["ratingForm"]["restaurantName"].value;
            let restaurant_zipcode = document.forms["ratingForm"]["restaurantZipCode"].value;
            let comments = document.forms["ratingForm"]["restaurantComments"].value;
    
            if(validateResName(restaurant_name) & validateZipCode(restaurant_zipcode) & validateScore(score) & validateComments(comments)) {
                sendFormData(user_id, score, restaurant_name, restaurant_zipcode, comments);
            }
    
        });

        document.getElementById("logout").addEventListener('click', function(event) {
            event.preventDefault();

            localStorage.removeItem("token");
            window.location.reload();
        });

        function validateResName(restaurant_name) {
            if(restaurant_name === "") {
                document.getElementById("resNameValidation").style.display = "block";
                return false;
            }
            else {
                document.getElementById("resNameValidation").style.display = "none";
                return true;
            }
        }
    
        function validateZipCode(restaurant_zipcode) {
            if(!/^[0-9]+$/.test(restaurant_zipcode) || restaurant_zipcode === "") {
                document.getElementById("zipcodeValidation").style.display = "block";
                return false;
            }
            else {
                document.getElementById("zipcodeValidation").style.display = "none";
                return true;
            }
        }

        function validateScore(score) {
            if(!/^[0-9]+$/.test(score) || score === "") {
                document.getElementById("scoreValidation").style.display = "block";
                return false;
            }
            else {
                document.getElementById("scoreValidation").style.display = "none";
                return true;
            }
        }
    
        function validateComments(msg) {
            if(msg === "") {
                document.getElementById("commentsValidation").style.display = "block";
                return false;
            }
            else {
                document.getElementById("commentsValidation").style.display = "none";
                return true;
            }
        }
    });

    return (
        <div class="contentArea">
            <div class="ratingForm" id="rating">
                <div class="flex-container">
                    <div class="infoTitle">
                        <h2>Rating Form</h2>
                    </div>
                    <div class="infoBox">
                        <form id="ratingForm" name="ratingForm">
                            <label for="name">Restaurant Name: </label>
                            <input type="text" id="resName" name="restaurantName" required/><br/>
                            <div class="validationText" id="resNameValidation">
                                <p>Enter a restaurant name.</p>
                            </div>
                            <label for="zipcode">Zip Code: </label>
                            <input type="text" id="zipcode" name="restaurantZipCode" required/><br/>
                            <div class="validationText" id="zipcodeValidation">
                                <p>Enter a 5-digit zipcode.</p>
                            </div>
                            <label for="score">Score: </label>
                            <input type="text" id="score" name="restaurantScore" required/><br/>
                            <div class="validationText" id="scoreValidation">
                                <p>Enter a number score out of 5.</p>
                            </div>
                            <label for="comments">Comments: </label>
                            <textarea cols="40" rows="10" id="comments" name="restaurantComments" required></textarea><br/>
                            <div class="validationText" id="commentsValidation">
                                <p>Enter any comments.</p>
                            </div>
                            <br/>
                            <button type="button" id="ratingSubmit" name="ratingSubmit">
                                Submit Rating!
                            </button>
                        </form>
                    </div>
                    <br/>
                    <div class="infoBox">
                        <div id="userMsg">
                            <h3 id="userMsgHeader"></h3>
                            <p id="userMsgText"></p>
                        </div>
                    </div>
                    <button type="button" id="logout" name="logout">
                        Logout!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RatingForm;
