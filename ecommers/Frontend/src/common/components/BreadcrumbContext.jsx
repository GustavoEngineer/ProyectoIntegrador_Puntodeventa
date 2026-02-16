import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiCall } from '@/services/api';

const BreadcrumbContext = createContext();

export const useBreadcrumbs = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error('useBreadcrumbs must be used within a BreadcrumbProvider');
    }
    return context;
};

export const BreadcrumbProvider = ({ children, onNavigate }) => {
    const [breadcrumbs, setBreadcrumbs] = useState([{ label: 'Página principal', type: 'home', path: '/' }]);

    const pushBreadcrumb = (item) => {
        setBreadcrumbs((prev) => {
            // Check if item already exists in history
            const existingIndex = prev.findIndex(b =>
                (b.type === item.type && b.id === item.id) // Match specific product/category
                || (b.type === item.type && !b.id && !item.id) // Match generic pages like Cart/Favorites
            );

            if (existingIndex !== -1) {
                // If exists, truncate history back to that point (inclusive)
                return prev.slice(0, existingIndex + 1);
            }

            // Otherwise, append new item
            return [...prev, item];
        });
    };

    const resetBreadcrumbs = () => {
        setBreadcrumbs([{ label: 'Página principal', type: 'home', path: '/' }]);
    };

    const handleBreadcrumbClick = (item) => {
        // Truncate history when clicking an intermediate breadcrumb
        pushBreadcrumb(item);

        // Trigger actual navigation
        if (onNavigate) {
            onNavigate(item);
        }
    };

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbs, pushBreadcrumb, resetBreadcrumbs, handleBreadcrumbClick }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};
