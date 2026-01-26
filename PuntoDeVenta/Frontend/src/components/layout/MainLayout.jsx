import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import './MainLayout.css';

const MainLayout = ({ children, onViewCart, onViewCategories, onViewAccount, onViewCatalog, onViewFavorites, currentView, onSearch, searchQuery }) => {
    return (
        <div className="main-layout">
            <Header
                onViewCart={onViewCart}
                onViewCategories={onViewCategories}
                onViewAccount={onViewAccount}
                onViewCatalog={onViewCatalog}
                onViewFavorites={onViewFavorites}
                currentView={currentView}
                onSearch={onSearch}
                searchQuery={searchQuery}
            />
            <main className="main-content">
                {children}
            </main>

        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
    onViewCart: PropTypes.func,
    onViewCategories: PropTypes.func,
    onViewAccount: PropTypes.func,
    onViewCatalog: PropTypes.func,
    onViewFavorites: PropTypes.func,
};

export default MainLayout;
