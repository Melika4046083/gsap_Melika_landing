import React, { useState } from 'react';

const Support = () => {
  const [activeTab, setActiveTab] = useState('documentation');

  return (
    <main className="support-page">
      {/* Hero Section */}
      <section className="support-hero">
        <div className="container">
          <div className="hero-content">
            <h1>CGI Studio Support</h1>
            <p className="hero-subtitle">
              Get the help you need to succeed with CGI Studio
            </p>
            <p className="hero-description">
              Comprehensive resources, documentation, and expert support to help you 
              build amazing embedded graphics applications.
            </p>
          </div>
        </div>
      </section>

      {/* Support Tabs */}
      <section className="support-tabs">
        <div className="container">
          <div className="tabs-header">
            <button 
              className={`tab-button ${activeTab === 'documentation' ? 'active' : ''}`}
              onClick={() => setActiveTab('documentation')}
            >
              Documentation
            </button>
            <button 
              className={`tab-button ${activeTab === 'tutorials' ? 'active' : ''}`}
              onClick={() => setActiveTab('tutorials')}
            >
              Tutorials
            </button>
            <button 
              className={`tab-button ${activeTab === 'community' ? 'active' : ''}`}
              onClick={() => setActiveTab('community')}
            >
              Community
            </button>
            <button 
              className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              Contact Support
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'documentation' && (
              <div className="documentation-content">
                <h2>Documentation & Guides</h2>
                <div className="docs-grid">
                  <a href="#" className="doc-card">
                    <h3>Getting Started Guide</h3>
                    <p>Complete beginner's guide to CGI Studio</p>
                  </a>
                  
                  <a href="#" className="doc-card">
                    <h3>API Reference</h3>
                    <p>Complete API documentation and examples</p>
                  </a>
                  
                  <a href="#" className="doc-card">
                    <h3>Best Practices</h3>
                    <p>Development guidelines and optimization tips</p>
                  </a>
                  
                  <a href="#" className="doc-card">
                    <h3>Release Notes</h3>
                    <p>Latest updates and new features</p>
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'tutorials' && (
              <div className="tutorials-content">
                <h2>Video Tutorials</h2>
                <div className="tutorials-grid">
                  <div className="tutorial-card">
                    <div className="tutorial-thumbnail"></div>
                    <h3>Basic HMI Creation</h3>
                    <p>Learn to create your first embedded interface</p>
                  </div>
                  
                  <div className="tutorial-card">
                    <div className="tutorial-thumbnail"></div>
                    <h3>3D Integration</h3>
                    <p>Adding 3D elements to your applications</p>
                  </div>
                  
                  <div className="tutorial-card">
                    <div className="tutorial-thumbnail"></div>
                    <h3>Performance Optimization</h3>
                    <p>Tips for maximizing graphics performance</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="contact-content">
                <h2>Contact Our Support Team</h2>
                <div className="contact-options">
                  <div className="contact-card">
                    <h3>Email Support</h3>
                    <p>support@candera.com</p>
                    <p>Typically responds within 24 hours</p>
                  </div>
                  
                  <div className="contact-card">
                    <h3>Phone Support</h3>
                    <p>+1 (555) 123-4567</p>
                    <p>Mon-Fri, 9AM-5PM EST</p>
                  </div>
                  
                  <div className="contact-card">
                    <h3>Enterprise Support</h3>
                    <p>Dedicated support for enterprise customers</p>
                    <a href="#" className="cta-button">Contact Sales</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What platforms does CGI Studio support?</h3>
              <p>CGI Studio supports Windows, Linux, QNX, and various embedded systems with OpenGL ES and Vulkan.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I try CGI Studio before purchasing?</h3>
              <p>Yes, we offer a 30-day free trial with full access to all features.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you provide training and onboarding?</h3>
              <p>We offer comprehensive training programs and dedicated onboarding for enterprise customers.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Support;