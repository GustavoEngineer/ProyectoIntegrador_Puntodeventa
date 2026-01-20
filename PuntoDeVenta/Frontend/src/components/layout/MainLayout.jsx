import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import './MainLayout.css';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
            <footer className="footer">
                <p>&copy; 2024 LuxeStore. All rights reserved.</p>
            </footer>
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
