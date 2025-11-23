import React from 'react';
import './HomePage.css';
import Header from './Header.js';
import Introduction from '../components/Introduction';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import FloatingContactButton from '../components/FloatingContactButton';

const HomePage = () => {
    return (
        <div className="homepage">
            <Header/>
            <Introduction />
            <Gallery />
            <Footer />
            <FloatingContactButton />
        </div>
    );
};

export default HomePage;