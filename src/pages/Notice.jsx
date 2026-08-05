import { useState, useEffect } from 'react';
import { noticeAPI } from '../api';
import { FaCalendarAlt, FaTag } from 'react-icons/fa';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await noticeAPI.getAll();
      setNotices(response.data);
    } catch (err) {
      console.error('Failed to fetch notices', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotices = filter === 'all' 
    ? notices 
    : notices.filter(n => n.priority === filter);

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800',
    };
    return colors[priority] || colors.medium;
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy mb-4">Notices & Announcements</h1>
          <p className="text-gray-600">
            Stay updated with the latest news and announcements from our school
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === 'all' ? 'bg-purple text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === 'high' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            High Priority
          </button>
          <button
            onClick={() => setFilter('medium')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Medium Priority
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === 'low' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Low Priority
          </button>
        </div>

        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <div key={notice._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-navy">{notice.title}</h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(notice.priority)}`}>
                      {notice.priority}
                    </span>
                  </div>
                  <p className="text-gray-600">{notice.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt size={14} />
                      {new Date(notice.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaTag size={14} />
                      Notice
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No notices found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;