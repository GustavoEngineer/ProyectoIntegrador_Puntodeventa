import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import './MainLayout.css';

const MainLayout = ({ children, onViewCart, onViewCategories, onViewAccount, onViewCatalog, currentView }) => {
    return (
        <div className="main-layout">
            <Header 
                onViewCart={onViewCart}
                onViewCategories={onViewCategories}
                onViewAccount={onViewAccount}
                onViewCatalog={onViewCatalog}
                currentView={currentView}
            />
            <main className="main-content">
                {children}
            </main>
            <footer className="footer">
                <p>&copy; 2024 MediParts. Plataforma de ingenieros biomédicos.</p>
            </footer>
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    onViewCart: PropTypes.func,
    onViewCategories: PropTypes.func,
    onViewAccount: PropTypes.func,
    onViewCatalog: PropTypes.func,
};

export default MainLayout;
