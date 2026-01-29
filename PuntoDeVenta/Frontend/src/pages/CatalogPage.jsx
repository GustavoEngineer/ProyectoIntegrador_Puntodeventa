import { useState, useEffect } from 'react';
import { apiCall } from '../utils/api';
import ProductCard from '../components/common/ProductCard';
import './CatalogPage.css';

const CatalogPage = ({ onViewProduct, selectedCategory, searchQuery, onSelectCategory, ...props }) => {
    const [piezas, setPiezas] = useState([]);
    const [filteredPiezas, setFilteredPiezas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    // Fetch Piezas effect - decoupled from selectedCategory
    useEffect(() => {
        fetchPiezas();
    }, [retryCount]);

    // Filtering Effect
    useEffect(() => {
        let result = [...piezas];

        // 1. Filter by Category
        if (selectedCategory) {
            result = result.filter(pieza => pieza.Id_CategoriaPieza === selectedCategory);
        }

        // 2. Filter by Search Query
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(pieza =>
                pieza.Nombre.toLowerCase().includes(lowerQuery) ||
                (pieza.Descripcion && pieza.Descripcion.toLowerCase().includes(lowerQuery))
            );
        }

        setFilteredPiezas(result);
    }, [searchQuery, selectedCategory, piezas]);

    const fetchPiezas = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch ALL pieces to keep sidebar populated
            let data = await apiCall('/piezas');

            if (!Array.isArray(data)) {
                console.error('API response is not an array:', data);
                data = [];
            }

            setPiezas(data);
            // Initial render will trigger the filtering effect
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

    return (
        <div className="catalog-page">
            <div className="catalog-layout">


                <div className="catalog-content">
                    <div className="catalog-header">
                        <h2 className="catalog-title">Explorar todo</h2>
                    </div>

                    {loading ? (
                        <div className="catalog-loading">Cargando piezas médicas...</div>
                    ) : error ? (
                        <div className="catalog-error">
                            <p>Error: {error}</p>
                            <button onClick={handleRetry}>Reintentar</button>
                        </div>
                    ) : filteredPiezas.length === 0 ? (
                        <div className="catalog-empty">
                            <p>No se encontraron piezas{searchQuery ? ` para "${searchQuery}"` : ''}.</p>
                            {searchQuery ? null : (
                                <button onClick={handleRetry} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                                    Recargar
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="product-grid">
                            {filteredPiezas.map(pieza => (
                                <ProductCard
                                    key={pieza.Id_Pieza}
                                    product={pieza}
                                    onViewDetails={() => onViewProduct(pieza.Id_Pieza)}
                                    onRequireLogin={props.onRequireLogin}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
