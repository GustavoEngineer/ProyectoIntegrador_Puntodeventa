import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { apiCall } from '../utils/api';
import './ProductDetailPage.css';

const ProductDetailPage = ({ productId, onBack, onRequireLogin }) => {
    const [pieza, setPieza] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
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
                        <h1 className="product-title">{pieza.Nombre}</h1>
                        <p className="vendor-name">Equipos Médicos S.A.</p>

                        <div className="price-rating-row">
                            <span className="product-price">${parseFloat(pieza.Precio).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="product-tabs">
                        <div className="tabs-header">
                            <button
                                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                                onClick={() => setActiveTab('description')}
                            >
                                DESCRIPTION
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                                onClick={() => setActiveTab('details')}
                            >
                                DETAILS
                            </button>
                        </div>
                        <div className="tab-content">
                            {activeTab === 'description' && (
                                <p className="description-text">
                                    {pieza.Descripcion || "Sin descripción disponible para esta pieza."}
                                    <br /><br />
                                    Esta pieza proviene de excedentes de mantenimiento biomédico, garantizando funcionalidad y calidad original.
                                </p>
                            )}
                            {activeTab === 'details' && (
                                <ul className="details-list">
                                    <li><strong>Estado:</strong> {pieza.Estado}</li>
                                    <li><strong>Tipo:</strong> {pieza.Tipo}</li>
                                    <li><strong>Garantía:</strong> {pieza.Garantia} meses</li>
                                    <li><strong>Stock:</strong> {pieza.Cantidad} unidades</li>
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Controls Row */}
                    <div className="product-controls">
                        <div className="control-group">
                            <label>QUANTITY</label>
                            <div className="quantity-pill">
                                <button
                                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                                    disabled={cantidad <= 1}
                                >-</button>
                                <span>{cantidad}</span>
                                <button
                                    onClick={() => setCantidad(Math.min(pieza.Cantidad, cantidad + 1))}
                                    disabled={cantidad >= pieza.Cantidad}
                                >+</button>
                            </div>
                        </div>

                        <div className="control-group total-group">
                            <label>TOTAL PRICE</label>
                            <span className="total-price-display">${totalPrice}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button className="wishlist-btn" onClick={handleWishlist}>
                            ADD TO MY WISHLIST
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
    );
};

export default ProductDetailPage;
