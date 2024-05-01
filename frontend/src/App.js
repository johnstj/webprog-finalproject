import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Home from './Components/Home';
import Hero from './Components/Hero';
import About from './Components/About';
import ContactForm from './Components/ContactForm';
import Footer from './Components/Footer';
import Login from './Components/Login';
import RatingForm from './Components/RatingForm';
import React, { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Function to check if token is valid (you need to implement this)
    const isTokenValid = (token) => {
      // Implement your logic to validate the token here
      // For example, you can decode the token and check its expiration
      // You may need a library like `jsonwebtoken` for this
      // Return true if valid, false otherwise
      return true;
    };

    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Hero />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rate" element={
            isLoggedIn ? <RatingForm /> : <Login />
          } />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element = { <></>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
