import React from 'react';
import useWishlist from '../hooks/useWishlist';
import useCart from '../hooks/useCart';

export default function Wishlist() {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    const { cart, addToCart, setQuantity } = useCart();

    // Funzione per controllare se il prodotto è già nel carrello
    const getCartItem = (id) => cart.find(item => item.id === id);

    return (
        <div className="container">
            <h1>La tua Wishlist</h1>
            {wishlist.length === 0 ? (
                <p>La wishlist è vuota.</p>
            ) : (
                <>
                    {wishlist.map(item => {
                        const cartItem = getCartItem(item.id);
                        return (
                            <div className="card mb-3" key={item.id}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h4 className="card-title">{item.name}</h4>
                                            <p className="card-text">{item.description}</p>
                                            <button className="btn btn-danger" onClick={() => removeFromWishlist(item.id)}>
                                                Rimuovi
                                            </button>

                                            {cartItem ? (
                                                <div style={{ display: 'inline-block', marginLeft: 10 }}>
                                                    <label>
                                                        Quantità:
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            value={cartItem.quantity}
                                                            onChange={e => setQuantity(item.id, parseInt(e.target.value) || 0)}
                                                            style={{ width: '60px', marginLeft: '8px' }}
                                                        />
                                                    </label>
                                                    <button
                                                        className="btn btn-danger"
                                                        style={{ marginLeft: 10 }}
                                                        onClick={() => setQuantity(item.id, 0)}
                                                    >
                                                        Rimuovi dal carrello
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    className="btn btn-success"
                                                    style={{ marginLeft: 10 }}
                                                    onClick={() => addToCart(item, 1)}
                                                >
                                                    Aggiungi al carrello
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <button className="btn btn-warning" onClick={clearWishlist}>Svuota wishlist</button>
                </>
            )}
        </div>
    );
}