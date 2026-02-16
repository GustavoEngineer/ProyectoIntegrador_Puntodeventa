import React from 'react';
import './CatalogButton.css';

const CatalogButton = ({ onClick }) => {
    return (
        <button className="catalog-intro-button" onClick={onClick}>
            Ver Catálogo
        </button>
    );
};

export default CatalogButton;
