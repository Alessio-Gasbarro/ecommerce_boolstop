import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';

export default function Videogames() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const gamesPerPage = 8;
    const totalPages = 4;

    useEffect(() => {
        axios.get('/api/games/all')
            .then(response => {
                console.log('Giochi ricevuti:', response.data); //CONSOLE LOG TEMPORANEO
                setGames(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const displayedGames = Array.isArray(games) ? games.slice(startIndex, endIndex) : [];
    console.log('Giochi mostrati (paginati):', displayedGames);//CONSOLE LOG TEMPORANEO

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <section className="most-wanted-section">
                <div className="section-header with-lines">
                    <div className="line" />
                    <h2 className="gradient-title">Tutti i Videogiochi</h2>
                    <div className="line" />
                </div>

                {loading && <div className="loading">Caricamento in corso...</div>}
                {error && <div className="error">Errore: {error}</div>}

                {!loading && !error && (
                    <div className="cards-container">
                        {displayedGames.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                )}

                {/* Paginazione */}
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-arrow"
                    >
                        ◀
                    </button>

                    {[1, 2, 3, 4].map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-arrow"
                    >
                        ▶
                    </button>
                </div>
            </section>
        </>
    );
}