import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = ({ children, onViewAccount }) => {
    const { user } = useAuth();
    const [activeItem, setActiveItem] = useState('Home');

    const navItems = [
        { id: 'Home', label: 'Home' },
        { id: 'Piezas', label: 'Piezas' },
        { id: 'Ordenes', label: 'Ordenes' },
        { id: 'Configuraciones', label: 'Configuraciones' }
    ];

    const handleNavClick = (id) => {
        setActiveItem(id);
        // Here you would typically trigger navigation if using a router or bubble up the event
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <div
                            key={item.id}
                            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                            onClick={() => handleNavClick(item.id)}
                            title={item.label}
                        >
                            {/* Icons removed as requested, text only */}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </nav>

                <div className="sidebar-promo">
                    <div className="sidebar-promo-icon">→</div>
                    <h4>Our team will help you to Estimate!</h4>
                    <div className="sidebar-promo-img">
                        {/* Placeholder Illustration */}
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

                        <div className="user-profile-widget" onClick={onViewAccount}>
                            <div className="user-text">
                                <span className="user-name">{user?.name || 'Admin'}</span>
                                <span className="user-role">Super Admin</span>
                            </div>
                            <div className="user-avatar">
                                <img src="https://i.pravatar.cc/150?img=9" alt="Profile" />
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
