import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import Button from './Button';
import './ProductCard.css';

const ProductCard = ({ product, onViewDetails }) => {
    const { addToCart } = useCart();

    // Adaptar al modelo de Pieza del backend
    const {
        Id_Pieza,
        Nombre,
        Descripcion,
        Precio,
        Cantidad,
        Garantia,
        ImagenUrl,
        Categoria,
        Estado,
        Tipo
    } = product;

    // Imagen placeholder para piezas médicas si no hay imagen
    const imageUrl = ImagenUrl || 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=500&q=80';

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product);
        alert(`${Nombre} agregado al carrito`);
    };

    return (
        <div className="product-card" onClick={onViewDetails} style={{ cursor: 'pointer' }}>
            <div className="product-image-container">
                <img src={imageUrl} alt={Nombre} className="product-image" loading="lazy" />
                {Categoria && <span className="product-category">{Categoria}</span>}
                {Cantidad > 0 && Cantidad <= 5 && (
                    <span className="product-stock-warning">Últimas {Cantidad} unidades</span>
                )}
            </div>
            <div className="product-info">
                <h3 className="product-title" title={Nombre}>{Nombre}</h3>
                {Descripcion && (
                    <p className="product-description">{Descripcion}</p>
                )}
                <div className="product-details">
                    {Estado && <span className="product-badge">Estado: {Estado}</span>}
                    {Tipo && <span className="product-badge">{Tipo}</span>}
                    {Garantia && <span className="product-badge">Garantía: {Garantia}</span>}
                </div>
                <div className="product-footer">
                    <div className="product-price-container">
                        <span className="product-price">${Precio ? parseFloat(Precio).toFixed(2) : '0.00'}</span>
                        <span className="product-stock">Stock: {Cantidad || 0}</span>
                    </div>
                    <Button 
                        variant="primary" 
                        className="add-btn"
                        disabled={!Cantidad || Cantidad === 0}
                        onClick={handleAddToCart}
                    >
                        {Cantidad > 0 ? 'Agregar' : 'Agotado'}
                    </Button>
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
