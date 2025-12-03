import React, { useEffect, useRef, useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';

const Company = () => {
  const sectionRefs = {
    about: useRef(null),
    team: useRef(null),
    vision: useRef(null),
    structure: useRef(null)
  };

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRefs.about.current) {
      observer.observe(sectionRefs.about.current);
    }

    return () => {
      if (sectionRefs.about.current) {
        observer.unobserve(sectionRefs.about.current);
      }
    };
  }, [hasAnimated]);

  const handlePlayVideo = () => {
    setVideoPlaying(true);
  };

  const scrollToAbout = () => {
    sectionRefs.about.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Team members data with actual image paths
  const teamMembers = [
    {
      name: "Kaspar Claudia",
      role: "CEO & Founder",
      image: "/images/Kaspar-Claudia.jpg",
      description: "Visionary leader with 15+ years in embedded systems and HMI technology."
    },
    {
      name: "Marcus Rodriguez",
      role: "Chief Technology Officer",
      image: "/images/team-marcus.jpg",
      description: "Technology expert specializing in real-time graphics and embedded systems."
    },
    {
      name: "Sarah Johnson",
      role: "VP of Product",
      image: "/images/team-sarah.jpg",
      description: "Product management leader with deep expertise in developer tools."
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      image: "/images/team-david.jpg",
      description: "Engineering leader with extensive experience scaling development teams."
    }
  ];

  return (
    <div className="company-page">
      {/* Hero Section with Background Image */}
      <section className="company-hero-minimal">
        <div className="hero-background-minimal">
          <img 
            src="/images/Candera-Behind-the-success.webp" 
            alt="Candera Behind the Success" 
            className="hero-bg-image-minimal"
          />
          <div className="hero-overlay-minimal"></div>
        </div>
        
        <div className="company-hero-content-minimal">
          <div className="hero-content-wrapper-minimal">
            <div className="header-badge-minimal">
              <span>Behind the Success</span>
            </div>
            <h1 className="company-hero-title-minimal">
              The People Behind <span className="text-accent">CGI Studio</span>
            </h1>
            <p className="company-hero-subtitle-minimal">
              Meet the passionate innovators and visionaries driving the future of embedded HMI technology worldwide
            </p>
          </div>

          <button 
            className="hero-scroll-indicator-minimal" 
            onClick={scrollToAbout}
            aria-label="Scroll to about section"
          >
            <span>Scroll to explore</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14m0 0l-5-5m5 5l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

      {/* About Candera Section with Video */}
      <section 
        ref={sectionRefs.about}
        className={`about-candera-section-minimal ${isVisible ? 'visible' : ''}`}
      >
        <div className="company-container-minimal">
          <div className="section-header-minimal">
            <h2 className="section-title-minimal">
              About <span className="text-accent">Candera</span>
            </h2>
            <p className="section-subtitle-minimal">
              Discover our journey, mission, and the passion that drives us to revolutionize HMI development
            </p>
          </div>

          <div className="about-content-minimal">
            <div className="about-text-minimal">
              <p className="about-description-minimal">
                For over two decades, Candera has been at the forefront of HMI technology innovation. 
                We empower industries to create exceptional user experiences through cutting-edge tools 
                and solutions that transform how embedded interfaces are developed and experienced.
              </p>
              <div className="about-features-minimal">
                <div className="feature-minimal">
                  <h3>Our Mission</h3>
                  <p>To provide developers with the most advanced tools for creating stunning embedded interfaces.</p>
                </div>
                <div className="feature-minimal">
                  <h3>Our Vision</h3>
                  <p>To be the global leader in HMI technology innovation and development solutions.</p>
                </div>
              </div>
            </div>

            <div className="video-section-minimal">
              {!videoPlaying ? (
                <div className="video-placeholder-minimal" onClick={handlePlayVideo}>
                  <div className="video-thumbnail-minimal">
                    <img 
                      src="/images/Reinhard.webp" 
                      alt="Candera Story" 
                      className="thumbnail-image-minimal"
                    />
                    <div className="play-button-minimal">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="video-container-minimal">
                  <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/KaucCVK4ZIg?autoplay=1"
                    title="Candera Company Story"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section - Minimal */}
      <section ref={sectionRefs.team} className="team-section-minimal">
        <div className="company-container-minimal">
          <div className="section-header-minimal">
            <h2 className="section-title-minimal">
              Meet Our <span className="text-accent">Team</span>
            </h2>
            <p className="section-subtitle-minimal">
              The talented individuals behind CGI Studio's innovation and global success
            </p>
          </div>

          <div className="team-grid-minimal">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card-minimal">
                <div className="team-image-minimal">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="member-image-minimal"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="image-fallback-minimal">
                    <div className="fallback-initials">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                </div>
                <div className="team-info-minimal">
                  <h3 className="team-name-minimal">{member.name}</h3>
                  <p className="team-role-minimal">{member.role}</p>
                  <p className="team-description-minimal">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section ref={sectionRefs.vision} className="vision-section-minimal">
        <div className="company-container-minimal">
          <div className="section-header-minimal">
            <h2 className="section-title-minimal">
              Our <span className="text-accent">Vision</span>
            </h2>
            <p className="section-subtitle-minimal">
              Shaping the future of human-machine interaction through innovation and excellence
            </p>
          </div>

          <div className="vision-content-minimal">
            <div className="vision-image-minimal">
              <img 
                src="/images/Vision.webp" 
                alt="Candera Vision" 
                className="vision-img-minimal"
              />
            </div>
            <div className="vision-text-minimal">
              <div className="vision-point-minimal">
                <h3>Innovation Leadership</h3>
                <p>Continually pushing the boundaries of what's possible in embedded graphics and HMI technology.</p>
              </div>
              <div className="vision-point-minimal">
                <h3>Global Impact</h3>
                <p>Empowering industries worldwide with tools that transform user experiences across devices and platforms.</p>
              </div>
              <div className="vision-point-minimal">
                <h3>Sustainable Growth</h3>
                <p>Building a company that grows responsibly while maintaining our commitment to quality and innovation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Structure Section */}
      <section ref={sectionRefs.structure} className="structure-section-minimal">
        <div className="company-container-minimal">
          <div className="section-header-minimal">
            <h2 className="section-title-minimal">
              Company <span className="text-accent">Structure</span>
            </h2>
            <p className="section-subtitle-minimal">
              Our organizational framework designed for innovation and collaboration
            </p>
          </div>

          <div className="structure-content-minimal">
            <div className="structure-image-minimal">
              <img 
                src="/images/Vision.webp" 
                alt="Company Structure" 
                className="structure-img-minimal"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-minimal">
        <div className="company-container-minimal">
          <div className="cta-content-minimal">
            <h2 className="cta-title-minimal">Join Our Journey</h2>
            <p className="cta-subtitle-minimal">
              Be part of the revolution in embedded HMI technology
            </p>
            <div className="cta-buttons-minimal">
              <a href="/careers" className="cta-button">
                View Open Positions
                <ArrowRight size={18} />
              </a>
              <a href="/contact" className="cta-button secondary">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;