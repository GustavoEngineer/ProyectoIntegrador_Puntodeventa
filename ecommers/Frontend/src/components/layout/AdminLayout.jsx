import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = ({ children, onViewAccount, activeView, onNavigate }) => {
    const { user } = useAuth();

    const navItems = [
        { id: 'Home', label: 'Home', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> },
        { id: 'Piezas', label: 'Piezas', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> },
        { id: 'Ordenes', label: 'Ordenes', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> },
        { id: 'Configuraciones', label: 'Configuraciones', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> }
    ];

    const handleNavClick = (id) => {
        if (onNavigate) {
            onNavigate(id);
        }
    };

    const getInitials = (name) => {
        if (!name) return 'A';
        const parts = name.split(' ');
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <div
                            key={item.id}
                            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                            onClick={() => handleNavClick(item.id)}
                            title={item.label}
                        >
                            {item.icon}
                        </div>
                    ))}
                </nav>

                <div className="sidebar-promo">
                    <div className="sidebar-promo-icon">→</div>
                    <h4>Our team will help you to Estimate!</h4>
                    <div className="sidebar-promo-img">
                        <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1">
                            <rect x="30" y="20" width="10" height="20" />
                            <rect x="45" y="15" width="10" height="25" />
                            <circle cx="20" cy="40" r="5" />
                            <path d="M10 50 L90 50" />
                        </svg>
                    </div>
                </div>
            </aside>

            <div className="admin-main-wrapper">
                <header className="admin-header">
                    <div className="admin-search">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" placeholder="Search For Query" />
                    </div>

                    <div className="header-right">
                        <div className="header-icon-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        </div>
                        <div className="header-icon-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                        </div>

                        <div className="user-profile-widget" onClick={() => onNavigate('Configuraciones')}>
                            <div className="user-text">
                                <span className="user-name">{user?.name || 'Admin'}</span>
                                <span className="user-role">Super Admin</span>
                            </div>
                            <div className="user-avatar-initials">
                                {getInitials(user?.name)}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
    onViewAccount: PropTypes.func,
    activeView: PropTypes.string,
    onNavigate: PropTypes.func
};

export default AdminLayout;
