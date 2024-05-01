import React, { Component, useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
    const [error, setError] = useState('');
    const [elements, setElements] = useState([]);

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
                console.log(data);
                console.log('Search successful!');
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
                console.log(data);
                console.log('Search successful!');
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
            <h3>Sign in to submit a rating, or scroll below to read ratings!</h3>
            <hr />
            <label for="searchName">Search (Restaurant Name):</label>
            <input type="text" id="searchName" name="searchName" size="20" />
            <button type="button" id="searchNameSubmit" name="searchNameSubmit">Search By Name</button>
            <label for="searchZipCode">Search (Zip Code):</label>
            <input type="text" id="searchZipCode" name="searchZipCode" required minlength="5" maxlength="5" size="20" />
            <button type="button" id="searchZipCodeSubmit" name="searchZipCodeSubmit">Search By Zip Code</button>
            {elements.map((element, index) => (
                <div key={index} className="ratingContainer">
                {/* Display whatever content you want for each element */}
                <p>{element.restaurant_name}</p>
                <p>{element.restaurant_zipcode}</p>
                <p>{element.score}</p>
                <p>{element.comments}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;