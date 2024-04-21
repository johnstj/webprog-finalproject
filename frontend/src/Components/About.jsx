import React, { Component } from 'react';
import './About.css';

const About = () => {
    return (
        <div class="contentArea">
            <h1>About</h1>
            <br />
            <h3>This website was built by Joseph Johnston using the <span id="emph">MERN</span> stack.</h3>
            <ul>
                <li><span id="emph">M</span>ongoDB</li>
                <li><span id="emph">E</span>xpress</li>
                <li><span id="emph">R</span>eact</li>
                <li><span id="emph">N</span>ode</li>
            </ul>
            <br />
            <h3>It is built and deployed using <span>Docker</span>.</h3>
            <br />
            <h3><span id="emph">NGINX</span> is used to route traffic properly.</h3>
            <br />
            <h3>Authentication is handled with <span id="emph">JWT</span>.</h3>
        </div>
    )
}

export default About;