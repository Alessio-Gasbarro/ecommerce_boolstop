import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SingleGameCard({ game }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/all/${game.id}`);
    };

    return (
        <div className="sgc-card" onClick={handleClick}>
            <img src={game.image} alt={game.name} className="sgc-image" />
            <div className="sgc-info">
                <h3 className="sgc-name">{game.name}</h3>
                <p className="sgc-title">{game.title}</p>
                <div className="sgc-price">
                    {game.discount ? (
                        <>
                            <span className="sgc-original-price">€{game.price}</span>
                            <span className="sgc-discounted-price">
                                €{(game.price * (1 - game.discount)).toFixed(2)}
                            </span>
                        </>
                    ) : (
                        <span className="sgc-final-price">€{game.price}</span>
                    )}
                </div>
            </div>
        </div>
    );
}