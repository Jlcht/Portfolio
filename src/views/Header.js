import React from 'react';
import './Header.css';
import logoGN from '../assets/images/logo192.png';

const Header = () => (
    <header className="header">
        <div className="header-left">
            <img src={logoGN} alt="Logo" className="header-logo" />
            <h1 className="header-title">Welcome</h1>
        </div>
        <nav className="header-nav">
            <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact" className="cta">Contact</a></li>
            </ul>
        </nav>
    </header>
);

export default Header;
