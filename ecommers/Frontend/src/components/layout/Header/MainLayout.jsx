import React from 'react';
import PropTypes from 'prop-types';
import Topbar from './topbar/Topbar';
import './MainLayout.css';

const MainLayout = ({ children, onViewCart, onViewCategories, onViewAccount, onViewCatalog, onViewFavorites, currentView, onSearch, searchQuery, hideHeader = false }) => {
    return (
        <div className="main-layout">
            {!hideHeader && (
                <Topbar
                    onViewCart={onViewCart}
                    onViewCategories={onViewCategories}
                    onViewAccount={onViewAccount}
                    onViewCatalog={onViewCatalog}
                    onViewFavorites={onViewFavorites}
                    currentView={currentView}
                    onSearch={onSearch}
                    searchQuery={searchQuery}
                />
            )}
            <main className={`main-content ${hideHeader ? 'no-header' : ''}`}>
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
