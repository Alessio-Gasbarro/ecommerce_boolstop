import { useState, useEffect } from 'react';

export default function useCart() {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated")); // 👈 evento personalizzato
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => setCart([]);

    const setQuantity = (id, quantity) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    return { cart, addToCart, removeFromCart, clearCart, setQuantity };
}