import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';
import './ProductDetailPage.css';

const API_URL = 'http://localhost:3000/api';

const ProductDetailPage = ({ productId, onBack }) => {
    const [pieza, setPieza] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchPieza();
    }, [productId]);

    const fetchPieza = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/piezas/${productId}`);
            if (!response.ok) throw new Error('Error al cargar la pieza');
            const data = await response.json();
            setPieza(data);
        } catch (err) {
            console.error('Error fetching pieza:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (pieza && cantidad > 0) {
            addToCart(pieza, cantidad);
            alert(`${cantidad} unidad(es) agregadas al carrito`);
        }
    };

    const handleCantidadChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= pieza.Cantidad) {
            setCantidad(value);
        }
    };

    if (loading) {
        return (
            <div className="product-detail-loading">
                <p>Cargando detalles de la pieza...</p>
            </div>
        );
    }

    if (!pieza) {
        return (
            <div className="product-detail-error">
                <p>No se pudo cargar la información de la pieza.</p>
                <Button onClick={onBack}>Volver al catálogo</Button>
            </div>
        );
    }

    const imageUrl = pieza.ImagenUrl || 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=500&q=80';

    return (
        <div className="product-detail-page">
            <div className="product-detail-header">
                <Button variant="outline" onClick={onBack} className="back-btn">
                    ← Volver al catálogo
                </Button>
            </div>

            <div className="product-detail-container">
                <div className="product-detail-image">
                    <img src={imageUrl} alt={pieza.Nombre} />
                    {pieza.Cantidad > 0 && pieza.Cantidad <= 5 && (
                        <span className="stock-badge warning">¡Últimas {pieza.Cantidad} unidades!</span>
                    )}
                    {pieza.Cantidad === 0 && (
                        <span className="stock-badge sold-out">Agotado</span>
                    )}
                </div>

                <div className="product-detail-info">
                    <div className="product-detail-category">
                        {pieza.Categoria}
                    </div>

                    <h1 className="product-detail-title">{pieza.Nombre}</h1>

                    {pieza.Descripcion && (
                        <p className="product-detail-description">{pieza.Descripcion}</p>
                    )}

                    <div className="product-detail-specs">
                        <div className="spec-item">
                            <span className="spec-label">Estado:</span>
                            <span className="spec-value">{pieza.Estado}</span>
                        </div>
                        {pieza.Tipo && (
                            <div className="spec-item">
                                <span className="spec-label">Tipo:</span>
                                <span className="spec-value">{pieza.Tipo}</span>
                            </div>
                        )}
                        {pieza.Garantia && (
                            <div className="spec-item">
                                <span className="spec-label">Garantía:</span>
                                <span className="spec-value">{pieza.Garantia} meses</span>
                            </div>
                        )}
                        <div className="spec-item">
                            <span className="spec-label">Disponibilidad:</span>
                            <span className="spec-value">{pieza.Cantidad} unidades en stock</span>
                        </div>
                    </div>

                    <div className="product-detail-price">
                        <span className="price-label">Precio:</span>
                        <span className="price-value">${parseFloat(pieza.Precio).toFixed(2)}</span>
                    </div>

                    <div className="product-detail-actions">
                        <div className="quantity-selector">
                            <label htmlFor="cantidad">Cantidad:</label>
                            <div className="quantity-input-group">
                                <button 
                                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                                    disabled={cantidad <= 1}
                                    className="quantity-btn"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    id="cantidad"
                                    value={cantidad}
                                    onChange={handleCantidadChange}
                                    min="1"
                                    max={pieza.Cantidad}
                                    disabled={pieza.Cantidad === 0}
                                />
                                <button 
                                    onClick={() => setCantidad(Math.min(pieza.Cantidad, cantidad + 1))}
                                    disabled={cantidad >= pieza.Cantidad}
                                    className="quantity-btn"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <Button
                            variant="primary"
                            onClick={handleAddToCart}
                            disabled={pieza.Cantidad === 0}
                            className="add-to-cart-btn-large"
                        >
                            {pieza.Cantidad === 0 ? 'Agotado' : `Agregar al carrito - $${(parseFloat(pieza.Precio) * cantidad).toFixed(2)}`}
                        </Button>
                    </div>

                    <div className="product-detail-notice">
                        <p>💡 <strong>Nota:</strong> Esta pieza proviene de ingenieros de mantenimiento biomédico que adquieren paquetes completos y revenden sus excedentes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
