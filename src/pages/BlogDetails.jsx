// frontend/src/pages/BlogDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../api';
import { 
  FaUser, FaCalendarAlt, FaClock, FaWhatsapp, FaLinkedin, FaEnvelope, 
  FaTwitter, FaArrowLeft, FaShareAlt, FaBookOpen, FaArrowRight
} from 'react-icons/fa';
import ReadingProgress from '../components/ReadingProgress';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getBySlug(slug);
      
      let blogData;
      if (response.data) {
        if (response.data.data) {
          blogData = response.data.data;
        } else {
          blogData = response.data;
        }
      }
      
      setBlog(blogData);
      
      // Update meta tags for SEO
      document.title = blogData?.metaTitle || blogData?.title || 'Blog Post';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && blogData?.metaDescription) {
        metaDescription.content = blogData.metaDescription;
      }
    } catch (err) {
      console.error('Fetch blog error:', err);
      setError('Blog post not found');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = blog?.title || 'Check out this blog post';
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    };

    window.open(shareUrls[platform], '_blank');
    setShowShare(false);
  };

  const createMarkup = (content) => {
    if (!content) return { __html: '' };
    return { __html: content };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#761E6B] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-2xl font-bold text-[#001C46] mb-2">Blog Post Not Found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blogs" className="inline-flex items-center gap-2 text-[#761E6B] hover:text-[#E31B23] font-medium transition-colors">
            <FaArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />
      
      <article className="min-h-screen bg-white">
        {/* Sticky Header - Navy with gradient accent */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/blogs" className="text-[#001C46] hover:text-[#761E6B] transition-colors flex items-center gap-2 font-medium">
              <FaArrowLeft size={16} /> Back to Blogs
            </Link>
            <div className="flex gap-2 relative">
              <button
                onClick={() => setShowShare(!showShare)}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#761E6B]/10 hover:text-[#761E6B] transition-colors"
                aria-label="Share"
              >
                <FaShareAlt size={18} />
              </button>
              {showShare && (
                <div className="absolute top-12 right-0 bg-white rounded-xl shadow-lg p-2 flex gap-2 z-50 border border-gray-100">
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                    aria-label="Share on WhatsApp"
                  >
                    <FaWhatsapp size={18} />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedin size={18} />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter size={18} />
                  </button>
                  <button
                    onClick={() => handleShare('email')}
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    aria-label="Share via Email"
                  >
                    <FaEnvelope size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Blog Header */}
          <header className="mb-8">
            {blog.imageUrl && (
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full max-h-[500px] object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%23f0f2f5"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="Arial" font-size="24" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#001C46] leading-tight mb-4">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <FaUser className="text-[#761E6B]" />
                {blog.author || 'Unknown Author'}
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-[#761E6B]" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <FaClock className="text-[#761E6B]" />
                {blog.readingTime || '5'} min read
              </span>
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#761E6B]/10 text-[#761E6B] rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Blog Content */}
          <div className="blog-content prose prose-lg max-w-none">
            {blog.content && (
              <div 
                dangerouslySetInnerHTML={createMarkup(blog.content)}
              />
            )}
          </div>

          {/* Author Bio */}
          {blog.author && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#761E6B] to-[#E31B23] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {blog.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-[#001C46] text-lg">{blog.author}</h3>
                  <p className="text-gray-500 text-sm">Author</p>
                </div>
              </div>
            </div>
          )}

          {/* CTA Section - Navy with gradient accents */}
          <div className="mt-12 bg-[#001C46] rounded-2xl p-8 md:p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#761E6B] opacity-20 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E31B23] opacity-20 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>
            
            <div className="relative z-10">
              <FaBookOpen className="text-4xl text-[#E31B23] mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Transform Your Career?</h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">
                Join Plexus Skills and gain industry-ready skills with our expert-led courses
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-[#761E6B] to-[#E31B23] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                >
                  Enroll Now <FaArrowRight size={16} />
                </Link>
                <Link
                  to="/#courses"
                  className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#001C46] transition-all"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Custom CSS for Blog Content - Updated colors */}
      <style jsx="true">{`
        .blog-content {
          font-size: 18px;
          line-height: 1.8;
          color: #1a1a2e;
        }
        
        .blog-content h1 {
          font-size: 40px;
          font-weight: 700;
          margin: 2rem 0 1rem;
          color: #001C46;
        }
        
        .blog-content h2 {
          font-size: 30px;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem;
          color: #001C46;
        }
        
        .blog-content h3 {
          font-size: 24px;
          font-weight: 600;
          margin: 1.25rem 0 0.5rem;
          color: #001C46;
        }
        
        .blog-content h4 {
          font-size: 20px;
          font-weight: 600;
          margin: 1rem 0 0.5rem;
          color: #001C46;
        }
        
        .blog-content p {
          margin-bottom: 1.25rem;
          font-size: 18px;
          line-height: 1.8;
          color: #2a3a5a;
        }
        
        .blog-content ul, .blog-content ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
          color: #2a3a5a;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #761E6B;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          background: #f8f5ff;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #2a3a5a;
        }
        
        .blog-content blockquote p {
          margin-bottom: 0;
        }
        
        .blog-content a {
          color: #761E6B;
          text-decoration: none;
          font-weight: 500;
        }
        
        .blog-content a:hover {
          color: #E31B23;
          text-decoration: underline;
        }
        
        .blog-content code {
          background: #f0f2f5;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9em;
          font-family: 'Courier New', monospace;
        }
        
        .blog-content pre {
          background: #0a0a1a;
          color: #e0e0e0;
          padding: 1.5rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .blog-content pre code {
          background: transparent;
          color: #e0e0e0;
          padding: 0;
        }
        
        .blog-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1.5rem 0;
        }
        
        .blog-content .drop-cap::first-letter {
          font-size: 4rem;
          float: left;
          line-height: 1;
          margin-right: 0.5rem;
          color: #761E6B;
          font-weight: bold;
          font-family: 'Georgia', serif;
        }
        
        .blog-content .highlight-box {
          background: #fef9e7;
          padding: 1.5rem;
          border-radius: 8px;
          margin: 1.5rem 0;
          border-left: 4px solid #f1c40f;
        }
        
        @media (max-width: 768px) {
          .blog-content {
            font-size: 16px;
          }
          .blog-content h1 {
            font-size: 32px;
          }
          .blog-content h2 {
            font-size: 24px;
          }
          .blog-content h3 {
            font-size: 20px;
          }
          .blog-content p {
            font-size: 16px;
          }
          .blog-content .drop-cap::first-letter {
            font-size: 3rem;
          }
        }
      `}</style>
    </>
  );
};

export default BlogDetails;
