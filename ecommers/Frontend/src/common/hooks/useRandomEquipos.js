import { useState, useEffect } from 'react';
import { apiCall } from '../../services/api';

/**
 * Custom hook to fetch equipment and return 3 random items
 * @returns {Object} { equipos, loading, error }
 */
const useRandomEquipos = () => {
    const [equipos, setEquipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndRandomize = async () => {
            try {
                setLoading(true);
                const response = await apiCall('/equipos-compatibles');
                const data = Array.isArray(response) ? response : (response.data || []);

                if (data.length > 0) {
                    // Shuffle array and take 3
                    const shuffled = [...data].sort(() => 0.5 - Math.random());
                    setEquipos(shuffled.slice(0, 3));
                }
            } catch (err) {
                console.error("Error in useRandomEquipos:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAndRandomize();
    }, []); // Run once on mount

    return { equipos, loading, error };
};

export default useRandomEquipos;
