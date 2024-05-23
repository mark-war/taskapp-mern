import React from 'react';
import './About.css'; // Import CSS for styling

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <h3>All about the current version</h3>
                <p>Welcome to our application! We're dedicated to helping you manage your tasks efficiently and stay organized.</p>
                <p>Our application provides an easy-to-use interface for creating, tracking, and completing tasks. Whether you're managing personal projects or collaborating with a team, our app has you covered.</p>
                <p>Key features:</p>
                <ul>
                    <li>Simple task creation and management</li>
                    <li>Mark tasks as completed with a single click</li>
                    <li>Filter tasks to view only completed or active tasks</li>
                    <li>Responsive design for use on desktop and mobile devices</li>
                    <li>Powered by MERN (MongoDB, ExpressJS, React, NodeJS) stack</li>
                </ul>
            </div>
            <div className="about-image-container">
                <img src="../public/img/about-image.png" alt="About" className="about-image" />
            </div>
        </div>
    );
}

export default About;
