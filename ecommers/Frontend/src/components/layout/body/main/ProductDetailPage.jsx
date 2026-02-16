import React, { useState, useEffect } from 'react';
import { useCart } from '../../Header/usersections/shopping-cart/context/CartContext';
import { useAuth } from './context/AuthContext';
import { useFavorites } from '../../Header/usersections/favorites/context/FavoritesContext';
import { apiCall } from '@/services/api';
import StarRating from '@/common/components/StarRating';
import ReviewsSection from '@/common/components/ReviewsSection';
import Breadcrumbs from '@/common/components/Breadcrumbs';
import { useBreadcrumbs } from './context/BreadcrumbContext';
import ProductCard from '@/common/components/ProductCard';
import './ProductDetailPage.css';

const ProductDetailPage = ({ productId, onBack, onViewProduct, onRequireLogin }) => {
    const [pieza, setPieza] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const [activeTab, setActiveTab] = useState('details');
    const [atributos, setAtributos] = useState([]);
    const [equiposCompatibles, setEquiposCompatibles] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { addToCart } = useCart();
    const { isAuthenticated, user } = useAuth();
    const { isFavorite, toggleFavorite } = useFavorites();
    const { breadcrumbs, pushBreadcrumb, handleBreadcrumbClick } = useBreadcrumbs();
    const [userRating, setUserRating] = useState(0);
    const [isSubmittingRating, setIsSubmittingRating] = useState(false);

    useEffect(() => {
        fetchPieza();
        fetchAtributos();
        fetchEquiposCompatibles();
    }, [productId]);

    const fetchPieza = async () => {
        try {
            setLoading(true);
            const data = await apiCall(`/piezas/${productId}`);
            setPieza(data);
            pushBreadcrumb({ label: data.Nombre, type: 'product', id: data.Id_Pieza });

            // Fetch related products based on category
            if (data.Id_CategoriaPieza) {
                fetchRelatedProducts(data.Id_CategoriaPieza);
            }
        } catch (err) {
            console.error('Error fetching pieza:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async (categoryId) => {
        try {
            // Fetch products from the same category
            // Fetch all (limit 100) to allow scrolling through remaining items
            const response = await apiCall(`/piezas?category=${categoryId}&limit=100`);

            // Filter out the current product and ensure we have an array
            const products = response.data || [];
            const filtered = products.filter(p => p.Id_Pieza !== parseInt(productId));
            setRelatedProducts(filtered);
        } catch (err) {
            console.error('Error fetching related products:', err);
        }
    };

    const fetchAtributos = async () => {
        try {
            console.log(`Fetching attributes for product ${productId}...`);
            const data = await apiCall(`/valor-atributo/pieza/${productId}`);
            console.log('Attributes received:', data);
            setAtributos(data);
        } catch (err) {
            console.error('Error fetching atributos:', err);
        }
    };

    const fetchEquiposCompatibles = async () => {
        try {
            const data = await apiCall(`/pieza-equipo/pieza/${productId}`);
            setEquiposCompatibles(data);
        } catch (err) {
            console.error('Error fetching equipos compatibles:', err);
        }
    };

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            onRequireLogin();
            return;
        }

        if (pieza && cantidad > 0) {
            addToCart(pieza, cantidad);
            alert(`${cantidad} unidad(es) agregadas al carrito`);
        }
    };

    const handleWishlist = () => {
        console.log('handleWishlist clicked. Auth:', isAuthenticated, 'Pieza:', pieza);
        if (!isAuthenticated) {
            console.log('User not authenticated, showing login requirement');
            onRequireLogin();
            return;
        }
        console.log('Toggling favorite for:', pieza);
        toggleFavorite(pieza);

    };

    const handleRatingChange = async (newRating) => {
        if (!isAuthenticated) {
            onRequireLogin();
            return;
        }

        setIsSubmittingRating(true);
        try {
            // Check if user already reviewed this product (optional optimization, but good practice)
            // Ideally backend handles upsert. 
            // We'll trust backend to handle it or return success for update.

            await apiCall('/resenas', { // Assuming endpoint for reviews
                method: 'POST',
                body: JSON.stringify({
                    Id_Usuario: user.id,
                    Id_Pieza: pieza.Id_Pieza,
                    Calificacion: newRating,
                    Comentario: '' // Start with empty comment for star-only rating
                })
            });

            setUserRating(newRating);
            // Re-fetch product to get updated average if backend updates it synchronously
            // or just rely on local state for user feedback for now.
            fetchPieza();
            alert('¡Gracias por tu calificación!');

        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Error al guardar la calificación. Intenta de nuevo.');
        } finally {
            setIsSubmittingRating(false);
        }
    };

    if (loading) {
        return (
            <div className="product-detail-page">
                <div className="product-breadcrumbs">
                    <Breadcrumbs
                        items={breadcrumbs.map((item, index) => ({
                            label: item.label,
                            action: () => handleBreadcrumbClick(item),
                            active: index === breadcrumbs.length - 1
                        }))}
                    />
                </div>
                <div className="product-detail-wrapper">
                    <div className="product-content-upper">
                        <div className="product-layout">
                            {/* Skeleton Left: Image */}
                            <div className="product-gallery">
                                <div className="main-image-container" style={{ backgroundColor: '#f3f4f6' }}>
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                            <polyline points="21 15 16 10 5 21"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Skeleton Right: Info */}
                            <div className="product-info-panel">
                                <div className="skeleton-line" style={{ width: '30%', height: '1rem', backgroundColor: '#e5e7eb', marginBottom: '1rem', borderRadius: '4px' }}></div>
                                <div className="skeleton-line" style={{ width: '80%', height: '3rem', backgroundColor: '#e5e7eb', marginBottom: '1rem', borderRadius: '4px' }}></div>
                                <div className="skeleton-line" style={{ width: '40%', height: '1.5rem', backgroundColor: '#e5e7eb', marginBottom: '2rem', borderRadius: '4px' }}></div>
                                <div className="skeleton-line" style={{ width: '100%', height: '1px', backgroundColor: '#e5e7eb', marginBottom: '2rem' }}></div>
                                <div className="skeleton-line" style={{ width: '100%', height: '1rem', backgroundColor: '#e5e7eb', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
                                <div className="skeleton-line" style={{ width: '90%', height: '1rem', backgroundColor: '#e5e7eb', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
                                <div className="skeleton-line" style={{ width: '95%', height: '1rem', backgroundColor: '#e5e7eb', marginBottom: '2rem', borderRadius: '4px' }}></div>
                                <div className="skeleton-line" style={{ width: '50%', height: '3rem', backgroundColor: '#e5e7eb', borderRadius: '2rem' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (!pieza) return <div className="product-detail-error">No encontrado <button onClick={onBack}>Volver</button></div>;

    const isValidUrl = (url) => {
        try {
            return url && (url.startsWith('http') || url.startsWith('/'));
        } catch (e) {
            return false;
        }
    };
    const imageUrl = isValidUrl(pieza.ImagenUrl) ? pieza.ImagenUrl : 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=500&q=80';

    return (
        <div className="product-detail-page">
            <div className="product-breadcrumbs">
                <button onClick={onBack} className="back-nav-button">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Volver
                </button>
                <Breadcrumbs
                    items={breadcrumbs.map((item, index) => ({
                        label: item.label,
                        action: () => handleBreadcrumbClick(item),
                        active: index === breadcrumbs.length - 1
                    }))}
                />
            </div>
            <div className="product-detail-wrapper fade-in">
                <div className="product-content-upper">
                    <div className="product-layout">
                        {/* Left Column: Image */}
                        <div className="product-gallery">
                            <div className="main-image-container">
                                <img
                                    src={imageUrl}
                                    alt={pieza.Nombre}
                                    className="main-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=500&q=80';
                                    }}
                                />
                                <div className="gallery-dots">
                                    <span className="dot active"></span>
                                </div>
                            </div>

                            {/* Reviews Section - Below Image */}
                            <div style={{ width: '100%', marginTop: '3rem', maxWidth: '450px' }}>
                                <ReviewsSection productId={productId} />
                            </div>
                        </div>

                        {/* Right Column: Info */}
                        <div className="product-info-panel">
                            <div className="product-header">
                                <div className="title-row">
                                    <div className="title-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        {pieza.Categoria && (
                                            <span style={{
                                                fontSize: '0.8rem',
                                                color: '#9ca3af',
                                                marginBottom: '0.25rem',
                                                fontWeight: '600',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            }}>
                                                {pieza.Categoria}
                                            </span>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <h1 className="product-title" style={{ margin: 0 }}>{pieza.Nombre}</h1>
                                            <button className="wishlist-icon-btn" onClick={handleWishlist} aria-label="Add to wishlist" style={{ display: 'flex' }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill={pieza && isFavorite(pieza.Id_Pieza) ? "#ef4444" : "none"}
                                                    stroke={pieza && isFavorite(pieza.Id_Pieza) ? "#ef4444" : "currentColor"}
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Dynamic Star Rating */}
                                    <div className="product-rating">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <StarRating
                                                    rating={userRating || pieza.CalificacionPromedio} // Show user rating if available, else average
                                                    onRatingChange={handleRatingChange}
                                                    readOnly={false}
                                                />
                                                <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                                                    ({pieza.CalificacionPromedio ? parseFloat(pieza.CalificacionPromedio).toFixed(1) : 'No rated'})
                                                </span>
                                            </div>
                                            {!isAuthenticated && (
                                                <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>Inicia sesión para calificar</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="price-row">
                                    <span className="product-price">${parseFloat(pieza.Precio).toFixed(2)}</span>
                                </div>

                                {/* Details Middle Section */}
                                <div className="product-description-middle">
                                    <ul className="details-list">
                                        <li>
                                            <strong>Equipo Compatible:</strong>{' '}
                                            {equiposCompatibles.length > 0
                                                ? equiposCompatibles.map(e => e.NombreEquipo).join(', ')
                                                : 'N/A'}
                                        </li>
                                        <li><strong>Cantidad:</strong> {pieza.Cantidad} unidades</li>
                                        <li><strong>Tipo de pieza:</strong> {pieza.Tipo}</li>
                                        <li><strong>Estado de pieza:</strong> {pieza.Estado}</li>
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="action-buttons">
                                    {/* Add to Cart Button */}
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={handleAddToCart}
                                        disabled={pieza.Cantidad === 0}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                            <circle cx="9" cy="21" r="1"></circle>
                                            <circle cx="20" cy="21" r="1"></circle>
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                        </svg>
                                        {pieza.Cantidad === 0 ? 'AGOTADO' : 'Añadir al carrito'}
                                    </button>
                                </div>

                                {/* Description Section - Below Add to Cart */}
                                <div className="product-description-bottom" style={{ marginTop: '3rem', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
                                    <span className="description-label">DESCRIPTION</span>
                                    <div className="description-content">
                                        <p style={{ marginBottom: '1rem' }}>
                                            {pieza.Descripcion || "Sin descripción disponible para esta pieza."}
                                        </p>
                                        <p>
                                            Esta pieza proviene de excedentes de mantenimiento biomédico, garantizando funcionalidad y calidad original.
                                            Ideal para reparaciones o proyectos académicos.
                                        </p>
                                    </div>



                                    <div className="general-table-container" style={{ marginTop: '2rem' }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Información Adicional</h3>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                            <tbody>
                                                {atributos && atributos.length > 0 ? (
                                                    atributos.map((attr, index) => (
                                                        <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                                            <td style={{ padding: '0.75rem 0', color: '#6b7280', fontWeight: '500', width: '40%' }}>
                                                                {attr.NombreAtributo || 'Atributo'}
                                                            </td>
                                                            <td style={{ padding: '0.75rem 0', color: '#111827' }}>
                                                                {attr.Valor}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="2" style={{ padding: '0.75rem 0', color: '#9ca3af', fontStyle: 'italic', textAlign: 'center' }}>
                                                            No hay información adicional disponible.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="related-products-section" style={{ marginTop: '4rem', paddingBottom: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1.5rem' }}>Sigue explorando</h2>
                        <div style={{
                            display: 'flex',
                            overflowX: 'auto',
                            gap: '1.5rem',
                            paddingBottom: '1rem',
                            scrollBehavior: 'smooth',
                            WebkitOverflowScrolling: 'touch'
                        }}>
                            {relatedProducts.map(product => (
                                <div key={product.Id_Pieza} style={{ minWidth: '240px', maxWidth: '240px' }}>
                                    <ProductCard
                                        product={product}
                                        onViewDetails={() => {
                                            window.scrollTo(0, 0);
                                            if (onViewProduct) onViewProduct(product.Id_Pieza);
                                        }}
                                        onRequireLogin={onRequireLogin}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default ProductDetailPage;
