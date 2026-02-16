import React, { useState, useEffect } from 'react';
import { apiCall } from '@/services/api';
import './NavigationMenu.css';

const NavigationMenu = ({ onSelectCategory, selectedCategory }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiCall('/categorias-pieza');
                const data = Array.isArray(response) ? response : (response.data || []);
                // Limit to show in a single line if too many? Or scroll. 
                // For now, take all.
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories for menu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return null; // Or a skeleton

    return (
        <div className="navigation-menu">
            <div className="navigation-container">
                <button
                    className={`nav-item all-departments ${!selectedCategory ? 'active' : ''}`}
                    onClick={() => onSelectCategory(null)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                    <span>Todas las Categorías</span>
                </button>

                <div className="nav-divider"></div>

                <div className="nav-categories">
                    {categories.map(cat => (
                        <button
                            key={cat.Id_CategoriaPieza}
                            className={`nav-item ${selectedCategory && (selectedCategory.Id_CategoriaPieza === cat.Id_CategoriaPieza || selectedCategory === cat.Id_CategoriaPieza) ? 'active' : ''}`}
                            onClick={() => onSelectCategory(cat)}
                        >
                            {cat.Descripcion}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavigationMenu;
