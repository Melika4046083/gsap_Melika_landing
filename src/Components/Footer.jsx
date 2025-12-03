import React from 'react';
import { ArrowRight, Linkedin, Twitter, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'CGI Studio', href: '#cgi-studio' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Documentation', href: '#docs' }
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
      { label: 'Partners', href: '#partners' }
    ],
    resources: [
      { label: 'Blog', href: '#blog' },
      { label: 'Case Studies', href: '#cases' },
      { label: 'Support', href: '#support' },
      { label: 'Community', href: '#community' }
    ]
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <img src="/Candera_icon.png" alt="Candera" className="footer-logo" />
            <p className="footer-tagline">
              Empowering embedded HMI development with cutting-edge tools and technology
            </p>
            <div className="footer-cta">
              <a href="#contact" className="cta-button secondary">
                <Mail size={18} strokeWidth={2} />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} Candera GmbH. All rights reserved.</p>
          </div>
          
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>

          <div className="footer-social">
            <a href="#" aria-label="LinkedIn">
              <Linkedin size={18} strokeWidth={2} />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter size={18} strokeWidth={2} />
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube size={18} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
