import React, { useState, useEffect } from 'react';
import { useBreadcrumbs } from '../context/BreadcrumbContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import './CategoriesPage.css';

const API_URL = 'http://localhost:3000/api';

const CategoriesPage = ({ onSelectCategory }) => {
    const { breadcrumbs, pushBreadcrumb, handleBreadcrumbClick } = useBreadcrumbs();
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        pushBreadcrumb({ label: 'Categorías', type: 'categories' });
    }, []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/categorias-pieza`);
            if (!response.ok) throw new Error('Error al cargar categorías');
            const data = await response.json();

            // Obtener cantidad de piezas por categoría
            const categoriasConConteo = await Promise.all(
                data.map(async (cat) => {
                    const piezasRes = await fetch(`${API_URL}/piezas`);
                    const piezas = await piezasRes.json();
                    const count = piezas.filter(p => p.Id_CategoriaPieza === cat.Id_CategoriaPieza).length;
                    return { ...cat, count };
                })
            );

            setCategorias(categoriasConConteo);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (categoria) => {
        onSelectCategory(categoria);
    };

    const getCategoryIcon = (nombre) => {
        if (nombre.includes('Rayos X') || nombre.includes('DR')) {
            return (
                <svg viewBox="0 0 64 64" fill="currentColor">
                    <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm0 42c-9.9 0-18-8.1-18-18s8.1-18 18-18 18 8.1 18 18-8.1 18-18 18z" />
                    <circle cx="32" cy="32" r="8" />
                </svg>
            );
        }
        if (nombre.includes('Tomografía') || nombre.includes('CT')) {
            return (
                <svg viewBox="0 0 64 64" fill="currentColor">
                    <path d="M52 12H12c-2.2 0-4 1.8-4 4v32c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4zM32 44c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z" />
                    <circle cx="32" cy="32" r="6" />
                </svg>
            );
        }
        if (nombre.includes('Resonancia') || nombre.includes('MRI')) {
            return (
                <svg viewBox="0 0 64 64" fill="currentColor">
                    <path d="M32 8c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm0 40c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z" />
                    <path d="M32 20c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
                </svg>
            );
        }
        if (nombre.includes('Ultrasonido')) {
            return (
                <svg viewBox="0 0 64 64" fill="currentColor">
                    <path d="M16 12h32v8H16zM12 24h40v28H12z" />
                    <circle cx="32" cy="38" r="8" />
                </svg>
            );
        }
        if (nombre.includes('Mastografía')) {
            return (
                <svg viewBox="0 0 64 64" fill="currentColor">
                    <path d="M48 8H16c-4.4 0-8 3.6-8 8v32c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V16c0-4.4-3.6-8-8-8zM32 46c-7.7 0-14-6.3-14-14s6.3-14 14-14 14 6.3 14 14-6.3 14-14 14z" />
                </svg>
            );
        }
        if (nombre.includes('Electrónicos')) {
            return (
                <svg viewBox="0 0 64 64" fill="currentColor">
                    <path d="M54 20H38V10c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v10H10c-1.1 0-2 .9-2 2v32c0 1.1.9 2 2 2h44c1.1 0 2-.9 2-2V22c0-1.1-.9-2-2-2zM32 44c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
                </svg>
            );
        }
        if (nombre.includes('Accesorios')) {
            return (
                <svg viewBox="0 0 64 64" fill="currentColor">
                    <path d="M54 24L40 10l-8 8-8-8L10 24l8 8-8 8 14 14 8-8 8 8 14-14-8-8z" />
                </svg>
            );
        }
        return (
            <svg viewBox="0 0 64 64" fill="currentColor">
                <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm8 36H24v-4h16v4zm0-8H24v-4h16v4zm0-8H24v-4h16v4z" />
            </svg>
        );
    };

    if (loading) {
        return (
            <div className="categories-page">
                <div className="loading">Cargando categorías...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="categories-page">
                <div className="error">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="categories-page">
            <div className="categories-breadcrumbs" style={{ marginTop: '1rem', marginBottom: '4rem', marginLeft: '8rem', textAlign: 'left' }}>
                <Breadcrumbs
                    items={breadcrumbs.map((item, index) => ({
                        label: item.label,
                        action: () => handleBreadcrumbClick(item),
                        active: index === breadcrumbs.length - 1
                    }))}
                />
            </div>
            <div className="categories-header">
                <h1>Categorías de Piezas</h1>
                <p>Encuentra piezas por tipo de equipo médico</p>
            </div>

            <div className="categories-grid">
                {categorias.map((categoria) => (
                    <div
                        key={categoria.Id_CategoriaPieza}
                        className="category-card"
                        onClick={() => handleCategoryClick(categoria)}
                    >
                        <div className="category-icon">
                            {getCategoryIcon(categoria.Descripcion)}
                        </div>
                        <h3 className="category-name">{categoria.Descripcion}</h3>
                        <p className="category-count">
                            {categoria.count} {categoria.count === 1 ? 'pieza' : 'piezas'} disponibles
                        </p>
                        <button className="category-btn">Ver piezas</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;
