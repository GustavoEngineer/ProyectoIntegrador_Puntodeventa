import React, { useState, useEffect, useRef } from 'react';
import { apiCall } from '@/services/api';
import ProductCard from '@/common/components/ProductCard';
import Breadcrumbs from '@/common/components/Breadcrumbs';
import { useBreadcrumbs } from '../main/context/BreadcrumbContext';
import './CatalogScreen.css';

const CatalogScreen = ({
    onViewProduct,
    selectedCategory,
    selectedEquipo,
    searchQuery,
    onRequireLogin
}) => {
    const [piezas, setPiezas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const LIMIT = 12; // Adjust limit as needed
    const catalogTopRef = useRef(null);
    const { breadcrumbs, resetBreadcrumbs, handleBreadcrumbClick, pushBreadcrumb } = useBreadcrumbs();

    // Breadcrumbs effect
    useEffect(() => {
        resetBreadcrumbs();
        pushBreadcrumb({ label: 'Página principal', type: 'home' });

        if (selectedCategory) {
            pushBreadcrumb({
                label: 'Catálogo',
                type: 'catalog',
                action: () => {
                    // If we are deep, clicking Catalog should probably reset filters?
                    // But for now, let standard behavior apply (which calls handleBackToCatalog in App.jsx)
                }
            });

            const catName = (typeof selectedCategory === 'object') ? (selectedCategory.Descripcion || selectedCategory.Nombre) : null;
            const catId = (typeof selectedCategory === 'object') ? selectedCategory.Id_CategoriaPieza : selectedCategory;

            if (catName) {
                pushBreadcrumb({ label: catName, type: 'category', id: catId });
            }
        } else {
            pushBreadcrumb({ label: 'Catálogo', type: 'catalog' });
        }
    }, [selectedCategory, selectedEquipo]); // Re-run when filters change

    // Fetch pieces effect
    useEffect(() => {
        fetchPiezas();
        // Reset to page 1 when filters change
        setCurrentPage(1);
    }, [selectedCategory, selectedEquipo, searchQuery]);

    // Fetch on page change
    useEffect(() => {
        fetchPiezas();
    }, [currentPage]);

    const fetchPiezas = async () => {
        try {
            setLoading(true);
            setError(null);

            const catId = (selectedCategory && typeof selectedCategory === 'object') ? selectedCategory.Id_CategoriaPieza : selectedCategory;
            const eqId = (selectedEquipo && typeof selectedEquipo === 'object') ? selectedEquipo.Id_EquipoCompatible : selectedEquipo;

            // Build query params
            const params = new URLSearchParams({
                page: currentPage,
                limit: LIMIT
            });
            if (catId) params.append('category', catId);
            if (eqId) params.append('equipo', eqId);
            if (searchQuery) params.append('search', searchQuery);

            const response = await apiCall(`/piezas?${params.toString()}`);

            let data = [];
            let fetchedTotalPages = 1;

            if (response && response.data) {
                data = response.data;
                fetchedTotalPages = response.meta.totalPages;
            } else if (Array.isArray(response)) {
                data = response;
            }

            setPiezas(data);
            setTotalPages(fetchedTotalPages);
        } catch (err) {
            console.error('Error fetching catalog:', err);
            setError('Error al cargar el catálogo.');
        } finally {
            setLoading(false);
            // Scroll to top if ref exists
            if (catalogTopRef.current && currentPage > 1) {
                catalogTopRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pages = [];
        // Simple pagination logic
        for (let i = 1; i <= totalPages; i++) {
            // Show first, last, current, and neighbors
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pages.push(i);
            }
        }

        // Add gaps... actually let's use a simpler approach for now or the one from CatalogPage
        // Reusing the simple map for now, but with gaps logic it's better. 
        // Let's just render all for small counts, or a simplified version.

        return (
            <div className="pagination-container">
                <button
                    className="pagination-arrow"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(num => num === 1 || num === totalPages || Math.abs(num - currentPage) <= 1)
                    .map((num, index, array) => {
                        const prev = array[index - 1];
                        return (
                            <React.Fragment key={num}>
                                {prev && num > prev + 1 && <span className="pagination-dots">...</span>}
                                <button
                                    className={`pagination-number ${num === currentPage ? 'active' : ''}`}
                                    onClick={() => handlePageChange(num)}
                                >
                                    {num}
                                </button>
                            </React.Fragment>
                        );
                    })}

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
        <div className="catalog-screen-container" ref={catalogTopRef}>
            <div className="breadcrumb-wrapper">
                <Breadcrumbs
                    items={breadcrumbs.map((item, index) => ({
                        label: item.label,
                        action: () => handleBreadcrumbClick(item),
                        active: index === breadcrumbs.length - 1
                    }))}
                />
            </div>
            {loading ? (
                <div className="catalog-loading">Cargando catálogo...</div>
            ) : error ? (
                <div className="catalog-error">{error}</div>
            ) : piezas.length === 0 ? (
                <div className="catalog-empty">No se encontraron productos.</div>
            ) : (
                <>
                    <div className="catalog-grid">
                        {piezas.map(pieza => (
                            <ProductCard
                                key={pieza.Id_Pieza}
                                product={pieza}
                                onViewDetails={() => onViewProduct(pieza.Id_Pieza)}
                                onRequireLogin={onRequireLogin}
                            />
                        ))}
                    </div>
                    {renderPagination()}
                </>
            )}
        </div>
    );
};

export default CatalogScreen;
