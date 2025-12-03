import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../constants';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleMobileDropdown = (index) => {
    setActiveMobileDropdown(activeMobileDropdown === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveMobileDropdown(null);
    }
  };

  // Close mobile menu when a link is clicked
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setActiveMobileDropdown(null);
  };

  // Check if current dropdown is "Products" (you'll need to adjust this based on your navLinks structure)
  const isProductsDropdown = (index) => {
    // Adjust this condition based on how Products menu item is identified
    return navLinks[index]?.label?.toLowerCase().includes('product') || 
           navLinks[index]?.label?.toLowerCase().includes('services') ||
           // Add other conditions as needed based on your navLinks structure
           navLinks[index]?.id === 'products'; // if you have an id field
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/" aria-label="Home">
              <img 
                src="/Candera_icon.png" 
                alt="Logo" 
                className="logo-img"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="navbar-nav desktop-nav">
            <ul className="nav-list">
              {navLinks.map((item, index) => (
                <li key={index} className="nav-item">
                  {item.submenu ? (
                    <div className="dropdown">
                      <button
                        className="nav-link dropdown-toggle"
                        onClick={() => toggleDropdown(index)}
                        onMouseEnter={() => setActiveDropdown(index)}
                      >
                        <span>{item.label}</span>
                        <svg 
                          className={`chevron ${activeDropdown === index ? 'chevron-open' : ''}`}
                          width="6" 
                          height="10" 
                          viewBox="0 0 6 10"
                        >
                          <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <Link 
                      to={item.href} 
                      className="nav-link"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="navbar-cta desktop-only">
            <Link to="/trial" className="cta-button">
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'hamburger-open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Full-Width Dropdown Menu - Desktop */}
        {activeDropdown !== null && navLinks[activeDropdown].submenu && (
          <div 
            className="mega-dropdown"
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="mega-dropdown-content">
              <div className={`mega-dropdown-layout ${navLinks[activeDropdown].submenu.hero ? 'has-hero' : ''}`}>
                
                {/* Hero Section with Logo - ONLY FOR PRODUCTS DROPDOWN */}
                {navLinks[activeDropdown].submenu.hero && isProductsDropdown(activeDropdown) && (
                  <div className="mega-dropdown-hero">
                    {/* CGI Studio Logo - Only shown for Products dropdown */}
                    <div className="hero-logo-container">
                      <img 
                        src="/images/Candera CGI Studio_white.png" 
                        alt="CGI Studio" 
                        className="hero-logo"
                      />
                    </div>
                    <h2 className="hero-title">
                      {navLinks[activeDropdown].submenu.hero.title}
                    </h2>
                    <p className="hero-description">
                      {navLinks[activeDropdown].submenu.hero.description}
                    </p>
                  </div>
                )}

                {/* Hero Section WITHOUT Logo - FOR OTHER DROPDOWNS */}
                {navLinks[activeDropdown].submenu.hero && !isProductsDropdown(activeDropdown) && (
                  <div className="mega-dropdown-hero">
                    {/* No logo for non-products dropdowns */}
                    <h2 className="hero-title">
                      {navLinks[activeDropdown].submenu.hero.title}
                    </h2>
                    <p className="hero-description">
                      {navLinks[activeDropdown].submenu.hero.description}
                    </p>
                  </div>
                )}

                {/* Regular Columns */}
                <div className="mega-dropdown-grid">
                  {navLinks[activeDropdown].submenu.columns?.map((column, colIndex) => (
                    <div key={colIndex} className="mega-dropdown-column">
                      <h3 className="column-title">{column.title}</h3>
                      <ul className="column-items">
                        {column.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link 
                              to={item.href} 
                              className="dropdown-item"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Featured Section */}
                {navLinks[activeDropdown].submenu.featured && (
                  <div className="mega-dropdown-featured">
                    <h3 className="featured-title">
                      {navLinks[activeDropdown].submenu.featured.title}
                    </h3>
                    <ul className="featured-items">
                      {navLinks[activeDropdown].submenu.featured.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link 
                            to={item.href} 
                            className="featured-item"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <h4 className="featured-item-title">{item.label}</h4>
                            {item.description && (
                              <p className="featured-item-description">
                                {item.description}
                              </p>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}>
          <nav>
            <ul className="mobile-nav-list">
              {navLinks.map((item, index) => (
                <li key={index} className="mobile-nav-item">
                  {item.submenu ? (
                    <div className="mobile-dropdown">
                      <button
                        className="mobile-nav-link"
                        onClick={() => toggleMobileDropdown(index)}
                      >
                        <span>{item.label}</span>
                        <svg 
                          className={`chevron ${activeMobileDropdown === index ? 'chevron-open' : ''}`}
                          width="6" 
                          height="10" 
                          viewBox="0 0 6 10"
                        >
                          <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        </svg>
                      </button>
                      {activeMobileDropdown === index && (
                        <div className="mobile-submenu">
                          {/* Mobile Hero with Logo - ONLY FOR PRODUCTS DROPDOWN */}
                          {item.submenu.hero && isProductsDropdown(index) && (
                            <div className="mobile-hero">
                              {/* Mobile CGI Studio Logo - Only for Products */}
                              <div className="mobile-hero-logo-container">
                                <img 
                                  src="/images/Candera CGI Studio_white.png" 
                                  alt="CGI Studio" 
                                  className="mobile-hero-logo"
                                />
                              </div>
                              <h3>{item.submenu.hero.title}</h3>
                              <p>{item.submenu.hero.description}</p>
                            </div>
                          )}

                          {/* Mobile Hero WITHOUT Logo - FOR OTHER DROPDOWNS */}
                          {item.submenu.hero && !isProductsDropdown(index) && (
                            <div className="mobile-hero">
                              {/* No logo for non-products dropdowns */}
                              <h3>{item.submenu.hero.title}</h3>
                              <p>{item.submenu.hero.description}</p>
                            </div>
                          )}

                          {/* Mobile Columns */}
                          {item.submenu.columns?.map((column, colIndex) => (
                            <div key={colIndex} className="mobile-column">
                              <h4 className="mobile-column-title">{column.title}</h4>
                              <ul>
                                {column.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link 
                                      to={subItem.href} 
                                      className="mobile-submenu-link"
                                      onClick={handleMobileLinkClick}
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {/* Mobile Featured */}
                          {item.submenu.featured && (
                            <div className="mobile-featured">
                              <h4 className="mobile-column-title">
                                {item.submenu.featured.title}
                              </h4>
                              <ul>
                                {item.submenu.featured.items.map((featItem, featIndex) => (
                                  <li key={featIndex}>
                                    <Link 
                                      to={featItem.href} 
                                      className="mobile-featured-link"
                                      onClick={handleMobileLinkClick}
                                    >
                                      <div className="mobile-featured-label">
                                        {featItem.label}
                                      </div>
                                      {featItem.description && (
                                        <div className="mobile-featured-desc">
                                          {featItem.description}
                                        </div>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link 
                      to={item.href} 
                      className="mobile-nav-link"
                      onClick={handleMobileLinkClick}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
              {/* Mobile CTA */}
              <li className="mobile-nav-item mobile-cta">
                <Link 
                  to="/trial" 
                  className="cta-button"
                  onClick={handleMobileLinkClick}
                >
                  Start Free Trial
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default NavBar;