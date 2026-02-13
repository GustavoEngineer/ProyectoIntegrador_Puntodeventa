import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import './FilterSidebar.css';

const FilterSidebar = ({ selectedCategory, onSelectCategory, selectedEquipo, onSelectEquipo }) => {
    const [categories, setCategories] = useState([]);
    const [equipos, setEquipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Categories and Equipos in parallel
                const [catsData, equiposData] = await Promise.all([
                    apiCall('/categorias-pieza'),
                    apiCall('/equipos-compatibles')
                ]);

                // Ensure arrays
                const categoriesArray = Array.isArray(catsData) ? catsData : (catsData.data || []);
                const equiposArray = Array.isArray(equiposData) ? equiposData : (equiposData.data || []);

                setCategories(categoriesArray);
                setEquipos(equiposArray);
            } catch (error) {
                console.error('Error fetching filters:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper para saber si una categoría es la activa
    const isActiveCategory = (cat) => {
        const selectedId = (selectedCategory && typeof selectedCategory === 'object')
            ? selectedCategory.Id_CategoriaPieza
            : selectedCategory;
        return selectedId === cat.Id_CategoriaPieza;
    };

    // Helper for active equipment
    const isActiveEquipo = (eq) => {
        const selectedId = (selectedEquipo && typeof selectedEquipo === 'object')
            ? selectedEquipo.Id_EquipoCompatible
            : selectedEquipo;
        return selectedId === eq.Id_EquipoCompatible;
    };

    return (
        <div className="filter-sidebar-container">
            {/* Zona invisible para detectar el mouse */}
            <div className="sidebar-hotspot" />

            {/* Panel visible (glassmorphism) */}
            <div className="sidebar-panel">
                <div className="sidebar-header">
                    <h2>Filtros</h2>
                    <p>Encuentra tu pieza ideal</p>
                </div>

                <div className="sidebar-content">
                    {loading ? (
                        <div className="sidebar-loading">
                            <div className="spinner-mini" />
                            <p>Cargando filtros...</p>
                        </div>
                    ) : (
                        <>
                            {/* Categories Section */}
                            <div className="filter-section">
                                <h3 className="filter-title">Categorías</h3>
                                <ul className="category-list">
                                    <li className="category-item">
                                        <button
                                            className={`category-button ${!selectedCategory ? 'active' : ''}`}
                                            onClick={() => onSelectCategory(null)}
                                        >
                                            <span>Todas las categorías</span>
                                        </button>
                                    </li>
                                    {categories.map((cat) => (
                                        <li key={cat.Id_CategoriaPieza} className="category-item">
                                            <button
                                                className={`category-button ${isActiveCategory(cat) ? 'active' : ''}`}
                                                onClick={() => onSelectCategory(cat)}
                                            >
                                                <span>{cat.Descripcion}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Divider */}
                            <div className="sidebar-divider" />

                            {/* Equipos Section */}
                            <div className="filter-section">
                                <h3 className="filter-title">Equipos Compatibles</h3>
                                <ul className="category-list">
                                    <li className="category-item">
                                        <button
                                            className={`category-button ${!selectedEquipo ? 'active' : ''}`}
                                            onClick={() => onSelectEquipo && onSelectEquipo(null)}
                                        >
                                            <span>Todos los equipos</span>
                                        </button>
                                    </li>
                                    {equipos.map((eq) => (
                                        <li key={eq.Id_EquipoCompatible} className="category-item">
                                            <button
                                                className={`category-button ${isActiveEquipo(eq) ? 'active' : ''}`}
                                                onClick={() => onSelectEquipo && onSelectEquipo(eq)}
                                            >
                                                <span>{eq.Nombre}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
