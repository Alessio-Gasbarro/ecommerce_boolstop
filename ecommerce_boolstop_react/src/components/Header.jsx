import React from 'react';
import { Link } from 'react-router-dom';
import logoBoolStop from '../assets/logoBoolStop.png';

export default function Header() {
    return (
        <div className="header-wrapper">
            <header className="header">
                <Link to="/">
                    <div className="logo">
                        <img src={logoBoolStop} alt="Logo BoolStop" />
                        <h1>BoolStop</h1>
                    </div>
                </Link>
                <nav className="icons">
                    <input
                        type="text"
                        placeholder="Cerca..."
                        className="search-bar"
                    />
                    <a href="#"><i className="fas fa-shopping-cart"></i></a>
                </nav>
            </header>
        </div>
    );
}