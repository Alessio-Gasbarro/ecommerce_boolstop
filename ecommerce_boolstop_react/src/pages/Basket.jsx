import React, { useState } from 'react';
import useCart from '../hooks/hookCart';
import { Link } from 'react-router-dom';

const Basket = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const [form, setForm] = useState({
        name: '',
        surname: '',
        address: '',
        email: '',
        phone: ''
    });
    const [message, setMessage] = useState('');

    const getDiscountedPrice = (item) =>
        item.discount ? (item.price * (1 - item.discount)).toFixed(2) : item.price;

    const getTotal = () =>
        cart.reduce(
            (sum, item) =>
                sum + (item.discount ? item.price * (1 - item.discount) : item.price) * item.quantity,
            0
        ).toFixed(2);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleOrder = async e => {
        e.preventDefault();
        if (cart.length === 0) {
            setMessage('Il carrello è vuoto.');
            return;
        }
        try {
            const res = await fetch('http://localhost:3000/api/games', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    total_price: getTotal(),
                    status: 'pending',
                    items: cart.map(item => ({
                        id_product: item.id,
                        quantity: item.quantity
                    }))
                })
            });
            if (res.ok) {
                setMessage('Ordine inviato con successo!');
                clearCart();
            } else {
                setMessage('Errore durante l\'invio dell\'ordine.');
            }
        } catch {
            setMessage('Errore di rete.');
        }
    };

    return (
        <>
            <Header />
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
            <Footer />
        </>
    )
}

export default Basket