import { useState, useEffect } from 'react';

export default function useWishlist() {

    // Storage locale per la wishlist
    const [wishlist, setWishlist] = useState(() => {
        const stored = localStorage.getItem('wishlist');
        return stored ? JSON.parse(stored) : [];
    });

    // Effettuo il salvataggio locale, quando la wishlist cambia
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Aggiunta alla wishlist
    const addToWishlist = (product) => {
        setWishlist(prev => {
            if (prev.find(item => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    // Rimozione dalla wishlist
    const removeFromWishlist = (id) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    // Svuotamento della wishlist
    const clearWishlist = () => setWishlist([]);

    return { wishlist, addToWishlist, removeFromWishlist, clearWishlist };
}