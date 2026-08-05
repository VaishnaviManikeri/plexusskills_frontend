// frontend/src/pages/Blog.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../api';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaClock, 
  FaTag, 
  FaSearch,
  FaArrowRight,
  FaBookOpen,
  FaNewspaper
} from 'react-icons/fa';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getAll();
      
      // Handle different response structures
      let blogsData = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          blogsData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          blogsData = response.data.data;
        } else if (response.data.blogs && Array.isArray(response.data.blogs)) {
          blogsData = response.data.blogs;
        } else {
          blogsData = [response.data];
        }
      }
      
      setBlogs(blogsData);
      
      // Extract all unique tags
      const tags = new Set();
      blogsData.forEach(blog => {
        if (blog.tags && Array.isArray(blog.tags)) {
          blog.tags.forEach(tag => tags.add(tag));
        }
      });
      setAllTags([...tags]);
      
    } catch (err) {
      console.error('Fetch blogs error:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter blogs based on search and tags
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.author?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === 'all' || 
                       (blog.tags && Array.isArray(blog.tags) && blog.tags.includes(selectedTag));
    
    return matchesSearch && matchesTag;
  });

  // Format date
  const formatDate = (date) => {
    if (!date) return 'Date not available';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get reading time
  const getReadingTime = (content) => {
    if (!content) return '1 min read';
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return `${readingTime} min read`;
  };

  // Strip HTML for excerpt
  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return '';
    const plainText = content.replace(/<[^>]*>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#761E6B] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-[#001C46] mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchBlogs}
            className="bg-gradient-to-r from-[#761E6B] to-[#E31B23] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header - Same as other pages */}
      <div className="bg-[#001C46] text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#761E6B] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E31B23] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/10">
            <FaNewspaper className="text-[#E31B23]" />
            <span className="text-sm font-medium text-white/80">Latest Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#761E6B] to-[#E31B23]">Blog</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Insights, stories, and updates from the Plexus Skills community
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#761E6B]" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#761E6B] focus:ring-2 focus:ring-[#761E6B]/20 transition-all bg-gray-50"
              />
            </div>
            
            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-gray-500 mr-1 hidden sm:block">Filter:</span>
                <button
                  onClick={() => setSelectedTag('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTag === 'all'
                      ? 'bg-gradient-to-r from-[#761E6B] to-[#E31B23] text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                {allTags.slice(0, 6).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? 'bg-gradient-to-r from-[#761E6B] to-[#E31B23] text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
                {allTags.length > 6 && (
                  <span className="text-sm text-gray-400">+{allTags.length - 6} more</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500 text-sm">
            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'post' : 'posts'} found
          </p>
          {(searchTerm || selectedTag !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTag('all');
              }}
              className="text-[#761E6B] hover:text-[#E31B23] text-sm font-medium transition-colors"
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <article
                key={blog._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 group"
              >
                {/* Featured Image */}
                {blog.imageUrl && (
                  <Link to={`/blogs/${blog.slug || blog._id}`} className="block overflow-hidden">
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"%3E%3Crect width="400" height="200" fill="%23f0f2f5"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="Arial" font-size="16" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          <span className="bg-gradient-to-r from-[#761E6B] to-[#E31B23] text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
                            {blog.tags[0]}
                          </span>
                          {blog.tags.length > 1 && (
                            <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                              +{blog.tags.length - 1}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </Link>
                )}

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <Link to={`/blogs/${blog.slug || blog._id}`} className="block">
                    <h2 className="text-xl font-bold text-[#001C46] hover:text-[#761E6B] transition-colors line-clamp-2 group-hover:underline">
                      {blog.title}
                    </h2>
                  </Link>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-3">
                    <span className="flex items-center gap-1.5">
                      <FaUser className="text-[#761E6B]" size={13} />
                      {blog.author || 'Unknown'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-[#761E6B]" size={13} />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-[#761E6B]" size={13} />
                      {getReadingTime(blog.content)}
                    </span>
                  </div>

                  {/* Excerpt */}
                  <p className="text-gray-600 mt-3 flex-1 line-clamp-3 text-sm leading-relaxed">
                    {getExcerpt(blog.content)}
                  </p>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-[#761E6B]/10 text-[#761E6B] text-xs px-2.5 py-1 rounded-full font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More */}
                  <Link
                    to={`/blogs/${blog.slug || blog._id}`}
                    className="mt-4 inline-flex items-center gap-2 text-[#761E6B] font-semibold hover:text-[#E31B23] transition-all group-hover:gap-3"
                  >
                    Read More
                    <FaArrowRight className="transition-transform group-hover:translate-x-1" size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-[#001C46] mb-2">No Blog Posts Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm || selectedTag !== 'all' 
                ? 'No posts match your search criteria. Try adjusting your filters.'
                : 'No blog posts available yet. Check back soon for updates!'}
            </p>
            {(searchTerm || selectedTag !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('all');
                }}
                className="mt-4 text-[#761E6B] hover:text-[#E31B23] font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* CTA Section - Same style as other pages */}
        <div className="mt-16 bg-gradient-to-r from-[#001C46] via-[#0A2A6B] to-[#001C46] rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#761E6B] opacity-20 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E31B23] opacity-20 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>
          
          <div className="relative z-10">
            <FaBookOpen className="text-4xl text-[#E31B23] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Start Learning?</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Join Plexus Skills and gain industry-ready skills with our expert-led courses
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-[#761E6B] to-[#E31B23] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                Enroll Now
              </Link>
              <Link
                to="/courses"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#001C46] transition-all"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;