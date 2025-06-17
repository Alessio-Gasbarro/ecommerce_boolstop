import React, { useEffect, useRef } from 'react';

const Shipping = () => {
    const btnRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (btnRef.current) {
                btnRef.current.classList.add('vibrate');
                setTimeout(() => {
                    btnRef.current.classList.remove('vibrate');
                }, 2000);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="shipping-banner">
            <div className="shipping-text">
                Spedizione gratuita per ordini superiori a 25€!
            </div>
            <a href="#" className="shipping-button">
                <div ref={btnRef} className="btn">ACQUISTA TUTTO AAAAAAAAAA</div>
            </a>
        </div>
    );
};

export default Shipping;
