// src/components/IndustryHero.jsx
import React from 'react';

const IndustryHero = ({ title, subtitle, description, image, benefits }) => {
  return (
    <section className="industry-hero">
      <div className="industry-hero-container">
        <div className="industry-hero-content">
          <div className="industry-badge">
            <span>Candera in</span>
          </div>
          <h1 className="industry-title">{title}</h1>
          <p className="industry-subtitle">{subtitle}</p>
          <p className="industry-description">{description}</p>
          
          <div className="industry-benefits">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <div className="benefit-icon">✓</div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="industry-hero-visual">
          <img src={image} alt={title} className="industry-image" />
        </div>
      </div>
    </section>
  );
};

export default IndustryHero;