import React from 'react';
import './CatalogIntroduction.css';
import medicalDeviceImg from '../../../../assets/medicaldevice.jpeg';
import CatalogButton from './CatalogButton';

const CatalogIntroduction = () => {
    return (
        <div className="catalog-introduction-container">
            <div
                className="catalog-introduction-card"
                style={{ backgroundImage: `url(${medicalDeviceImg})` }}
            >
                <div className="catalog-introduction-overlay"></div>
                <div className="catalog-intro-content">
                    <h2>Bienvenido a MediParts</h2>
                    <p>Encuentra las mejores refacciones médicas para tus equipos.</p>
                    <CatalogButton />
                </div>
            </div>
        </div>
    );
};

export default CatalogIntroduction;
