import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';

export default function Videogames() {

    // gestione giochi
    const [games, setGames] = useState([]);
    // gestione caricamento
    const [loading, setLoading] = useState(true);
    // gestione errori
    const [error, setError] = useState(null);
    // stato per la paginazione
    const [currentPage, setCurrentPage] = useState(1);
    // stato per l'ordinamento
    const [sortType, setSortType] = useState('title-asc');
    // stato per il termine di ricerca
    const [searchTerm, setSearchTerm] = useState('');
    // stato per i risultati della ricerca
    const [searchResults, setSearchResults] = useState([]);
    // stato per la ricerca
    const [searching, setSearching] = useState(false);
    // stato per numero di giochi per pagina
    const [gamesPerPage, setGamesPerPage] = useState(9)
    //Numero di giochi per pagina
    // const gamesPerPage = 8;
    // Pagine totali
    const totalPages = Math.ceil(games.length / gamesPerPage);

    // Funzione per ottenere i parametri di ordinamento in base al tipo di ordinamento selezionato
    function getOrderParams(sortType) {
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
    }

    // Caricamento dei giochi all'avvio e al cambio dell'ordinamento
    useEffect(() => {
        if (searchTerm) return; // Non caricare se stai cercando
        setLoading(true);
        const { orderBy, direction } = getOrderParams(sortType);
        axios.get(`/api/games/advanced-search?orderBy=${orderBy}&direction=${direction}`)
            .then(response => {
                setGames(response.data.results || []);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [sortType, searchTerm]);

    // indice di inizio e fine per la paginazione
    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    // giochi da visualizzare nella pagina corrente
    const displayedGames = games.slice(startIndex, endIndex);

    // Gestione della ricerca
    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() === '') {
            setSearchResults([]);
            setLoading(true);
            const { orderBy, direction } = getOrderParams(sortType);
            axios.get(`/api/games/advanced-search?orderBy=${orderBy}&direction=${direction}`)
                .then(response => {
                    setGames(response.data.results || []);
                    setLoading(false);
                });
            return;
        }
        setSearching(true);
        try {
            const res = await axios.get(`/api/games/advanced-search?term=${encodeURIComponent(value)}`);
            setSearchResults(res.data.results || []);
            setGames(res.data.results || []);
            setCurrentPage(1);
        } catch (err) {
            setSearchResults([]);
            setGames([]);
        }
        setSearching(false);
    };

    // Gestione del cambio di pagina
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Gestione della selezione di un risultato di ricerca
    const handleSelectSearchResult = (game) => {
        setGames([game]);
        setSearchTerm('');
        setSearchResults([]);
    };

    // Reset della ricerca e caricamento dei giochi ordinati
    const resetSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setLoading(true);
        const { orderBy, direction } = getOrderParams(sortType);
        axios.get(`/api/games/advanced-search?orderBy=${orderBy}&direction=${direction}`)
            .then(response => {
                setGames(response.data.results || []);
                setLoading(false);
            });
    };

    return (
        <>
            <section className="most-wanted-section">
                <div className="section-header with-lines">
                    <div className="line" />
                    <h2 className="gradient-title">I nostri Videogiochi!</h2>
                    <div className="line" />
                </div>

                {/* SEZIONE SEARCH BAR */}
                <div className="search-section" style={{ marginBottom: 24 }}>
                    <input
                        type="text"
                        placeholder="Cerca per nome..."
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{ padding: '8px', width: '250px', marginRight: '16px' }}
                    />
                    {searching && <span>Caricamento...</span>}
                    {searchTerm && !searching && searchResults.length === 0 && (
                        <div style={{ background: '#fff', border: '1px solid #ccc', position: 'absolute', zIndex: 10, width: 250, padding: '8px' }}>
                            Nessun risultato
                        </div>
                    )}
                </div>
                {/* Pulsante per tornare all'elenco completo dei giochi */}
                {searchTerm && searchResults.length > 0 && (
                    <button onClick={resetSearch}>
                        Torna all'elenco
                    </button>
                )}

                {/* SEZIONE ORDINAMENTO */}
                <div className="sort-section" style={{ marginBottom: 24 }}>
                    <label>Ordina per:</label>
                    <select value={sortType} onChange={e => setSortType(e.target.value)}>
                        <option value="title-asc">Nome (A-Z)</option>
                        <option value="title-desc">Nome (Z-A)</option>
                        <option value="price-asc">Prezzo crescente</option>
                        <option value="price-desc">Prezzo decrescente</option>
                        <option value="release-date-desc">Più recente</option>
                        <option value="release-date-asc">Più vecchio</option>
                        <option value="discount-desc">Sconto maggiore</option>
                        <option value="discount-asc">Sconto minore</option>
                    </select>
                    {/* sezione limite giochi per pagina */}
                    <div className='sort-section margin'>
                        <label>Videogiochi per pagina:</label>
                        <select onChange={(e) => {
                            setGamesPerPage(parseInt(e.target.value));
                            setCurrentPage(1);
                        }}>
                            <option value="9">9</option>
                            <option value="18">18</option>
                            <option value="27">27</option>
                        </select>
                    </div>
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

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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