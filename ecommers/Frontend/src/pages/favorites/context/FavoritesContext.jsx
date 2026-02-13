import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../../main/context/AuthContext';
import { apiCall } from '../../../utils/api';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load favorites from API when user logs in
    useEffect(() => {
        if (isAuthenticated && user?.id) {
            fetchFavorites();
        } else {
            setFavorites([]);
        }
    }, [isAuthenticated, user]);

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            const data = await apiCall(`/lista-deseos/${user.id}`);
            // The API returns the list of wishlist items. 
            // We assume the API returns objects that contain the Pieza details or we might need to map them.
            // Based on typical join queries, it likely returns the product details. 
            // If it returns just relations, we might need adjustments.
            // Let's assume it returns the list of products (or objects with Id_Pieza).
            setFavorites(Array.isArray(data) ? data.map(item => item.Pieza) : []);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    const addFavorite = async (item) => {
        console.log('addFavorite called with:', item);
        if (!isAuthenticated) {
            console.log('User not authenticated, aborting addFavorite');
            return;
        }

        // Optimistic update
        const newItem = { ...item, Id_Pieza: item.Id_Pieza || item.PiezaID }; // ensuring ID compatibility
        console.log('Adding favorite (processed):', newItem);

        if (!newItem.Id_Pieza) {
            console.error('Missing Id_Pieza for item:', item);
            return;
        }

        setFavorites((prev) => {
            if (prev.some(fav => (fav.Id_Pieza || fav.PiezaID) === newItem.Id_Pieza)) {
                return prev;
            }
            return [...prev, newItem];
        });

        try {
            console.log('Sending API request to add favorite...');
            await apiCall('/lista-deseos', {
                method: 'POST',
                body: JSON.stringify({
                    Id_Usuario: user.id,
                    Id_Pieza: newItem.Id_Pieza
                })
            });
            console.log('API request successful');
        } catch (error) {
            console.error('Error adding favorite:', error);
            // Revert on error
            setFavorites((prev) => prev.filter((fav) => fav.Id_Pieza !== newItem.Id_Pieza));
        }
    };

    const removeFavorite = async (itemId) => {
        if (!isAuthenticated) return;

        // Optimistic update
        setFavorites((prev) => prev.filter((item) => (item.Id_Pieza || item.PiezaID) !== itemId));

        try {
            await apiCall(`/lista-deseos/${user.id}/${itemId}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error removing favorite:', error);
            // Revert (this is harder without the full item, so we might just refetch)
            fetchFavorites();
        }
    };

    const isFavorite = (itemId) => {
        return favorites.some((item) => (item.Id_Pieza || item.PiezaID) === itemId);
    };

    const toggleFavorite = (item) => {
        const itemId = item.Id_Pieza || item.PiezaID;
        if (isFavorite(itemId)) {
            removeFavorite(itemId);
        } else {
            addFavorite(item);
        }
    };

    const clearFavorites = async () => {
        if (!isAuthenticated) return;

        // Optimistic update
        setFavorites([]);

        try {
            await apiCall(`/lista-deseos/${user.id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error clearing favorites:', error);
            fetchFavorites();
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite, clearFavorites, loading }}>
            {children}
        </FavoritesContext.Provider>
    );
};
