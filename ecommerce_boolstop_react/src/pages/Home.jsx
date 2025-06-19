import React, { useState } from 'react';
import Header from '../components/Header';
import videogamesImg from '../assets/gaming.png';
import { mostWanted, newArrivals } from '../data/data';
import Shipping from '../components/Shipping';
import Footer from '../components/Footer';;
import { Link } from 'react-router-dom';
import Videogames from './Videogames';
import { useEffect } from 'react';
import axios from "axios";

export default function Home() {
    //Questa const Serve per la "Sezione bottone scopri tutti i giochi"
    const cardItems = [
        { img: videogamesImg, alt: "Videogames", title: "Scopri qui, tutti i VideoGames!", link: "" }
    ];

    // variabile che contiene i giochi in offerta
    const [saleGames, setSaleGames] = useState([])

    // funzione che effettua una chiamata ajax per i giochi in offerta
    const fetchSaleGames = () => {
        axios.get('http://localhost:3000/api/games/discounted').then((resp) => {
            setSaleGames(resp.data)
        }).catch((err) => { console.log(err) })
    }

    // variabile che contiene gli utlimi arrivi
    const [latestGames, setLatestGames] = useState([]);

    // funzione che recupera gli ultimi arrivi 
    const fetchLatestGames = () => {
        axios.get('http://localhost:3000/api/games/new-releases?limit=4').then((resp) => {
            setLatestGames(resp.data)
        }).catch((err) => { console.log(err) })
    }

    useEffect(() => { fetchSaleGames(); fetchLatestGames(); }, []);

    return (
        <>
            <div className="width-300">
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
                        <div className="game-card" key={game.name}>
                            <img src={game.image} alt={game.name} className="game-image" />
                            <div className="game-content">
                                <h3 className="game-title">{game.name}</h3>
                                <div className="price-section">
                                    <span className="current-price">€{game.price}</span>
                                    {game.discount > 0 && (
                                        <span className="original-price">€{game.originalPrice}</span>
                                    )}
                                </div>
                                <button className="add-to-cart-btn">ADD TO CART</button>
                                {game.discount > 0 && (
                                    <div className="discount-tag">-{game.discount}%</div>
                                )}
                            </div>
                        </div>
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
                        <div className="game-card" key={game.id}>
                            <img src={game.image} alt={game.name} className="game-image" />
                            <div className="game-content">
                                <h3 className="game-title">{game.name}</h3>
                                <div className="price-section">
                                    <span className="current-price">{game.price}</span>
                                    {game.discount > 0 && (
                                        <span className="original-price">{game.originalPrice}<i class="fa-solid fa-euro-sign"></i></span>
                                    )}
                                </div>
                                <button className="add-to-cart-btn">ADD TO CART</button>
                                {game.discount > 0 && (
                                    <div className="discount-tag">-{game.discount}%</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}