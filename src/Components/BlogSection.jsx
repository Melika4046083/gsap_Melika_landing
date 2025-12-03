import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../services/wordpressAPI';

const BlogSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from WordPress
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        // Map WordPress posts to your existing structure
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

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'news', name: 'News' },
    { id: 'events', name: 'Events' },
    { id: 'release', name: 'Releases' },
    { id: 'blog', name: 'Blogs' }
  ];

  // Get 3 latest posts overall (mixed from all categories)
  const getLatestPosts = () => {
    return [...blogPosts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  };

  // Filter posts based on active category
  const filteredPosts = activeCategory === 'all' 
    ? getLatestPosts()
    : blogPosts.filter(post => post.type === activeCategory).slice(0, 3);

  return (
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
              {filteredPosts.length === 0 ? (
                <div className="no-posts-message">
                  <p>No posts found in this category.</p>
                </div>
              ) : (
                filteredPosts.map((post, index) => (
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

            {/* View All CTA - ORANGE BUTTON */}
            <div className="blog-cta">
              <Link to="/blog" className="cta-button">
                View All Updates
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default BlogSection;