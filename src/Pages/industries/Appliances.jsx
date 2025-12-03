import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, CheckCircle, Shield, Users, Clock, Home, Thermometer, Wind, Zap } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// CounterBlock component - same as Automotive
const CounterBlock = ({ number, suffix, label, statsVisible }) => {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  
  useEffect(() => {
    if (!statsVisible || hasAnimatedRef.current) return;

    let startTime;
    let animationFrame;
    const isDecimal = number % 1 !== 0;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / 2000, 1);
      
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
        setCount(number);
        hasAnimatedRef.current = true;
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [statsVisible, number]);
  
  return (
    <div className="stat-item">
      <div className="stat-number">{count}<span className="stat-suffix">{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const Appliances = () => {
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStatsAnimated) {
          setStatsVisible(true);
          setHasStatsAnimated(true);
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
    { number: 100, suffix: "M+", label: "Smart Appliances Powered" },
    { number: 35, suffix: "%", label: "Energy Savings" },
    { number: 50, suffix: "+", label: "Global Brands" },
    { number: 4.8, suffix: "/5", label: "User Satisfaction" }
  ];

  const solutionButtons = [
    "Smart Kitchen",
    "Climate Control", 
    "Laundry Systems",
    "Refrigeration",
    "IoT Integration"
  ];

  const slides = [
    {
      id: 1,
      title: "Smart Kitchen Appliances",
      description: "Intuitive touch interfaces for ovens, cooktops, and ranges with recipe guidance, remote monitoring, and smart cooking automation for the modern kitchen.",
      detailedDescription: "Our smart kitchen solutions bring culinary innovation to life with guided cooking, voice control, and seamless smartphone integration. Advanced sensor technology and AI-powered recommendations ensure perfect results every time.",
      image: "/images/appliances/smart-kitchen.png",
      features: ["Recipe guidance", "Voice control", "Remote monitoring", "Smart automation"],
      demoLink: "/demos/smart-kitchen"
    },
    {
      id: 2,
      title: "Climate Control Systems",
      description: "Advanced HVAC and air conditioning interfaces with smart temperature control, energy optimization, and multi-zone management for ultimate comfort.",
      detailedDescription: "Transform home comfort with our intelligent climate control interfaces. Featuring adaptive learning, weather forecasting integration, and precise multi-room temperature management for optimal energy efficiency and comfort.",
      image: "/images/appliances/climate-control.png",
      features: ["Smart temperature", "Energy optimization", "Multi-zone control", "Weather integration"],
      demoLink: "/demos/climate-control"
    },
    {
      id: 3,
      title: "Laundry Systems",
      description: "Modern washing machine and dryer interfaces with fabric care guidance, load sensing, and smart cycle optimization for superior cleaning results.",
      detailedDescription: "Revolutionize laundry care with our intelligent washing systems. Automatic detergent dispensing, fabric recognition, and smartphone notifications ensure optimal care for every garment while maximizing efficiency.",
      image: "/images/appliances/laundry-system.png",
      features: ["Fabric care AI", "Load sensing", "Smart cycles", "Remote start"],
      demoLink: "/demos/laundry-systems"
    },
    {
      id: 4,
      title: "Smart Refrigeration",
      description: "Connected refrigerator interfaces with food management, expiration tracking, and energy-efficient cooling control for reduced waste and freshness.",
      detailedDescription: "Keep food fresh longer with our advanced refrigeration interfaces. Featuring inventory tracking, shopping list integration, temperature zone control, and smart alerts for optimal food storage and waste reduction.",
      image: "/images/appliances/refrigeration.png",
      features: ["Food tracking", "Expiration alerts", "Zone control", "Shopping lists"],
      demoLink: "/demos/refrigeration"
    },
    {
      id: 5,
      title: "IoT Integration Hub",
      description: "Unified control interfaces for connected home appliances with centralized management, automation routines, and cross-device intelligence.",
      detailedDescription: "Create a truly smart home ecosystem with our IoT integration platform. Seamless connectivity between all appliances, voice assistant integration, and intelligent automation routines for effortless home management.",
      image: "/images/appliances/iot-hub.png",
      features: ["Unified control", "Voice assistants", "Automation", "Cross-device sync"],
      demoLink: "/demos/iot-integration"
    }
  ];

  const features = [
    {
      icon: Home,
      title: "Consumer-Grade Design",
      description: "Intuitive, beautiful interfaces designed for everyday users with accessibility features and multilingual support. Compliant with consumer safety standards and energy efficiency regulations for global markets.",
      color: "#f07300"
    },
    {
      icon: Zap,
      title: "Energy Efficient", 
      description: "Smart power management and energy monitoring reduce consumption by up to 35%. Real-time usage tracking and optimization algorithms help consumers save money while reducing environmental impact.",
      color: "#f07300"
    },
    {
      icon: Wind,
      title: "IoT & Smart Home Ready",
      description: "Native integration with Alexa, Google Home, Apple HomeKit, and all major smart home platforms. Seamless connectivity enables voice control, automation routines, and remote management from anywhere.",
      color: "#f07300"
    },
    {
      icon: Thermometer,
      title: "Advanced Sensors",
      description: "Precision sensor integration for temperature, humidity, weight, and more. Real-time environmental monitoring and adaptive algorithms ensure optimal performance and user comfort across all conditions.",
      color: "#f07300"
    }
  ];

  const partnerLogos = [
    "Samsung", "LG", "Whirlpool", "Bosch", "Electrolux",
    "Miele", "GE Appliances", "Haier", "Panasonic", "Sharp",
    "Dyson", "Philips", "De'Longhi", "Kenmore", "Frigidaire"
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
    <div className="appliances-page">
      {/* Full Screen Hero Section */}
      <section className="appliances-hero-fullscreen">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `url('/images/appliances/appliances-hero.jpg')`
          }}
        >
          <div className="hero-overlay">
            <div className="container">
              <div className="section-header">
                <div className="header-badge">
                  <span>Home Appliances</span>
                </div>
                <h1 className="section-title">
                  Smart <span className="text-accent">Home Appliance</span> Interfaces
                </h1>
                <p className="section-subtitle">
                  Create exceptional user experiences for smart home appliances with our cutting-edge HMI solutions 
                  for kitchen, climate control, laundry, and connected home ecosystems.
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
              <span>Market Impact</span>
            </div>
            <h2 className="section-title">
              Powering <span className="text-accent">Smart Homes</span> Worldwide
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
              Appliance <span className="text-accent">Solution Demos</span>
            </h2>
            <p className="section-subtitle">Explore our comprehensive suite of HMI solutions for modern home appliances</p>
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
              {slides.map((slide) => (
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

      {/* Partner Logo Carousel */}
      <section className="logo-carousel-section">
        <div className="container">
          <div className="section-header">
            <div className="header-badge">
              <span>Our Partners</span>
            </div>
            <h2 className="section-title">
              Trusted by <span className="text-accent">Leading Brands</span>
            </h2>
          </div>
          <div className="logo-carousel-wrapper">
            <div className="logo-carousel-track">
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div key={index} className="carousel-logo-item">
                  <img 
                    src={`/AppliancePartners/${logo}.webp`}
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

      {/* Why Choose Section - Flip Cards */}
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
              Why <span className="text-accent">Appliance Manufacturers</span> Choose CGI Studio
            </h2>
            <p className="section-subtitle">
              Discover the powerful features and capabilities that make CGI Studio the preferred choice 
              for leading home appliance manufacturers and smart home technology companies worldwide.
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
              Ready to Build the <span className="text-accent">Smart Home of Tomorrow</span>?
            </h2>
            <p className="cta-description">
              Start your journey with CGI Studio today and create exceptional smart appliance experiences 
              that delight users, reduce energy consumption, and define the future of home technology.
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

export default Appliances;