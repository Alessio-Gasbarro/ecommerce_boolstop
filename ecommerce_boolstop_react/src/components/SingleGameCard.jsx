import React from 'react';

export default function SingleGameCard({ game }) {
    if (!game) return null;

    return (
        <>
            <section className="most-wanted-section">

                <div className="section-header with-lines">
                    <div className="line" />
                    <h2 className="gradient-title">{game.name}</h2>
                    <div className="line" />
                </div>
                <div className="gdp-container">
                    <div className="gdp-card">
                        <div className="gdp-content">
                            <img
                                src={game.image}
                                alt={game.name}
                                className="gdp-image"
                            />
                            <div className="gdp-details">
                                <h1 className="gdp-name">{game.name}</h1>

                                <p className="gdp-title">{game.description}</p>
                                <div className="gdp-price">
                                    {game.discount ? (
                                        <>
                                            <p className='gdp-title'>{game.genre}</p>
                                            <span className="gdp-original-price">€{game.price}</span>
                                            <span className="gdp-discounted-price">
                                                €{(game.price * (1 - game.discount)).toFixed(2)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="gdp-final-price">€{game.price}</span>
                                    )}
                                </div>
                                {game.discount && (
                                    <div className="gdp-discount-info">
                                        Sconto del {Math.round(game.discount * 100)}%
                                    </div>
                                )}
                                <button className="gdp-buy-button">
                                    Acquista Ora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}