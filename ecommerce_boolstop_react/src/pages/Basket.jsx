import React, { useState, useEffect } from 'react';
import useCart from '../hooks/useCart';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import Suggested from '../components/Suggested';

const Basket = () => {
    const { cart, addToCart, removeFromCart, clearCart, setQuantity } = useCart();

    const [form, setForm] = useState({
        name: '',
        surname: '',
        address: '',
        email: '',
        phone: ''
    });

    const [message, setMessage] = useState('');
    const [saleGames, setSaleGames] = useState([]);

    //fetch giochi in offerta
    const fetchSaleGames = () => {
        axios.get('http://localhost:3000/api/games/new-releases?limit=4')
            .then((resp) => {
                console.log('Giochi in offerta:', resp.data);
                setSaleGames(resp.data);
            })
            .catch((err) => {
                console.log('Errore nel fetch dei giochi in sconto:', err);
            });
    };

    //useEffect per chiamare fetch all'avvio
    useEffect(() => {
        fetchSaleGames();
    }, []);

    const getDiscountedPrice = (item) =>
        item.discount
            ? (parseFloat(item.price) * (1 - item.discount)).toFixed(2)
            : parseFloat(item.price).toFixed(2);

    const getTotal = () =>
        cart.reduce(
            (sum, item) =>
                sum + (item.discount
                    ? parseFloat(item.price) * (1 - item.discount)
                    : parseFloat(item.price)) * item.quantity,
            0
        ).toFixed(2);

    const isFreeShipping = parseFloat(getTotal()) > 25;

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
                const orderDetails = cart.map(item => {
                    return `• ${item.name} (x${item.quantity}) - €${getDiscountedPrice(item)}`;
                }).join('\n');

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
            <section className="most-wanted-section wishlist-section">
                <div className="section-header with-lines">
                    <div className="line" />
                    <h2 className="gradient-title">Il tuo Carrello</h2>
                    <div className="line" />
                </div>

                <div className="wishlist-content">
                    {cart.length === 0 ? (
                        <div className="empty-wishlist">
                            <p>Il carrello è vuoto.</p>
                        </div>
                    ) : (
                        <div className="wishlist-grid">
                            {cart.map(item => (
                                <div key={item.id} className="wishlist-card large">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="wishlist-game-image"
                                        />
                                    )}
                                    <div className="wishlist-info">
                                        <h3 className="game-name">{item.name}</h3>
                                        <p className="game-price">
                                            €{getDiscountedPrice(item)}{' '}
                                            {item.discount > 0 && (
                                                <span className="original-price">€{parseFloat(item.price).toFixed(2)}</span>
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
                                    </div>
                                    <div className="wishlist-actions">
                                        <button onClick={() => removeFromCart(item.id)}>Rimuovi</button>
                                    </div>
                                </div>
                            ))}

                            <div className="clear-wishlist">
                                <div className="section-header with-lines">
                                    <div className="line" />
                                    <h2 className="gradient-title">Riepilogo ordine</h2>
                                    <div className="line" />
                                </div>
                                <h3>Totale: €{getTotal()}</h3>
                                {isFreeShipping && (
                                    <h4>Hai superato i 25€, la spedizione è gratuita!</h4>
                                )}
                                <button onClick={clearCart}>Svuota carrello</button>
                            </div>

                            <div className="checkout-form">
                                <h2>Checkout</h2>
                                <form onSubmit={handleOrder}>
                                    <div className="inputs-row">
                                        <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
                                        <input name="surname" placeholder="Cognome" value={form.surname} onChange={handleChange} required />
                                        <input name="address" placeholder="Indirizzo" value={form.address} onChange={handleChange} required />
                                        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                                        <input name="phone" placeholder="Telefono" value={form.phone} onChange={handleChange} required />
                                    </div>
                                    <button type="submit" className="btn btn-success mt-2">Invia Ordine</button>
                                </form>
                                {message && <p>{message}</p>}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {saleGames.length > 0 && (
                <Suggested saleGames={saleGames} addToCart={addToCart} />
            )}
        </>
    );
};

export default Basket;