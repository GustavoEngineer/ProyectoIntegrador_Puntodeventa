import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import './AdminPage.css';

const AdminPage = ({ activeView }) => {
    const [piezas, setPiezas] = useState([]);
    const [selectedPieza, setSelectedPieza] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch pieces when 'Piezas' view is active
    useEffect(() => {
        if (activeView === 'Piezas') {
            fetchPiezas();
        }
    }, [activeView]);

    const fetchPiezas = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch all pieces (using a large limit for now or handle pagination later)
            // Assuming the API supports limit. Using same endpoint as Catalog.
            const response = await apiCall('/piezas?limit=100');
            let data = [];
            if (response && response.data) {
                data = response.data;
            } else if (Array.isArray(response)) {
                data = response;
            }
            setPiezas(data);
        } catch (err) {
            console.error('Error fetching admin pieces:', err);
            setError('Failed to load pieces.');
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        switch (activeView) {
            case 'Home':
                return (
                    <div className="admin-empty-state">
                        <h2>Bienvenido al Panel de Administración</h2>
                        <p>Seleccione una opción del menú lateral para comenzar.</p>
                    </div>
                );
            case 'Piezas':
                if (selectedPieza) {
                    return (
                        <div className="admin-detail-view">
                            <div className="detail-header">
                                <button className="back-btn" onClick={() => setSelectedPieza(null)}>
                                    ← Volver a la lista
                                </button>
                                <h2>Detalles de la Pieza</h2>
                                <div className="header-actions">
                                    <button className="delete-btn-text">Eliminar</button>
                                </div>
                            </div>

                            <div className="detail-content">
                                <div className="detail-image-section">
                                    <div className="detail-image-wrapper">
                                        {selectedPieza.Imagen_Url ? (
                                            <img src={selectedPieza.Imagen_Url} alt={selectedPieza.Nombre} />
                                        ) : (
                                            <div className="detail-no-img">Sin Imagen</div>
                                        )}
                                    </div>
                                </div>

                                <div className="detail-info-section">
                                    <h1 className="detail-title">{selectedPieza.Nombre}</h1>
                                    <div className="detail-price">${selectedPieza.Precio}</div>

                                    <div className="detail-meta-grid">
                                        <div className="meta-item">
                                            <label>Marca</label>
                                            <span>{selectedPieza.Marca || 'N/A'}</span>
                                        </div>
                                        <div className="meta-item">
                                            <label>Modelo</label>
                                            <span>{selectedPieza.Modelo || 'N/A'}</span>
                                        </div>
                                        <div className="meta-item">
                                            <label>Stock</label>
                                            <span>{selectedPieza.Stock} unidades</span>
                                        </div>
                                        <div className="meta-item">
                                            <label>ID</label>
                                            <span>#{selectedPieza.Id_Pieza}</span>
                                        </div>
                                    </div>

                                    <div className="detail-description">
                                        <label>Descripción</label>
                                        <p>{selectedPieza.Descripcion || 'No hay descripción disponible para este producto.'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }

                return (
                    <div className="admin-list-view">
                        <div className="admin-section-header">
                            <h2>Gestión de Piezas</h2>
                            <div className="header-actions">
                                <select className="sort-dropdown">
                                    <option>Sort by</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="name">Name</option>
                                </select>
                                <button className="create-btn">+ Nueva Pieza</button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="loading-state">
                                <p>Cargando lista...</p>
                            </div>
                        ) : error ? (
                            <p className="error-text">{error}</p>
                        ) : (
                            <div className="list-container">
                                {piezas.length === 0 ? (
                                    <div className="empty-state">
                                        <p>No hay piezas registradas.</p>
                                    </div>
                                ) : (
                                    piezas.map(pieza => (
                                        <div className="list-row" key={pieza.Id_Pieza} onClick={() => setSelectedPieza(pieza)} style={{ cursor: 'pointer' }}>
                                            <div className="list-item-main">
                                                <div className="item-icon">
                                                    {pieza.Imagen_Url ? (
                                                        <img src={pieza.Imagen_Url} alt={pieza.Nombre} />
                                                    ) : (
                                                        <span>📦</span>
                                                    )}
                                                </div>
                                                <div className="item-info">
                                                    <div className="item-name">{pieza.Nombre}</div>
                                                    <div className="item-meta">
                                                        <span>{pieza.Marca}</span>
                                                        <span>•</span>
                                                        <span>{pieza.Stock} in stock</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="list-item-actions">
                                                <div className="item-price">${pieza.Precio}</div>
                                                <button className="action-menu-btn" title="More options">
                                                    ⋮
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                );
            case 'Ordenes':
                return <h2>Gestión de Ordenes (Próximamente)</h2>;
            case 'Configuraciones':
                return (
                    <div className="admin-list-view">
                        <div className="admin-section-header">
                            <h2>Perfil de Administrador</h2>
                        </div>
                        <div className="admin-profile-container" style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold'
                                }}>
                                    {(activeView === 'Configuraciones' || true) && (
                                        // Simple logic as it's not passed as prop here, but we can assume "Admin" or fetch user
                                        'A'
                                    )}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary-hover)' }}>Admin Engineer</h3>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Super Admin</span>
                                </div>
                            </div>

                            <div className="profile-details">
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Email</label>
                                    <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>admin@engineer.com</div>
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Role</label>
                                    <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>Administrador</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <h2>Vista no encontrada</h2>;
        }
    };

    return (
        <div className="admin-page-container">
            {renderContent()}
        </div>
    );
};

export default AdminPage;
