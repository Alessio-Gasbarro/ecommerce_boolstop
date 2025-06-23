import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import GameCard from '../components/GameCard';

export default function Videogames() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searching, setSearching] = useState(false);
    const [gamesPerPage, setGamesPerPage] = useState(9);

    // parametri dalla query string
    const searchTerm = searchParams.get('term') || '';
    const sortType = searchParams.get('sort') || 'title-asc';
    const currentPage = parseInt(searchParams.get('page') || '1');

    const totalPages = Math.ceil(games.length / gamesPerPage);

    // Mappa tipo di ordinamento
    function getOrderParams(type) {
        switch (type) {
            case 'title-asc': return { orderBy: 'title', direction: 'asc' };
            case 'title-desc': return { orderBy: 'title', direction: 'desc' };
            case 'price-asc': return { orderBy: 'price', direction: 'asc' };
            case 'price-desc': return { orderBy: 'price', direction: 'desc' };
            case 'release-date-asc': return { orderBy: 'release_date', direction: 'asc' };
            case 'release-date-desc': return { orderBy: 'release_date', direction: 'desc' };
            case 'discount-asc': return { orderBy: 'discount', direction: 'asc' };
            case 'discount-desc': return { orderBy: 'discount', direction: 'desc' };
            default: return { orderBy: 'title', direction: 'asc' };
        }
    }

    // Aggiorna i parametri nella URL
    const updateSearchParams = (params) => {
        const newParams = new URLSearchParams(searchParams);
        Object.entries(params).forEach(([key, value]) => {
            if (!value) {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }
        });
        setSearchParams(newParams);
    };

    // Effettua il fetch dei giochi in base a URL
    useEffect(() => {
        setLoading(true);
        const { orderBy, direction } = getOrderParams(sortType);

        const url = searchTerm
            ? `/api/games/advanced-search?term=${encodeURIComponent(searchTerm)}&orderBy=${orderBy}&direction=${direction}`
            : `/api/games/advanced-search?orderBy=${orderBy}&direction=${direction}`;

        axios.get(url)
            .then(res => {
                setGames(res.data.results || []);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [searchTerm, sortType]);

    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const displayedGames = games.slice(startIndex, endIndex);

    // Ricerca
    const handleSearch = (e) => {
        const value = e.target.value;
        updateSearchParams({ term: value, page: 1 });
        setSearching(true);
    };

    const resetSearch = () => {
        updateSearchParams({ term: '', page: 1 });
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            updateSearchParams({ page });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section className="most-wanted-section">
            <div className="section-header with-lines">
                <div className="line" />
                <h2 className="gradient-title">I nostri Videogiochi!</h2>
                <div className="line" />
            </div>

            {/* SEARCH */}
            <div className="search-section" style={{ marginBottom: 24 }}>
                <input
                    type="text"
                    placeholder="Cerca per nome..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ padding: '8px', width: '250px', marginRight: '16px' }}
                />
                {searching && <span>Caricamento...</span>}
                {searchTerm && !searching && games.length === 0 && (
                    <div style={{
                        background: '#fff', border: '1px solid #ccc',
                        position: 'absolute', zIndex: 10, width: 250, padding: '8px'
                    }}>
                        Nessun risultato
                    </div>
                )}
            </div>

            {searchTerm && games.length > 0 && (
                <button onClick={resetSearch}>Torna all'elenco</button>
            )}

            {/* ORDINAMENTO + GIOCHI PER PAGINA */}
            <div className="sort-section" style={{ marginBottom: 24 }}>
                <label>Ordina per:</label>
                <select value={sortType} onChange={e => updateSearchParams({ sort: e.target.value, page: 1 })}>
                    <option value="title-asc">Nome (A-Z)</option>
                    <option value="title-desc">Nome (Z-A)</option>
                    <option value="price-asc">Prezzo crescente</option>
                    <option value="price-desc">Prezzo decrescente</option>
                    <option value="release-date-desc">Più recente</option>
                    <option value="release-date-asc">Più vecchio</option>
                    <option value="discount-desc">Sconto maggiore</option>
                    <option value="discount-asc">Sconto minore</option>
                </select>

                <div className="sort-section margin">
                    <label>Videogiochi per pagina:</label>
                    <select onChange={(e) => {
                        setGamesPerPage(parseInt(e.target.value));
                        updateSearchParams({ page: 1 });
                    }}>
                        <option value="9">9</option>
                        <option value="18">18</option>
                        <option value="27">27</option>
                    </select>
                </div>
            </div>

            {/* RISULTATI */}
            {loading && <div className="loading">Caricamento in corso...</div>}
            {error && <div className="error">Errore: {error}</div>}

            {!loading && !error && (
                <div className="cards-container">
                    {displayedGames.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            )}

            {/* PAGINAZIONE */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-arrow"
                >◀</button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
                >▶</button>
            </div>
        </section>
    );
}
