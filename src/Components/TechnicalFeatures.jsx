import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Zap, Code2, Shield, ArrowRight } from 'lucide-react';

const TechnicalFeatures = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);

  const features = [
    {
      icon: Cpu,
      title: "High Performance",
      description: "Hardware-accelerated rendering delivering smooth 60fps experiences on embedded systems with limited resources.",
      color: "#f07300"
    },
    {
      icon: Zap,
      title: "Real-time Data", 
      description: "Handle high-frequency sensor data and vehicle bus communications with deterministic performance and low latency.",
      color: "#f07300"
    },
    {
      icon: Code2,
      title: "Cross Platform",
      description: "Write once, deploy everywhere. Target embedded Linux, QNX, Android, and web platforms from a single codebase.",
      color: "#f07300"
    },
    {
      icon: Shield,
      title: "Safety Certified",
      description: "ISO 26262 (ASIL-B) compliant for automotive and IEC 61508 for industrial safety-critical applications.",
      color: "#f07300"
    }
  ];

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle card click for mobile
  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className={`technical-features ${isVisible ? 'visible' : ''}`}
    >
      {/* Background */}
      <div className="features-background">
        <div className="grid-pattern"></div>
      </div>

      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="header-badge">
            <span>Technical Excellence</span>
          </div>
          <h2 className="section-title">
            Why <span className="text-accent">CGI Studio</span> Stands Out
          </h2>
          <p className="section-subtitle">
            Discover the powerful features that make CGI Studio the preferred choice for modern HMI development
          </p>
        </div>

        {/* Flip Cards Grid - 4 cards per row */}
        <div className="flip-cards-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className={`flip-card ${activeCard === index ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleCardClick(index)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick(index);
                  }
                }}
              >
                <div className="flip-card-inner">
                  {/* Front Side - Icon & Title */}
                  <div className="flip-card-front">
                    <div className="card-icon">
                      <IconComponent size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="card-title">{feature.title}</h3>
                    <div className="flip-hint">
                      <ArrowRight size={16} strokeWidth={2} />
                      <span>Learn more</span>
                    </div>
                  </div>

                  {/* Back Side - Description */}
                  <div className="flip-card-back">
                    <div className="card-content">
                      <div className="back-icon">
                        <IconComponent size={24} strokeWidth={1.5} />
                      </div>
                      <h3 className="back-title">{feature.title}</h3>
                      <p className="card-description">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal CTA */}
        <div className="features-cta">
          <a href="#contact" className="cta-button">
            <span>Explore All Features</span>
            <ArrowRight size={18} strokeWidth={2} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default TechnicalFeatures;
