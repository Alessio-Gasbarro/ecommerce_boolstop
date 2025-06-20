import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoBoolStop from '../assets/logoBoolStop.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Header() {

    // Stato per il carrello
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    // Stato per la ricerca
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const navigate = useNavigate();

    // Gestione del click su un risultato di ricerca
    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() === '') {
            setSearchResults([]);
            return;
        }
        setSearching(true);
        try {
            const res = await axios.get(`/api/games/autocomplete?term=${encodeURIComponent(value)}`);
            setSearchResults(res.data.results || []);
        } catch (err) {
            setSearchResults([]);
        }
        setSearching(false);
    };

    // Quando clicchi su un risultato
    const handleSelectSearchResult = (game) => {
        setSearchTerm('');
        setSearchResults([]);
        navigate(`/all/${game.id}`);
    };

    // Gestione della ricerca
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
                                Nessun risultato
                            </div>
                        )}
                    </div>
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
