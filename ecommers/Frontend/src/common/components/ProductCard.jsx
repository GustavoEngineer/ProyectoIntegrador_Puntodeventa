import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../components/layout/body/main/context/AuthContext';
import { useCart } from '../../components/layout/Header/usersections/shopping-cart/context/CartContext';
import Button from './Button';
import StarRating from './StarRating';
import './ProductCard.css';

const ProductCard = ({ product, onViewDetails, onRequireLogin }) => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    const {
        Id_Pieza,
        Nombre,
        Precio,
        Cantidad,
        ImagenUrl,
        Calificacionpromedio,
    } = product;

    const isValidUrl = (url) => {
        return url && (url.startsWith('http') || url.startsWith('/'));
    };

    const imageUrl = isValidUrl(ImagenUrl) ? ImagenUrl : 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=500&q=80';

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        alert(`${Nombre} agregado al carrito`);
    };

    return (
        <div className="card-container" onClick={onViewDetails} style={{ cursor: 'pointer' }}>
            <div className="card-image-wrap">
                <img src={imageUrl} alt={Nombre} className="card-image" loading="lazy" />
            </div>

            <div className="card-info">
                <h3 className="card-title" title={Nombre}>{Nombre}</h3>

                <div style={{ marginBottom: '2px' }}>
                    <StarRating rating={Calificacionpromedio} />
                </div>

                <div className="card-footer">
                    <div className="card-price-block">
                        <span className="card-price-value">${Precio ? parseFloat(Precio).toFixed(2) : '0.00'}</span>
                    </div>
                    <button
                        className="card-add-btn"
                        onClick={handleAddToCart}
                        title="Añadir al carrito"
                    >
                        Añadir
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
        Garantia: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        ImagenUrl: PropTypes.string,
        Categoria: PropTypes.string,
        Estado: PropTypes.string,
        Tipo: PropTypes.string,
    }).isRequired,
    onViewDetails: PropTypes.func,
};

export default ProductCard;
