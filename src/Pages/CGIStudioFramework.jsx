import React from 'react';
import PageTemplate from '../Components/Shared/PageTemplate';
import Button from '../Components/Shared/Button';
import './CGIStudioFramework.css';

const CGIStudioFramework = () => {
  const hero = {
    badge: "CGI Studio",
    title: "CGI Studio Framework",
    subtitle: "A powerful, flexible framework for building stunning HMI applications across automotive, medical, and industrial sectors.",
    cta: (
      <>
        <Button variant="primary" size="lg" href="/trial">
          Start Free Trial
        </Button>
        <Button variant="secondary" size="lg" href="/documentation">
          View Documentation
        </Button>
      </>
    )
  };

  return (
    <PageTemplate hero={hero} className="cgi-framework-page">
      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-Time Rendering</h3>
            <p>High-performance 2D/3D graphics rendering optimized for embedded systems.</p>
          </div>
          <div className="feature-card">
            <h3>Cross-Platform</h3>
            <p>Deploy across multiple hardware platforms with a single codebase.</p>
          </div>
          <div className="feature-card">
            <h3>Low Footprint</h3>
            <p>Minimal memory and CPU requirements for resource-constrained devices.</p>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="specs-section">
        <h2 className="section-title">Technical Specifications</h2>
        <div className="specs-content">
          <p>Detailed specifications coming soon...</p>
        </div>
      </section>
    </PageTemplate>
  );
};

export default CGIStudioFramework;