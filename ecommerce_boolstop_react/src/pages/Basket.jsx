import React from 'react'
import { Link } from 'react-router-dom';

const order_items = [
    {
        id: 1,
        name: "Elden Ring",
        description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        genre: "RPG, Souls-like",
        image: "image.jpg",
        discount: null,
        release_date: "2024-10-12",
        price: 50
    },
    {
        id: 2,
        name: "Elden Ring",
        description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        genre: "RPG",
        image: "image.jpg",
        discount: 0.8,
        release_date: "2024-10-12",
        price: 50
    },
    {
        id: 3,
        name: "Elden Ring",
        description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        genre: "RPG",
        image: "image.jpg",
        discount: 0.3,
        release_date: "2024-10-12",
        price: 50
    },
    {
        id: 4,
        name: "Elden Ring",
        description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        genre: "RPG",
        image: "image.jpg",
        discount: null,
        release_date: "2024-10-12",
        price: 40
    },
    {
        id: 5,
        name: "Elden Ring",
        description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        genre: "RPG",
        image: "image.jpg",
        discount: 0.5,
        release_date: "2024-10-12",
        price: 30
    },
]

// Calcolo per il prezzo scontato
const getDiscountedPrice = (item) => {
    if (!item.discount) return item.price; //se non c'è lo sconto, ritorna il prezzo intero
    // Altrimenti calcola il prezzo scontato
    return (item.price * (1 - item.discount)).toFixed(2);
};

// Calcolo per il prezzo totale
const getTotalPrice = () => {
    return order_items.reduce((acc, item) => acc + (item.discount ? item.price * (1 - item.discount) : item.price), 0).toFixed(2);
    // Somma il prezzo di tutti gli item, applicando lo sconto se presente
};

const Basket = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <h1 className='text-light'>Il tuo Carrello</h1>
                    <div className="col-12">
                        {order_items.map((item) => (
                            <div className="card mb-3" key={item.id}>
                                <div className="row g-0"></div>
                                <div className="col-md-4">
                                    <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h4 className="card-title">{item.name}</h4>
                                        <p className="card-text">Genere: {item.genre}</p>
                                        <p className="card-text">Prezzo: {getDiscountedPrice(item)}$</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="row">
                            <div className="col-4">
                                <div className="card">
                                    <h3>Prezzo totale: {getTotalPrice()}$</h3>
                                </div>
                            </div>
                        </div>
                        <Link to="/checkout"><button className='btn btn-primary mt-4'>Vai al checkout</button></Link>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Basket