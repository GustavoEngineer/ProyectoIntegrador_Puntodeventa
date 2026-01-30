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
    const pageCache = useRef({});

    // Reset page to 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
        pageCache.current = {}; // Clear cache on filter change
    }, [selectedCategory, searchQuery]);

    // Fetch Piezas effect
    useEffect(() => {
        fetchPiezas(currentPage, selectedCategory, searchQuery);
    }, [currentPage, selectedCategory, searchQuery, retryCount]);

    const fetchPiezas = async (page, category, search) => {
        const cacheKey = `${page}-${category || ''}-${search || ''}`;

        // Check cache first
        if (pageCache.current[cacheKey]) {
            setPiezas(pageCache.current[cacheKey].data);
            setTotalPages(pageCache.current[cacheKey].totalPages);
            setFilteredPiezas(pageCache.current[cacheKey].data);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Build query params
            const params = new URLSearchParams({
                page: page,
                limit: LIMIT
            });
            if (category) params.append('category', category);
            if (search) params.append('search', search);

            // Fetch pieces with pagination
            let response = await apiCall(`/piezas?${params.toString()}`);
            let data = [];
            let fetchedTotalPages = 1;

            // Handle new response structure
            if (response && response.data) {
                data = response.data;
                fetchedTotalPages = response.meta.totalPages;
                setTotalPages(fetchedTotalPages);
            } else if (Array.isArray(response)) {
                data = response;
            } else {
                console.error('Unexpected API response:', response);
            }

            // Save to cache
            pageCache.current[cacheKey] = {
                data,
                totalPages: fetchedTotalPages
            };

            setPiezas(data);
            setFilteredPiezas(data);
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
        const targetPage = Number(page);
        console.log(`Changing page to: ${targetPage}, Current: ${currentPage}, Total: ${totalPages}`);
        if (targetPage >= 1 && targetPage <= totalPages && targetPage !== currentPage) {
            setCurrentPage(targetPage);
            // Scroll to top of catalog
            setTimeout(() => {
                catalogTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 0);
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
                    type="button"
                    className="pagination-arrow"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>

                {startPage > 1 && (
                    <>
                        <button type="button" className="pagination-number" onClick={() => handlePageChange(1)}>1</button>
                        {startPage > 2 && <span className="pagination-dots">...</span>}
                    </>
                )}

                {pageNumbers.map(num => (
                    <button
                        type="button"
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
                        <button type="button" className="pagination-number" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                    </>
                )}

                <button
                    type="button"
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
