import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/components/layout/body/main/context/AuthContext';
import { apiCall } from '@/services/api';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Initial load from local storage for guest, or API for user
    useEffect(() => {
        if (isAuthenticated && user?.id) {
            fetchCart();
        } else {
            const savedCart = localStorage.getItem('mediparts-cart');
            if (savedCart) {
                try {
                    setCartItems(JSON.parse(savedCart));
                } catch (error) {
                    console.error('Error loading cart from local storage:', error);
                    setCartItems([]);
                    localStorage.removeItem('mediparts-cart');
                }
            } else {
                setCartItems([]);
            }
        }
    }, [isAuthenticated, user]);

    // Save to local storage only if NOT authenticated (guest mode)
    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('mediparts-cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isAuthenticated]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const data = await apiCall(`/carrito/${user.id}`);
            // Map backend data to frontend format if necessary
            // Backend returns { ...fields, Pieza: { ... } }
            // Frontend expects items to have properties of Pieza directly + cantidadCarrito
            const mappedItems = data.map(item => ({
                ...item.Pieza,
                cantidadCarrito: item.Cantidad,
                // Ensure ID consistency
                Id_Pieza: item.Id_Pieza,
                Precio: item.PrecioUnitarioEnCarrito // or item.Pieza.Precio depending on what we want to display (historical vs current)
            }));
            setCartItems(mappedItems);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (pieza, cantidad = 1) => {
        // Optimistic update
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.Id_Pieza === pieza.Id_Pieza);
            if (existingItem) {
                return prevItems.map(item =>
                    item.Id_Pieza === pieza.Id_Pieza
                        ? { ...item, cantidadCarrito: Math.min(item.cantidadCarrito + cantidad, pieza.Cantidad) }
                        : item
                );
            } else {
                return [...prevItems, { ...pieza, cantidadCarrito: cantidad }];
            }
        });

        if (isAuthenticated) {
            try {
                // If authenticated, sync with API
                await apiCall('/carrito', {
                    method: 'POST',
                    body: JSON.stringify({
                        Id_Usuario: user.id,
                        Id_Pieza: pieza.Id_Pieza,
                        Cantidad: cantidad,
                        Precio: pieza.Precio
                    })
                });
                // Optionally refetch to ensure sync, or trust optimistic
                // fetchCart(); 
            } catch (error) {
                console.error('Error adding to cart API:', error);
                // Revert or show error could be added here
            }
        }
    };

    const removeFromCart = async (id_pieza) => {
        // Optimistic update
        setCartItems(prevItems => prevItems.filter(item => item.Id_Pieza !== id_pieza));

        if (isAuthenticated) {
            try {
                await apiCall(`/carrito/${user.id}/${id_pieza}`, {
                    method: 'DELETE'
                });
            } catch (error) {
                console.error('Error removing from cart API:', error);
            }
        }
    };

    const updateQuantity = async (id_pieza, cantidad) => {
        if (cantidad <= 0) {
            removeFromCart(id_pieza);
            return;
        }

        // Find the item to check max stock
        const currentItem = cartItems.find(item => item.Id_Pieza === id_pieza);
        const maxStock = currentItem ? currentItem.Cantidad : Infinity; // Fallback
        const newQuantity = Math.min(cantidad, maxStock);

        // Optimistic update
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.Id_Pieza === id_pieza
                    ? { ...item, cantidadCarrito: newQuantity }
                    : item
            )
        );

        if (isAuthenticated) {
            try {
                await apiCall(`/carrito/${user.id}/${id_pieza}`, {
                    method: 'PUT',
                    body: JSON.stringify({ Cantidad: newQuantity })
                });
            } catch (error) {
                console.error('Error updating cart quantity API:', error);
            }
        }
    };

    const clearCart = async () => {
        setCartItems([]);

        if (isAuthenticated) {
            try {
                await apiCall(`/carrito/${user.id}`, {
                    method: 'DELETE'
                });
            } catch (error) {
                console.error('Error clearing cart API:', error);
            }
        } else {
            localStorage.removeItem('mediparts-cart');
        }
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (parseFloat(item.Precio) * item.cantidadCarrito);
        }, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.cantidadCarrito, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
                loading
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
