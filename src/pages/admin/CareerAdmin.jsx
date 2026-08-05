import { useState, useEffect } from 'react';
import { careerAPI } from '../../api';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const CareerAdmin = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: 'full-time',
    salary: '',
    applicationDeadline: '',
    isActive: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await careerAPI.getAllAdmin();
      setCareers(response.data);
    } catch (err) {
      setError('Failed to fetch careers');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        requirements: formData.requirements.split(',').map(req => req.trim()).filter(req => req),
      };
      
      if (editingId) {
        await careerAPI.update(editingId, data);
      } else {
        await careerAPI.create(data);
      }
      resetForm();
      fetchCareers();
    } catch (err) {
      setError('Failed to save career');
    }
  };

  const handleEdit = (career) => {
    setEditingId(career._id);
    setFormData({
      title: career.title,
      description: career.description,
      requirements: career.requirements.join(', '),
      location: career.location,
      type: career.type,
      salary: career.salary,
      applicationDeadline: career.applicationDeadline ? career.applicationDeadline.split('T')[0] : '',
      isActive: career.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this career posting?')) {
      try {
        await careerAPI.delete(id);
        fetchCareers();
      } catch (err) {
        setError('Failed to delete career');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      requirements: '',
      location: '',
      type: 'full-time',
      salary: '',
      applicationDeadline: '',
      isActive: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-navy">Career Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-navy text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors"
          >
            <FaPlus />
            Add New
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Career' : 'Add New Career'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-navy"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-navy"
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="e.g., $50,000 - $70,000"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-navy"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-navy"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requirements (comma separated)
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="e.g., Bachelor's degree, 3+ years experience, Strong communication skills"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-navy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-navy"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-navy focus:ring-navy border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">
                    Active
                  </label>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="submit"
                  className="bg-navy text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  {editingId ? 'Update' : 'Create'}
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

        <div className="grid grid-cols-1 gap-6">
          {careers.map((career) => (
            <div key={career._id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-navy">{career.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      career.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {career.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="px-2 py-1 bg-purple bg-opacity-10 text-purple rounded-full text-xs font-semibold">
                      {career.type}
                    </span>
                  </div>
                  <p className="text-gray-600">{career.description}</p>
                  {career.requirements.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-gray-700">Requirements:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {career.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
                    {career.location && <span>📍 {career.location}</span>}
                    {career.salary && <span>💰 {career.salary}</span>}
                    {career.applicationDeadline && (
                      <span>📅 Deadline: {new Date(career.applicationDeadline).toLocaleDateString()}</span>
                    )}
                    <span>📅 Posted: {new Date(career.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(career)}
                    className="text-purple hover:text-opacity-80 transition-colors"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(career._id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerAdmin;