import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, deleteItem, increaseQuantity } from './CartSlice.jsx';
import { formatCurrency } from './utils.js';

function CartItem({ setPage }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => Object.values(state.cart.items));
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="cart-page">
      <section className="page-heading">
        <p className="eyebrow">Your cart</p>
        <h1>Shopping Cart</h1>
        <p>Total number of plants: {totalItems}</p>
        <p>Total cart amount: {formatCurrency(totalAmount)}</p>
      </section>

      {cartItems.length === 0 ? (
        <section className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add a few plants to start building your indoor garden.</p>
          <button className="primary" onClick={() => setPage('products')}>Continue Shopping</button>
        </section>
      ) : (
        <section className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Unit price: {formatCurrency(item.price)}</p>
                  <strong>Total cost: {formatCurrency(item.price * item.quantity)}</strong>
                </div>
                <div className="quantity-controls" aria-label={`${item.name} quantity controls`}>
                  <button onClick={() => dispatch(decreaseQuantity(item.id))} aria-label={`Decrease ${item.name}`}>
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.id))} aria-label={`Increase ${item.name}`}>
                    <Plus size={16} />
                  </button>
                </div>
                <button className="icon-danger" onClick={() => dispatch(deleteItem(item.id))} aria-label={`Delete ${item.name}`}>
                  <Trash2 size={18} />
                </button>
              </article>
            ))}
          </div>

          <aside className="summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Total plants</span>
              <strong>{totalItems}</strong>
            </div>
            <div className="summary-row total">
              <span>Total cost</span>
              <strong>{formatCurrency(totalAmount)}</strong>
            </div>
            <button className="primary" onClick={() => alert('Coming Soon')}>Checkout</button>
            <button className="secondary" onClick={() => setPage('products')}>Continue Shopping</button>
          </aside>
        </section>
      )}
    </main>
  );
}

export default CartItem;
