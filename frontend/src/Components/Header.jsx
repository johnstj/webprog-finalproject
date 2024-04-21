import React, { Component } from 'react';
import './Header.css';

const Header = () => {
    return (
        <div class="header">
            <div class="navBar">
                <h1>Restaurant Rater</h1>
                <h3>Your favorite restaurant rating site!</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/rate">Rate</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
