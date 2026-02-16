
import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '@/common/components/ProductCard';
import { apiCall } from '@/services/api';
import './Deals.css';

const Deals = ({ onViewProduct, onRequireLogin }) => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                // Fetch all products (or a large page)
                // Assuming the API returns a standard structure
                // If the API supports sorting, it would be better, but we'll sort client-side for now based on known constraints
                const response = await apiCall('/piezas?limit=100');

                let products = [];
                if (response && response.data) {
                    products = response.data;
                } else if (Array.isArray(response)) {
                    products = response;
                }

                // Sort by price ascending (cheapest first)
                const sortedProducts = products.sort((a, b) => {
                    return parseFloat(a.Precio) - parseFloat(b.Precio);
                });

                // Take top 20
                setDeals(sortedProducts.slice(0, 20));
            } catch (error) {
                console.error("Failed to fetch deals", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300; // Scroll by roughly one card width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    if (loading) {
        return (
            <div className="deals-section">
                <div className="deals-header">
                    <h2 className="deals-title">Ofertas del Día</h2>
                </div>
                <div className="deals-skeleton-track">
                    {[1, 2, 3, 4].map(i => <div key={i} className="deals-skeleton-card"></div>)}
                </div>
            </div>
        );
    }

    if (deals.length === 0) return null;

    return (
        <div className="deals-section">
            <div className="deals-header">
                <div>
                    <h2 className="deals-title">¡Los Mejores Precios!</h2>
                    <p className="deals-subtitle">Aprovecha nuestras ofertas en refacciones médicas</p>
                </div>
                <div className="deals-controls">
                    {/* Could add 'View All' link here */}
                </div>
            </div>

            <div className="deals-carousel-container">
                <button
                    className="deals-nav-btn deals-prev"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    &lt;
                </button>

                <div className="deals-carousel-track" ref={scrollRef}>
                    {deals.map(product => (
                        <div key={product.Id_Pieza} className="deals-carousel-item">
                            <ProductCard
                                product={product}
                                onViewDetails={() => onViewProduct(product.Id_Pieza)}
                                onRequireLogin={onRequireLogin}
                            />
                        </div>
                    ))}
                </div>

                <button
                    className="deals-nav-btn deals-next"
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default Deals;
