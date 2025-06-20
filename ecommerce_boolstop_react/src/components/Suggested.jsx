import React from 'react';

const Suggested = ({ saleGames, addToCart }) => {
    return (
        <section className="most-wanted-section">
            <div className="section-header with-lines">
                <div className="line" />
                <h2 className="gradient-title">Altri prodotti che potrebbero piacerti...</h2>
                <div className="line" />
            </div>

            <div className="cards-container">
                {saleGames.map((game) => (
                    <div className="game-card" key={game.id}>
                        <img src={game.image} alt={game.name} className="game-image" />
                        <div className="game-content">
                            <h3 className="game-title">{game.name}</h3>
                            <div className="price-section">
                                <span className="current-price">
                                    €{(game.price * (1 - game.discount)).toFixed(2)}
                                </span>
                                {game.discount > 0 && (
                                    <span className="original-price">
                                        €{Number(game.price).toFixed(2)}
                                    </span>
                                )}
                            </div>
                            <button
                                className="add-to-cart-btn"
                                onClick={() => addToCart(game, 1)}
                            >
                                ADD TO CART
                            </button>
                            {game.discount > 0 && (
                                <div className="discount-tag">
                                    -{Math.round(game.discount * 100)}%
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Suggested;