import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useCart from '../hooks/useCart';
import SingleGameCard from '../components/SingleGameCard';
import Suggested from '../components/Suggested';
import { Link } from 'react-router-dom';

export default function SingleGame() {
    const { slug } = useParams();
    const { addToCart } = useCart();

    const [game, setGame] = useState(null);
    const [saleGames, setSaleGames] = useState([]);

    // Carica il gioco specifico
    useEffect(() => {
        axios.get(`http://localhost:3000/api/games/${slug}`)
            .then(resp => setGame(resp.data))
            .catch(err => console.error(err));
    }, [slug]);

    // Carica i giochi in offerta
    useEffect(() => {
        axios.get('http://localhost:3000/api/games/new-releases?limit=4')
            .then(resp => setSaleGames(resp.data))
            .catch(err => console.error(err));
    }, []);

    if (!game) return <div>Caricamento in corso...</div>;

    return (
        <>
            <SingleGameCard game={game} />

            {/* Sezione prodotti suggeriti */}
            <Suggested saleGames={saleGames} addToCart={addToCart} />

            <div className="go-back-wrapper">
                <div className="go-back-buttons">
                    <Link to={`/all`} className="go-back-fancy">Esplora altro</Link>
                    <Link to={`/`} className="go-back-fancy">Torna a HomePage</Link>
                </div>
            </div>
        </>
    );
}