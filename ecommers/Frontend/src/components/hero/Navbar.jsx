import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar({
    isVisible = true,
    onLoginClick,
    onViewCart,
    onViewFavorites,
    onViewHome,
    onViewAdmin,
    onSearch,
    searchQuery
}) {
    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { getCartCount } = useCart();
    const { isAuthenticated, user, logout } = useAuth();
    const cartCount = getCartCount();
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    // Get user initials
    const getInitials = () => {
        if (!user || !user.name) return 'U';
        const parts = user.name.trim().split(' ');
        if (parts.length === 0) return 'U';
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        if (onViewHome) onViewHome();
    };

    // Typewriter effect for placeholder
    const [placeholderText, setPlaceholderText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [isSearchHovered, setIsSearchHovered] = useState(false);

    useEffect(() => {
        if (!isSearchHovered) {
            setPlaceholderText('');
            return;
        }

        const phrases = ["equipos médicos...", "monitores...", "sensores...", "refacciones..."];
        const i = loopNum % phrases.length;
        const fullText = phrases[i];

        const handleTyping = () => {
            setPlaceholderText(isDeleting
                ? fullText.substring(0, placeholderText.length - 1)
                : fullText.substring(0, placeholderText.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && placeholderText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end
            } else if (isDeleting && placeholderText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [placeholderText, isDeleting, loopNum, typingSpeed, isSearchHovered]);

    return (
        <nav className={`navbar ${isVisible ? 'navbar-visible' : ''} ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo - Click to go home */}
                <div className="navbar-brand" onClick={onViewHome} style={{ cursor: 'pointer' }}>
                    <span className="brand-text">MP.</span>
                    <span className="brand-year">EST. 2024</span>
                </div>

                {/* Search Bar - Center */}
                <div
                    className="navbar-search"
                    onMouseEnter={() => setIsSearchHovered(true)}
                    onMouseLeave={() => {
                        setIsSearchHovered(false);
                        setPlaceholderText(''); // Reset immediately on leave
                    }}
                >
                    <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder={isSearchHovered ? `Buscar ${placeholderText}|` : "Buscar artículos..."}
                        value={searchQuery || ''}
                        onChange={(e) => onSearch && onSearch(e.target.value)}
                    />
                </div>

                {/* Right Actions */}
                <div className="navbar-actions">
                    {/* Favorites */}
                    <button className="nav-action-btn" onClick={onViewFavorites}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span className="tooltip-text">Favoritos</span>
                    </button>

                    {/* Cart */}
                    <button className="nav-action-btn cart-btn" onClick={onViewCart}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        <span className="tooltip-text">Carrito</span>
                    </button>

                    {/* User Menu */}
                    <div
                        className="user-menu-container"
                        ref={userMenuRef}
                        onMouseEnter={() => setShowUserMenu(true)}
                        onMouseLeave={() => setShowUserMenu(false)}
                    >
                        {isAuthenticated ? (
                            <>
                                <div className="user-avatar">
                                    <span className="user-initials">{getInitials()}</span>
                                </div>

                                {/* Dropdown Menu */}
                                <div className={`user-dropdown ${showUserMenu ? 'show' : ''}`}>
                                    <div className="dropdown-header">
                                        <span className="greeting">Hola, bienvenido</span>
                                        <span className="user-name">{user?.name || 'Usuario'}</span>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="3"></circle>
                                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                        </svg>
                                        Configuración
                                    </button>
                                    {['Administrador', 'Admin', 'admin'].includes(user?.role) && (
                                        <button className="dropdown-item" onClick={() => {
                                            if (onViewAdmin) onViewAdmin();
                                            setShowUserMenu(false);
                                        }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="14" width="7" height="7"></rect>
                                                <rect x="3" y="14" width="7" height="7"></rect>
                                            </svg>
                                            Panel Admin
                                        </button>
                                    )}
                                    <button className="dropdown-item logout" onClick={handleLogout}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                        </svg>
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </>
                        ) : (
                            <button className="login-btn" onClick={onLoginClick}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span>Iniciar Sesión</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
