import React, { Component, useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const [error, setError] = useState('');
    const [elements, setElements] = useState([]);
    const [avg, setAvg] = useState([]);
    const [restaurantName, setRestaurantName] = useState([]);

    async function sendSearchName(searchName) {
        setError('');

        const result = await fetch(`http://localhost:3001/searchName/${searchName}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    // 'content-type': 'application/json',
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setElements(data.ratings);
                if(data.ratings.length > 0) {
                    let sum = 0;
                    data.ratings.forEach((element) => {
                        sum += element.score;
                    });
                    let avg = sum / data.ratings.length;

                    setAvg(avg);
                    setRestaurantName(data.ratings[0].restaurant_name);
                    document.getElementById("avg").style.display = "block";
                }
                console.log(data);
                console.log('Search successful!');
                console.log(avg);
                console.log(restaurantName);
                let reviews = document.getElementsByClassName("restName");
                for(let i = 0; i < reviews.length; i++) {
                    reviews[i].style.display = "none";
                }
            })
            .catch(err => {
                setError('Search unsuccessful!');
                console.error('Error', err);
            });
    }

    async function sendSearchZipCode(zipcode) {
        setError('');

        const result = await fetch(`http://localhost:3001/searchZipCode/${zipcode}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    // 'content-type': 'application/json',
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setElements(data.ratings);
                document.getElementById("avg").style.display = "none";
                console.log(data);
                console.log('Search successful!');
                let reviews = document.getElementsByClassName("restName");
                for(let i = 0; i < reviews.length; i++) {
                    reviews[i].style.display = "block";
                }
            })
            .catch(err => {
                setError('Search unsuccessful!');
                console.error('Error', err);
            });
    }

    useEffect(() => {
        document.getElementById("searchNameSubmit").addEventListener('click', function(event) {
            event.preventDefault();
    
            let searchName = document.getElementById("searchName").value;
    
            sendSearchName(searchName);
            
        });

        document.getElementById("searchZipCodeSubmit").addEventListener('click', function(event) {
            event.preventDefault();
    
            let zipcode = document.getElementById("searchZipCode").value;
    
            sendSearchZipCode(zipcode);
    
        });
    });

    return (
        <div class="contentArea" id="main">
            <h1>Calling all food-lovers!</h1>
            <h3><a href="http://localhost:3000/rate">Sign in</a> to submit a rating, or scroll below to read ratings!</h3>
            <br />
            <hr />
            <br />
            <label for="searchName"> Search (Restaurant Name): </label>
            <input type="text" id="searchName" name="searchName" size="20" />
            <button type="button" id="searchNameSubmit" name="searchNameSubmit">Search By Name</button>
            <label for="searchZipCode"> Search (Zip Code): </label>
            <input type="text" id="searchZipCode" name="searchZipCode" size="20" />
            <button type="button" id="searchZipCodeSubmit" name="searchZipCodeSubmit">Search By Zip Code</button>
            <br />
            <div id="avg" className="ratingContainer" >
                <h3>{restaurantName}</h3>
                <p>Average Rating: {avg}/5</p>
            </div>
            {elements.map((element, index) => (
                <div key={index} className="ratingContainer" id="userRatings">
                <p class="restName">{element.restaurant_name}</p>
                <p>Zip Code: {element.restaurant_zipcode}</p>
                <p>Score: {element.score}/5</p>
                <p>{element.comments}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;