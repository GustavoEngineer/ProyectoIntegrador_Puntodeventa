import React, { useState } from 'react';
import { useAuth } from '../body/authenticationscreen/AuthContext';
import RhombusLogo from '@/features/3dmodel/RhombusLogo';
import './Footer.css';

const Footer = () => {
    const { isAuthenticated, user, login, logout } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleQuickLogin = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('Campos requeridos');
            return;
        }

        setLoading(true);
        try {
            await login(formData.email, formData.password);
            setFormData({ email: '', password: '' });
        } catch (err) {
            setError('Credenciales inválidas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* Left Side: Brand & Socials */}
                <div className="footer-brand-section">
                    <div className="footer-logo">
                        <div style={{ width: '40px', height: '40px' }}>
                            <RhombusLogo />
                        </div>
                        <h2>MediParts</h2>
                    </div>
                    <p className="footer-description">
                        Líder global en suministro hospitalario y distribución de equipos médicos.
                        Sirviendo a más de 15,000 instituciones médicas alrededor del mundo con
                        precisión y soporte clínico de primera clase.
                    </p>

                    <div className="footer-socials">
                        <a href="#" className="social-icon" aria-label="Facebook">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                        <a href="#" className="social-icon" aria-label="Twitter">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                        </a>
                        <a href="#" className="social-icon" aria-label="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="#" className="social-icon" aria-label="LinkedIn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                    </div>
                </div>

                {/* Right Side: Quick Login / User Info */}
                <div className="footer-login-section">
                    {!isAuthenticated ? (
                        <>
                            <h3>Inicio de Sesión Rápido</h3>
                            <form onSubmit={handleQuickLogin} className="quick-login-form">
                                <div className="footer-input-group">
                                    <input
                                        type="email"
                                        name="email"
                                        className="footer-input"
                                        placeholder="Correo Electrónico"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="footer-input-group">
                                    <input
                                        type="password"
                                        name="password"
                                        className="footer-input"
                                        placeholder="Contraseña"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {error && <span style={{ color: '#ff6b6b', fontSize: '0.8rem' }}>{error}</span>}
                                <button type="submit" className="footer-btn" disabled={loading}>
                                    {loading ? 'Entrando...' : 'Ingresar'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="footer-user-info">
                            <h3>Bienvenido, {user?.name || 'Usuario'}</h3>
                            <p>Has iniciado sesión correctamente.</p>
                            <ul className="footer-links">
                                <li><a href="#" onClick={(e) => e.preventDefault()}>Mi Cuenta</a></li>
                                <li><a href="#" onClick={(e) => e.preventDefault()}>Mis Pedidos</a></li>
                                <li><a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Cerrar Sesión</a></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 MediParts Global. Todos los derechos reservados.</p>
                <div className="footer-bottom-links">
                    <a href="#">Privacidad</a>
                    <a href="#">Términos</a>
                    <a href="#">Regulatorio</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
