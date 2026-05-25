import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Leaf, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import './styles.css';

const products = [
  {
    id: 'monstera',
    name: 'Monstera Deliciosa',
    category: 'Statement Plants',
    price: 38,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=80',
    description: 'Large split leaves that bring a lush tropical feel indoors.'
  },
  {
    id: 'fiddle-leaf',
    name: 'Fiddle Leaf Fig',
    category: 'Statement Plants',
    price: 46,
    image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=900&q=80',
    description: 'Tall, sculptural leaves for bright rooms and sunny corners.'
  },
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    category: 'Low Maintenance',
    price: 24,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b9f?auto=format&fit=crop&w=900&q=80',
    description: 'Hardy upright foliage that tolerates low light and missed watering.'
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    category: 'Low Maintenance',
    price: 28,
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=900&q=80',
    description: 'Glossy green leaves with excellent drought tolerance.'
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    category: 'Flowering Plants',
    price: 30,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=900&q=80',
    description: 'Elegant white blooms and deep green foliage for softer spaces.'
  },
  {
    id: 'anthurium',
    name: 'Anthurium',
    category: 'Flowering Plants',
    price: 34,
    image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=900&q=80',
    description: 'Bright heart-shaped flowers with glossy tropical leaves.'
  }
];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

function App() {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState({});

  const categories = useMemo(() => {
    return products.reduce((groups, product) => {
      groups[product.category] = groups[product.category] || [];
      groups[product.category].push(product);
      return groups;
    }, {});
  }, []);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, quantity]) => {
        const product = products.find((item) => item.id === id);
        return product ? { ...product, quantity } : null;
      })
      .filter(Boolean);
  }, [cart]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (id) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  };

  const decreaseQuantity = (id) => {
    setCart((current) => {
      const nextQuantity = (current[id] || 0) - 1;
      if (nextQuantity <= 0) {
        const { [id]: removed, ...rest } = current;
        return rest;
      }
      return { ...current, [id]: nextQuantity };
    });
  };

  const removeFromCart = (id) => {
    setCart((current) => {
      const { [id]: removed, ...rest } = current;
      return rest;
    });
  };

  return (
    <div>
      <header className="topbar">
        <button className="brand" onClick={() => setView('home')} aria-label="Paradise Nursery home">
          <span className="brand-icon"><Leaf size={24} /></span>
          <span>
            <strong>Paradise Nursery</strong>
            <small>House plants delivered fresh</small>
          </span>
        </button>
        <nav>
          <button className={view === 'products' ? 'active' : ''} onClick={() => setView('products')}>
            Products
          </button>
          <button className="cart-button" onClick={() => setView('cart')} aria-label={`Shopping cart with ${cartCount} items`}>
            <ShoppingCart size={22} />
            <span>{cartCount}</span>
          </button>
        </nav>
      </header>

      {view === 'home' && (
        <main className="hero">
          <div className="hero-overlay">
            <div className="hero-content">
              <p className="eyebrow">Online plant shop</p>
              <h1>Paradise Nursery</h1>
              <p>
                Bring calm, color, and cleaner air into your home with carefully selected indoor plants for every room.
              </p>
              <button className="primary" onClick={() => setView('products')}>Get Started</button>
            </div>
          </div>
        </main>
      )}

      {view === 'products' && (
        <main className="products-page">
          <section className="page-heading">
            <p className="eyebrow">Shop plants</p>
            <h1>Choose Your House Plants</h1>
          </section>

          {Object.entries(categories).map(([category, categoryProducts]) => (
            <section className="category" key={category}>
              <h2>{category}</h2>
              <div className="product-grid">
                {categoryProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <div className="product-info">
                      <div>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                      </div>
                      <div className="product-actions">
                        <strong>{formatCurrency(product.price)}</strong>
                        <button onClick={() => addToCart(product.id)} disabled={Boolean(cart[product.id])}>
                          {cart[product.id] ? 'Added' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </main>
      )}

      {view === 'cart' && (
        <main className="cart-page">
          <section className="page-heading">
            <p className="eyebrow">Your cart</p>
            <h1>Shopping Cart</h1>
            <p>Total items: {cartCount}</p>
          </section>

          {cartItems.length === 0 ? (
            <section className="empty-cart">
              <h2>Your cart is empty</h2>
              <p>Add a few plants to start building your indoor garden.</p>
              <button className="primary" onClick={() => setView('products')}>Continue Shopping</button>
            </section>
          ) : (
            <section className="cart-layout">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="cart-details">
                      <h3>{item.name}</h3>
                      <p>{formatCurrency(item.price)} each</p>
                      <strong>Subtotal: {formatCurrency(item.price * item.quantity)}</strong>
                    </div>
                    <div className="quantity-controls" aria-label={`${item.name} quantity controls`}>
                      <button onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease ${item.name} quantity`}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item.id)} aria-label={`Increase ${item.name} quantity`}>
                        <Plus size={16} />
                      </button>
                    </div>
                    <button className="icon-danger" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>
                      <Trash2 size={18} />
                    </button>
                  </article>
                ))}
              </div>

              <aside className="summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Items</span>
                  <strong>{cartCount}</strong>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <strong>{formatCurrency(cartTotal)}</strong>
                </div>
                <button className="primary" onClick={() => alert('Checkout coming soon!')}>Checkout</button>
                <button className="secondary" onClick={() => setView('products')}>Continue Shopping</button>
              </aside>
            </section>
          )}
        </main>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
