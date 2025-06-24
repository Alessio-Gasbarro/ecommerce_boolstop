import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import { useSearchParams } from 'react-router-dom';

export default function Videogames() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Funzioni utili
    const getParam = (key, defaultValue = '') => searchParams.get(key) || defaultValue;
    const getBoolParam = (key) => searchParams.get(key) === 'true';

    // Parametri letti dall'URL
    const selectedGenre = getParam('genre');
    const showDiscounted = getBoolParam('discounted');
    const minPrice = getParam('minPrice');
    const maxPrice = getParam('maxPrice');
    const sortType = getParam('sort', 'title-asc');
    const searchTerm = getParam('term');
    const currentPage = parseInt(getParam('page', '1'));
    const gamesPerPage = parseInt(getParam('limit', '9'));

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const totalPages = Math.ceil(games.length / gamesPerPage);
    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const displayedGames = games.slice(startIndex, endIndex);

    // Funzione per aggiornare i parametri URL
    const updateParams = (updates) => {
        const newParams = new URLSearchParams(searchParams);
        for (const [key, value] of Object.entries(updates)) {
            if (value === '' || value === null || value === undefined) {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }
        }
        setSearchParams(newParams);
    };

    const getOrderParams = (sortType) => {
        switch (sortType) {
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
    };

    // Caricamento giochi in base ai parametri
    useEffect(() => {
        setLoading(true);
        setError(null);
        const { orderBy, direction } = getOrderParams(sortType);
        let query = `/api/games/advanced-search?orderBy=${orderBy}&direction=${direction}`;

        if (selectedGenre) query += `&genre=${encodeURIComponent(selectedGenre)}`;
        if (showDiscounted) query += `&discounted=true`;
        if (minPrice) query += `&minPrice=${minPrice}`;
        if (maxPrice) query += `&maxPrice=${maxPrice}`;
        if (searchTerm) query += `&term=${encodeURIComponent(searchTerm)}`;

        axios.get(query)
            .then(response => {
                setGames(response.data.results || []);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [selectedGenre, showDiscounted, minPrice, maxPrice, sortType, searchTerm]);

    return (
        <section className="most-wanted-section">
            <div className="section-header with-lines">
                <div className="line" />
                <h2 className="gradient-title">I nostri Videogiochi!</h2>
                <div className="line" />
            </div>

            {/* SEARCH */}
            <div className="mbf-filters-wrapper">
                <div className="mbf-search-section">
                    <input
                        type="text"
                        placeholder="Cerca per nome..."
                        value={searchTerm}
                        onChange={(e) => updateParams({ term: e.target.value, page: 1 })}
                        className="mbf-search-input"
                    />
                    {searchTerm && (
                        <button
                            className="mbf-clear-search-button"
                            onClick={() => updateParams({ term: '', page: 1 })}
                        >
                            Torna all'elenco
                        </button>
                    )}
                </div>

                {/* SORTING */}
                <div className="mbf-sort-section">
                    <label>Ordina per:</label>
                    <select
                        value={sortType}
                        onChange={(e) => updateParams({ sort: e.target.value, page: 1 })}
                        className="mbf-styled-select"
                    >
                        <option value="title-asc">Nome (A-Z)</option>
                        <option value="title-desc">Nome (Z-A)</option>
                        <option value="price-asc">Prezzo crescente</option>
                        <option value="price-desc">Prezzo decrescente</option>
                        <option value="release-date-desc">Più recente</option>
                        <option value="release-date-asc">Più vecchio</option>
                        <option value="discount-desc">Sconto maggiore</option>
                        <option value="discount-asc">Sconto minore</option>
                    </select>

                    <label>Videogiochi per pagina:</label>
                    <select
                        value={gamesPerPage}
                        onChange={(e) => updateParams({ limit: e.target.value, page: 1 })}
                        className="mbf-styled-select"
                    >
                        <option value="9">9</option>
                        <option value="18">18</option>
                        <option value="27">27</option>
                    </select>
                </div>

                {/* FILTERS */}
                <div className="mbf-filter-section">
                    <label>Genere:</label>
                    <select
                        value={selectedGenre}
                        onChange={(e) => updateParams({ genre: e.target.value, page: 1 })}
                        className="mbf-styled-select"
                    >
                        <option value="">Tutti</option>
                        <option value="RPG">RPG</option>
                        <option value="Azione">Azione</option>
                        <option value="Sport">Sport</option>
                    </select>

                    <label className="mbf-checkbox-label">
                        <input
                            type="checkbox"
                            checked={showDiscounted}
                            onChange={(e) => updateParams({ discounted: e.target.checked })}
                        />
                        Solo scontati
                    </label>

                    <div className="mbf-price-range">
                        <label>Prezzo min:</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => updateParams({ minPrice: e.target.value })}
                            style={{ width: 60 }}
                            min={0}
                            className="mbf-price-input"
                        />
                        <label>Prezzo max:</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => updateParams({ maxPrice: e.target.value })}
                            style={{ width: 60 }}
                            min={0}
                            className="mbf-price-input"
                        />
                    </div>
                </div>
            </div>

            {/* LOADING / ERROR / RESULTS */}
            {loading && <div className="loading">Caricamento in corso...</div>}
            {error && <div className="error">Errore: {error}</div>}

            {!loading && !error && (
                <div className="cards-container">
                    {displayedGames.map((game) => (
                        <GameCard key={game.slug} game={game} />
                    ))}
                </div>
            )}

            {/* PAGINATION */}
            <div className="pagination">
                <button
                    onClick={() => updateParams({ page: currentPage - 1 })}
                    disabled={currentPage === 1}
                    className="pagination-arrow"
                >
                    ◀
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => updateParams({ page })}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => updateParams({ page: currentPage + 1 })}
                    disabled={currentPage === totalPages}
                    className="pagination-arrow"
                >
                    ▶
                </button>
            </div>
        </section>
    )
}
