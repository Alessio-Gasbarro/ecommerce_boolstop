import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';

export default function Videogames() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState('az'); // nuovo stato per l’ordinamento

    const gamesPerPage = 8;
    const totalPages = Math.ceil(games.length / gamesPerPage);

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

    // Funzione di ordinamento
    const getSortedGames = () => {
        let sorted = [...games];
        switch (sortType) {
            case 'az':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'za':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'date-new':
                sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                break;
            case 'date-old':
                sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
                break;
            default:
                break;
        }
        return sorted;
    };

    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const displayedGames = getSortedGames().slice(startIndex, endIndex);
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

                {/* SEZIONE ORDINAMENTO */}
                <div className="sort-section" style={{ marginBottom: 24 }}>
                    <label>Ordina per: </label>
                    <select value={sortType} onChange={e => setSortType(e.target.value)}>
                        <option value="az">Nome (A-Z)</option>
                        <option value="za">Nome (Z-A)</option>
                        <option value="price-asc">Prezzo crescente</option>
                        <option value="price-desc">Prezzo decrescente</option>
                        <option value="date-new">Più recente</option>
                        <option value="date-old">Più vecchio</option>
                    </select>
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