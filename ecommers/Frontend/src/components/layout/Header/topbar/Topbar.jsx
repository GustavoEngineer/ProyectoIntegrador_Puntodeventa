import React, { useState, useEffect } from 'react';
import './Topbar.css';
import Search from './Search';
import UserActions from './UserActions';
import NavigationMenu from '../navigationmenu/NavigationMenu';

const Topbar = ({ onViewCart, onViewCategories, onViewAccount, onViewCatalog, onViewFavorites, currentView, onSearch, searchQuery, onSelectCategory, selectedCategory, onSearchSubmit }) => {
    // Scroll effect
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
            <div className="header-container">
                <div className="header-left">
                    <div className="header-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {/* Blue Gear/Part Icon */}
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9fe7f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                        <span className="brand-text">MediParts</span>
                    </div>
                </div>

                <div className="header-center">
                    <Search
                        onSearch={onSearch}
                        searchQuery={searchQuery}
                        onSearchSubmit={onSearchSubmit}
                        onViewCategories={onViewCategories}
                    />
                </div>

                <div className="header-right">
                    <UserActions
                        onViewCart={onViewCart}
                        onViewAccount={onViewAccount}
                        onViewFavorites={onViewFavorites}
                        currentView={currentView}
                    />
                </div>
            </div>
            <NavigationMenu onSelectCategory={onSelectCategory} selectedCategory={selectedCategory} />
        </header>
    );
};

export default Topbar;
