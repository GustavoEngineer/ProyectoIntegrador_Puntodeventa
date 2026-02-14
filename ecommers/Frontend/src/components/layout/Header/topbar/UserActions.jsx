import React from 'react';
import { useCart } from '../../../shopping-cart/context/CartContext';
import { useAuth } from '../../../main/context/AuthContext';
import './UserActions.css';

const UserActions = ({ onViewCart, onViewAccount, onViewFavorites, currentView }) => {
    const { cartCount } = useCart();
    const { isAuthenticated, user } = useAuth();

    const getInitials = () => {
        if (!user || !user.name) return 'U';
        const parts = user.name.trim().split(' ');
        if (parts.length === 0) return 'U';
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    };

    const initials = getInitials();

    return (
        <div className="user-actions-container">
            <button
                className={`action-btn ${currentView === 'cart' ? 'active' : ''}`}
                onClick={onViewCart}
                title="Carrito"
            >
                <div className="icon-wrapper">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    {cartCount > 0 && <span className="badge-dot"></span>}
                </div>
                <span className="action-text">Carrito</span>
            </button>

            <button
                className={`action-btn ${currentView === 'favorites' ? 'active' : ''}`}
                onClick={onViewFavorites}
                title="Favoritos"
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span className="action-text">Favoritos</span>
            </button>

            <button
                className={`action-btn user-btn ${isAuthenticated ? 'logged-in' : ''}`}
                onClick={onViewAccount}
                title={isAuthenticated ? "Mi Cuenta" : "Iniciar Sesión"}
            >
                <div className="icon-wrapper">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <span className="action-text">{isAuthenticated ? (user?.name?.split(' ')[0] || 'Mi Cuenta') : 'Ingresar'}</span>
            </button>
        </div>
    );
};

export default UserActions;
