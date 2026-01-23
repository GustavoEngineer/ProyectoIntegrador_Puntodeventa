import React from 'react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';
import './Header.css';

const Header = ({ onViewCart, onViewCategories, onViewAccount, onViewCatalog, currentView }) => {
    const { getCartCount } = useCart();
    const { isDarkMode, toggleTheme } = useTheme();
    const cartCount = getCartCount();

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-section" onClick={onViewCatalog} style={{ cursor: 'pointer' }}>
                    <h1 className="logo-text">MediParts</h1>
                </div>

                <nav className="nav-menu">
                    <a 
                        href="#" 
                        className={`nav-link ${currentView === 'catalog' || currentView === 'product' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); onViewCatalog(); }}
                    >
                        Piezas
                    </a>
                    <a 
                        href="#" 
                        className={`nav-link ${currentView === 'categories' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); onViewCategories(); }}
                    >
                        Categorías
                    </a>
                    <a 
                        href="#" 
                        className={`nav-link ${currentView === 'account' ? 'active' : ''}`}
                        onClick={(e) => { e.preventDefault(); onViewAccount(); }}
                    >
                        Mi Cuenta
                    </a>
                </nav>

                <div className="header-actions">
                    <button 
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
                    >
                        {isDarkMode ? (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="4"/>
                                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                            </svg>
                        )}
                    </button>
                    <Button 
                        variant="outline" 
                        className="cart-btn"
                        onClick={onViewCart}
                    >
                        🛒 Carrito ({cartCount})
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
