import React, { useState } from 'react';
import { useAuth } from '@/components/layout/body/authenticationscreen/AuthContext';
import './AccountPage.css';

const AccountPage = () => {
    const { user, logout, updateProfile, changePassword, isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showOrderDetails, setShowOrderDetails] = useState(null);
    const [showChangePassword, setShowChangePassword] = useState(false);



    // Estados para edición de perfil
    const [editData, setEditData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        company: user?.company || '',
        department: user?.department || '',
        address: user?.address || ''
    });

    // Estados para cambio de contraseña
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSaveProfile = () => {
        try {
            updateProfile(editData);
            setIsEditing(false);
            setSuccess('Perfil actualizado correctamente');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancelEdit = () => {
        setEditData({
            name: user?.name || '',
            phone: user?.phone || '',
            company: user?.company || '',
            department: user?.department || '',
            address: user?.address || ''
        });
        setIsEditing(false);
        setError('');
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmitPasswordChange = (e) => {
        e.preventDefault();
        setError('');

        try {
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                throw new Error('Las contraseñas nuevas no coinciden');
            }

            changePassword(passwordData.currentPassword, passwordData.newPassword);
            setShowChangePassword(false);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setSuccess('Contraseña cambiada correctamente');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            logout();
        }
    };

    const getOrderStatusClass = (estado) => {
        switch (estado) {
            case 'Entregado': return 'status-delivered';
            case 'En tránsito': return 'status-transit';
            case 'Procesando': return 'status-processing';
            case 'Cancelado': return 'status-cancelled';
            default: return '';
        }
    };

    // Obtener iniciales del nombre
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    if (!isAuthenticated) {
        return (
            <div className="account-page">
                <div className="account-header">
                    <h1>Mi Cuenta</h1>
                    <p>Inicia sesión para ver tu perfil y pedidos</p>
                </div>
                <div className="account-content" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                    <p>Por favor inicia sesión para acceder a esta sección.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="account-page">
            <div className="account-header">
                <button
                    onClick={() => window.history.back()}
                    className="back-nav-button"
                    style={{ marginBottom: '1rem', border: 'none', background: 'transparent', paddingLeft: 0, boxShadow: 'none' }}
                >
                    ← Volver
                </button>
                <h1>Mi Cuenta</h1>
                <p>Gestiona tu información y pedidos</p>
            </div>

            {success && (
                <div className="success-message">
                    ✓ {success}
                </div>
            )}

            <div className="account-tabs">
                <button
                    className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    👤 Perfil
                </button>
                <button
                    className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    📦 Mis Pedidos
                </button>
                <button
                    className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                >
                    ⚙️ Configuración
                </button>
            </div>

            <div className="account-content">
                {activeTab === 'profile' && (
                    <div className="profile-section">
                        <div className="profile-card">
                            <div className="profile-avatar">
                                <span>{getInitials(user?.name || 'U')}</span>
                            </div>
                            <h2>{user?.name}</h2>
                            <p className="profile-role">{user?.role || 'Ingeniero Biomédico'}</p>
                        </div>

                        <div className="info-card">
                            <h3>Información de Contacto</h3>

                            {error && <div className="error-message">⚠️ {error}</div>}

                            {isEditing ? (
                                <div className="edit-form">
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editData.name}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Teléfono</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={editData.phone}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Empresa</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={editData.company}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Departamento</label>
                                        <input
                                            type="text"
                                            name="department"
                                            value={editData.department}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Dirección de Envío</label>
                                        <textarea
                                            name="address"
                                            value={editData.address}
                                            onChange={handleEditChange}
                                            rows="2"
                                        />
                                    </div>
                                    <div className="edit-actions">
                                        <button className="save-btn" onClick={handleSaveProfile}>
                                            Guardar Cambios
                                        </button>
                                        <button className="cancel-btn" onClick={handleCancelEdit}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <label>Email</label>
                                            <p>{user?.email}</p>
                                        </div>
                                        <div className="info-item">
                                            <label>Teléfono</label>
                                            <p>{user?.phone || 'No especificado'}</p>
                                        </div>
                                        <div className="info-item">
                                            <label>Empresa</label>
                                            <p>{user?.company || 'No especificada'}</p>
                                        </div>
                                        <div className="info-item">
                                            <label>Departamento</label>
                                            <p>{user?.department || 'No especificado'}</p>
                                        </div>
                                        <div className="info-item full-width">
                                            <label>Dirección de Envío</label>
                                            <p>{user?.address || 'No especificada'}</p>
                                        </div>
                                    </div>
                                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                                        Editar Información
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="orders-section">
                        <h2>Historial de Pedidos</h2>
                        {user?.orders && user.orders.length > 0 ? (
                            <div className="orders-list">
                                {user.orders.map((order) => (
                                    <div key={order.id} className="order-card">
                                        <div className="order-header">
                                            <div>
                                                <h3>Pedido #{order.id}</h3>
                                                <p className="order-date">
                                                    {new Date(order.date).toLocaleDateString('es-MX', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <span className={`order-status ${getOrderStatusClass(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="order-details">
                                            <div className="order-info">
                                                <span>{order.items.length} {order.items.length === 1 ? 'artículo' : 'artículos'}</span>
                                                <span className="order-total">${order.total.toFixed(2)}</span>
                                            </div>
                                            <button
                                                className="view-order-btn"
                                                onClick={() => setShowOrderDetails(order)}
                                            >
                                                Ver Detalles
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-orders">
                                <p>📦</p>
                                <h3>No tienes pedidos aún</h3>
                                <p>Cuando realices una compra, aparecerá aquí</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="settings-section">
                        <h2>Configuración</h2>

                        <div className="settings-card">
                            <h3>Notificaciones</h3>
                            <div className="setting-item">
                                <div>
                                    <h4>Ofertas y promociones</h4>
                                    <p>Recibe ofertas especiales en piezas médicas</p>
                                </div>
                                <label className="toggle">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="setting-item">
                                <div>
                                    <h4>Actualizaciones de pedidos</h4>
                                    <p>Notificaciones sobre el estado de tus pedidos</p>
                                </div>
                                <label className="toggle">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="setting-item">
                                <div>
                                    <h4>Nuevos productos</h4>
                                    <p>Alertas cuando lleguen nuevas piezas</p>
                                </div>
                                <label className="toggle">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>

                        <div className="settings-card">
                            <h3>Seguridad</h3>
                            <button
                                className="settings-btn"
                                onClick={() => setShowChangePassword(true)}
                            >
                                Cambiar Contraseña
                            </button>
                            <button
                                className="settings-btn secondary"
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de Detalles de Pedido */}
            {showOrderDetails && (
                <div className="modal-overlay" onClick={() => setShowOrderDetails(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Detalles del Pedido #{showOrderDetails.id}</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowOrderDetails(null)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="order-summary">
                                <div className="summary-row">
                                    <span>Fecha:</span>
                                    <span>{new Date(showOrderDetails.date).toLocaleDateString('es-MX')}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Estado:</span>
                                    <span className={`order-status ${getOrderStatusClass(showOrderDetails.status)}`}>
                                        {showOrderDetails.status}
                                    </span>
                                </div>
                            </div>

                            <h3>Productos</h3>
                            <div className="order-items">
                                {showOrderDetails.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <div className="item-info">
                                            <h4>{item.name}</h4>
                                            <p>Cantidad: {item.quantity}</p>
                                        </div>
                                        <div className="item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-total-line">
                                <span>Total:</span>
                                <span className="total-amount">${showOrderDetails.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Cambiar Contraseña */}
            {showChangePassword && (
                <div className="modal-overlay" onClick={() => setShowChangePassword(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Cambiar Contraseña</h2>
                            <button
                                className="close-btn"
                                onClick={() => {
                                    setShowChangePassword(false);
                                    setPasswordData({
                                        currentPassword: '',
                                        newPassword: '',
                                        confirmPassword: ''
                                    });
                                    setError('');
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="modal-body">
                            {error && <div className="error-message">⚠️ {error}</div>}

                            <form onSubmit={handleSubmitPasswordChange}>
                                <div className="form-group">
                                    <label>Contraseña Actual</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        minLength="6"
                                    />
                                    <small>Mínimo 6 caracteres</small>
                                </div>
                                <div className="form-group">
                                    <label>Confirmar Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button type="submit" className="save-btn">
                                        Cambiar Contraseña
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={() => {
                                            setShowChangePassword(false);
                                            setPasswordData({
                                                currentPassword: '',
                                                newPassword: '',
                                                confirmPassword: ''
                                            });
                                            setError('');
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountPage;
