import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, CheckCircle, Shield, Users, Clock, Settings, Gauge, Cog, Zap } from 'lucide-react';
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

const Industrial = () => {
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
    { number: 2000, suffix: "+", label: "Industrial Installations" },
    { number: 45, suffix: "%", label: "Increased Efficiency" },
    { number: 10, suffix: "M+", label: "Operating Hours" },
    { number: 99.8, suffix: "%", label: "System Uptime" }
  ];

  const solutionButtons = [
    "SCADA Systems",
    "Machine Control", 
    "Process Monitoring",
    "Factory Automation",
    "Quality Control"
  ];

  const slides = [
    {
      id: 1,
      title: "SCADA Systems",
      description: "Comprehensive supervisory control and data acquisition systems with real-time monitoring, remote control capabilities, and advanced analytics for industrial processes.",
      detailedDescription: "Our SCADA solutions provide complete visibility and control over industrial operations. With distributed architecture, redundant systems, and advanced cybersecurity, we ensure continuous operation and data integrity for mission-critical processes.",
      image: "/images/industrial/scada-system.png",
      features: ["Real-time monitoring", "Remote control", "Data analytics", "Alarm management"],
      demoLink: "/demos/scada-systems"
    },
    {
      id: 2,
      title: "Machine Control Interfaces",
      description: "Intuitive machine control HMIs with touch-screen support, multi-language capabilities, and customizable dashboards for enhanced operator efficiency.",
      detailedDescription: "Transform machine operation with our advanced control interfaces. Featuring gesture support, responsive design, and context-sensitive help systems for optimal operator productivity and reduced training time.",
      image: "/images/industrial/machine-control.png",
      features: ["Touch-screen ready", "Multi-language", "Custom dashboards", "Responsive design"],
      demoLink: "/demos/machine-control"
    },
    {
      id: 3,
      title: "Process Monitoring",
      description: "Advanced process monitoring systems with trend visualization, predictive maintenance alerts, and comprehensive data logging for continuous improvement.",
      detailedDescription: "Optimize your production processes with our intelligent monitoring solutions. Real-time KPI tracking, automated reporting, and machine learning-powered predictive analytics for proactive maintenance.",
      image: "/images/industrial/process-monitoring.png",
      features: ["Trend analysis", "Predictive maintenance", "Data logging", "KPI tracking"],
      demoLink: "/demos/process-monitoring"
    },
    {
      id: 4,
      title: "Factory Automation",
      description: "Complete factory automation interfaces with production line control, inventory management, and real-time production tracking for Industry 4.0 readiness.",
      detailedDescription: "Embrace Industry 4.0 with our comprehensive automation platform. Seamless integration with PLCs, robots, and MES systems for complete shop floor digitalization and intelligent manufacturing.",
      image: "/images/industrial/factory-automation.png",
      features: ["Line control", "Inventory management", "Production tracking", "MES integration"],
      demoLink: "/demos/factory-automation"
    },
    {
      id: 5,
      title: "Quality Control Systems",
      description: "Automated quality control interfaces with defect detection, statistical process control, and real-time inspection data visualization.",
      detailedDescription: "Ensure consistent product quality with our advanced QC systems. AI-powered defect detection, automatic reporting, and traceability features for complete quality assurance and compliance documentation.",
      image: "/images/industrial/quality-control.png",
      features: ["Defect detection", "Statistical analysis", "Inspection tracking", "Compliance reports"],
      demoLink: "/demos/quality-control"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Industrial Grade",
      description: "IEC 61131 and IEC 62443 compliant for industrial automation and cybersecurity. Built to withstand harsh industrial environments with extended temperature ranges, vibration resistance, and electromagnetic compatibility.",
      color: "#f07300"
    },
    {
      icon: Gauge,
      title: "Real-time Performance", 
      description: "Deterministic real-time operation with microsecond-level precision for time-critical control applications. Low-latency data processing ensures immediate response to process changes and alarm conditions.",
      color: "#f07300"
    },
    {
      icon: Settings,
      title: "Flexible Architecture",
      description: "Modular design that scales from single machines to enterprise-wide systems. Support for distributed architectures, edge computing, and cloud connectivity for complete flexibility in deployment scenarios.",
      color: "#f07300"
    },
    {
      icon: Cog,
      title: "Seamless Integration",
      description: "OPC UA, Modbus, MQTT, and all major industrial protocols supported. Easy integration with existing PLCs, DCS systems, ERP platforms, and third-party equipment from any manufacturer.",
      color: "#f07300"
    }
  ];

  const partnerLogos = [
    "Siemens", "ABB", "Rockwell", "Schneider", "Honeywell",
    "Emerson", "Yokogawa", "Endress Hauser", "Phoenix Contact", "Mitsubishi",
    "Omron", "Fanuc", "KUKA", "Beckhoff", "B&R"
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
    <div className="industrial-page">
      {/* Full Screen Hero Section */}
      <section className="industrial-hero-fullscreen">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `url('/images/industrial/industrial-hero.jpg')`
          }}
        >
          <div className="hero-overlay">
            <div className="container">
              <div className="section-header">
                <div className="header-badge">
                  <span>Industrial Solutions</span>
                </div>
                <h1 className="section-title">
                  Next-Generation <span className="text-accent">Industrial HMI</span>
                </h1>
                <p className="section-subtitle">
                  Transform industrial operations with our cutting-edge HMI solutions for SCADA systems, 
                  machine control, process monitoring, and complete factory automation.
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
              Trusted by <span className="text-accent">Industrial Leaders</span> Worldwide
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
              Industrial <span className="text-accent">Solution Demos</span>
            </h2>
            <p className="section-subtitle">Explore our comprehensive suite of HMI solutions for modern manufacturing</p>
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
              Trusted by <span className="text-accent">Industry Leaders</span>
            </h2>
          </div>
          <div className="logo-carousel-wrapper">
            <div className="logo-carousel-track">
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div key={index} className="carousel-logo-item">
                  <img 
                    src={`/IndustrialPartners/${logo}.webp`}
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
              Why <span className="text-accent">Industrial Leaders</span> Choose CGI Studio
            </h2>
            <p className="section-subtitle">
              Discover the powerful features and capabilities that make CGI Studio the preferred choice 
              for leading manufacturers and industrial automation companies worldwide.
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
              Ready to Transform Your <span className="text-accent">Industrial Operations</span>?
            </h2>
            <p className="cta-description">
              Start your journey with CGI Studio today and create exceptional industrial HMI solutions 
              that increase efficiency, reduce downtime, and drive operational excellence.
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

export default Industrial;