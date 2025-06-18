import React from 'react';
import Header from '../components/Header';
import videogamesImg from '../assets/gaming.png';
import { mostWanted, newArrivals } from '../data/data';
import Shipping from '../components/Shipping';
import Footer from '../components/Footer';;
import { Link } from 'react-router-dom';

export default function Home() {
    //Questa const Serve per la "Sezione 3 Bottoni"
    const cardItems = [
        { img: videogamesImg, alt: "Videogames", title: "Scopri qui, tutti i VideoGames!", link: "/videogames" }
    ];

    return (
        <>
            <Header />
            <div className="width-300">
                <Shipping />
            </div>
            {/*Sezione Tasto per pagina VideoGames*/}
            <section className="image-grid">
                {cardItems.map((item, index) => (
                    <div key={index}>
                        <Link to={item.link} className="gradient-border nocol">
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
                    <h2 className="gradient-title">Nuovi Arrivi Popolari</h2>
                    <div className="line" />
                </div>

                <div className="cards-container">
                    {newArrivals.slice(0, 8).map((game) => (
                        <div className="game-card" key={game.title}>
                            <img src={game.image} alt={game.title} className="game-image" />
                            <div className="game-content">
                                <h3 className="game-title">{game.title}</h3>
                                <div className="price-section">
                                    <span className="current-price">€{game.price.toFixed(2)}</span>
                                    {game.discount > 0 && (
                                        <span className="original-price">€{game.originalPrice.toFixed(2)}</span>
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

            {/*Sezione Most Wanted*/}
            <section className="most-wanted-section">
                <div className="section-header with-lines">
                    <div className="line" />
                    <h2 className="gradient-title">Best Sellers</h2>
                    <div className="line" />
                </div>

                <div className="cards-container">
                    {mostWanted.slice(0, 8).map((game) => (
                        <div className="game-card" key={game.title}>
                            <img src={game.image} alt={game.title} className="game-image" />
                            <div className="game-content">
                                <h3 className="game-title">{game.title}</h3>
                                <div className="price-section">
                                    <span className="current-price">€{game.price.toFixed(2)}</span>
                                    {game.discount > 0 && (
                                        <span className="original-price">€{game.originalPrice.toFixed(2)}</span>
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

            <Footer />
        </>
    );
}