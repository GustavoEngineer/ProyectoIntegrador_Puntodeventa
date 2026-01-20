import React from 'react';
import Button from '../common/Button';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-section">
                    <div className="logo-icon"></div>
                    <h1 className="logo-text">LuxeStore</h1>
                </div>

                <nav className="nav-menu">
                    <a href="#" className="nav-link active">Shop</a>
                    <a href="#" className="nav-link">New Arrivals</a>
                    <a href="#" className="nav-link">Collections</a>
                </nav>

                <div className="header-actions">
                    <Button variant="outline" className="cart-btn">
                        Cart (0)
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
