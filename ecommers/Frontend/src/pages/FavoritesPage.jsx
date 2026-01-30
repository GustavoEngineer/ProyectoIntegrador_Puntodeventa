import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useBreadcrumbs } from '../context/BreadcrumbContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import './FavoritesPage.css';

const FavoritesPage = ({ onViewProduct, onBack }) => {
    const { favorites, removeFavorite, clearFavorites } = useFavorites();
    const { addToCart } = useCart();
    const { breadcrumbs, pushBreadcrumb, handleBreadcrumbClick } = useBreadcrumbs();

    React.useEffect(() => {
        pushBreadcrumb({ label: 'Favoritos', type: 'favorites' });
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'Recent';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        alert('Producto añadido al carrito');
    };

    const handleAddAllToCart = () => {
        favorites.forEach(product => {
            if (product.Cantidad > 0) {
                addToCart(product, 1);
            }
        });
        alert('Todos los productos disponibles han sido añadidos al carrito.');
    };

    const handleClearWishlist = () => {
        if (window.confirm('¿Estás seguro de que quieres vaciar tu lista de deseos?')) {
            clearFavorites();
        }
    };

    // Calculate stock status text and class
    const getStockStatus = (cantidad) => {
        if (cantidad > 5) return { text: 'In Stock', className: 'stock-in' };
        if (cantidad > 0) return { text: 'Low Stock', className: 'stock-low' };
        return { text: 'Out of Stock', className: 'stock-out' };
    };

    if (favorites.length === 0) {
        return (
            <div className="favorites-page">
                <div className="favorites-breadcrumbs">
                    <Breadcrumbs
                        items={breadcrumbs.map((item, index) => ({
                            label: item.label,
                            action: () => handleBreadcrumbClick(item),
                            active: index === breadcrumbs.length - 1
                        }))}
                    />
                </div>
                <div className="favorites-content-wrapper fade-in">
                    <div className="favorites-empty">
                        <h2>No tienes favoritos aún</h2>
                        <p>Agrega productos para verlos aquí.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <div className="favorites-breadcrumbs">
                <Breadcrumbs
                    items={breadcrumbs.map((item, index) => ({
                        label: item.label,
                        action: () => handleBreadcrumbClick(item),
                        active: index === breadcrumbs.length - 1
                    }))}
                />
            </div>
            <div className="favorites-content-wrapper fade-in">
                <div className="favorites-header">
                    <h1>Mis Favoritos</h1>
                </div>

                <div className="favorites-table-container">
                    <table className="favorites-table">
                        <thead>
                            <tr>
                                <th className="remove-col"></th>
                                <th className="product-col">Product</th>
                                <th className="price-col">Price</th>
                                <th className="date-col">Date Added</th>
                                <th className="stock-col">Stock Status</th>
                                <th className="action-col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {favorites.map((product) => {
                                const stockInfo = getStockStatus(product.Cantidad);
                                // FechaAgregado comes from the join in the backend model
                                const dateAdded = product.FechaAgregado || new Date().toISOString();

                                return (
                                    <tr key={product.Id_Pieza}>
                                        <td className="remove-col">
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFavorite(product.Id_Pieza)}
                                                aria-label="Remove from wishlist"
                                            >
                                                ×
                                            </button>
                                        </td>
                                        <td>
                                            <div className="product-cell-content">
                                                <img
                                                    src={product.ImagenUrl || 'https://via.placeholder.com/80'}
                                                    alt={product.Nombre}
                                                    className="product-thumb"
                                                    onClick={() => onViewProduct(product.Id_Pieza)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <div className="product-details">
                                                    <h3 onClick={() => onViewProduct(product.Id_Pieza)} style={{ cursor: 'pointer' }}>{product.Nombre}</h3>
                                                    <div className="product-meta">
                                                        <span>Categoria: {product.Categoria || 'General'}</span>
                                                        <span>Garantía: {product.Garantia} meses</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="price-cell">
                                            ${parseFloat(product.Precio).toFixed(2)}
                                        </td>
                                        <td className="date-cell">
                                            {formatDate(dateAdded)}
                                        </td>
                                        <td className="stock-cell">
                                            <span className={stockInfo.className} style={{ color: stockInfo.className === 'stock-out' ? 'red' : '#2ECC71' }}>
                                                {stockInfo.text}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="add-btn-table"
                                                onClick={() => handleAddToCart(product)}
                                                disabled={product.Cantidad === 0}
                                            >
                                                Add to Cart
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="favorites-footer">
                    <div className="right-actions">
                        <button className="clear-btn" onClick={handleClearWishlist}>Clear Wishlist</button>
                        <button className="add-all-btn" onClick={handleAddAllToCart}>Add All to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;
