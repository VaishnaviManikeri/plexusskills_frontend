import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaImage, FaBullhorn, FaBriefcase, FaBlog, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  const dashboardItems = [
    {
      title: 'Gallery',
      icon: FaImage,
      color: 'bg-purple',
      path: '/admin/gallery',
      description: 'Manage gallery images',
    },
    {
      title: 'Notices',
      icon: FaBullhorn,
      color: 'bg-pink',
      path: '/admin/notices',
      description: 'Manage notices and announcements',
    },
    {
      title: 'Careers',
      icon: FaBriefcase,
      color: 'bg-navy',
      path: '/admin/careers',
      description: 'Manage job postings',
    },
    {
      title: 'Blogs',
      icon: FaBlog,
      color: 'bg-purple',
      path: '/admin/blogs',
      description: 'Manage blog posts',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-300">Welcome back, {admin?.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden group"
            >
              <div className={`${item.color} p-4 text-white`}>
                <item.icon size={32} />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-navy">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-navy mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple bg-opacity-10 rounded-lg">
              <p className="text-2xl font-bold text-purple">12</p>
              <p className="text-sm text-gray-600">Gallery Items</p>
            </div>
            <div className="text-center p-4 bg-pink bg-opacity-10 rounded-lg">
              <p className="text-2xl font-bold text-pink">8</p>
              <p className="text-sm text-gray-600">Notices</p>
            </div>
            <div className="text-center p-4 bg-navy bg-opacity-10 rounded-lg">
              <p className="text-2xl font-bold text-navy">5</p>
              <p className="text-sm text-gray-600">Careers</p>
            </div>
            <div className="text-center p-4 bg-purple bg-opacity-10 rounded-lg">
              <p className="text-2xl font-bold text-purple">15</p>
              <p className="text-sm text-gray-600">Blogs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;