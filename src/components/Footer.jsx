import React from "react";
import safesecure from '../assets/safesecure.png';
import logoBoolStop from '../assets/logoBoolStop.png';

const Footer = () => {
    return (
        <footer className="footer">
            {/*Parte superiore*/}
            <div className="footer-top">
                <div className="footer-col">
                    <ul>
                        <li><h3>Informazioni Generali</h3></li>
                        <li><a href="#">Link Chi siamo</a></li>
                        <li><a href="#">Link Informazione Spedizione</a></li>
                        <li><a href="#">Link 3 </a></li>
                    </ul>
                </div>

                <div className="footer-col payment-icons">
                    <div>
                        <h3>Accettiamo questi pagamenti</h3>
                    </div>
                    <div>
                        <i className="fab fa-cc-visa"></i>
                        <i className="fab fa-cc-mastercard"></i>
                        <i className="fab fa-cc-paypal"></i>
                        <i className="fab fa-google-pay"></i>
                        <i className="fab fa-apple-pay"></i>
                    </div>
                </div>

                <div className="footer-col">
                    <img
                        src={safesecure}
                        alt="Promo/Info"
                        width="215"
                        height="125"
                    />
                </div>
            </div>

            {/*Parte inferiore*/}
            <div className="footer-bottom">
                <div className="footer-col logo">
                    <img src={logoBoolStop} alt="Logo" width="100" />
                    <span className="site-name">BoolStop</span>
                </div>

                <div className="footer-col copyright">
                    ©2025-2025 BoolStop. All rights reserved.
                </div>

                <div className="footer-col social-icons">
                    <a href="#"><i className="fab fa-tiktok"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;