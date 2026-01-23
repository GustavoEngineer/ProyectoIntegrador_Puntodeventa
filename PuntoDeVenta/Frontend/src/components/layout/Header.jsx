import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import './Header.css';

const Header = ({ onViewCart, onViewCategories, onViewAccount, onViewCatalog, currentView, onSearch, searchQuery }) => {
    const { getCartCount } = useCart();
    const { isAuthenticated } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const cartCount = getCartCount();

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
                    >
                        {isDarkMode ? (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>

                    {/* Search Bar - Taking part of left/center space */}
                    <div className="search-container">
                        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Buscar artículos..."
                            value={searchQuery}
                            onChange={(e) => onSearch && onSearch(e.target.value)}
                        />
                    </div>

                </div>

                <div className="header-center">
                    <button className="nav-home-btn" onClick={onViewCatalog} title="Ir al inicio">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span>Home</span>
                    </button>

                    <button className="cart-icon-btn" onClick={onViewCart}>
                        <div className="cart-icon-wrapper">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {cartCount > 0 && <span className="cart-badge-dot"></span>}
                        </div>
                        <span className="cart-text">Carrito</span>
                    </button>

                    <button className="favoritos-btn" title="Favoritos">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span className="favoritos-text">Favoritos</span>
                    </button>


                </div>

                <div className="header-right">

                    {/* Profile Avatar */}
                    {isAuthenticated ? (
                        <div className="user-avatar-circle logged-in" onClick={onViewAccount} title="Mi Cuenta">
                            <span className="avatar-initial">U</span>
                        </div>
                    ) : (
                        <div className="user-avatar-circle guest" onClick={onViewAccount} title="Iniciar Sesión">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
