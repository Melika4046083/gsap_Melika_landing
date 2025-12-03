import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay prevented:', error);
        setVideoError(true);
      });
    }
  }, []);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const scrollToWorkflow = () => {
    const workflowSection = document.getElementById('workflow');
    if (workflowSection) {
      workflowSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero-section">
      {!videoError ? (
        <video 
          ref={videoRef}
          className="hero-video" 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          onError={handleVideoError}
        >
          <source src="/videos/Candera_Website.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="hero-fallback bg-gradient-to-br from-blue-500 to-purple-600 w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Candera Studio</h1>
            <p className="text-xl">3D Portfolio & Creative Solutions</p>
          </div>
        </div>
      )}

      <button className="hero-scroll-indicator" onClick={scrollToWorkflow} aria-label="Scroll to workflow section">
        <span>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14m0 0l-5-5m5 5l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  );
};

export default Hero;