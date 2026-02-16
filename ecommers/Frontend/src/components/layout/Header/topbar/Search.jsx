import React from 'react';
import useTopbarWritingEffect from '@/common/hooks/topbar_writing_effect';
import './Search.css';

const Search = ({ onSearch, searchQuery }) => {
    const {
        placeholderText,
        isSearchHovered,
        setIsSearchHovered
    } = useTopbarWritingEffect();

    return (
        <div
            className="search-container"
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
        >
            <input
                type="text"
                className="search-input"
                placeholder={isSearchHovered ? `Buscar ${placeholderText}|` : "Buscar artículos..."}
                value={searchQuery}
                onChange={(e) => onSearch && onSearch(e.target.value)}
            />
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        </div>
    );
};

export default Search;
