import React, { useState } from 'react';
import ProductCard from '../components/common/ProductCard';
import './CatalogPage.css';

// Dummy Data
const DUMMY_PRODUCTS = [
    { id: 1, title: 'Minimalist Watch', price: 129.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', category: 'Accessories' },
    { id: 2, title: 'Premium Leather Bag', price: 249.50, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80', category: 'Accessories' },
    { id: 3, title: 'Wireless Headphones', price: 199.00, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
    { id: 4, title: 'Designer Sunglasses', price: 159.00, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80', category: 'Accessories' },
    { id: 5, title: 'Smart Speaker', price: 89.99, image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=500&q=80', category: 'Electronics' },
    { id: 6, title: 'Running Shoes', price: 119.95, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80', category: 'Footwear' },
    { id: 7, title: 'Classic Denim Jacket', price: 79.99, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=500&q=80', category: 'Apparel' },
    { id: 8, title: 'Modern Plant Pot', price: 35.00, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80', category: 'Home' },
];

const CatalogPage = () => {
    const [products] = useState(DUMMY_PRODUCTS);

    return (
        <div className="catalog-page">
            <div className="catalog-header">
                <h2 className="catalog-title">Featured Collection</h2>
                <p className="catalog-subtitle">Discover our hand-picked items for this season.</p>
            </div>

            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CatalogPage;
