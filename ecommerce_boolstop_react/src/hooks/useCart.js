import { useState, useEffect } from 'react';

export default function useCart() {

    // Inizializzo il carrello dallo storage locale o come array vuoto
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : []; // Se esiste un carrello salvato lo recupero
    });

    // Effettuo il salvataggio del carrello nello storage locale (ogni volta che cambia)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Funzioni per l'aggiunta al carrello
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

    // per la rimozione di un prodotto dal carrello
    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    // per svuotare il carrello
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