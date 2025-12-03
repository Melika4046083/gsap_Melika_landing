import React, { useEffect, useRef, useState } from 'react';

const UseCases = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Automotive');

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  // Use cases data
  const useCases = {
    Automotive: {
      title: "Automotive HMI Solutions",
      description: "Revolutionize in-vehicle experiences with cutting-edge digital clusters, infotainment systems, and advanced driver assistance interfaces.",
      features: [
        "Digital Instrument Clusters",
        "Infotainment Systems", 
        "Heads-Up Displays (HUD)",
        "Advanced Driver Assistance",
        "Rear-Seat Entertainment"
      ],
      stats: "8/10 top OEMs trust our solutions",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 11l-2 2 2 2M19 11l2 2-2 2"/>
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="M7 15h10"/>
        </svg>
      )
    },
    Medical: {
      title: "Medical Device Interfaces",
      description: "Create intuitive, reliable interfaces for medical equipment with strict compliance standards and exceptional user experience.",
      features: [
        "Patient Monitoring Systems",
        "Diagnostic Equipment",
        "Surgical Interfaces",
        "Medical Imaging Displays",
        "Laboratory Instruments"
      ],
      stats: "FDA/CE compliant solutions",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      )
    },
    Industrial: {
      title: "Industrial Automation",
      description: "Robust HMI solutions for industrial environments with real-time data visualization and control systems.",
      features: [
        "Factory Automation Panels",
        "SCADA Systems",
        "Process Control",
        "Monitoring Dashboards",
        "Equipment Interfaces"
      ],
      stats: "24/7 operational reliability",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="8" rx="2"/>
          <rect x="2" y="14" width="20" height="8" rx="2"/>
          <path d="M6 6l.01 0M6 18l.01 0"/>
        </svg>
      )
    },
    Wearable: {
      title: "Wearable Technology",
      description: "Power-efficient, responsive interfaces for next-generation wearable devices and smart technology.",
      features: [
        "Smartwatch Interfaces",
        "Fitness Trackers",
        "AR/VR Displays",
        "Smart Glasses",
        "Health Monitors"
      ],
      stats: "Optimized for low-power devices",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="7"/>
          <path d="M12 9v3l1.5 1.5"/>
          <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.88-8.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"/>
        </svg>
      )
    },
    Appliances: {
      title: "Smart Appliances",
      description: "Modern, intuitive interfaces for home appliances that enhance user interaction and connectivity.",
      features: [
        "Smart Refrigerators",
        "Washing Machine Displays",
        "Oven Control Panels",
        "Home Automation",
        "IoT Device Interfaces"
      ],
      stats: "Seamless smart home integration",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8"/>
          <path d="M12 17v4"/>
        </svg>
      )
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`use-cases-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="use-cases-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="header-badge">
            <span>Industry Applications</span>
          </div>
          <h2 className="section-title">
            Powering Innovation Across <span className="text-accent">Multiple Industries</span>
          </h2>
          <p className="section-subtitle">
            Discover how CGI Studio transforms user experiences in diverse sectors with cutting-edge HMI solutions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="use-cases-main">
          
          {/* Left: Category Navigation */}
          <div className="categories-nav">
            {Object.keys(useCases).map((category) => (
              <button
                key={category}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                <div className="category-icon">
                  {useCases[category].icon}
                </div>
                <span className="category-name">{category}</span>
                <div className="category-indicator"></div>
              </button>
            ))}
          </div>

          {/* Right: Content Display */}
          <div className="content-display">
            <div className={`content-slide ${isVisible ? 'visible' : ''}`}>
              
              {/* Header with Icon and Title */}
              <div className="content-header">
                <div className="content-icon">
                  {useCases[activeCategory].icon}
                </div>
                <div className="content-title-section">
                  <h3 className="content-title">{useCases[activeCategory].title}</h3>
                  <div className="content-badge">
                    <span>{useCases[activeCategory].stats}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="content-description">
                {useCases[activeCategory].description}
              </p>

              {/* Features Grid */}
              <div className="features-grid">
                {useCases[activeCategory].features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-dot"></div>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="content-cta">
                <a href="#contact" className="cta-button">
                  Explore {activeCategory} Solutions
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default UseCases;