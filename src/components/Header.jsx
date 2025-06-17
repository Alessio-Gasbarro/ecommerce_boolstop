import React from 'react';
import { Link } from 'react-router-dom';
import logoBoolStop from '../assets/logoBoolStop.png';

export default function Header() {
    return (
        <div className="header-wrapper">
            <header className="header">
                <div className="logo">
                    <img src={logoBoolStop} alt="Logo BoolStop" />
                    <h1>BoolStop</h1>
                </div>
                <nav className="icons">
                    <a href="#"><i className="fas fa-user"></i></a>
                    <a href="#"><i className="fas fa-shopping-cart"></i></a>
                    <a href="#"><i className="fas fa-headset"></i></a>
                </nav>
            </header>
        </div>
    );
}