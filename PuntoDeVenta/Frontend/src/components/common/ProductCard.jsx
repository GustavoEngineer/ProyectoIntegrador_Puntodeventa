import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { title, price, image, category } = product;

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={image} alt={title} className="product-image" loading="lazy" />
                <span className="product-category">{category}</span>
            </div>
            <div className="product-info">
                <h3 className="product-title" title={title}>{title}</h3>
                <div className="product-footer">
                    <span className="product-price">${price.toFixed(2)}</span>
                    <Button variant="primary" className="add-btn">
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        category: PropTypes.string,
    }).isRequired,
};

export default ProductCard;
