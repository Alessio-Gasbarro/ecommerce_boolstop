import React, { useEffect, useRef } from 'react';

const Shipping = () => {
    const textRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (textRef.current) {
                    textRef.current.classList.add('vibrate');
                    setTimeout(() => {
                        if (textRef.current) {
                            textRef.current.classList.remove('vibrate');
                        }
                    }, 1000);
                }
            }, 2000);

            return () => clearInterval(interval);
        }, 0);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="shipping-banner">
            <div ref={textRef} className="shipping-text">
                Spedizione gratuita per ordini superiori a 25€!
            </div>
            <a href="#" className="shipping-button">
                <div ref={btnRef} className="btn">ACQUISTA TUTTO</div>
            </a>
        </div>
    )
};

export default Shipping;