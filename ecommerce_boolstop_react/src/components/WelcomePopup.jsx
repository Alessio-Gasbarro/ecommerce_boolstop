import React from 'react'
import { useState, useEffect } from 'react';

const WelcomePopup = () => {

    const [isVisible, setIsVisible] = useState(true);

    const closePopup = () => setIsVisible(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500); // 0.5 sec
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <button className="close-button" onClick={closePopup}>×</button>
                <h2>Benvenuto!</h2>
                <p>Grazie per aver visitato il nostro sito! 😊</p>
                <button onClick={closePopup}>Continua</button>
                <form action="" className='form-popup'>

                    <label> Inserisci la tua mail </label>
                    <input className='input-popup' type="email" name="" id="" />
                </form>
            </div>
        </div>
    )
}

export default WelcomePopup;

