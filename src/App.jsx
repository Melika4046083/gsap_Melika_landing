import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from "./Components/NavBar";
import Hero from "./Components/Hero";
import ProductCarousel from "./Components/ProductCarousel"; 
import TechnicalFeatures from "./Components/TechnicalFeatures";
import Impact from "./Components/Impact";
import UseCases from "./Components/UseCases";
import Careers from './Components/Careers';
import BlogSection from './Components/BlogSection';
import Footer from "./Components/Footer";
import Trial from "./pages/Trial";
import Automotive from "./pages/industries/Automotive";
import Medical from "./pages/industries/Medical";
import Industrial from "./pages/industries/Industrial";
import Wearable from "./pages/industries/Wearable";
import Appliances from "./pages/industries/Appliances";
import Company from "./pages/Company";
import Blog from "./pages/News";
import PostDetail from "./pages/PostDetail"; // Add this import
import Support from "./pages/Support";
import CGIStudioFramework from "./pages/CGIStudioFramework";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); 
  }, [pathname]);

  return null;
};

// Page Transition Wrapper
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    setTransitionStage("fadeOut");
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage("fadeIn");
    }, 300);

    return () => clearTimeout(timer);
  }, [children, location]);

  return (
    <div className={`page-transition ${transitionStage}`}>
      {displayChildren}
    </div>
  );
};

// Your existing homepage component
const Homepage = () => (
  <main className="overflow-hidden">
    <Hero />
    <ProductCarousel />
    <TechnicalFeatures/>
    <Impact/>
    <UseCases/>
    <Careers/>
    <BlogSection/>
  </main>
);

const App = () => {
  useEffect(() => {
    const lenis = document.querySelector('html');
    if (lenis) {
      lenis.style.scrollBehavior = 'smooth';
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <ScrollToTop /> 
        <NavBar />
        <Routes>
          <Route path="/" element={
            <PageTransition>
              <Homepage />
            </PageTransition>
          } />
          
          {/* Industry Pages */}
          <Route path="/automotive" element={
            <PageTransition>
              <Automotive />
            </PageTransition>
          } />
          <Route path="/medical" element={
            <PageTransition>
              <Medical />
            </PageTransition>
          } />
          <Route path="/industrial" element={
            <PageTransition>
              <Industrial />
            </PageTransition>
          } />
          <Route path="/wearable" element={
            <PageTransition>
              <Wearable />
            </PageTransition>
          } />
          <Route path="/appliances" element={
            <PageTransition>
              <Appliances />
            </PageTransition>
          } />
          
          {/* Framework Page */}
          <Route path="/framework" element={
            <PageTransition>
              <CGIStudioFramework />
            </PageTransition>
          } />
          
          {/* Company & Support Pages */}
          <Route path="/company" element={
            <PageTransition>
              <Company />
            </PageTransition>
          } />
          <Route path="/careers" element={
            <PageTransition>
              <Careers />
            </PageTransition>
          } />
          <Route path="/support" element={
            <PageTransition>
              <Support />
            </PageTransition>
          } />
          
          {/* Blog/News Pages - UPDATED */}
          <Route path="/blog" element={
            <PageTransition>
              <Blog />
            </PageTransition>
          } />
          <Route path="/blog/:slug" element={
            <PageTransition>
              <PostDetail />
            </PageTransition>
          } />
          
          {/* Trial Page */}
          <Route path="/trial" element={
            <PageTransition>
              <Trial />
            </PageTransition>
          } />
          
          {/* Fallback route for undefined pages */}
          <Route path="*" element={
            <PageTransition>
              <Homepage />
            </PageTransition>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;