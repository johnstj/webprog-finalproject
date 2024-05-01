import React, { Component } from 'react';
import './About.css';

const About = () => {
    return (
        <div class="contentArea">
            <h1>About</h1>
            <br />
            <h3>This website was built by Joseph Johnston in Web Programming at Rowan University.</h3>
            <br />
            <h3>It uses the <span id="emph">MERN</span> stack.</h3>
            <ul id="mern">
                <li><span id="emph">M</span>ongoDB</li>
                <li><span id="emph">E</span>xpress</li>
                <li><span id="emph">R</span>eact</li>
                <li><span id="emph">N</span>ode</li>
            </ul>
            <img src="https://almablog-media.s3.ap-south-1.amazonaws.com/MERN_Stack_9437df2ba9_62af1dd3fc.png" alt="MERN Stack" width="400px" />
            <br />
            <h3>It is built and deployed using <span>Docker</span>.</h3>
            <img src="https://images.ctfassets.net/o7xu9whrs0u9/5AsK7O2S1lf4MhVYJqZ62W/d3a5a54b079cbb8adaffd5004be0f25a/Docker.logo2_.png" alt="Docker" width="400px" />
            <br />
            <h3><span id="emph">NGINX</span> is used to route traffic properly.</h3>
            <img src="https://miro.medium.com/v2/resize:fit:1200/0*mjG1YdoT7xPcnznN.jpg" alt="NGINX" width="400px" />
            <br />
            <h3>Authentication is handled with <span id="emph">JWT</span>.</h3>
            <img src="https://www.praetorian.com/wp-content/uploads/2022/05/jwt.png" alt="JWT" width="400px" />
            <br />
        </div>
    )
}

export default About;