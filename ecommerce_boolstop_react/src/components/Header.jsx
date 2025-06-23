import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoBoolStop from '../assets/logoBoolStop.png';
import axios from 'axios';

export default function Header() {

    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const stored = localStorage.getItem('wishlist');
        return stored ? JSON.parse(stored) : [];
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() === '') {
            setSearchResults([]);
            return;
        }
        setSearching(true);
        try {
            const res = await axios.get(`/api/games/advanced-search?term=${encodeURIComponent(value)}`);
            setSearchResults(res.data.results || []);
        } catch (err) {
            setSearchResults([]);
        }
        setSearching(false);
    };

    const handleSelectSearchResult = (game) => {
        setSearchTerm('');
        setSearchResults([]);
        navigate(`/all/${game.slug}`); //slug
    };

    useEffect(() => {
        const updateCart = () => {
            const stored = localStorage.getItem('cart');
            setCart(stored ? JSON.parse(stored) : []);
        };

        const updateWishlist = () => {
            const stored = localStorage.getItem('wishlist');
            setWishlist(stored ? JSON.parse(stored) : []);
        };

        window.addEventListener('cartUpdated', updateCart);
        window.addEventListener('wishlistUpdated', updateWishlist);

        return () => {
            window.removeEventListener('cartUpdated', updateCart);
            window.removeEventListener('wishlistUpdated', updateWishlist);
        };
    }, []);

    const iconSize = 28;
    const badgeSize = 20;
    const badgeStyle = {
        position: 'absolute',
        top: -badgeSize / 2 + 2,
        left: -badgeSize / 2 + 2,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        width: badgeSize,
        height: badgeSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: 'bold',
        boxShadow: '0 0 3px rgba(0,0,0,0.3)',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
    };

    return (
        <div className="header-wrapper">
            <header className="header">
                <Link to="/" className="logo">
                    <img src={logoBoolStop} alt="Logo BoolStop" />
                    <span className="logo-text">BoolStop</span>
                </Link>
                <nav className="icons" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <input
                            type="text"
                            placeholder="Cerca..."
                            className="search-bar"
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{ width: 200 }}
                        />
                        {searching && <span style={{ position: 'absolute', left: 210, top: 8 }}>...</span>}
                        {searchTerm && searchResults.length > 0 && (
                            <div
                                className="search-results"
                                style={{
                                    background: '#fff',
                                    color: '#222',
                                    border: '1px solid #ccc',
                                    position: 'absolute',
                                    zIndex: 100,
                                    width: 200,
                                    maxHeight: 250,
                                    overflowY: 'auto'
                                }}
                            >
                                {searchResults.map(game => (
                                    <div
                                        key={game.id}
                                        style={{ padding: '8px', cursor: 'pointer' }}
                                        onClick={() => handleSelectSearchResult(game)}
                                    >
                                        {game.name}
                                    </div>
                                ))}
                            </div>
                        )}
                        {searchTerm && !searching && searchResults.length === 0 && (
                            <div
                                style={{
                                    background: '#fff',
                                    border: '1px solid #ccc',
                                    position: 'absolute',
                                    zIndex: 100,
                                    width: 200,
                                    padding: '8px'
                                }}
                            >
                                <div style={{ color: ' black ' }}>Nessun risultato</div>
                            </div>
                        )}
                    </div>

                    {/* Wishlist Icon */}
                    <div
                        className="wishlist-icon-wrapper"
                        style={{
                            position: 'relative',
                            display: 'inline-block',
                            width: 50,
                            height: iconSize,
                            fontSize: iconSize,
                            textAlign: 'center',
                            lineHeight: `${iconSize}px`,
                        }}
                    >
                        <Link to="/wishlist" style={{ position: 'relative', display: 'inline-block', width: '100%', height: '100%' }}>
                            <i className='fas fa-star' style={{ fontSize: 40, verticalAlign: 'middle' }}></i>
                            {wishlist.length > 0 && (
                                <span style={badgeStyle}>
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Cart Icon */}
                    <div
                        className="cart-icon-wrapper"
                        style={{
                            position: 'relative',
                            display: 'inline-block',
                            width: 40,
                            height: 32,
                            fontSize: iconSize,
                            textAlign: 'center',
                            lineHeight: `${iconSize}px`,
                        }}
                    >
                        <Link to="/basket" style={{ position: 'relative', display: 'inline-block', width: '100%', height: '100%' }}>
                            <i className="fas fa-shopping-cart" style={{ fontSize: 40, verticalAlign: 'middle' }}></i>
                            {cart.length > 0 && (
                                <span style={badgeStyle}>
                                    {cart.length}
                                </span>
                            )}
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
                </nav>
            </header>
        </div>
    );
}
