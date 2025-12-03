import React, { useEffect, useRef, useState } from 'react';

const Impact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Intersection Observer for animations - only trigger once
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

  // Counter Animation Hook - Only runs once when visible
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
      if (!isVisible || hasAnimatedRef.current) return;

      let startTime;
      let animationFrame;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentCount = Math.floor(end * progress);

        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          // Final value reached, stop the animation
          setCount(end);
          hasAnimatedRef.current = true;
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [isVisible, end, duration]);

    return count;
  };

  // Counter Component
  const CounterBlock = ({ icon, number, suffix, title, description, delay }) => {
    const count = useCounter(number, 2000);

    return (
      <div 
        className="counter-block"
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="counter-icon">
          {icon}
        </div>
        <div className="counter-number">
          {count}<span className="counter-suffix">{suffix}</span>
        </div>
        <h4 className="counter-title">{title}</h4>
        <p className="counter-description">{description}</p>
      </div>
    );
  };

  // Counter data with your specified values
  const counters = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      number: 8,
      suffix: "%",
      title: "of the top 10 OEMs",
      description: "…use HMI and GUI solutions developed with CGI studio."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      number: 6,
      suffix: "%",
      title: "of the top 10 Tier1s",
      description: "…providing automotive infotainment systems use  CGI Studio."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      number: 20,
      suffix: "+",
      title: "years experience",
      description: "…in HMI tool creation and services makes Candera one of your top partners."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      number: 80000,
      suffix: "+",
      title: "cars worldwide",
      description: "…are equipped with CGI Studio HMI applications."
    }
  ];

  // Updated company logos with your actual logos
  const companyLogos = [
    "Citroen",
    "Citroën",
    "DFM",
    "Ducati",
    "Ford",
    "GAC",
    "Geely",
    "GMC",
    "GWM",
    "Honda",
    "HYUNDAI",
    "JAC",
    "KTM",
    "Kubota",
    "LG",
    "Nissan",
  ];

  return (
    <section 
      ref={sectionRef}
      className={`impact-section-compact ${isVisible ? 'visible' : ''}`}
    >
      <div className="impact-compact-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="header-badge">
            <span>Accelerate HMI Development</span>
          </div>
          <h2 className="section-title">
            Cutting-edge tools for <span className="text-accent">embedded display innovation</span> 
          </h2>
          <p className="section-subtitle">
            A track record of innovation and delivery that industry leaders trust
          </p>
        </div>

        {/* Main Bordered Block */}
        <div className="impact-main-block">
          
          {/* Top Section: Content + Counters */}
          <div className="impact-top-section">
            
            {/* Left: Description & Button */}
            <div className="impact-content-area">
              <h3 className="impact-content-title">Why Choose CGI Studio</h3>
              <p className="impact-description">
                Join industry leaders who trust our platform to deliver exceptional embedded HMI solutions.
              </p>
              <a href="#contact" className="cta-button impact-cta-button">
                Get Started
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            {/* Right: Counter Blocks Grid */}
            <div className="impact-counters-section">
              <div className="impact-counters-grid">
                {counters.map((counter, index) => (
                  <CounterBlock
                    key={index}
                    icon={counter.icon}
                    number={counter.number}
                    suffix={counter.suffix}
                    title={counter.title}
                    description={counter.description}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Section: Infinite Logo Carousel */}
          <div className="impact-logo-carousel">
            <div className="logo-carousel-wrapper">
              <div 
                className="logo-carousel-track" 
                style={{ '--animation-speed': '35s' }}
              >
                {/* First set of logos */}
                <div className="logo-carousel-items">
                  {companyLogos.map((logo, index) => (
                    <div key={`first-${index}`} className="carousel-logo-item">
                      <img 
                        src={`/CustomerLogo/${logo}.webp`}
                        alt={logo}
                        className="logo-image"
                        onError={(e) => {
                          console.error(` Failed: ${logo}.png`);
                          // Try SVG instead
                          const svgSrc = `/CustomerLogo/${logo}.png`;
                          if (e.target.src.indexOf('.svg') === -1) {
                            console.log(`Trying: ${logo}.png`);
                            e.target.src = svgSrc;
                          } else {
                            // Both failed, show text
                            console.error(`Both formats failed for: ${logo}`);
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) {
                              e.target.nextSibling.style.display = 'flex';
                            }
                          }
                        }}
                        onLoad={(e) => {
                          console.log(`Loaded: ${logo}`);
                        }}
                      />
                      <span className="logo-name">{logo}</span>
                    </div>
                  ))}
                </div>
                
                {/* Second set of logos (duplicate for seamless loop) */}
                <div className="logo-carousel-items" aria-hidden="true">
                  {companyLogos.map((logo, index) => (
                    <div key={`second-${index}`} className="carousel-logo-item">
                      <img 
                        src={`/CustomerLogo/${logo}.webp`}
                        alt={logo}
                        className="logo-image"
                        onError={(e) => {
                          const svgSrc = `/CustomerLogo/${logo}.svg`;
                          if (e.target.src.indexOf('.svg') === -1) {
                            e.target.src = svgSrc;
                          } else {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) {
                              e.target.nextSibling.style.display = 'flex';
                            }
                          }
                        }}
                      />
                      <span className="logo-name">{logo}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Impact;