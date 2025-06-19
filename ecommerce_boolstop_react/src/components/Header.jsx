import React from 'react';
import { Link } from 'react-router-dom';
import logoBoolStop from '../assets/logoBoolStop.png';

export default function Header() {
    return (
        <div className="header-wrapper">
            <header className="header">
                <Link to="/" className="logo">
                    <img src={logoBoolStop} alt="Logo BoolStop" />
                    <span className="logo-text">BoolStop</span>
                </Link>
                <nav className="icons">
                    <input
                        type="text"
                        placeholder="Cerca..."
                        className="search-bar"
                    />
                    <Link to="/basket"><i className="fas fa-shopping-cart"></i></Link>
                </nav>
            </header>
        </div >
    );
}