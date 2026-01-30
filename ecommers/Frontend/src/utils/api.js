
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Helper to make API requests
 * @param {string} endpoint - The endpoint to call (e.g. '/usuarios')
 * @param {object} options - Fetch options
 * @returns {Promise<any>}
 */
export const apiCall = async (endpoint, options = {}) => {
    const url = `${API_URL}${endpoint}`;

    // Default headers
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            // Try to parse error message from server
            let errorMessage = `Error: ${response.status} ${response.statusText}`;
            try {
                const errorData = await response.json();
                if (errorData.message) errorMessage = errorData.message;
            } catch (e) {
                // Ignore JSON parse error on error response
            }
            throw new Error(errorMessage);
        }

        // Return null for 204 No Content
        if (response.status === 204) return null;

        return await response.json();
    } catch (error) {
        console.error(`API Call Error (${endpoint}):`, error);
        throw error;
    }
};

export const API_BASE_URL = API_URL;
