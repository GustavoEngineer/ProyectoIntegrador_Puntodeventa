import React, { useState, useEffect, useRef } from 'react';
import { apiCall } from '../../utils/api';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import './Header.css';

const Header = ({ onViewCart, onViewCategories, onViewAccount, onViewCatalog, onViewFavorites, currentView, onSearch, searchQuery }) => {
    const { getCartCount } = useCart();
    const { isAuthenticated, user, logout } = useAuth();
    const cartCount = getCartCount();

    // Category dropdown state
    const [categories, setCategories] = useState([]);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const dropdownRef = useRef(null);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await apiCall('/categorias-pieza');
                setCategories(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error fetching categories for header:', err);
            }
        };
        fetchCategories();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowCategoryMenu(false);
            }
        };

        if (showCategoryMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCategoryMenu]);

    const handleCategoryClick = (categoryId) => {
        onViewCatalog(categoryId);
        setShowCategoryMenu(false);
    };

    const toggleCategoryMenu = (e) => {
        e.stopPropagation();
        setShowCategoryMenu(!showCategoryMenu);
    };


    // Logic to get initials
    const getInitials = () => {
        if (!user || !user.name) return 'U';
        const parts = user.name.trim().split(' ');
        if (parts.length === 0) return 'U';
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    };

    const initials = getInitials();

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    {/* Placeholder for left content if needed, or keeping logo here later */}
                </div>

                <div className="header-center">


                    {/* Search Bar - Center */}
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
                        <div className="category-dropdown-wrapper" ref={dropdownRef}>
                            <button
                                className={`search-category-btn ${showCategoryMenu ? 'active' : ''}`}
                                onClick={toggleCategoryMenu}
                                title="Categorías"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                            </button>

                            {showCategoryMenu && (
                                <div className="category-dropdown-menu">
                                    <div className="dropdown-header">Categorías</div>
                                    <ul className="dropdown-list">
                                        <li onClick={() => handleCategoryClick(null)}>
                                            Todas las categorías
                                        </li>
                                        {categories.map(cat => (
                                            <li key={cat.Id_CategoriaPieza} onClick={() => handleCategoryClick(cat)}>
                                                {cat.Descripcion || cat.Nombre}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="header-right">
                    <button
                        className={`nav-home-btn ${currentView === 'catalog' ? 'active' : ''}`}
                        onClick={onViewCatalog}
                        title="Ir al inicio"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        {currentView === 'catalog' && <span>Home</span>}
                    </button>

                    <button
                        className={`cart-icon-btn ${currentView === 'cart' ? 'active' : ''}`}
                        onClick={onViewCart}
                    >
                        <div className="cart-icon-wrapper">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {cartCount > 0 && <span className="cart-badge-dot"></span>}
                        </div>
                        {currentView === 'cart' && <span className="cart-text">Carrito</span>}
                    </button>

                    <button
                        className={`favoritos-btn ${currentView === 'favorites' ? 'active' : ''}`}
                        onClick={onViewFavorites}
                        title="Favoritos"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {currentView === 'favorites' && <span className="favoritos-text">Favoritos</span>}
                    </button>

                    {/* Profile Avatar */}
                    {isAuthenticated ? (
                        <>
                            <div className="user-avatar-circle logged-in" onClick={onViewAccount} title="Mi Cuenta">
                                <span className="avatar-initial">{initials}</span>
                            </div>
                            <button className="logout-btn" onClick={logout} title="Cerrar Sesión">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                            </button>
                        </>
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
