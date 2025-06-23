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

    const addToCart = (game, quantity = 1) => {
        setCart(prevCart => {
            // Cerca se il gioco è già nel carrello
            const existing = prevCart.find(item => item.id === game.id);
            let updatedCart;
            if (existing) {
                // Se già presente, aggiorna la quantità
                updatedCart = prevCart.map(item =>
                    item.id === game.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Se non presente, aggiungi nuovo gioco
                updatedCart = [...prevCart, { ...game, quantity }];
            }
            // Salva su localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            // (Se usi evento custom, dispatch qui)
            window.dispatchEvent(new Event('cartUpdated'));
            return updatedCart;
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
