import React, { useState } from 'react';
import { useCart } from './context/CartContext';
import { useAuth } from '@/components/layout/body/authenticationscreen/AuthContext';
import { useBreadcrumbs } from '@/common/components/BreadcrumbContext';
import Button from '@/common/components/Button';
import Breadcrumbs from '@/common/components/Breadcrumbs';
import './CartPage.css';

const CartPage = ({ onBack }) => {
    const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart();
    const { addOrder } = useAuth();
    const { breadcrumbs, pushBreadcrumb, handleBreadcrumbClick } = useBreadcrumbs();
    const [isProcessing, setIsProcessing] = useState(false);

    React.useEffect(() => {
        pushBreadcrumb({ label: 'Carrito', type: 'cart' });
    }, []);

    // ... (handlers omitted for brevity if unchanged, but I need to be careful with replace_file_content context)
    // Actually, I can't easily skip lines in replace_file_content if they are part of the block.
    // I will do two separate replacements or one larger block if they are close.
    // They are far apart (line 10 vs 117). I will use multi_replace.


    const handleQuantityChange = (id_pieza, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(id_pieza, newQuantity);
        }
    };

    const handleRemove = (id_pieza) => {
        if (confirm('¿Deseas eliminar esta pieza del carrito?')) {
            removeFromCart(id_pieza);
        }
    };

    const handleClearCart = () => {
        if (confirm('¿Deseas vaciar todo el carrito?')) {
            clearCart();
        }
    };

    const handleCheckout = () => {
        setIsProcessing(true);

        try {
            // Crear el pedido
            const orderItems = cartItems.map(item => ({
                id: item.Id_Pieza,
                name: item.Nombre,
                price: parseFloat(item.Precio),
                quantity: item.cantidadCarrito
            }));

            const total = getCartTotal() * 1.16; // Incluir IVA

            addOrder({
                items: orderItems,
                total: total
            });

            // Limpiar carrito
            clearCart();

            // Mostrar confirmación
            alert('¡Pedido realizado con éxito! Puedes ver los detalles en "Mi Cuenta > Mis Pedidos"');

            // Volver al catálogo
            onBack();
        } catch (err) {
            alert('Error al procesar el pedido: ' + err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-breadcrumbs">
                    <Breadcrumbs
                        items={breadcrumbs.map((item, index) => ({
                            label: item.label,
                            action: () => handleBreadcrumbClick(item),
                            active: index === breadcrumbs.length - 1
                        }))}
                    />
                </div>
                <div className="cart-content-wrapper fade-in">
                    <div className="cart-header">
                        <h2>Carrito de Compras</h2>
                        <Button variant="outline" onClick={onBack}>
                            Volver al catálogo
                        </Button>
                    </div>
                    <div className="cart-empty">
                        <div className="empty-icon">🛒</div>
                        <h3>Tu carrito está vacío</h3>
                        <p>Agrega piezas médicas para comenzar tu orden</p>
                        <Button variant="primary" onClick={onBack}>
                            Ver catálogo
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-breadcrumbs">
                <Breadcrumbs
                    items={breadcrumbs.map((item, index) => ({
                        label: item.label,
                        action: () => handleBreadcrumbClick(item),
                        active: index === breadcrumbs.length - 1
                    }))}
                />
            </div>

            <div className="cart-content-wrapper fade-in">
                <div className="cart-header">
                    <h2>Carrito de Compras ({getCartCount()} {getCartCount() === 1 ? 'pieza' : 'piezas'})</h2>
                    <div className="cart-header-actions">
                        <Button variant="outline" onClick={onBack}>
                            Seguir comprando
                        </Button>
                        <Button variant="danger" onClick={handleClearCart}>
                            Vaciar carrito
                        </Button>
                    </div>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map((item) => {
                            const imageUrl = item.ImagenUrl || 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=200&q=80';
                            const subtotal = parseFloat(item.Precio) * item.cantidadCarrito;

                            return (
                                <div key={item.Id_Pieza} className="cart-item">
                                    <div className="cart-item-image">
                                        <img src={imageUrl} alt={item.Nombre} />
                                    </div>

                                    <div className="cart-item-info">
                                        <h3 className="cart-item-name">{item.Nombre}</h3>
                                        <div className="cart-item-meta">
                                            {item.Categoria && (
                                                <span className="cart-item-badge">{item.Categoria}</span>
                                            )}
                                            {item.Estado && (
                                                <span className="cart-item-badge">{item.Estado}</span>
                                            )}
                                        </div>
                                        {item.Garantia && (
                                            <p className="cart-item-warranty">Garantía: {item.Garantia} meses</p>
                                        )}
                                    </div>

                                    <div className="cart-item-price">
                                        <span className="price-unit">${parseFloat(item.Precio).toFixed(2)} c/u</span>
                                    </div>

                                    <div className="cart-item-quantity">
                                        <button
                                            onClick={() => handleQuantityChange(item.Id_Pieza, item.cantidadCarrito - 1)}
                                            disabled={item.cantidadCarrito <= 1}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.cantidadCarrito}
                                            onChange={(e) => handleQuantityChange(item.Id_Pieza, parseInt(e.target.value))}
                                            min="1"
                                            max={item.Cantidad}
                                            className="quantity-input"
                                        />
                                        <button
                                            onClick={() => handleQuantityChange(item.Id_Pieza, item.cantidadCarrito + 1)}
                                            disabled={item.cantidadCarrito >= item.Cantidad}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                        <span className="stock-info">Stock: {item.Cantidad}</span>
                                    </div>

                                    <div className="cart-item-subtotal">
                                        <span className="subtotal-value">${subtotal.toFixed(2)}</span>
                                    </div>

                                    <button
                                        onClick={() => handleRemove(item.Id_Pieza)}
                                        className="cart-item-remove"
                                        title="Eliminar del carrito"
                                    >
                                        ✕
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cart-summary">
                        <h3>Resumen del Pedido</h3>

                        <div className="summary-rows">
                            <div className="summary-row">
                                <span>Subtotal:</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>IVA (16%):</span>
                                <span>${(getCartTotal() * 0.16).toFixed(2)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total:</span>
                                <span>${(getCartTotal() * 1.16).toFixed(2)}</span>
                            </div>
                        </div>

                        <Button variant="primary" className="checkout-btn" onClick={handleCheckout} disabled={isProcessing}>
                            {isProcessing ? 'Procesando...' : 'Proceder al pago'}
                        </Button>

                        <div className="summary-info">
                            <p>✓ Piezas certificadas por ingenieros biomédicos</p>
                            <p>✓ Garantía incluida en todas las piezas</p>
                            <p>✓ Envío seguro y rastreable</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
