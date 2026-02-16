import { useState, useEffect } from 'react';
import { apiCall } from '@/services/api';
import './CategorySection.css';

console.log('CategorySection.jsx loaded');

// SVG Icons mapping
const categoryIcons = {
    'Radiología': (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" /><circle cx="12" cy="12" r="3" /><path d="M12 21v-3" /><path d="M12 3v3" /><path d="M3 12h3" /><path d="M21 12h-3" /></svg>
    ),
    'Quirúrgico': (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
    ),
    'Seguridad': (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
    ),
    'Monitoreo': (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
    ),
    'Laboratorio': (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31" /><path d="M14 2v7.31" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" /></svg>
    ),
    'Rehabilitación': (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></svg>
    ),
    'Consumibles': (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.06 13a6 6 0 1 0 5.46-3.88" /><path d="M15 9h6" /><path d="M21 9a3 3 0 0 1 0 6h-6" /><path d="M3 15h6" /><path d="M6 15a3 3 0 1 0 0 6 3 3 0 1 0 0-6" /></svg>
    ),
    'default': (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
    )
};

const CategorySection = ({ onSelectCategory }) => {
    console.log('--- CATEGORY SECTION MOUNTED ---');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiCall('/categorias-pieza');
                const data = Array.isArray(response) ? response : (response.data || []);
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategoryId(category.Id_CategoriaPieza);
        onSelectCategory(category);
    };

    const getIcon = (name) => {
        if (!name) return categoryIcons['default'];
        // Try exact match or partial match
        const key = Object.keys(categoryIcons).find(k => name.toLowerCase().includes(k.toLowerCase()));
        return categoryIcons[key] || categoryIcons['default'];
    };

    if (loading) return null;

    return (
        <div className="category-section">
            <h2 className="category-section-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="title-icon">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Categorías Especializadas
            </h2>
            <div className="category-carousel-container">
                <div className="category-carousel">
                    {categories.map((category) => (
                        <div
                            key={category.Id_CategoriaPieza}
                            className={`category-card ${selectedCategoryId === category.Id_CategoriaPieza ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                            tabIndex={0}
                            role="button"
                        >
                            <div className="category-icon-wrapper">
                                {getIcon(category.Descripcion)}
                            </div>
                            <span className="category-name">
                                {category.Descripcion}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategorySection;
