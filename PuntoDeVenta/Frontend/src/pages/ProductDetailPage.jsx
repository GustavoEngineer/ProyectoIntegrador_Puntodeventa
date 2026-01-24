import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { apiCall } from '../utils/api';
import './ProductDetailPage.css';

const ProductDetailPage = ({ productId, onBack, onRequireLogin }) => {
    const [pieza, setPieza] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const [activeTab, setActiveTab] = useState('details');
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        fetchPieza();
    }, [productId]);

    const fetchPieza = async () => {
        try {
            setLoading(true);
            const data = await apiCall(`/piezas/${productId}`);
            setPieza(data);
        } catch (err) {
            console.error('Error fetching pieza:', err);
        } finally {
            setLoading(false);
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
        if (!isAuthenticated) {
            onRequireLogin();
            return;
        }
        alert('Funcionalidad de lista de deseos próximamente');
    };

    if (loading) return <div className="product-detail-loading">Cargando...</div>;
    if (!pieza) return <div className="product-detail-error">No encontrado <button onClick={onBack}>Volver</button></div>;

    const imageUrl = pieza.ImagenUrl || 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=500&q=80';
    const totalPrice = (parseFloat(pieza.Precio) * cantidad).toFixed(2);

    return (
        <div className="product-detail-wrapper">
            <div className="product-content-upper">
                <div className="product-layout">
                    {/* Left Column: Image */}
                    <div className="product-gallery">
                        <div className="main-image-container">
                            <img src={imageUrl} alt={pieza.Nombre} className="main-image" />
                            <div className="gallery-dots">
                                <span className="dot active"></span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Info */}
                    <div className="product-info-panel">
                        <div className="product-header">
                            <span className="category-label">{pieza.Categoria || 'MEDICAL'}</span>
                            <div className="title-row">
                                <div className="title-group">
                                    <h1 className="product-title">{pieza.Nombre}</h1>
                                    <button className="wishlist-icon-btn" onClick={handleWishlist} aria-label="Add to wishlist">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>
                                {/* Static Stars */}
                                <div className="product-rating">
                                    ★★★★★ <span style={{ color: '#6b7280', fontSize: '1rem', marginLeft: '0.25rem' }}>5.0</span>
                                </div>
                            </div>

                            <div className="price-row">
                                <span className="product-price">${parseFloat(pieza.Precio).toFixed(2)}</span>
                            </div>

                            {/* Details Middle Section */}
                            <div className="product-description-middle">
                                <ul className="details-list">
                                    <li><strong>Estado:</strong> {pieza.Estado}</li>
                                    <li><strong>Tipo:</strong> {pieza.Tipo}</li>
                                    <li><strong>Garantía:</strong> {pieza.Garantia} meses</li>
                                    <li><strong>Vendor:</strong> Equipos Médicos S.A.</li>
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="action-buttons">
                                <button
                                    className="buy-now-btn"
                                    onClick={() => handleAddToCart()}
                                    disabled={pieza.Cantidad === 0}
                                >
                                    BUY IT NOW
                                </button>
                                <button
                                    className="add-to-cart-btn"
                                    onClick={handleAddToCart}
                                    disabled={pieza.Cantidad === 0}
                                >
                                    {pieza.Cantidad === 0 ? 'AGOTADO' : 'ADD TO CART'}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Description Bottom Section - Full Width Below Image */}
            <div className="product-description-bottom">
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
            </div>
        </div>
    );
};

export default ProductDetailPage;
