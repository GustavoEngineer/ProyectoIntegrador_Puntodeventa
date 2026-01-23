import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Cargar carrito desde localStorage
        const savedCart = localStorage.getItem('mediparts-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Guardar en localStorage cuando cambie el carrito
    useEffect(() => {
        localStorage.setItem('mediparts-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (pieza, cantidad = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.Id_Pieza === pieza.Id_Pieza);
            
            if (existingItem) {
                // Si ya existe, actualizar cantidad
                return prevItems.map(item =>
                    item.Id_Pieza === pieza.Id_Pieza
                        ? { ...item, cantidadCarrito: Math.min(item.cantidadCarrito + cantidad, pieza.Cantidad) }
                        : item
                );
            } else {
                // Agregar nuevo item
                return [...prevItems, { ...pieza, cantidadCarrito: cantidad }];
            }
        });
    };

    const removeFromCart = (id_pieza) => {
        setCartItems(prevItems => prevItems.filter(item => item.Id_Pieza !== id_pieza));
    };

    const updateQuantity = (id_pieza, cantidad) => {
        if (cantidad <= 0) {
            removeFromCart(id_pieza);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.Id_Pieza === id_pieza
                    ? { ...item, cantidadCarrito: Math.min(cantidad, item.Cantidad) }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
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
                getCartCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
