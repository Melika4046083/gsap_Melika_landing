import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostBySlug, getAllPosts } from '../services/wordpressAPI';
import './PostDetail.css';

function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const data = await getPostBySlug(slug);
      setPost(data);
      setLoading(false);
    };
    
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Fetch recent posts for sidebar
  useEffect(() => {
    const fetchRecentPosts = async () => {
      const posts = await getAllPosts();
      setRecentPosts(posts.slice(0, 5));
    };
    fetchRecentPosts();
  }, []);

  // Extract headings for Table of Contents
  useEffect(() => {
    if (post && post.content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = post.content;
      const h2Elements = tempDiv.querySelectorAll('h2, h3');
      const extractedHeadings = Array.from(h2Elements).map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.textContent,
        level: heading.tagName.toLowerCase()
      }));
      setHeadings(extractedHeadings);

      setTimeout(() => {
        const contentDiv = document.querySelector('.post-content-body');
        if (contentDiv) {
          const actualHeadings = contentDiv.querySelectorAll('h2, h3');
          actualHeadings.forEach((heading, index) => {
            heading.id = `heading-${index}`;
          });
        }
      }, 100);
    }
  }, [post]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="post-detail-wrapper">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-wrapper">
        <div className="not-found">
          <h1>404</h1>
          <p>Post not found</p>
          <Link to="/blog" className="back-btn">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-wrapper">
      <div className="post-detail-container">
        
        {/* Back Button - Using Link instead of navigate */}
        <Link to="/blog" className="back-button">
          ← Back to Blog
        </Link>

        <div className="post-layout">
          
          {/* Main Content */}
          <article className="post-main-content">
            <div className="post-detail-header">
              {post.image && (
                <div className="featured-image-wrapper">
                  <img src={post.image} alt={post.title} className="featured-image" />
                </div>
              )}
              
              <div className="post-header-content">
                <span className="post-category-badge">{post.category}</span>
                <h1 className="post-title">{post.title}</h1>
                <div className="post-meta-bar">
                  <span className="post-date">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div 
              className="post-content-body" 
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Sidebar */}
          <aside className="post-sidebar">
            
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="sidebar-widget toc-widget">
                <h3 className="widget-title">Table of Contents</h3>
                <ul className="toc-list">
                  {headings.map((heading) => (
                    <li 
                      key={heading.id} 
                      className={`toc-item ${heading.level}`}
                      onClick={() => scrollToHeading(heading.id)}
                    >
                      {heading.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recent Posts */}
            <div className="sidebar-widget recent-posts-widget">
              <h3 className="widget-title">Check Candera Latest Blogs</h3>
              <div className="recent-posts-list">
                {recentPosts.map((recentPost) => (
                  <Link 
                    to={`/blog/${recentPost.slug}`} 
                    key={recentPost.id}
                    className="recent-post-item"
                  >
                    <div className="recent-post-content">
                      <h4 className="recent-post-title">{recentPost.title}</h4>
                      <span className="recent-post-date">
                        {new Date(recentPost.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}

export default PostDetail;