import React from 'react';

function AboutUs() {
  return (
    <main className="about-page">
      <section className="page-heading">
        <p className="eyebrow">About us</p>
        <h1>Paradise Nursery</h1>
      </section>

      <section className="about-panel">
        <div>
          <h2>Our Company</h2>
          <p>
            Paradise Nursery is an online house plant shop focused on helping people create healthier,
            calmer indoor spaces. We offer carefully selected plants that fit different homes,
            light conditions, and care routines.
          </p>
          <p>
            Our team sources quality plants, prepares them for safe delivery, and shares clear care
            guidance so every customer can grow with confidence. From low-maintenance greenery to
            statement plants and flowering favorites, Paradise Nursery makes indoor gardening simple.
          </p>
        </div>

        <div className="about-values">
          <h2>What We Value</h2>
          <ul>
            <li>Fresh, healthy plants selected for indoor living.</li>
            <li>Helpful plant care information for every customer.</li>
            <li>Reliable service from browsing to delivery.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
