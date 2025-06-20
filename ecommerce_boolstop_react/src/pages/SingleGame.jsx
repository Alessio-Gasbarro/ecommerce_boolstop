import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useCart from '../hooks/useCart';
import SingleGameCard from '../components/SingleGameCard';
import Suggested from '../components/Suggested';

export default function SingleGame() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [game, setGame] = useState(null);
    const [saleGames, setSaleGames] = useState([]);

    // Carica il gioco specifico
    useEffect(() => {
        axios.get(`http://localhost:3000/api/games/${id}`)
            .then(resp => setGame(resp.data))
            .catch(err => console.error(err));
    }, [id]);

    // Carica i giochi in offerta
    useEffect(() => {
        axios.get('http://localhost:3000/api/games/discounted')
            .then(resp => setSaleGames(resp.data))
            .catch(err => console.error(err));
    }, []);

    if (!game) return <div>Caricamento in corso...</div>;

    return (
        <>
            <SingleGameCard game={game} />

            {/* Sezione prodotti suggeriti */}
            <Suggested saleGames={saleGames} addToCart={addToCart} />
        </>
    );
}