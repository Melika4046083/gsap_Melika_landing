import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../services/wordpressAPI';
import './News.css';

const News = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // 9 posts per page (3x3 grid)

  // Fetch posts from WordPress
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        const mappedPosts = posts.map(post => ({
          id: post.id,
          type: post.categoryName.toLowerCase(),
          title: post.title,
          excerpt: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          date: post.date,
          image: post.image,
          category: post.categoryName,
          slug: post.slug
        }));
        setBlogPosts(mappedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'news', name: 'News' },
    { id: 'events', name: 'Events' },
    { id: 'release', name: 'Releases' },
    { id: 'blog', name: 'Blogs' }
  ];

  // Filter posts based on active category
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts
    : blogPosts.filter(post => post.type === activeCategory);

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus(''), 3000);
    }
  };

  return (
    <div className="news-page-wrapper">
      <section 
        ref={sectionRef}
        className={`blog-section ${isVisible ? 'visible' : ''}`}
      >
        <div className="blog-container">
          
          {/* Section Header */}
          <div className="section-header">
            <div className="header-badge">
              <span>Latest Updates</span>
            </div>
            <h2 className="section-title">
              Insights & <span className="text-accent">Updates</span>
            </h2>
            <p className="section-subtitle">
              Stay informed with the latest news, events, releases, and technical insights 
              from the forefront of HMI technology innovation.
            </p>
          </div>

          {/* Category Filter */}
          <div className="blog-categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="blog-loading">
              <div className="spinner"></div>
              <p>Loading posts...</p>
            </div>
          ) : (
            <>
              {/* Blog Posts Grid */}
              <div className="blog-posts-grid">
                {currentPosts.length === 0 ? (
                  <div className="no-posts-message">
                    <p>No posts found in this category.</p>
                  </div>
                ) : (
                  currentPosts.map((post, index) => (
                    <article 
                      key={post.id} 
                      className={`blog-post-card ${post.type} ${isVisible ? 'visible' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="post-image">
                        <div 
                          className="image-placeholder"
                          style={{
                            backgroundImage: post.image ? `url(${post.image})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          {!post.image && (
                            <div style={{
                              width: '100%',
                              height: '100%',
                              background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#666'
                            }}>
                              No Image
                            </div>
                          )}
                          <div className="post-badge">{post.category}</div>
                        </div>
                      </div>
                      
                      <div className="post-content">
                        <div className="post-meta">
                          <span className="post-date">
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-excerpt">{post.excerpt}</p>
                        
                        <Link to={`/blog/${post.slug}`} className="read-more">
                          Read More
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </Link>
                      </div>
                    </article>
                  ))
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="pagination-btn prev"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                    Previous
                  </button>

                  <div className="pagination-numbers">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                            onClick={() => paginate(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return <span key={pageNumber} className="pagination-dots">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button 
                    className="pagination-btn next"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <div className="newsletter-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className="newsletter-title">Subscribe to Our Newsletter</h3>
            <p className="newsletter-subtitle">
              Get the latest updates, articles, and insights delivered directly to your inbox.
            </p>
            
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="form-group">
                <input 
                  type="email" 
                  className="newsletter-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-button">
                  Subscribe
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
              {subscribeStatus === 'success' && (
                <div className="success-message">
                  ✓ Successfully subscribed! Check your inbox for confirmation.
                </div>
              )}
            </form>
            
            <p className="newsletter-privacy">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;