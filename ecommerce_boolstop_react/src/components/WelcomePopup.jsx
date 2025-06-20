import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const WelcomePopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const form = useRef();

    // Controllo all'avvio
    useEffect(() => {
        const alreadyVisited = sessionStorage.getItem('popup_shown');
        if (!alreadyVisited) {
            setTimeout(() => setIsVisible(true), 500); // leggero delay
        }
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        sessionStorage.setItem('popup_shown', 'true');
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
                user_email: email,
                to_email: email
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then(() => {
                alert('Grazie! Email inviata con successo.');
                closePopup(); // chiude e salva su localStorage
            })
            .catch(() => {
                alert('Errore durante l\'invio della mail.');
            });
    };

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <button className="close-button" onClick={closePopup}>×</button>
                <h2>Benvenuto!</h2>
                <p>Grazie per aver visitato il nostro sito! 😊</p>

                <form onSubmit={sendEmail} ref={form} className="form-popup">
                    <label>Inserisci la tua mail</label>
                    <input
                        className="input-popup"
                        type="email"
                        name="user_email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Continua</button>
                </form>
            </div>
        </div>
    );
};

export default WelcomePopup;
