import React from 'react';
import { Link } from 'react-router-dom';

const Suggested = ({ saleGames, addToCart }) => {
    return (
        <section className="most-wanted-section">
            <div className="section-header with-lines">
                <div className="line" />
                <h2 className="gradient-title">Altri prodotti che potrebbero interessarti...</h2>
                <div className="line" />
            </div>

            <div className="cards-container">
                {(saleGames || []).map((game) => (
                    <Link to={`/all/${game.slug}`} key={game.slug} className="game-card-link">
                        <div className="game-card">
                            <img src={game.image} alt={game.name} className="game-image" />
                            <div className="game-content">
                                <h3 className="game-title">{game.name}</h3>
                                <div className="price-section">
                                    <span className="current-price">
                                        €{(game.price * (1 - game.discount)).toFixed(2)}
                                    </span>
                                    {game.discount > 0 && (
                                        <span className="original-price2">
                                            €{Number(game.price).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <button className="add-to-cart-btn" onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addToCart(game, 1);
                                }}
                                >Aggiungi al Carrello!</button>
                                {game.discount > 0 && (
                                    <div className="discount-tag">
                                        -{Math.round(game.discount * 100)}%
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Suggested;