import { useState, useEffect } from 'react';

export default function useCart() {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
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

    // imposto la quantita di un prodotto nel carrello
    const setQuantity = (id, quantity) => {
        setCart(prev =>
            quantity > 0
                ? prev.map(item =>
                    item.id === id ? { ...item, quantity } : item
                )
                : prev.filter(item => item.id !== id)
        );
    };

    return { cart, addToCart, removeFromCart, clearCart, setQuantity };
}
