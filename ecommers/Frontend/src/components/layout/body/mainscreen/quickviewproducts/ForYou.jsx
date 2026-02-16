
import React, { useState } from 'react';
import ProductCard from '@/common/components/parts/ProductCard';
import useRandomProducts from '@/common/hooks/useRandomProducts';
import './Deals.css'; // Reusing Deals styling for basic access, plus new foryou- styles

const ForYou = ({ onViewProduct, onRequireLogin }) => {
    // Determine how many to fetch. Since database has 50, we want them all available.
    // Fetching 60 just to be safe or exactly 50.
    const { products: randomProducts, loading } = useRandomProducts(60);
    const [visibleCount, setVisibleCount] = useState(25);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 25);
    };

    // Calculate which products to show
    const visibleProducts = randomProducts ? randomProducts.slice(0, visibleCount) : [];
    const hasMore = randomProducts && visibleCount < randomProducts.length;

    if (loading) {
        return (
            <div className="foryou-section">
                <div className="foryou-header-container">
                    <div className="foryou-header-line"></div>
                    <h2 className="foryou-title">Para ti</h2>
                    <div className="foryou-header-line"></div>
                </div>
                <div className="foryou-grid">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="deals-skeleton-card" style={{ width: '100%', height: '350px' }}></div>)}
                </div>
            </div>
        );
    }

    if (!randomProducts || randomProducts.length === 0) return null;

    return (
        <div className="foryou-section">
            <div className="foryou-header-container">
                <div className="foryou-header-line"></div>
                <h2 className="foryou-title">Para ti</h2>
                <div className="foryou-header-line"></div>
            </div>

            <div className="foryou-grid">
                {visibleProducts.map(product => (
                    <ProductCard
                        key={product.Id_Pieza}
                        product={product}
                        onViewDetails={() => onViewProduct(product.Id_Pieza)}
                        onRequireLogin={onRequireLogin}
                    />
                ))}
            </div>

            {hasMore ? (
                <div className="foryou-load-more-container">
                    <button className="foryou-load-more-btn" onClick={handleLoadMore}>
                        Ver más
                    </button>
                </div>
            ) : (
                <div className="foryou-end-message">
                    Has llegado al final
                </div>
            )}
        </div>
    );
};

export default ForYou;
