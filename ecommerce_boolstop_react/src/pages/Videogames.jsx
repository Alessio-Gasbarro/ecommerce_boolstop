import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'


const Videogames = () => {

    return (

        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="cards-container">
                            <div className="game-card">
                                <img className="game-image" />
                                <div className="game-content">
                                    <h3 className="game-title"></h3>
                                    <div className="price-section">
                                        <span className="current-price">€</span>
                                        <span className="original-price">€</span>
                                    </div>
                                    <button className="add-to-cart-btn">ADD TO CART</button>
                                    0 && (
                                    <div className="discount-tag">-%</div>
                                    )
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Videogames
