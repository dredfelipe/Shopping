import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import Header from './Header.jsx';
import plants from './plants.js';
import { formatCurrency } from './utils.js';

function ProductList({ setPage }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);

  const groupedPlants = useMemo(() => {
    return plants.reduce((groups, plant) => {
      groups[plant.category] = groups[plant.category] || [];
      groups[plant.category].push(plant);
      return groups;
    }, {});
  }, []);

  return (
    <>
      <Header page="products" setPage={setPage} />
      <main className="products-page">
        <section className="page-heading">
          <p className="eyebrow">Shop plants</p>
          <h1>Choose Your House Plants</h1>
          <p>Cart quantity: {cartQuantity}</p>
        </section>

        {Object.entries(groupedPlants).map(([category, categoryPlants]) => (
          <section className="category" key={category}>
            <h2>{category}</h2>
            <div className="product-grid">
              {categoryPlants.map((plant) => {
                const isAdded = Boolean(cartItems[plant.id]);

                return (
                  <article className="product-card" key={plant.id}>
                    <img src={plant.image} alt={plant.name} />
                    <div className="product-info">
                      <h3>{plant.name}</h3>
                      <div className="product-actions">
                        <strong>{formatCurrency(plant.price)}</strong>
                        <button onClick={() => dispatch(addItem(plant))} disabled={isAdded}>
                          {isAdded ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default ProductList;
