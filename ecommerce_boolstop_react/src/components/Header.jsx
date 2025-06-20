import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoBoolStop from '../assets/logoBoolStop.png';

export default function Header() {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        const updateCart = () => {
            const stored = localStorage.getItem('cart');
            setCart(stored ? JSON.parse(stored) : []);
        };

        // Ascolta quando il carrello viene aggiornato
        window.addEventListener('cartUpdated', updateCart);

        // Pulisce l’evento alla fine
        return () => {
            window.removeEventListener('cartUpdated', updateCart);
        };
    }, []);

    return (
        <div className="header-wrapper">
            <header className="header">
                <Link to="/" className="logo">
                    <img src={logoBoolStop} alt="Logo BoolStop" />
                    <span className="logo-text">BoolStop</span>
                </Link>
                <nav className="icons">
                    <input
                        type="text"
                        placeholder="Cerca..."
                        className="search-bar"
                    />
                    <div className="cart-wrapper">
                        <Link to="/wishlist"><i className='fas fa-star'></i></Link>

                        <div className="cart-icon-wrapper">
                            <Link to="/basket">
                                <div className='popup-cart'>
                                    {cart.length} <i className="fas fa-shopping-cart"></i>
                                </div>
                            </Link>
                            <div className="cart-hover-popup">
                                {cart.length === 0 ? (
                                    <p>Il carrello è vuoto</p>
                                ) : (
                                    <ul>
                                        {cart.map(item => (
                                            <li key={item.id}>
                                                {item.name} (x{item.quantity})
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
