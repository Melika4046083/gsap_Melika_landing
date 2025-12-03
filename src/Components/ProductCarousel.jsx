import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Code, Rocket, ArrowRight } from 'lucide-react';

const ProductCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const products = [
    {
      index: 0,
      title: "Design Without Compromise",
      description: "Transform your vision into stunning, production-ready interfaces with our intuitive design tools.",
      buttonText: "Explore Design Tools",
      buttonLink: "#",
      image: "/images/Design.webp",
      color: "#f07300", // Orange
      lightColor: "rgba(240, 115, 0, 0.1)", // Light orange
      icon: Sparkles,
      step: "DESIGN"
    },
    {
      index: 1,
      title: "Develop at Light Speed",
      description: "Write cleaner code, debug faster, and ship with confidence using our development tools.",
      buttonText: "Discover Dev Tools",
      buttonLink: "#",
      image: "/images/Develop.webp",
      color: "#86868b", // Gray
      lightColor: "rgba(134, 134, 139, 0.1)", // Light gray
      icon: Code,
      step: "DEVELOP"
    },
    {
      index: 2,
      title: "Deploy with Confidence",
      description: "Launch to any platform with automated testing and zero-downtime deployments.",
      buttonText: "Learn Deployment",
      buttonLink: "#",
      image: "/images/Deploy.webp",
      color: "#ffa94d", // Light orange
      lightColor: "rgba(255, 169, 77, 0.1)", // Very light orange
      icon: Rocket,
      step: "DEPLOY"
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
        threshold: 0.3,
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

  const handleStepClick = (index) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    setProgress(0);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Fixed auto-advance carousel
  useEffect(() => {
    let intervalId;
    
    const startAutoAdvance = () => {
      intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            const nextIndex = (activeIndex + 1) % products.length;
            setActiveIndex(nextIndex);
            return 0;
          }
          return prev + (100 / (5000 / 50));
        });
      }, 50);
    };

    startAutoAdvance();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [activeIndex, products.length]);

  // Reset progress when activeIndex changes
  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  const currentProduct = products[activeIndex];
  const Icon = currentProduct.icon;

  return (
    <section 
      ref={sectionRef}
      id="workflow" // ← ADD THIS LINE HERE
      className={`minimal-product-carousel ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="header-badge">
            <span>Development Workflow</span>
          </div>
          <h2 className="section-title">
            From Concept to <span className="text-accent">Production</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to design, develop, and deploy exceptional applications
          </p>
        </div>

        {/* Steps Navigation */}
        <div className="steps-nav">
          {products.map((product, index) => {
            const StepIcon = product.icon;
            return (
              <button
                key={product.index}
                className={`step-button ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleStepClick(index)}
              >
                <div className="step-icon-wrapper">
                  <StepIcon size={16} strokeWidth={2} />
                </div>
                <span className="step-text">{product.step}</span>
                <div className="step-progress">
                  <div 
                    className="step-progress-fill"
                    style={{ 
                      width: activeIndex === index ? `${progress}%` : 
                             activeIndex > index ? '100%' : '0%',
                      background: product.color
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          
          {/* Left Column - Visual */}
          <div className="visual-column">
            <div className={`product-visual ${isAnimating ? 'animating' : ''}`}>
              <img 
                src={currentProduct.image} 
                alt={currentProduct.title}
                className="product-image"
              />
              <div 
                className="visual-overlay" 
                style={{ background: currentProduct.lightColor }} 
              />
              
              {/* Animated border */}
              <div 
                className="active-border" 
                style={{ borderColor: currentProduct.color }} 
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="content-column">
            <div className={`content-wrapper ${isAnimating ? 'animating' : ''}`}>
              <div 
                className="content-badge" 
                style={{ 
                  color: currentProduct.color,
                  background: currentProduct.lightColor,
                  border: `1px solid ${currentProduct.color}33`
                }}
              >
                <Icon size={16} strokeWidth={2} />
                <span>{currentProduct.step}</span>
              </div>
              
              <h3 className="content-title">{currentProduct.title}</h3>
              <p className="content-description">{currentProduct.description}</p>
              
              <a 
                href={currentProduct.buttonLink} 
                className="cta-button"
                style={{ 
                  background: currentProduct.color,
                  borderColor: currentProduct.color
                }}
              >
                <span>{currentProduct.buttonText}</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
            </div>
          </div>

        </div>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${((activeIndex + 1) / products.length) * 100}%`,
                background: currentProduct.color
              }}
            />
          </div>
          <span className="progress-text">
            {activeIndex + 1} / {products.length}
          </span>
        </div>

      </div>
    </section>
  );
};

export default ProductCarousel;