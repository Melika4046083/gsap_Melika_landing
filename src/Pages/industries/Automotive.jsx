import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, CheckCircle, Shield, Users, Clock, Cpu, Zap, Code2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Move CounterBlock OUTSIDE the Automotive component
const CounterBlock = ({ number, suffix, label, statsVisible }) => {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  
  useEffect(() => {
    if (!statsVisible || hasAnimatedRef.current) return;

    let startTime;
    let animationFrame;
    const isDecimal = number % 1 !== 0; // Check if number has decimals

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / 2000, 1);
      
      // Handle decimal numbers properly
      let currentCount;
      if (isDecimal) {
        currentCount = parseFloat((number * progress).toFixed(1));
      } else {
        currentCount = Math.floor(number * progress);
      }

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Final value reached, stop the animation
        setCount(number);
        hasAnimatedRef.current = true; // Mark as animated AFTER completion
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [statsVisible, number]); // Added number to dependencies
  
  return (
    <div className="stat-item">
      <div className="stat-number">{count}<span className="stat-suffix">{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const Automotive = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [hasStatsAnimated, setHasStatsAnimated] = useState(false);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  // Stats visibility observer - only trigger once
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStatsAnimated) {
          setStatsVisible(true);
          setHasStatsAnimated(true);
          // Disconnect observer after first trigger to prevent repeating
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasStatsAnimated]);

  const stats = [
    { number: 8, suffix: "/10", label: "Top OEMs Use Our Solutions" },
    { number: 40, suffix: "%", label: "Faster Development" },
    { number: 50, suffix: "M+", label: "Vehicles Worldwide" },
    { number: 99.9, suffix: "%", label: "Reliability Rate" }
  ];

  const solutionButtons = [
    "Digital Cockpit",
    "Head-Up Display", 
    "Weather Cluster",
    "ADAS Interfaces",
    "Cluster Displays"
  ];

  const slides = [
    {
      id: 1,
      title: "Digital Cockpit Solutions",
      description: "Create stunning digital instrument clusters with real-time data visualization, customizable layouts, and high-performance rendering.",
      detailedDescription: "Our digital cockpit solutions provide seamless integration of multiple displays, advanced 3D graphics, and real-time data processing. With hardware acceleration and cross-platform compatibility, we deliver exceptional performance across all vehicle segments.",
      image: "/images/ADAS.webp",
      features: ["Real-time 3D rendering", "Customizable widgets", "Hardware acceleration", "Cross-platform compatibility"],
      demoLink: "/demos/digital-cockpit"
    },
    {
      id: 2,
      title: "Head-Up Display Systems",
      description: "Advanced HUD interfaces with augmented reality features, speed alerts, and navigation guidance for enhanced driver awareness.",
      detailedDescription: "Transform driver awareness with our augmented reality HUD systems. Project critical information directly onto the windshield with adaptive brightness control and real-time safety alerts for optimal visibility in all conditions.",
      image: "/images/head-up-display.png",
      features: ["Augmented reality overlay", "Speed and safety alerts", "Navigation integration", "Adaptive brightness"],
      demoLink: "/demos/hud-system"
    },
    {
      id: 3,
      title: "Weather Cluster",
      description: "Comprehensive infotainment systems with multimedia, connectivity, and smart features for modern vehicle entertainment.",
      detailedDescription: "Deliver exceptional in-vehicle entertainment with our comprehensive infotainment platform. Featuring multi-media support, smartphone integration, voice control, and over-the-air updates for a constantly evolving user experience.",
      image: "/images/weather-cluster.png",
      features: ["Multi-media support", "Smartphone integration", "Voice control", "Over-the-air updates"],
      demoLink: "/demos/infotainment"
    },
    {
      id: 4,
      title: "ADAS Interfaces",
      description: "Intuitive interfaces for Advanced Driver Assistance Systems with clear safety alerts and real-time monitoring.",
      detailedDescription: "Enhance vehicle safety with our intuitive ADAS interfaces. Provide clear collision warnings, lane keeping assistance, adaptive cruise control, and parking assistance through carefully designed visual and auditory alerts.",
      image: "/images/ADAS (2).gif",
      features: ["Collision warnings", "Lane keeping assist", "Adaptive cruise control", "Parking assistance"],
      demoLink: "/demos/adas"
    },
    {
      id: 5,
      title: "Cluster Displays",
      description: "High-resolution cluster displays with customizable themes, animations, and driver information systems.",
      detailedDescription: "Elevate driver information systems with high-resolution cluster displays featuring customizable themes, smooth animated transitions, and comprehensive driver data presentation with automatic night mode adaptation.",
      image: "/images/InstrumentCluster.png",
      features: ["Multiple display themes", "Animated transitions", "Driver information", "Night mode"],
      demoLink: "/demos/cluster"
    }
  ];

  // Features for the flip cards section
  const features = [
    {
      icon: Cpu,
      title: "Automotive Grade",
      description: "ISO 26262 compliant for functional safety with automotive-grade durability and performance across all vehicle systems. Built to withstand extreme temperatures, vibrations, and meet the highest quality standards.",
      color: "#f07300"
    },
    {
      icon: Zap,
      title: "Real-time Performance", 
      description: "Achieve consistent 60 FPS rendering with optimized graphics pipeline and immediate response to driver inputs. Low-latency architecture ensures smooth user interactions and real-time data display.",
      color: "#f07300"
    },
    {
      icon: Users,
      title: "Scalable Solutions",
      description: "Modular architecture that scales seamlessly from basic entry-level systems to premium multi-display configurations. Flexible licensing models to match your project requirements and budget.",
      color: "#f07300"
    },
    {
      icon: Code2,
      title: "Seamless Integration",
      description: "AUTOSAR compatible with support for QNX/Linux/Android and hardware acceleration across multiple platforms. Easy integration with existing vehicle networks and third-party systems.",
      color: "#f07300"
    }
  ];

  const companyLogos = [
    "BMW", "Mercedes", "Audi", "Volkswagen", "Toyota",
    "Honda", "Ford", "GM", "Hyundai", "Nissan",
    "Volvo", "Jaguar", "LandRover", "Porsche", "Ferrari"
  ];

  const handleButtonClick = (index) => {
    setActiveSlide(index);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const scrollToStats = () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="automotive-page">
      {/* Full Screen Hero Section */}
      <section className="automotive-hero-fullscreen">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `url('/images/Automotive-HMI.webp')`
          }}
        >
          <div className="hero-overlay">
            <div className="container">
              <div className="section-header">
                <div className="header-badge">
                  <span>Automotive Solutions</span>
                </div>
                <h1 className="section-title">
                  Next-Generation <span className="text-accent">Automotive HMI</span>
                </h1>
                <p className="section-subtitle">
                  Transform in-vehicle experiences with our cutting-edge HMI solutions for digital cockpits, 
                  infotainment systems, and advanced driver assistance interfaces.
                </p>
                <div className="section-actions">
                  <Link to="/contact" className="cta-button primary">
                    <span>Request Demo</span>
                    <ArrowRight size={20} />
                  </Link>
                  <Link to="/documentation" className="cta-button secondary">
                    <Play size={20} />
                    <span>Watch Demo</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Scroll to Explore Indicator */}
            <button className="hero-scroll-indicator" onClick={scrollToStats} aria-label="Scroll to explore">
              <span>Scroll to explore</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14m0 0l-5-5m5 5l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section with Counter */}
      <section ref={statsRef} className="stats-section">
        <div className="container">
          <div className="section-header">
            <div className="header-badge">
              <span>Industry Impact</span>
            </div>
            <h2 className="section-title">
              Trusted by <span className="text-accent">Automotive Leaders</span> Worldwide
            </h2>
          </div>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <CounterBlock
                key={index}
                number={stat.number}
                suffix={stat.suffix}
                label={stat.label}
                statsVisible={statsVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Solution Slider with Swiper */}
      <section ref={sectionRef} className={`slider-section ${isVisible ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-header">
            <div className="header-badge">
              <span>Solution Demos</span>
            </div>
            <h2 className="section-title">
              Automotive <span className="text-accent">Solution Demos</span>
            </h2>
            <p className="section-subtitle">Explore our comprehensive suite of HMI solutions for modern vehicles</p>
          </div>

          {/* Solution Navigation Buttons */}
          <div className="solution-buttons">
            {solutionButtons.map((button, index) => (
              <button
                key={index}
                className={`solution-button ${activeSlide === index ? 'active' : ''}`}
                onClick={() => handleButtonClick(index)}
              >
                {button}
              </button>
            ))}
          </div>
          
          <div className="slider-container">
            {/* Slider Controls at Top Right */}
            <div className="slider-top-controls">
              <div className="slider-navigation">
                <button className="slider-nav-btn slider-prev">
                  <ArrowRight size={20} />
                </button>
                <button className="slider-nav-btn slider-next">
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="slide-counter">
                <span className="current-slide">{activeSlide + 1}</span>
                <span className="slide-separator">/</span>
                <span className="total-slides">{slides.length}</span>
              </div>
            </div>

            <Swiper
              ref={swiperRef}
              modules={[Navigation, Autoplay, EffectFade]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                nextEl: '.slider-next',
                prevEl: '.slider-prev',
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
              className="solution-swiper"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={slide.id}>
                  <div className="slide-content">
                    <div className="slide-text">
                      <h3>{slide.title}</h3>
                      <p>{slide.description}</p>
                      <div className="slide-features">
                        {slide.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="feature-tag">
                            <CheckCircle size={16} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="slide-actions">
                        <Link to={slide.demoLink} className="cta-button primary">
                          <Play size={18} />
                          <span>View Demo</span>
                        </Link>
                        <Link to="/contact" className="cta-button secondary">
                          <span>Learn More</span>
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                    <div className="slide-visual">
                      <div className="demo-frame">
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="demo-image"
                        />
                        <div className="demo-overlay">
                          <button className="play-button">
                            <Play size={32} fill="currentColor" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Company Logo Carousel - No Background */}
      <section className="logo-carousel-section">
        <div className="container">
          <div className="section-header">
            <div className="header-badge">
              <span>Our Partners</span>
            </div>
            <h2 className="section-title">
              Trusted by <span className="text-accent">Industry Leaders</span>
            </h2>
          </div>
          <div className="logo-carousel-wrapper">
            <div className="logo-carousel-track">
              {[...companyLogos, ...companyLogos].map((logo, index) => (
                <div key={index} className="carousel-logo-item">
                  <img 
                    src={`/CustomerLogo/${logo}.webp`}
                    alt={logo}
                    className="logo-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="logo-name">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Automotive Leaders Choose CGI Studio - Flip Cards Section */}
      <section className="why-choose-section">
        <div className="features-background">
          <div className="grid-pattern"></div>
        </div>

        <div className="container">
          <div className="section-header">
            <div className="header-badge">
              <span>Why Choose CGI Studio</span>
            </div>
            <h2 className="section-title">
              Why <span className="text-accent">Automotive Leaders</span> Choose CGI Studio
            </h2>
            <p className="section-subtitle">
              Discover the powerful features and capabilities that make CGI Studio the preferred choice 
              for leading automotive manufacturers and suppliers worldwide.
            </p>
          </div>

          <div className="flip-cards-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className={`flip-card ${activeCard === index ? 'active' : ''}`}
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
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="cta-section-enhanced">
        <div className="container">
          <div className="section-header">
            <div className="header-badge">
              <span>Get Started</span>
            </div>
            <h2 className="section-title">
              Ready to Transform Your <span className="text-accent">Automotive HMI</span>?
            </h2>
            <p className="cta-description">
              Start your journey with CGI Studio today and create exceptional in-vehicle experiences 
              that set new standards in the automotive industry.
            </p>
            <div className="section-actions">
              <Link to="/trial" className="cta-button primary large">
                Start Free Trial
              </Link>
              <Link to="/contact" className="cta-button secondary large">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Automotive;