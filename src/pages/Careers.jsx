// frontend/src/pages/Careers.jsx
import { useState, useEffect } from 'react';
import { careerAPI } from '../api';
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaDollarSign, 
  FaTimes,
  FaArrowRight,
  FaBuilding,
  FaClock,
  FaCheckCircle,
  FaGraduationCap
} from 'react-icons/fa';

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const response = await careerAPI.getAll();
      setCareers(response.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch careers', err);
      setError('Failed to load career opportunities. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#761E6B] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading career opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">💼</div>
          <h2 className="text-2xl font-bold text-[#001C46] mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchCareers}
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
      {/* Hero Section */}
      <div className="bg-[#001C46] text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#761E6B] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E31B23] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/10">
            <FaBriefcase className="text-[#E31B23]" />
            <span className="text-sm font-medium text-white/80">Join Our Team</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#761E6B] to-[#E31B23]">Opportunities</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join our team and be part of a community dedicated to excellence in education
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500 text-sm">
            {careers.length} {careers.length === 1 ? 'position' : 'positions'} available
          </p>
        </div>

        {/* Career Grid */}
        {careers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career) => (
              <div 
                key={career._id} 
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-[#001C46] group-hover:text-[#761E6B] transition-colors">
                        {career.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <FaBuilding className="text-[#761E6B] text-xs" />
                        <span className="text-sm text-gray-500">Plexus Skills</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      career.type === 'Full-time' 
                        ? 'bg-[#761E6B]/10 text-[#761E6B]' 
                        : career.type === 'Part-time'
                        ? 'bg-blue-100 text-blue-700'
                        : career.type === 'Internship'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {career.type || 'Full-time'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {career.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    {career.location && (
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#761E6B]" />
                        <span>{career.location}</span>
                      </div>
                    )}
                    {career.salary && (
                      <div className="flex items-center gap-2">
                        <FaDollarSign className="text-[#761E6B]" />
                        <span>{career.salary}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#761E6B]" />
                      <span>Posted: {new Date(career.postedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}</span>
                    </div>
                  </div>

                  {career.requirements && career.requirements.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Requirements</p>
                      <ul className="space-y-1">
                        {career.requirements.slice(0, 3).map((req, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <FaCheckCircle className="text-[#761E6B] text-xs mt-0.5 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                        {career.requirements.length > 3 && (
                          <li className="text-sm text-[#761E6B] font-medium">
                            +{career.requirements.length - 3} more requirements
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedCareer(career)}
                    className="w-full mt-4 bg-gradient-to-r from-[#761E6B] to-[#E31B23] text-white px-4 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                  >
                    View Details
                    <FaArrowRight className="transition-transform group-hover:translate-x-1" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-[#001C46] mb-2">No Positions Available</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              No career opportunities available at the moment. Check back soon for updates!
            </p>
          </div>
        )}
      </div>

      {/* Career Details Modal */}
      {selectedCareer && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCareer(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold text-[#001C46]">{selectedCareer.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <FaBuilding className="text-[#761E6B] text-sm" />
                  <span className="text-gray-500 text-sm">Plexus Skills</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCareer(null)}
                className="text-gray-400 hover:text-[#E31B23] transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedCareer.type === 'Full-time' 
                    ? 'bg-[#761E6B]/10 text-[#761E6B]' 
                    : selectedCareer.type === 'Part-time'
                    ? 'bg-blue-100 text-blue-700'
                    : selectedCareer.type === 'Internship'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {selectedCareer.type || 'Full-time'}
                </span>
                {selectedCareer.isActive && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                )}
                {selectedCareer.applicationDeadline && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold flex items-center gap-1">
                    <FaClock size={12} />
                    Deadline: {new Date(selectedCareer.applicationDeadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-[#001C46] uppercase tracking-wider mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedCareer.description}</p>
                </div>

                {/* Requirements */}
                {selectedCareer.requirements && selectedCareer.requirements.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-[#001C46] uppercase tracking-wider mb-2">Requirements</h3>
                    <ul className="space-y-2">
                      {selectedCareer.requirements.map((req, index) => (
                        <li key={index} className="text-gray-600 flex items-start gap-3">
                          <FaGraduationCap className="text-[#761E6B] text-sm mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                  {selectedCareer.location && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</p>
                      <p className="text-gray-700 font-medium flex items-center gap-2 mt-1">
                        <FaMapMarkerAlt className="text-[#761E6B]" />
                        {selectedCareer.location}
                      </p>
                    </div>
                  )}
                  {selectedCareer.salary && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Salary</p>
                      <p className="text-gray-700 font-medium flex items-center gap-2 mt-1">
                        <FaDollarSign className="text-[#761E6B]" />
                        {selectedCareer.salary}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Posted Date</p>
                    <p className="text-gray-700 font-medium flex items-center gap-2 mt-1">
                      <FaCalendarAlt className="text-[#761E6B]" />
                      {new Date(selectedCareer.postedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  {selectedCareer.applicationDeadline && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Application Deadline</p>
                      <p className="text-gray-700 font-medium flex items-center gap-2 mt-1">
                        <FaClock className="text-[#E31B23]" />
                        {new Date(selectedCareer.applicationDeadline).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <button className="w-full bg-gradient-to-r from-[#761E6B] to-[#E31B23] text-white px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  Apply Now
                  <FaArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add animation style */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Careers;