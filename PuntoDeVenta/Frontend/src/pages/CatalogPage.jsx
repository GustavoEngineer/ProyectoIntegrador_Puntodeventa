import React, { useState, useEffect } from 'react';
import ProductCard from '../components/common/ProductCard';
import './CatalogPage.css';

const API_URL = 'http://localhost:3000/api';

const CatalogPage = ({ onViewProduct, selectedCategory }) => {
    const [piezas, setPiezas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        fetchPiezas();
    }, [selectedCategory, retryCount]);

    const fetchPiezas = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_URL}/piezas`);
            if (!response.ok) {
                throw new Error('Error al cargar las piezas');
            }
            let data = await response.json();
            
            // Filtrar por categoría si está seleccionada
            if (selectedCategory) {
                data = data.filter(pieza => pieza.Id_CategoriaPieza === selectedCategory);
            }
            
            setPiezas(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching piezas:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRetry = () => {
        setRetryCount(prev => prev + 1);
    };

    if (loading) {
        return (
            <div className="catalog-page">
                <div className="catalog-loading">Cargando piezas médicas...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="catalog-page">
                <div className="catalog-error">
                    <p>Error: {error}</p>
                    <button onClick={handleRetry}>Reintentar</button>
                </div>
            </div>
        );
    }

    return (
        <div className="catalog-page">
            <div className="catalog-header">
                <h2 className="catalog-title">Piezas de Equipos Médicos</h2>
                <p className="catalog-subtitle">
                    Piezas excedentes de ingenieros de mantenimiento. Calidad garantizada.
                </p>
            </div>

            {piezas.length === 0 && !loading ? (
                <div className="catalog-empty">
                    <p>No hay piezas disponibles en este momento.</p>
                    <button onClick={handleRetry} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                        Recargar
                    </button>
                </div>
            ) : (
                <div className="product-grid">
                    {piezas.map(pieza => (
                        <ProductCard 
                            key={pieza.Id_Pieza} 
                            product={pieza}
                            onViewDetails={() => onViewProduct(pieza.Id_Pieza)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CatalogPage;
