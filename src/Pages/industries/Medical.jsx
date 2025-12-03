import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, CheckCircle, Shield, Users, Clock, Heart, Activity, Zap } from 'lucide-react';
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

const Medical = () => {
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
    { number: 500, suffix: "+", label: "Healthcare Facilities" },
    { number: 60, suffix: "%", label: "Faster Diagnosis Time" },
    { number: 1, suffix: "M+", label: "Patients Served" },
    { number: 99.99, suffix: "%", label: "Uptime Reliability" }
  ];

  const solutionButtons = [
    "Patient Monitoring",
    "Diagnostic Systems", 
    "Surgical Displays",
    "Medical Imaging",
    "Vital Signs"
  ];

  const slides = [
    {
      id: 1,
      title: "Patient Monitoring Systems",
      description: "Advanced patient monitoring interfaces with real-time vital signs, alerts, and comprehensive data visualization for critical care environments.",
      detailedDescription: "Our patient monitoring solutions provide seamless integration of multiple vital signs, advanced alarm management, and intuitive data presentation. With FDA-compliant design and mission-critical reliability, we ensure patient safety across all care settings.",
      image: "/images/medical/patient-monitoring.png",
      features: ["Real-time vital signs", "Customizable alarms", "HIPAA compliant", "Integration ready"],
      demoLink: "/demos/patient-monitoring"
    },
    {
      id: 2,
      title: "Diagnostic Systems",
      description: "Intuitive diagnostic interfaces with advanced imaging capabilities, AI-assisted analysis, and comprehensive reporting tools for accurate diagnoses.",
      detailedDescription: "Transform diagnostic workflows with our advanced imaging interfaces. Support for multiple modalities, AI-powered insights, and seamless integration with PACS systems for efficient and accurate diagnosis.",
      image: "/images/medical/diagnostic-system.png",
      features: ["Multi-modality support", "AI-assisted analysis", "PACS integration", "3D visualization"],
      demoLink: "/demos/diagnostic-systems"
    },
    {
      id: 3,
      title: "Surgical Display Systems",
      description: "High-precision surgical displays with multi-input support, 4K visualization, and real-time image enhancement for critical surgical procedures.",
      detailedDescription: "Enhance surgical precision with our state-of-the-art display systems. Featuring ultra-high resolution, zero-latency video routing, and advanced color accuracy for optimal visualization during procedures.",
      image: "/images/medical/surgical-display.png",
      features: ["4K/8K resolution", "Multi-input routing", "Color-accurate display", "Zero latency"],
      demoLink: "/demos/surgical-displays"
    },
    {
      id: 4,
      title: "Medical Imaging Interfaces",
      description: "Comprehensive medical imaging interfaces for radiology, cardiology, and other specialties with advanced visualization and collaboration tools.",
      detailedDescription: "Optimize imaging workflows with our specialized interfaces. Support for DICOM standards, advanced measurement tools, and multi-screen configurations for efficient image review and analysis.",
      image: "/images/medical/medical-imaging.png",
      features: ["DICOM compliant", "Advanced measurements", "Multi-screen support", "Cloud integration"],
      demoLink: "/demos/medical-imaging"
    },
    {
      id: 5,
      title: "Vital Signs Dashboard",
      description: "Comprehensive vital signs monitoring with trend analysis, predictive alerts, and customizable display layouts for different care units.",
      detailedDescription: "Centralize patient monitoring with our intelligent vital signs dashboard. Real-time data aggregation, predictive analytics, and customizable views for ICU, emergency, and general care environments.",
      image: "/images/medical/vital-signs.png",
      features: ["Trend analysis", "Predictive alerts", "Custom layouts", "Data export"],
      demoLink: "/demos/vital-signs"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Medical Grade Certified",
      description: "IEC 60601 and FDA compliant for medical device safety with rigorous testing and validation. Built to meet the highest standards for patient safety and regulatory requirements across global markets.",
      color: "#f07300"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring", 
      description: "Continuous real-time data processing with sub-millisecond response times for critical care applications. Advanced alarm management ensures immediate notification of critical patient status changes.",
      color: "#f07300"
    },
    {
      icon: Heart,
      title: "Patient-Centric Design",
      description: "Intuitive interfaces designed with healthcare professionals and patient safety in mind. Reduces cognitive load for medical staff while ensuring accurate information display and quick access to critical data.",
      color: "#f07300"
    },
    {
      icon: Zap,
      title: "Seamless Integration",
      description: "HL7 and FHIR compatible with support for all major EMR/EHR systems and medical devices. Easy integration with existing hospital infrastructure and third-party medical equipment for complete workflow solutions.",
      color: "#f07300"
    }
  ];

  const partnerLogos = [
    "Siemens", "Philips", "GE Healthcare", "Medtronic", "Abbott",
    "Boston Scientific", "Stryker", "Johnson & Johnson", "Roche", "BD",
    "Zimmer Biomet", "Cardinal Health", "Baxter", "Fresenius", "B. Braun"
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
    <div className="medical-page">
      {/* Full Screen Hero Section */}
      <section className="medical-hero-fullscreen">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `url('/images/medical/medical-hero.jpg')`
          }}
        >
          <div className="hero-overlay">
            <div className="container">
              <div className="section-header">
                <div className="header-badge">
                  <span>Medical Solutions</span>
                </div>
                <h1 className="section-title">
                  Advanced <span className="text-accent">Medical HMI</span> Solutions
                </h1>
                <p className="section-subtitle">
                  Empower healthcare professionals with cutting-edge HMI solutions for patient monitoring, 
                  diagnostic systems, surgical displays, and comprehensive medical imaging interfaces.
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
              <span>Healthcare Impact</span>
            </div>
            <h2 className="section-title">
              Trusted by <span className="text-accent">Healthcare Leaders</span> Worldwide
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
              Medical <span className="text-accent">Solution Demos</span>
            </h2>
            <p className="section-subtitle">Explore our comprehensive suite of HMI solutions for healthcare environments</p>
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
              Trusted by <span className="text-accent">Healthcare Leaders</span>
            </h2>
          </div>
          <div className="logo-carousel-wrapper">
            <div className="logo-carousel-track">
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div key={index} className="carousel-logo-item">
                  <img 
                    src={`/MedicalPartners/${logo}.webp`}
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
              Why <span className="text-accent">Healthcare Providers</span> Choose CGI Studio
            </h2>
            <p className="section-subtitle">
              Discover the powerful features and capabilities that make CGI Studio the preferred choice 
              for leading healthcare institutions and medical device manufacturers worldwide.
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
              Ready to Transform Your <span className="text-accent">Medical Systems</span>?
            </h2>
            <p className="cta-description">
              Start your journey with CGI Studio today and create exceptional healthcare experiences 
              that improve patient outcomes and streamline clinical workflows.
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

export default Medical;