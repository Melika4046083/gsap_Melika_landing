import React, { useState, useEffect } from 'react';

const Trial = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    companySize: '',
    industry: '',
    projectType: '',
    message: '',
    agreeToTerms: false,
    marketingEmails: false,
    selectedPlatform: ''
  });

  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedPlatform, setExpandedPlatform] = useState(null);

  const hardwarePlatforms = [
    { 
      id: 'raspberry', 
      name: 'Raspberry Pi 5',
      icon: '/images/hardwareIcons/icons8-raspberry-pi-48.png',
      description: 'The latest Raspberry Pi with improved performance and new features for designers and developers.',
      fullDescription: 'Powered by the quad-core Arm Cortex-A76, the Raspberry Pi Compute Module 5 delivers the full performance of Raspberry Pi 5 in a compact, production-ready form factor.',
    },
    { 
      id: 'renesas', 
      name: 'Renesas RZ/G2L',
      icon: '/images/hardwareIcons/Renesas.png',
      description: 'Renesas RZ/G2L processor designed for edge computing with AI acceleration.',
      fullDescription: 'The Renesas RZ/G2L series delivers exceptional performance for edge computing applications. Combining powerful processing with AI acceleration capabilities.',
    },
    { 
      id: 'stm32', 
      name: 'STM32 MP1',
      icon: '/images/hardwareIcons/STM (1).png',
      description: 'STM32 MP1 series offers a powerful combination of Cortex-A7 and Cortex-M4 cores.',
      fullDescription: 'STM32 MP1 microprocessors combine the flexibility of a Linux-capable Cortex-A core with the real-time capabilities of a Cortex-M4 core.',
    },
    { 
      id: 'qualcomm', 
      name: 'Qualcomm Snapdragon',
      icon: '/images/hardwareIcons/QCOM.png',
      description: 'Flagship platform designed for AI, gaming, photography, and premium connectivity.',
      fullDescription: 'Qualcomm Snapdragon platforms represent the pinnacle of mobile and embedded computing. With unmatched AI performance and premium graphics capabilities.',
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.trial-dropdown-wrapper')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePlatformSelect = (platformId) => {
    setExpandedPlatform(platformId);
    setIsDropdownOpen(false);
    setFormData(prev => ({
      ...prev,
      selectedPlatform: platformId
    }));
    
    // Scroll to platform cards section when selecting from dropdown
    setTimeout(() => {
      document.getElementById('platform-cards-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleClosePlatform = () => {
    setExpandedPlatform(null);
  };

  const scrollToForm = () => {
    setExpandedPlatform(null);
    setTimeout(() => {
      document.getElementById('trial-form-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 300);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert(`Thank you! Your trial request for ${formData.selectedPlatform ? hardwarePlatforms.find(p => p.id === formData.selectedPlatform)?.name : 'CGI Studio'} has been submitted.`);
    }
  };

  const expandedPlatformData = expandedPlatform ? hardwarePlatforms.find(p => p.id === expandedPlatform) : null;

  return (
    <main className="trial-page">
      {/* Hero Section - 2 Columns */}
      <section className="trial-hero-two-column">
        <div className="trial-hero-container">
          <div className="trial-hero-grid">
            {/* Left Column - Image */}
            <div className="trial-hero-image-col">
              <img 
                src="/images/watch-box_no_hardware-scaled.png" 
                alt="CGI Studio Hardware Platform"
                className="trial-hero-img"
              />
            </div>

            {/* Right Column - Content */}
            <div className="trial-hero-content-col">
              <div className="header-badge">
                <span>Get Started</span>
              </div>
              
              <h1 className="trial-hero-title">
                Speed up your HMI development - <span className="text-accent">without compromise</span>
              </h1>
              
              <p className="trial-hero-description">
                Download your <strong>60 days free trial</strong> of Candera CGI Studio Professional Edition, 
                designed specifically for SMBs and fast-paced teams who need to move quickly without sacrificing quality.
              </p>

              {/* Platform Dropdown */}
              <div className="trial-dropdown-wrapper">
                <button 
                  className="trial-dropdown-button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="dropdown-text">
                    {formData.selectedPlatform ? 
                      <>
                        <img 
                          src={hardwarePlatforms.find(p => p.id === formData.selectedPlatform)?.icon} 
                          alt={hardwarePlatforms.find(p => p.id === formData.selectedPlatform)?.name}
                          className="dropdown-icon-img"
                        />
                        {hardwarePlatforms.find(p => p.id === formData.selectedPlatform)?.name}
                      </>
                      : 'Choose your target platform and download'
                    }
                  </span>
                  <svg 
                    className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`} 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="trial-dropdown-menu">
                    {hardwarePlatforms.map((platform) => (
                      <button
                        key={platform.id}
                        className="trial-dropdown-item"
                        onClick={() => handlePlatformSelect(platform.id)}
                      >
                        <img src={platform.icon} alt={platform.name} className="item-icon-img" />
                        <span className="item-name">{platform.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Cards Section */}
      <section id="platform-cards-section" className="trial-platforms-section">
        <div className="trial-container">
          <div className="platforms-section-header">
            <div className="platforms-header-badge">
              <span>Hardware Platforms</span>
            </div>
            <h2 className="platforms-section-title">
              All-in-one HMI toolchain for <span className="text-accent">embedded targets</span>
            </h2>
            <p className="platforms-section-subtitle">
              Choose your hardware platform and get started with CGI Studio
            </p>
          </div>

          <div className={`platforms-cards-grid ${expandedPlatform ? 'has-expanded' : ''}`}>
            {hardwarePlatforms.map((platform, index) => (
              <div 
                key={platform.id}
                className={`platform-card-container ${
                  expandedPlatform === platform.id ? 'is-expanded' : 
                  expandedPlatform && expandedPlatform !== platform.id ? 'is-hidden' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Small Card - Always visible */}
                <div className="platform-card">
                  <div className="platform-card-header">
                    <div className="platform-card-icon">
                      <img src={platform.icon} alt={platform.name} />
                    </div>
                    <h3 className="platform-card-title">{platform.name}</h3>
                  </div>
                  
                  <p className="platform-card-description">{platform.description}</p>
                  
                  <button 
                    className="platform-card-button"
                    onClick={() => handlePlatformSelect(platform.id)}
                  >
                    More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>

                {/* Expanded Panel - Slides from right of card */}
                {expandedPlatform === platform.id && (
                  <div className="platform-expanded-panel">
                    <button className="panel-close-btn" onClick={handleClosePlatform}>
                      ×
                    </button>

                    <div className="panel-content">
                      <div className="panel-header">
                        <h2 className="panel-title">{platform.name} Development Kit</h2>
                        <p className="panel-description">{platform.fullDescription}</p>
                      </div>

                      <button className="panel-info-btn">
                        More Information
                      </button>

                      {/* Product Images */}
                      <div className="panel-images">
                        <div className="panel-image-box">
                          <div className="image-placeholder">
                            <span>📱</span>
                            <p>Product Image 1</p>
                          </div>
                        </div>
                        <div className="panel-image-box">
                          <div className="image-placeholder">
                            <span>🔧</span>
                            <p>Product Image 2</p>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button className="panel-cta-btn" onClick={scrollToForm}>
                        Choose platform and proceed
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Form Section - Side by Side */}
      <section className="trial-benefits-form-wrapper">
        <div className="trial-benefits-form-grid">
          
          {/* Left Column - Benefits */}
          <div className="trial-benefits-section">
            <div className="section-header">
              <div className="header-badge">
                <span>What's Included</span>
              </div>
              <h2 className="section-title">
                What you get with Candera <span className="text-accent">CGI Studio</span>
              </h2>
              <p className="section-subtitle">
                Everything you need to build professional HMI applications
              </p>
            </div>

            <div className="trial-benefits-grid">
              <div className="trial-benefit-card">
                <div className="benefit-icon-large">📦</div>
                <div className="benefit-card-content">
                  <h3 className="benefit-card-title">Fast Start</h3>
                  <p className="benefit-card-description">
                    Includes pre-built players and sample apps for different markets
                  </p>
                </div>
              </div>

              <div className="trial-benefit-card">
                <div className="benefit-icon-large">⚡</div>
                <div className="benefit-card-content">
                  <h3 className="benefit-card-title">Optimized for Embedded MCUs</h3>
                  <p className="benefit-card-description">
                    Supports real hardware (ST, RPi, ESP32)
                  </p>
                </div>
              </div>

              <div className="trial-benefit-card">
                <div className="benefit-icon-large">📚</div>
                <div className="benefit-card-content">
                  <h3 className="benefit-card-title">Fully Documented</h3>
                  <p className="benefit-card-description">
                    Step-by-step setup guides included
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div id="trial-form-section" className="trial-form-section">
            <div className="section-header">
              <h2 className="section-title">
                {formData.selectedPlatform ? 
                  `Request Trial for ${hardwarePlatforms.find(p => p.id === formData.selectedPlatform)?.name}` 
                  : 'Start Your Free Trial'}
              </h2>
              <p className="section-subtitle">
                Fill out the form below and we'll get you set up immediately
              </p>
            </div>

            <div className="trial-form-wrapper">
              <form onSubmit={handleSubmit} className="trial-form" noValidate>
                {formData.selectedPlatform && (
                  <div className="selected-platform-display">
                    <div className="selected-platform-info">
                      <img 
                        src={hardwarePlatforms.find(p => p.id === formData.selectedPlatform)?.icon}
                        alt={hardwarePlatforms.find(p => p.id === formData.selectedPlatform)?.name}
                        className="selected-platform-icon"
                      />
                      <span className="selected-platform-name">
                        {hardwarePlatforms.find(p => p.id === formData.selectedPlatform)?.name}
                      </span>
                    </div>
                    <button 
                      type="button" 
                      className="change-platform-btn"
                      onClick={() => setFormData(prev => ({ ...prev, selectedPlatform: '' }))}
                    >
                      Change Platform
                    </button>
                  </div>
                )}

                <div className="form-section">
                  <h3 className="form-section-title">Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your first name"
                        className={errors.firstName ? 'error' : ''}
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your last name"
                        className={errors.lastName ? 'error' : ''}
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">
                        Work Email <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.name@company.com"
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="jobTitle">Job Title</label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="e.g., Software Engineer, UX Designer"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">Company Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Enter your company name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="companySize">Company Size</label>
                      <select
                        id="companySize"
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleChange}
                      >
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="industry">Industry</label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                      >
                        <option value="">Select your industry</option>
                        <option value="automotive">Automotive</option>
                        <option value="medical">Medical Devices</option>
                        <option value="industrial">Industrial Automation</option>
                        <option value="consumer">Consumer Electronics</option>
                        <option value="iot">IoT & Embedded Systems</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="projectType">Project Type</label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                      >
                        <option value="">Select project type</option>
                        <option value="automotive-hmi">Automotive HMI</option>
                        <option value="medical-ui">Medical Device UI</option>
                        <option value="industrial-ui">Industrial UI</option>
                        <option value="consumer-product">Consumer Product</option>
                        <option value="prototype">Prototype Development</option>
                        <option value="evaluation">Product Evaluation</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">Project Details</h3>
                  <div className="form-group full-width">
                    <label htmlFor="message">Tell us about your project</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Briefly describe your project, requirements, or what you hope to achieve with CGI Studio..."
                    />
                  </div>
                </div>

                <div className="form-section">
                  <div className={`checkbox-group ${errors.agreeToTerms ? 'error' : ''}`}>
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="agreeToTerms">
                      I agree to the <a href="/terms" className="link">Terms of Service</a> and <a href="/privacy" className="link">Privacy Policy</a>. <span className="required">*</span>
                    </label>
                  </div>
                  {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="marketingEmails"
                      name="marketingEmails"
                      checked={formData.marketingEmails}
                      onChange={handleChange}
                    />
                    <label htmlFor="marketingEmails">
                      I'd like to receive product updates, tips, and resources via email.
                    </label>
                  </div>
                </div>

                <button type="submit" className="cta-button full-width">
                  Start My Free Trial
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>

                <p className="form-note">
                  Your trial will be activated immediately. No credit card required. 
                  You can cancel anytime during the trial period.
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Trial;
