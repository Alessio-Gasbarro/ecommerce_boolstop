import React, { useState } from 'react';
import useCart from '../hooks/useCart';
import axios from 'axios';
import emailjs from '@emailjs/browser';

const Basket = () => {
    // Utilizzo custom hook per gestire il carrello
    const { cart, removeFromCart, clearCart, setQuantity } = useCart();

    // Stato per il form di checkout
    const [form, setForm] = useState({
        name: '',
        surname: '',
        address: '',
        email: '',
        phone: ''
    });


    const [message, setMessage] = useState('');

    // Prezzo scontato
    const getDiscountedPrice = (item) => item.discount ? (item.price * (1 - item.discount)).toFixed(2) : item.price;

    // Prezzo totale
    const getTotal = () =>
        cart.reduce(
            (sum, item) =>
                sum + (item.discount ? item.price * (1 - item.discount) : item.price) * item.quantity,
            0
        ).toFixed(2);

    // Determina se la spedizione è gratuita
    const isFreeShipping = parseFloat(getTotal()) > 25;

    // Gestione del cambiamento nei campi del form
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Gestione invio dell'ordine
    const handleOrder = async e => {
        e.preventDefault();
        if (cart.length === 0) {
            setMessage('Il carrello è vuoto.');
            return;
        }
        try {
            const total = getTotal();

            const shipmentPrice = isFreeShipping ? 0 : null;

            const res = await axios.post('http://localhost:3000/api/games', {
                ...form,
                total_price: Number(total),
                shipment_price: shipmentPrice,
                status: 'pending',
                items: cart.map(item => ({
                    id_product: item.id,
                    quantity: item.quantity
                }))
            });

            if (res.status === 201) {
                // Costruisci stringa dettagli ordine per la mail
                const orderDetails = cart.map(item => {
                    return `• ${item.name} (x${item.quantity}) - €${getDiscountedPrice(item)}`;
                }).join('\n');

                // Invia l'email con emailjs
                await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ORDER,
                    {
                        user_name: form.name,
                        user_surname: form.surname,
                        user_address: form.address,
                        user_email: form.email,
                        user_phone: form.phone,
                        order_details: orderDetails,
                        total_price: total,
                        shipment_info: isFreeShipping ? 'Spedizione Gratuita' : 'Costi di spedizione applicati'
                    },
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                );

                setMessage('Ordine inviato con successo! Riceverai un\'email di conferma.');
                clearCart();
            } else {
                setMessage('Errore durante l\'invio dell\'ordine.');
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Errore di rete.');
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <h1 className='text-light'>Il tuo Carrello</h1>
                    <div className="col-12">
                        {cart.length === 0 ? (
                            <p>Il carrello è vuoto.</p>
                        ) : (
                            <>
                                {cart.map((item) => (
                                    <div className="card mb-3" key={item.id}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h4 className="card-title">{item.name}</h4>
                                                    <p className="card-text">Genere: {item.genre}</p>
                                                    <p className="card-text">
                                                        Prezzo: €{getDiscountedPrice(item)}{' '}
                                                        {item.discount > 0 && (
                                                            <span className="original-price">€{Number(item.price).toFixed(2)}</span>
                                                        )}
                                                    </p>
                                                    <label>
                                                        Quantità:
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={e => setQuantity(item.id, parseInt(e.target.value) || 1)}
                                                            style={{ width: '60px', marginLeft: '8px' }}
                                                        />
                                                    </label>
                                                    <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Rimuovi</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="row">
                                    <div className="col-4">
                                        <div className="card">
                                            <h3>Prezzo totale: €{getTotal()}</h3>
                                            {/* Mostra il messaggio di spedizione gratuita solo se prezzo totale > 25 */}
                                            {isFreeShipping && (
                                                <div className="alert alert-success mt-2" role="alert">
                                                    Hai superato i 25 &#8364;, la spedizione è gratuita!
                                                </div>
                                            )}
                                            <button className="btn btn-warning" onClick={clearCart}>Svuota carrello</button>
                                        </div>
                                    </div>
                                </div>
                                ---
                                <h2>Checkout</h2>
                                <form onSubmit={handleOrder}>
                                    <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
                                    <input name="surname" placeholder="Cognome" value={form.surname} onChange={handleChange} required />
                                    <input name="address" placeholder="Indirizzo" value={form.address} onChange={handleChange} required />
                                    <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                                    <input name="phone" placeholder="Telefono" value={form.phone} onChange={handleChange} required />
                                    <button type="submit" className="btn btn-success mt-2">Invia Ordine</button>
                                </form>
                                {message && <p>{message}</p>}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Basket;