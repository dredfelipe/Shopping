import React, { useState } from 'react';
import Header from './Header.jsx';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div>
      {page !== 'home' && <Header page={page} setPage={setPage} />}

      {page === 'home' && (
        <main className="landing-page">
          <div className="landing-overlay">
            <section className="landing-content">
              <p className="eyebrow">Online plant shop</p>
              <h1>Paradise Nursery</h1>
              <p>
                Paradise Nursery helps you create a fresher, greener home with carefully selected
                houseplants for every room, care level, and style.
              </p>
              <button className="primary" onClick={() => setPage('products')}>Get Started</button>
            </section>
            <AboutUs />
          </div>
        </main>
      )}

      {page === 'products' && <ProductList />}
      {page === 'cart' && <CartItem setPage={setPage} />}
    </div>
  );
}

export default App;
