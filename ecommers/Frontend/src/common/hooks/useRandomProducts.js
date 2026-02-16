
import { useState, useEffect } from 'react';
import { apiCall } from '../../services/api';

/**
 * Hook to fetch products and return them in a random order
 * @param {number} limit - Optional limit of products to return
 * @returns {object} { products, loading, error, refresh }
 */
const useRandomProducts = (limit = null) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const fetchAndShuffle = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch all products to ensure good randomization
            // Adjust limit if API supports it, but for randomizing all, we usually need all or a large subset
            const response = await apiCall('/piezas?limit=100');

            let data = [];
            if (response && response.data) {
                data = response.data;
            } else if (Array.isArray(response)) {
                data = response;
            }

            let shuffled = shuffleArray(data);

            if (limit) {
                shuffled = shuffled.slice(0, limit);
            }

            setProducts(shuffled);
        } catch (err) {
            console.error("Error fetching random products:", err);
            setError(err.message || 'Error executing request');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAndShuffle();
    }, []);

    return { products, loading, error, refresh: fetchAndShuffle };
};

export default useRandomProducts;
