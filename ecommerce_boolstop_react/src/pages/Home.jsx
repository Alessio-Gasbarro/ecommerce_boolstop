import { useState } from 'react';
import videogamesImg from '../assets/gaming.png';
import Shipping from '../components/Shipping';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";
import WelcomePopup from '../components/WelcomePopup';
import useCart from '../hooks/useCart';
import { useNotification } from '../components/NotificationContext';

export default function Home() {

    // custom hook per gestire il carrello
    const { addToCart } = useCart();

    //Questa const Serve per la "Sezione bottone scopri tutti i giochi"
    const cardItems = [
        { img: videogamesImg, alt: "Videogames", title: "Scopri tutti VideoGames!", link: "" }
    ];

    const { setMessage } = useNotification();

    // variabile che contiene i giochi in offerta
    const [saleGames, setSaleGames] = useState([])

    // funzione che effettua una chiamata ajax per i giochi in offerta
    const fetchSaleGames = () => {
        axios
            .get('http://localhost:3000/api/games/advanced-search?discounted=true')
            .then((resp) => {
                setSaleGames(resp.data.results || []);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // variabile che contiene gli utlimi arrivi
    const [latestGames, setLatestGames] = useState([]);

    // funzione che recupera gli ultimi arrivi 
    const fetchLatestGames = () => {
        axios
            .get('http://localhost:3000/api/games/advanced-search?orderBy=release_date&direction=desc&limit=4')
            .then((resp) => {
                setLatestGames(resp.data.results || []);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => { fetchSaleGames(); fetchLatestGames(); }, []);

    return (
        <>
            <WelcomePopup />
            <div className="centering">
                <Shipping />
            </div>
            {/*Sezione Tasto per pagina VideoGames*/}
            <section className="image-grid">
                {cardItems.map((item, index) => (
                    <div key={index}>
                        <Link to={'/all'} className="gradient-border nocol">
                            <div className="card-inner">
                                <img src={item.img} alt={item.alt} className="card-img" />
                                <h3>{item.title}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </section>

            {/*Sezione Nuovi Arrivi*/}
            <section className="most-wanted-section">
                <div className="section-header with-lines">
                    <div className="line" />
                    <h2 className="gradient-title">Nuove uscite</h2>
                    <div className="line" />
                </div>

                <div className="cards-container">
                    {latestGames.map((game) => (
                        <Link to={`/all/${game.slug}`} key={game.id} className="game-card-link">
                            <div className="game-card" key={game.name}>
                                <img src={game.image} alt={game.name} className="game-image" />
                                <div className="game-content">
                                    <h3 className="game-title">{game.name}</h3>
                                    <div className="price-section">
                                        <span className="current-price">
                                            €{(game.price * (1 - game.discount)).toFixed(2)}
                                        </span>
                                        {game.discount > 0 && (
                                            <span className="original-price2">
                                                €{Number(game.price).toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <button className="add-to-cart-btn" onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToCart(game, 1);
                                        setMessage(`🎮 ${game.name} aggiunto con successo! 🎉`);
                                    }}
                                    >Aggiungi al Carrello!</button>
                                    {game.discount > 0 && (
                                        <div className="discount-tag">-{game.discount}%</div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/*Sezione in offerta*/}
            <section className="most-wanted-section">
                <div className="section-header with-lines">
                    <div className="line" />
                    <h2 className="gradient-title">In offerta</h2>
                    <div className="line" />
                </div>

                <div className="cards-container">
                    {saleGames.map((game) => (
                        <Link to={`/all/${game.slug}`} key={game.id} className="game-card-link">
                            <div className="game-card" key={game.id}>
                                <img src={game.image} alt={game.name} className="game-image" />
                                <div className="game-content">
                                    <h3 className="game-title">{game.name}</h3>
                                    <div className="price-section">
                                        <span className="current-price">
                                            €{(game.price * (1 - game.discount)).toFixed(2)}
                                        </span>
                                        {game.discount > 0 && (
                                            <span className="original-price2">
                                                €{Number(game.price).toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    <button className="add-to-cart-btn" onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToCart(game, 1);
                                        setMessage(`🎮 ${game.name} aggiunto con successo! 🎉`);
                                    }}
                                    >Aggiungi al Carrello!</button>
                                    {game.discount > 0 && (
                                        <div className="discount-tag">
                                            -{Math.round(game.discount * 100)}%
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}