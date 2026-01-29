import { useState, useEffect, useRef } from 'react';
import { apiCall } from '../utils/api';
import ProductCard from '../components/common/ProductCard';
import './CatalogPage.css';

const CatalogPage = ({ onViewProduct, selectedCategory, searchQuery, onSelectCategory, ...props }) => {
    const [piezas, setPiezas] = useState([]);
    const [filteredPiezas, setFilteredPiezas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const LIMIT = 25;
    const catalogTopRef = useRef(null);

    // Fetch Piezas effect
    useEffect(() => {
        fetchPiezas(currentPage);
    }, [currentPage, retryCount]);

    // Filtering Effect
    useEffect(() => {
        // Filtering is now largely server-side, but we still handle client-side sorting/filtering if needed
        // For search/category change, we ideally should reset to page 1 and refetch.
        // Assuming search/category filtering is done client-side on the current PAGE of results for now
        // based on previous logic, but ideally this should be server-side.
        // For this task, we'll keep the client-side filter on the fetched page data.

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

    const fetchPiezas = async (page) => {
        try {
            setLoading(true);
            setError(null);

            // Fetch pieces with pagination
            let response = await apiCall(`/piezas?page=${page}&limit=${LIMIT}`);
            let data = [];

            // Handle new response structure
            if (response && response.data) {
                data = response.data;
                setTotalPages(response.meta.totalPages);
            } else if (Array.isArray(response)) {
                // Fallback for old structure if needed (though backend is updated)
                data = response;
            } else {
                console.error('Unexpected API response:', response);
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

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            // Scroll to top of catalog
            catalogTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5; // Adjust as needed

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="pagination-container">
                <button
                    className="pagination-arrow"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>

                {startPage > 1 && (
                    <>
                        <button className="pagination-number" onClick={() => handlePageChange(1)}>1</button>
                        {startPage > 2 && <span className="pagination-dots">...</span>}
                    </>
                )}

                {pageNumbers.map(num => (
                    <button
                        key={num}
                        className={`pagination-number ${num === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(num)}
                    >
                        {num}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="pagination-dots">...</span>}
                        <button className="pagination-number" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                    </>
                )}

                <button
                    className="pagination-arrow"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        );
    };

    return (
        <div className="catalog-page">
            <div className="catalog-layout">
                <div className="catalog-content" ref={catalogTopRef}>
                    <div className="catalog-header">
                        <h2 className="catalog-title">Explorar todo</h2>
                    </div>

                    {loading && piezas.length === 0 ? (
                        <div className="catalog-loading">Cargando piezas médicas...</div>
                    ) : error ? (
                        <div className="catalog-error">
                            <p>Error: {error}</p>
                            <button onClick={handleRetry}>Reintentar</button>
                        </div>
                    ) : (
                        <>
                            {filteredPiezas.length === 0 ? (
                                <div className="catalog-empty">
                                    <p>No se encontraron piezas{searchQuery ? ` para "${searchQuery}"` : ''}.</p>
                                    {searchQuery ? null : (
                                        <button onClick={handleRetry} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                                            Recargar
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="product-grid" style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s' }}>
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

                            {/* Numbered Pagination Controls */}
                            {totalPages > 1 && renderPagination()}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
