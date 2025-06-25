import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoBoolStop from '../assets/logoBoolStop.png';
import axios from 'axios';

export default function Header() {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (!value.trim()) {
            setSearchResults([]);
            return;
        }
        setSearching(true);
        try {
            const res = await axios.get(`/api/games/advanced-search?term=${encodeURIComponent(value)}`);
            setSearchResults(res.data.results || []);
        } catch {
            setSearchResults([]);
        } finally {
            setSearching(false);
        }
    };

    const handleSelectSearchResult = (game) => {
        setSearchTerm('');
        setSearchResults([]);
        navigate(`/all/${game.slug}`);
    };

    useEffect(() => {
        const updateCart = () => setCart(JSON.parse(localStorage.getItem('cart')) || []);
        const updateWishlist = () => setWishlist(JSON.parse(localStorage.getItem('wishlist')) || []);
        window.addEventListener('cartUpdated', updateCart);
        window.addEventListener('wishlistUpdated', updateWishlist);
        return () => {
            window.removeEventListener('cartUpdated', updateCart);
            window.removeEventListener('wishlistUpdated', updateWishlist);
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
                    {/* Search Box */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Cerca..."
                            className="search-bar"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        {searching && <span className="searching-indicator">...</span>}
                        {searchTerm && searchResults.length > 0 && (
                            <div className="search-results">
                                {searchResults.map(game => (
                                    <div key={game.id} className="search-result" onClick={() => handleSelectSearchResult(game)}>
                                        {game.name}
                                    </div>
                                ))}
                            </div>
                        )}
                        {searchTerm && !searching && searchResults.length === 0 && (
                            <div className="search-no-results">
                                <div>Nessun risultato</div>
                            </div>
                        )}
                    </div>

                    {/* Wishlist */}
                    <div className="icon-wrapper">
                        <Link to="/wishlist" className="icon-link">
                            <i className="fas fa-star icon"></i>
                            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
                        </Link>
                    </div>

                    {/* Cart */}
                    <div className="icon-wrapper">
                        <Link to="/basket" className="icon-link">
                            <i className="fas fa-shopping-cart icon"></i>
                            {cart.length > 0 && <span className="badge">{cart.length}</span>}
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