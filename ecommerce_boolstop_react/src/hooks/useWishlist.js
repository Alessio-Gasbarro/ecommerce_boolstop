import { useState, useEffect } from 'react';

export default function useWishlist() {

    const [wishlist, setWishlist] = useState(() => {
        const stored = localStorage.getItem('wishlist');
        return stored ? JSON.parse(stored) : [];
    });

    // Ogni volta che cambia la wishlist: salva e notifica
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        window.dispatchEvent(new Event('wishlistUpdated'));
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist(prev => {
            if (prev.find(item => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (id) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    const clearWishlist = () => setWishlist([]);

    return { wishlist, addToWishlist, removeFromWishlist, clearWishlist };
}
