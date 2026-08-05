import { useState, useEffect, useRef } from 'react';
import { blogAPI } from '../../api';
import { 
  FaEdit, FaTrash, FaPlus, FaImage, FaVideo, FaUpload, FaLink, 
  FaPlay, FaFileVideo, FaFileImage, FaTimes, FaEye 
} from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    metaTitle: '',
    metaDescription: '',
    tags: '',
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'list', 'bullet',
    'link', 'image', 'video'
  ];

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
          // If it's a single object, wrap it in an array
          blogsData = [response.data];
        }
      }
      
      setBlogs(blogsData);
      setError('');
    } catch (err) {
      console.error('Fetch blogs error:', err);
      setError('Failed to fetch blogs: ' + (err.response?.data?.error || err.message));
      setBlogs([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.content || !formData.author) {
        setError('Title, content, and author are required');
        setIsSubmitting(false);
        return;
      }

      const data = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      };
      
      let response;
      if (editingId) {
        response = await blogAPI.update(editingId, data);
      } else {
        response = await blogAPI.create(data);
      }
      
      setSuccess(`Blog ${editingId ? 'updated' : 'created'} successfully!`);
      resetForm();
      fetchBlogs();
      
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.response?.data?.error || 'Failed to save blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title || '',
      content: blog.content || '',
      author: blog.author || '',
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      tags: blog.tags ? blog.tags.join(', ') : '',
      image: null,
    });
    setPreview(blog.imageUrl || null);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) return;
    
    try {
      await blogAPI.delete(id);
      setSuccess('Blog deleted successfully!');
      fetchBlogs();
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError('Failed to delete blog');
      console.error('Delete error:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      metaTitle: '',
      metaDescription: '',
      tags: '',
      image: null,
    });
    setPreview(null);
    setEditingId(null);
    setShowForm(false);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const truncateContent = (content, maxLength = 150) => {
    if (!content) return '';
    const plainText = content.replace(/<[^>]*>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-navy">Blog Management</h1>
            <p className="text-gray-500 text-sm mt-1">
              Create and manage blog posts
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors shadow-md"
          >
            <FaPlus />
            Add New Blog
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-700 hover:text-red-900">
              <FaTimes />
            </button>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="text-green-700 hover:text-green-900">
              <FaTimes />
            </button>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-navy">
                {editingId ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                    placeholder="Enter blog title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                    placeholder="Enter author name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Title (SEO)
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                    placeholder="Meta title for SEO"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="e.g., education, school, learning"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a featured image for your blog post
                  </p>
                  {preview && (
                    <div className="mt-2">
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description (SEO)
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                    placeholder="Meta description for SEO"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content *
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={handleContentChange}
                    modules={modules}
                    formats={formats}
                    className="h-64 mb-12"
                    placeholder="Write your blog content here..."
                  />
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-purple text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      {editingId ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>{editingId ? 'Update' : 'Create'}</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blog List */}
        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id || blog.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {blog.imageUrl && (
                    <div className="md:w-48 h-48 md:h-auto flex-shrink-0">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title || 'Blog post'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-navy">{blog.title || 'Untitled'}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">By {blog.author || 'Unknown'}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{blog.readingTime || '5'} min read</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Date not available'}
                          </span>
                        </div>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {blog.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-purple bg-opacity-10 text-purple rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => window.open(`/blogs/${blog.slug || blog._id}`, '_blank')}
                          className="text-blue-500 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                          title="View Blog"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-purple hover:text-opacity-80 transition-colors p-2 hover:bg-purple-50 rounded-lg"
                          title="Edit"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-gray-600 line-clamp-2">
                        {blog.metaDescription || truncateContent(blog.content || '', 200)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Blog Posts</h3>
            <p className="text-gray-500">Start creating your first blog post</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-purple text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Create Blog Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;