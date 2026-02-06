import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import './FilterSidebar.css';

const FilterSidebar = ({ selectedCategory, onSelectCategory }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Endpoint real del backend que verificamos anteriormente
                const data = await apiCall('/categorias-pieza');
                // Si el backend devuelve array directo o data envuelta, asegurar array
                const categoriesArray = Array.isArray(data) ? data : (data.data || []);
                setCategories(categoriesArray);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Helper para saber si una categoría es la activa
    const isActive = (cat) => {
        // Manejar caso donde selectedCategory es ID o Objeto
        const selectedId = (selectedCategory && typeof selectedCategory === 'object')
            ? selectedCategory.Id_CategoriaPieza
            : selectedCategory;
        return selectedId === cat.Id_CategoriaPieza;
    };

    return (
        <div className="filter-sidebar-container">
            {/* Zona invisible para detectar el mouse */}
            <div className="sidebar-hotspot" />

            {/* Panel visible (glassmorphism) */}
            <div className="sidebar-panel">
                <div className="sidebar-header">
                    <h2>Categorías</h2>
                    <p>Filtra piezas médicas</p>
                </div>

                <div className="sidebar-content">
                    {loading ? (
                        <div className="sidebar-loading">
                            <div className="spinner-mini" />
                            <p>Cargando filtros...</p>
                        </div>
                    ) : (
                        <ul className="category-list">
                            <li className="category-item">
                                <button
                                    className={`category-button ${!selectedCategory ? 'active' : ''}`}
                                    onClick={() => onSelectCategory(null)}
                                >
                                    <span>Todo el catálogo</span>
                                </button>
                            </li>
                            {categories.map((cat) => (
                                <li key={cat.Id_CategoriaPieza} className="category-item">
                                    <button
                                        className={`category-button ${isActive(cat) ? 'active' : ''}`}
                                        onClick={() => onSelectCategory(cat)}
                                    >
                                        <span>{cat.Descripcion}</span>
                                        {/* Futuro: Mostrar conteo si el backend lo soporta */}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
