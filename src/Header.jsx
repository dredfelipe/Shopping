import React from 'react';
import { Leaf, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';

function Header({ page, setPage }) {
  const cartItems = useSelector((state) => Object.values(state.cart.items));
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="topbar">
      <button className="brand" onClick={() => setPage('home')} aria-label="Paradise Nursery home">
        <span className="brand-icon"><Leaf size={24} /></span>
        <span>
          <strong>Paradise Nursery</strong>
          <small>House plants delivered fresh</small>
        </span>
      </button>
      <nav>
        <button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Home</button>
        <button className={page === 'products' ? 'active' : ''} onClick={() => setPage('products')}>Plants</button>
        <button className={page === 'cart' ? 'active cart-button' : 'cart-button'} onClick={() => setPage('cart')} aria-label={`Cart with ${cartCount} items`}>
          <ShoppingCart size={22} />
          <span>{cartCount}</span>
        </button>
      </nav>
    </header>
  );
}

export default Header;
