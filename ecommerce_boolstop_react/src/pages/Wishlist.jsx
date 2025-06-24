import React, { useState, useEffect } from 'react';
import useWishlist from '../hooks/useWishlist';
import useCart from '../hooks/useCart';
import axios from 'axios';
import Suggested from '../components/Suggested';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    const { cart, addToCart } = useCart();

    const [saleGames, setSaleGames] = useState([]);


    const fetchSaleGames = () => {
        axios.get('http://localhost:3000/api/games/new-releases?limit=4')
            .then(resp => {
                setSaleGames(resp.data);
            })
            .catch(err => {
                console.log('Errore fetch giochi in sconto:', err);
            });
    };

    useEffect(() => {
        fetchSaleGames();
    }, []);

    const isWishlistEmpty = wishlist.length === 0;

    return (
        <>
            <section className="most-wanted-section wishlist-section">
                <div className="section-header with-lines">
                    <div className="line" />
                    <h2 className="gradient-title">La tua personale Wishlist!</h2>
                    <div className="line" />
                </div>

                <div className="wishlist-content">
                    {isWishlistEmpty ? (
                        <div className="empty-wishlist">
                            <p>La tua lista dei desideri è vuota. Aggiungi un gioco per iniziare!</p>
                        </div>
                    ) : (
                        <div className="wishlist-grid">
                            {wishlist.map((game) => (
                                <div key={game.id} className="wishlist-card large">
                                    {game.image && (
                                        <img
                                            src={game.image}
                                            alt={game.name}
                                            className="wishlist-game-image"
                                        />
                                    )}
                                    <div className="wishlist-info">
                                        <h3 className="game-name">{game.name}</h3>
                                        <p className="game-price">€{Number(game.price).toFixed(2)}</p>
                                    </div>
                                    <div className="wishlist-actions">
                                        <button onClick={() => addToCart(game)}>Aggiungi al carrello</button>
                                        <button onClick={() => removeFromWishlist(game.id)}>Rimuovi</button>
                                    </div>
                                </div>
                            ))}

                            <div className="clear-wishlist">
                                <button onClick={clearWishlist}>Svuota lista desideri</button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {saleGames.length > 0 && (
                <Suggested saleGames={saleGames} addToCart={addToCart} />
            )}

            <div className="most-wanted-section">
                <Link to={`/all`} className="">Esplora altro</Link>
                <Link to={`/`} className="">Torna a HomePage</Link>
            </div>
        </>
    );
};

export default Wishlist;