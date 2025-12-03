import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, CheckCircle, Shield, Users, Clock, Watch, Activity, Smartphone, Zap } from 'lucide-react';
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

const Wearable = () => {
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
    { number: 200, suffix: "M+", label: "Wearable Devices Powered" },
    { number: 50, suffix: "%", label: "Battery Life Extension" },
    { number: 30, suffix: "+", label: "Device Manufacturers" },
    { number: 4.9, suffix: "/5", label: "User Experience Rating" }
  ];

  const solutionButtons = [
    "Smartwatches",
    "Fitness Trackers", 
    "AR/VR Headsets",
    "Smart Glasses",
    "Health Monitors"
  ];

  const slides = [
    {
      id: 1,
      title: "Smartwatch Interfaces",
      description: "Beautiful, responsive smartwatch UIs with customizable watch faces, health tracking, notifications, and seamless smartphone integration for the ultimate wrist experience.",
      detailedDescription: "Our smartwatch solutions deliver stunning visuals on small displays with optimized performance and battery efficiency. Advanced gesture controls, voice integration, and contextual awareness create an intuitive experience that keeps users connected.",
      image: "/images/wearable/smartwatch.png",
      features: ["Custom watch faces", "Health tracking", "Notifications", "Voice control"],
      demoLink: "/demos/smartwatch"
    },
    {
      id: 2,
      title: "Fitness Tracker Displays",
      description: "Energy-efficient fitness tracker interfaces with real-time activity monitoring, workout guidance, and goal tracking for active lifestyles.",
      detailedDescription: "Optimize athletic performance with our specialized fitness interfaces. Heart rate monitoring, GPS tracking, workout analytics, and motivation features help users achieve their fitness goals with precision and ease.",
      image: "/images/wearable/fitness-tracker.png",
      features: ["Activity tracking", "Workout modes", "Goal setting", "GPS integration"],
      demoLink: "/demos/fitness-tracker"
    },
    {
      id: 3,
      title: "AR/VR Headset UIs",
      description: "Immersive augmented and virtual reality interfaces with 3D spatial navigation, hand tracking, and eye-tracking optimization for next-generation experiences.",
      detailedDescription: "Transform digital interaction with our cutting-edge AR/VR interfaces. Low-latency rendering, intuitive spatial menus, and multi-modal input create truly immersive experiences that blur the line between physical and digital worlds.",
      image: "/images/wearable/ar-vr-headset.png",
      features: ["3D spatial UI", "Hand tracking", "Eye tracking", "Low latency"],
      demoLink: "/demos/ar-vr"
    },
    {
      id: 4,
      title: "Smart Glasses Displays",
      description: "Lightweight smart glasses interfaces with heads-up information, AR overlays, and voice-controlled navigation that augment reality without distraction.",
      detailedDescription: "Enhance daily life with our smart glasses platform. Contextual information display, navigation assistance, and hands-free communication create a seamless augmented reality experience that complements natural vision.",
      image: "/images/wearable/smart-glasses.png",
      features: ["HUD display", "AR overlays", "Voice commands", "Lightweight UI"],
      demoLink: "/demos/smart-glasses"
    },
    {
      id: 5,
      title: "Health Monitoring Devices",
      description: "Medical-grade wearable health monitors with continuous vital sign tracking, ECG analysis, and emergency alert systems for proactive health management.",
      detailedDescription: "Empower preventive healthcare with our advanced monitoring interfaces. Continuous heart rate, blood oxygen, temperature tracking, and AI-powered health insights help users stay informed and healthy with medical-grade accuracy.",
      image: "/images/wearable/health-monitor.png",
      features: ["Vital signs", "ECG monitoring", "Health alerts", "Data sync"],
      demoLink: "/demos/health-monitor"
    }
  ];

  const features = [
    {
      icon: Watch,
      title: "Ultra-Low Power",
      description: "Optimized rendering engines and power management extend battery life by up to 50% without compromising visual quality. Adaptive refresh rates and intelligent display dimming ensure devices last longer between charges.",
      color: "#f07300"
    },
    {
      icon: Activity,
      title: "Real-time Sensing", 
      description: "Advanced sensor fusion combines accelerometer, gyroscope, heart rate, and environmental data for accurate activity tracking. Machine learning algorithms provide intelligent insights and personalized recommendations.",
      color: "#f07300"
    },
    {
      icon: Smartphone,
      title: "Seamless Connectivity",
      description: "Native integration with iOS, Android, and all major platforms ensures smooth data synchronization. Bluetooth LE, Wi-Fi, and cellular connectivity options provide flexible communication across all environments.",
      color: "#f07300"
    },
    {
      icon: Zap,
      title: "Touch & Gesture Control",
      description: "Multi-touch support, haptic feedback, and advanced gesture recognition create intuitive interactions on small displays. Voice control and crown rotation provide alternative input methods for every situation.",
      color: "#f07300"
    }
  ];

  const partnerLogos = [
    "Apple", "Samsung", "Garmin", "Fitbit", "Huawei",
    "Xiaomi", "Polar", "Suunto", "Fossil", "TicWatch",
    "Amazfit", "Withings", "Coros", "Wahoo", "Whoop"
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
    <div className="wearable-page">
      {/* Full Screen Hero Section */}
      <section className="wearable-hero-fullscreen">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `url('/images/wearable/wearable-hero.jpg')`
          }}
        >
          <div className="hero-overlay">
            <div className="container">
              <div className="section-header">
                <div className="header-badge">
                  <span>Wearable Technology</span>
                </div>
                <h1 className="section-title">
                  Next-Gen <span className="text-accent">Wearable</span> Interfaces
                </h1>
                <p className="section-subtitle">
                  Design exceptional user experiences for smartwatches, fitness trackers, AR/VR headsets, 
                  and health monitoring devices with our optimized HMI solutions for wearable technology.
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
              Powering <span className="text-accent">Wearable Innovation</span> Worldwide
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
              Wearable <span className="text-accent">Solution Demos</span>
            </h2>
            <p className="section-subtitle">Explore our comprehensive suite of HMI solutions for wearable devices</p>
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
                    src={`/WearablePartners/${logo}.webp`}
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
              Why <span className="text-accent">Wearable Innovators</span> Choose CGI Studio
            </h2>
            <p className="section-subtitle">
              Discover the powerful features and capabilities that make CGI Studio the preferred choice 
              for leading wearable technology companies and health tech innovators worldwide.
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
              Ready to Build the <span className="text-accent">Future of Wearables</span>?
            </h2>
            <p className="cta-description">
              Start your journey with CGI Studio today and create exceptional wearable experiences 
              that enhance daily life, promote wellness, and define the next generation of personal technology.
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

export default Wearable;