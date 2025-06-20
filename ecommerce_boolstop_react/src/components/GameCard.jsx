import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

export default function GameCard({ game }) {
    const { addToCart } = useCart();

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
                <Link to={`/all/${game.id}`}>
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
                <button className="add-to-cart-btn biggerbuy" onClick={() => addToCart(game, 1)}>Acquista</button>
                <button className="add-to-cart-btn biggerbuy">Wishlist</button>
            </div>
        </div>
    );
}