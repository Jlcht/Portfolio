// src/Views/HomePage.js
import React, { useState } from 'react';
import './HomePage.css';
import Header from './Header.js';
import Introduction from '../components/Introduction';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

const HomePage = () => {

    return (
        <div className="homepage">
            <Header/>
            <Introduction />
            <Gallery />
            <Footer />
        </div>
    );
};

export default HomePage; 