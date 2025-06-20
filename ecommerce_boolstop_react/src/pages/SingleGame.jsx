import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function GameDetailPage() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchGame() {
            try {
                const res = await axios.get(`http://localhost:3000/api/games/${id}`);
                setGame(res.data);
            } catch (err) {
                setError("Impossibile caricare il gioco.");
            } finally {
                setLoading(false);
            }
        }
        fetchGame();
    }, [id]);

    if (loading) return <div className="gdp-loading">Caricamento...</div>;
    if (error) return <div className="gdp-error">{error}</div>;
    if (!game) return <div className="gdp-error">Gioco non trovato.</div>;

    return (
        <div className="gdp-container">
            <div className="gdp-card">
                <div className="gdp-content">
                    <img
                        src={game.img}
                        alt={game.name}
                        className="gdp-image"
                    />
                    <div className="gdp-details">
                        <h1 className="gdp-name">{game.name}</h1>
                        <p className="gdp-title">{game.title}</p>
                        <div className="gdp-price">
                            {game.discount ? (
                                <>
                                    <span className="gdp-original-price">€{game.price}</span>
                                    <span className="gdp-discounted-price">€{(game.price * (1 - game.discount)).toFixed(2)}</span>
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
    );
}