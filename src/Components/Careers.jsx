import React, { useEffect, useRef, useState } from 'react';

const Careers = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

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

  return (
    <section 
      ref={sectionRef}
      className={`careers-section ${isVisible ? 'visible' : ''}`}
    >
      {/* Container with same width as other sections */}
      <div className="careers-container">
        
        {/* Background image INSIDE the container */}
        <div className="careers-background">
          <div className="background-overlay"></div>
        </div>

        {/* Content */}
        <div className="careers-content-wrapper">
          {/* Section Header */}
          <div className="section-header">
            <div className="header-badge">
              <span>Join Our Team</span>
            </div>
            <h2 className="section-title">
              Build the Future of <span className="text-accent">HMI Technology</span>
            </h2>
            <p className="section-subtitle">
              Join passionate innovators creating cutting-edge solutions that power 
              the next generation of user interfaces across automotive, medical, and industrial sectors.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="careers-cta-buttons">
            <a href="/careers" className="cta-button">
              View Open Positions
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            
            <a href="/careers#culture" className="cta-button secondary">
              Learn About Culture
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Careers;