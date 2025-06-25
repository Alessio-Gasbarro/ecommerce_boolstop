import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import { useNotification } from './NotificationContext';

export default function GameCard({ game }) {
    const { cart, addToCart, setQuantity } = useCart();
    const { addToWishlist } = useWishlist();
    const { setMessage } = useNotification();

    const cartItem = cart.find(item => item.id === game.id);

    const price = parseFloat(game.price);
    const discount = parseFloat(game.discount);

    const originalPrice = discount > 0
        ? price / (1 - discount / 100)
        : price;

    return (
        <div className="game-card-horizontal">
            <img
                src={game.image}
                alt={game.name}
                className="game-image-horizontal"
            />

            <div className="game-info">
                <h3 className="game-title2">{game.name}</h3>
                <Link to={`/all/${game.slug}`}>
                    <button className="add-to-cart-btn biggerbuy">Vai al gioco!</button>
                </Link>
            </div>

            <div className="price-display">
                <h3>Acquista ora!</h3>
                <h3>Oggi a soli:</h3>
                <span className="current-price-large">€{price.toFixed(2)}</span>
                {discount > 0 && (
                    <span className="original-price">€{originalPrice.toFixed(2)}</span>
                )}
            </div>

            <div className="action-buttons">
                {cartItem ? (
                    <div style={{ display: 'inline-block' }}>
                        <label>
                            Quantità:
                            <input
                                type="number"
                                min="0"
                                value={cartItem.quantity}
                                onChange={e => setQuantity(game.id, parseInt(e.target.value) || 0)}
                                style={{ width: '60px', marginLeft: '8px' }}
                            />
                        </label>
                        <button
                            className="btn btn-danger"
                            style={{ marginLeft: 10 }}
                            onClick={() => setQuantity(game.id, 0)}
                        >
                            Rimuovi
                        </button>
                    </div>
                ) : (
                    <button
                        className="add-to-cart-btn biggerbuy"
                        onClick={() => {
                            addToCart(game, 1);
                            setMessage(`🎮 ${game.name} aggiunto con successo! 🎉`);
                        }}
                    >
                        Aggiungi <i className="fa-solid fa-cart-plus"></i>
                    </button>
                )}
                <button
                    className="add-to-cart-btn biggerbuy"
                    onClick={() => {
                        addToWishlist(game);
                        setMessage(`🎮 ${game.name} aggiunto con successo! 🎉`);
                    }}
                >
                    Wishlist <i className="fa-solid fa-star"></i>
                </button>
            </div>
        </div>
    );
}