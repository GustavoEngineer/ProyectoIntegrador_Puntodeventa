import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import './CategorySidebar.css';

const CategorySidebar = ({ selectedCategory, onSelectCategory, products = [] }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await apiCall('/categorias-pieza');
                // Ensure data is array
                setCategories(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Error cargando categorías');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Filter categories that have at least one product
    const activeCategories = loading
        ? []
        : categories.filter(category =>
            // If passed products is empty array (initial load), maybe don't filter rigorously yet?
            // But requirement is strictly "only categories with at least one piece".
            // So if products is empty, no categories shown (except maybe 'All').
            products.some(p => p.Id_CategoriaPieza === category.Id_CategoriaPieza)
        );

    // Fallback: If products are loading or empty initially, activeCategories might be empty.
    // If we want to show all initially, we'd need a 'productsLoaded' flag.
    // Assuming products are passed updated.

    if (loading) return <div className="sidebar-loading">Cargando...</div>;
    // Don't block on error, just show empty
    // if (error) return <div className="sidebar-error">Error</div>;

    return (
        <aside className="category-sidebar">
            <h3 className="sidebar-title">Category</h3>
            <ul className="category-list">
                <li
                    className={`category-item ${!selectedCategory ? 'active' : ''}`}
                    onClick={() => onSelectCategory(null)}
                >
                    Todas las piezas
                </li>
                {activeCategories.map(category => (
                    <li
                        key={category.Id_CategoriaPieza}
                        className={`category-item ${selectedCategory === category.Id_CategoriaPieza ? 'active' : ''}`}
                        onClick={() => onSelectCategory(category.Id_CategoriaPieza)}
                    >
                        {category.Descripcion || category.Nombre}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default CategorySidebar;
