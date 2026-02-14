import React from 'react';
import './CatalogButton.css';

const CatalogButton = () => {
    const scrollToCatalog = () => {
        document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <button className="catalog-intro-button" onClick={scrollToCatalog}>
            Ver Catálogo
        </button>
    );
};

export default CatalogButton;
