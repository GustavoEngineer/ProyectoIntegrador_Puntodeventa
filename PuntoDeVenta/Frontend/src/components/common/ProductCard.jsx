import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import Button from './Button';
import './ProductCard.css';

const ProductCard = ({ product, onViewDetails }) => {
    const { addToCart } = useCart();

    const {
        Id_Pieza,
        Nombre,
        Precio,
        Cantidad,
        ImagenUrl,
    } = product;

    const imageUrl = ImagenUrl || 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=500&q=80';

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        alert(`${Nombre} agregado al carrito`);
    };

    return (
        <div className="card-container" onClick={onViewDetails} style={{ cursor: 'pointer' }}>
            <div className="card-image-wrap">
                <img src={imageUrl} alt={Nombre} className="card-image" loading="lazy" />
                <button className="card-wishlist-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>

            <div className="card-info">
                <h3 className="card-title" title={Nombre}>{Nombre}</h3>

                <div className="card-footer">
                    <div className="card-price-block">
                        <span className="card-price-label">Price :</span>
                        <span className="card-price-value">${Precio ? parseFloat(Precio).toFixed(2) : '0.00'}</span>
                    </div>

                    <button
                        className="card-add-btn"
                        disabled={!Cantidad || Cantidad === 0}
                        onClick={handleAddToCart}
                        title={Cantidad > 0 ? "Agregar al carrito" : "Agotado"}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        Id_Pieza: PropTypes.number.isRequired,
        Nombre: PropTypes.string.isRequired,
        Descripcion: PropTypes.string,
        Precio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        Cantidad: PropTypes.number,
        Garantia: PropTypes.string,
        ImagenUrl: PropTypes.string,
        Categoria: PropTypes.string,
        Estado: PropTypes.string,
        Tipo: PropTypes.string,
    }).isRequired,
    onViewDetails: PropTypes.func,
};

export default ProductCard;
