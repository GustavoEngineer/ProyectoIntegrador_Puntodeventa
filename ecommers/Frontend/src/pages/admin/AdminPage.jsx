import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import './AdminPage.css';

const AdminPage = ({ activeView }) => {
    const [piezas, setPiezas] = useState([]);
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
                return (
                    <div className="admin-table-container">
                        <div className="admin-section-header">
                            <h2>Gestión de Piezas</h2>
                            <button className="create-btn">+ Nueva Pieza</button>
                        </div>

                        {loading ? (
                            <p>Cargando...</p>
                        ) : error ? (
                            <p className="error-text">{error}</p>
                        ) : (
                            <div className="table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Marca</th>
                                            <th>Precio</th>
                                            <th>Stock</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {piezas.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" style={{ textAlign: 'center' }}>No hay piezas registradas.</td>
                                            </tr>
                                        ) : (
                                            piezas.map(pieza => (
                                                <tr key={pieza.Id_Pieza}>
                                                    <td>#{pieza.Id_Pieza}</td>
                                                    <td>
                                                        <div className="table-img-preview">
                                                            {pieza.Imagen_Url ? (
                                                                <img src={pieza.Imagen_Url} alt={pieza.Nombre} />
                                                            ) : (
                                                                <div className="no-img">No Img</div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>{pieza.Nombre}</td>
                                                    <td>{pieza.Marca}</td>
                                                    <td>${pieza.Precio}</td>
                                                    <td>{pieza.Stock}</td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <button className="action-btn edit" title="Editar">✏️</button>
                                                            <button className="action-btn delete" title="Eliminar">🗑️</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                );
            case 'Ordenes':
                return <h2>Gestión de Ordenes (Próximamente)</h2>;
            case 'Configuraciones':
                return <h2>Configuraciones (Próximamente)</h2>;
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
