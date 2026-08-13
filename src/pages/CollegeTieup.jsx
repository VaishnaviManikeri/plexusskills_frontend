// CollegeTieup.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CollegeTieup.css';
import { submissionAPI } from '../api';

// Simple SVG Icon components
const IconMap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconBuilding = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
    <line x1="9" y1="22" x2="9" y2="18"/>
    <line x1="15" y1="22" x2="15" y2="18"/>
    <line x1="8" y1="6" x2="16" y2="6"/>
    <line x1="8" y1="10" x2="16" y2="10"/>
    <line x1="8" y1="14" x2="12" y2="14"/>
  </svg>
);

const IconGlobe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IconExternalLink = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconSparkles = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18M5 6l14 12M5 18l14-12"/>
  </svg>
);

const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const CollegeTieup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [showPartnershipForm, setShowPartnershipForm] = useState(false);
  const [partnershipSubmitted, setPartnershipSubmitted] = useState(false);
  const [partnershipSubmitting, setPartnershipSubmitting] = useState(false);
  const [partnershipError, setPartnershipError] = useState('');
  const [partnershipForm, setPartnershipForm] = useState({
    name: '',
    designation: '',
    contact: '',
    email: '',
    collegeName: ''
  });

  const handlePartnershipChange = (event) => {
    setPartnershipForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handlePartnershipSubmit = async (event) => {
    event.preventDefault();
    setPartnershipSubmitting(true); setPartnershipError('');
    try { await submissionAPI.partnership(partnershipForm); setPartnershipSubmitted(true); }
    catch (error) { setPartnershipError(error.response?.data?.message || 'We could not submit your registration. Please try again.'); }
    finally { setPartnershipSubmitting(false); }
  };

  const closePartnershipForm = () => {
    setShowPartnershipForm(false);
    setPartnershipSubmitted(false);
  };

  const colleges = [
    { 
      id: 1,
      name: 'Jaywant College of Engineering and Polytechnic', 
      location: 'Kille Machhindragad, Karad',
      city: 'Karad',
      type: 'Engineering',
      students: 1200,
      established: 2008,
      image: '/assets/images/college1.png',
      website: 'https://www.jcep.edu.in'
    },
    { 
      id: 2,
      name: 'Sadguru Gadge Maharaj College', 
      location: 'Karad',
      city: 'Karad',
      type: 'Arts, Science & Commerce',
      students: 850,
      established: 1995,
      image: '/assets/images/college2.png',
      website: 'https://sgm.edu.in'
    },
    { 
      id: 3,
      name: 'Nanasaheb Mahadik College of Engineering', 
      location: 'Pethnaka, Sangli',
      city: 'Sangli',
      type: 'Engineering',
      students: 950,
      established: 2005,
      image: '/assets/images/college3.png',
      website: 'https://www.nmcoe.org.in/'
    },
    { 
      id: 4,
      name: 'New Institute of Technology', 
      location: 'Kolhapur',
      city: 'Kolhapur',
      type: 'Engineering & Technology',
      students: 1100,
      established: 2010,
      image: '/assets/images/college4.png',
      website: 'https://nitkop.in/'
    },
    { 
      id: 5,
      name: 'Dattajirao Kadam Arts, Science & Commerce College', 
      location: 'Ichalkaranji, Kolhapur',
      city: 'Kolhapur',
      type: 'Arts, Science & Commerce',
      students: 780,
      established: 1990,
      image: '/assets/images/college5.png',
      website: 'https://www.dkasc.ac.in/'
    },
    { 
      id: 6,
      name: 'Rajarshi Chhatrapati Shahu College', 
      location: 'Kadamwadi Road, Kolhapur',
      city: 'Kolhapur',
      type: 'Multi-Disciplinary',
      students: 920,
      established: 1985,
      image: '/assets/images/college6.png',
      website: 'https://www.rcsc.ac.in/'
    },
    { 
      id: 7,
      name: 'Kamala College', 
      location: 'Rajarampuri, Kolhapur',
      city: 'Kolhapur',
      type: 'Arts & Commerce',
      students: 650,
      established: 1992,
      image: '/assets/images/college7.png',
      website: 'https://kamalacollegekop.edu.in/'
    },
    { 
      id: 8,
      name: 'Dattakala College of Engineering', 
      location: 'Bhigwan, Pune',
      city: 'Pune',
      type: 'Engineering',
      students: 1000,
      established: 2012,
      image: '/assets/images/college8.png',
      website: 'https://dgoi.dattakala.edu.in/'
    },
    { 
      id: 9,
      name: 'Green Fingers College of Computer Science', 
      location: 'Akluj, Solapur',
      city: 'Solapur',
      type: 'Computer Science',
      students: 580,
      established: 2000,
      image: '/assets/images/college9.png',
      website: 'https://gfcct.in/'
    },
    { 
      id: 10,
      name: 'Shri Dnyaneshwar College', 
      location: 'Newasa, Ahilyanagar',
      city: 'Ahilyanagar',
      type: 'Arts, Science & Commerce',
      students: 720,
      established: 1998,
      image: '/assets/images/college10.png',
      website: 'http://sdmncollege.in/'
    },
    { 
      id: 11,
      name: 'Hi Tech Institute of Management and Computer Science', 
      location: 'Bajajnagar, Chhatrapati Sambhajinagar',
      city: 'Chhatrapati Sambhajinagar',
      type: 'Management & Computer Science',
      students: 680,
      established: 2003,
      image: '/assets/images/college11.png',
      website: 'https://hitechmgmtcs.com/'
    },
    { 
      id: 12,
      name: 'Modern College of Computer Science and IT', 
      location: 'Samarth Nagar, Chhatrapati Sambhajinagar',
      city: 'Chhatrapati Sambhajinagar',
      type: 'Computer Science & IT',
      students: 830,
      established: 2001,
      image: '/assets/images/college12.png',
      website: 'http://moderncollegecsit.in/'
    },
    { 
      id: 13,
      name: 'Shivchhatrapati College', 
      location: 'Chhatrapati Sambhajinagar',
      city: 'Chhatrapati Sambhajinagar',
      type: 'Arts & Commerce',
      students: 590,
      established: 1996,
      image: '/assets/images/college13.png',
      website: 'https://shivchhatrapaticollege.org/'
    },
    { 
      id: 14,
      name: 'Deogiri College', 
      location: 'Chhatrapati Sambhajinagar',
      city: 'Chhatrapati Sambhajinagar',
      type: 'Multi-Disciplinary',
      students: 1500,
      established: 1975,
      image: '/assets/images/college14.png',
      website: 'https://deogiricollege.org/'
    },
    { 
      id: 15,
      name: 'Abhaysingh Raje Bhosale Institute of Technology', 
      location: 'Shendre, Satara',
      city: 'Satara',
      type: 'Engineering & Technology',
      students: 880,
      established: 2007,
      image: '/assets/images/college15.png',
      website: 'https://abitsatara.org/'
    },
    { 
      id: 16,
      name: 'Daulatrao Aher College of Engineering', 
      location: 'Karad',
      city: 'Karad',
      type: 'Engineering',
      students: 790,
      established: 2009,
      image: '/assets/images/college16.png',
      website: 'https://www.dacoe.ac.in/'
    },
    { 
      id: 17,
      name: 'Shri Santkrupa College of Engineering', 
      location: 'Ghogaon, Karad',
      city: 'Karad',
      type: 'Engineering',
      students: 710,
      established: 2011,
      image: '/assets/images/college17.png',
      website: 'http://sietghogaon.org/'
    },
    { 
      id: 18,
      name: 'Savitribai Phule Mahila Mahavidyalaya', 
      location: 'Satara',
      city: 'Satara',
      type: "Women's College",
      students: 450,
      established: 2000,
      image: '/assets/images/college18.png',
      website: 'https://www.spmmedu.in/'
    },
    { 
      id: 19,
      name: 'Shri Muktanand College', 
      location: 'Gangapur, Chhatrapati Sambhajinagar',
      city: 'Chhatrapati Sambhajinagar',
      type: 'Arts, Science & Commerce',
      students: 620,
      established: 2002,
      image: '/assets/images/college19.png',
      website: 'https://shrimuktanandcollege.edu.in/'
    },
    { 
      id: 20,
      name: 'MIT Arts Commerce and Science College', 
      location: 'Alandi, Pune',
      city: 'Pune',
      type: 'Arts, Commerce & Science',
      students: 940,
      established: 2004,
      image: '/assets/images/college20.png',
      website: 'https://www.mitacsc.ac.in/'
    },
    { 
      id: 21,
      name: "Shahada Taluka Educational Society's Senior Science College", 
      location: 'Shahada, Nandurbar',
      city: 'Nandurbar',
      type: 'Science',
      students: 530,
      established: 1997,
      image: '/assets/images/college21.png',
      website: 'https://stcscience.ac.in/'
    },
    { 
      id: 22,
      name: 'STES Institute of Management Research and Development', 
      location: 'Shahada, Nandurbar',
      city: 'Nandurbar',
      type: 'Management',
      students: 480,
      established: 2005,
      image: '/assets/images/college22.png',
      website: 'https://www.rcpimrd.ac.in/'
    },
    { 
      id: 23,
      name: 'STES Senior Arts Mahila Mahavidyalay', 
      location: 'Shahada, Nandurbar',
      city: 'Nandurbar',
      type: "Women's Arts",
      students: 390,
      established: 2008,
      image: '/assets/images/college23.png',
      website: 'https://stcmahilaarts.ac.in/'
    },
    { 
      id: 24,
      name: "Vidya Pratishthan's Kamalnayan Bajaj Institute of Engineering and Technology", 
      location: 'Baramati, Pune',
      city: 'Pune',
      type: 'Engineering & Technology',
      students: 1050,
      established: 2006,
      image: '/assets/images/college24.png',
      website: 'https://www.vpkbiet.org/'
    },
    { 
      id: 25,
      name: 'Sharadchandra Pawar College of Engineering and Technology', 
      location: 'Someshwar Nagar, Baramati, Pune',
      city: 'Pune',
      type: 'Engineering & Technology',
      students: 970,
      established: 2008,
      image: '/assets/images/college25.png',
      website: 'https://www.secsomeshwar.ac.in/'
    },
    { 
      id: 26,
      name: 'H B Arts Commerce and Science College', 
      location: 'Pishor Kannad, Chhatrapati Sambhajinagar',
      city: 'Chhatrapati Sambhajinagar',
      type: 'Arts, Commerce & Science',
      students: 560,
      established: 2003,
      image: '/assets/images/college26.png',
      website: 'https://college.aurangabad.shiksha/h-b-arts-commerce-and-science-college-pishor-ta-kannad-c-59860-'
    }
  ];

  // Get unique cities for filter
  const cities = ['All', ...new Set(colleges.map(college => college.city))];

  colleges.sort((a, b) => Number(b.name === 'Deogiri College') - Number(a.name === 'Deogiri College'));

  // Filter colleges based on search and city
  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || college.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  // Group colleges by city for stats
  const cityCounts = {};
  colleges.forEach(college => {
    cityCounts[college.city] = (cityCounts[college.city] || 0) + 1;
  });

  // Handle view details button click
  const handleViewDetails = (website) => {
    if (website) {
      window.open(website, '_blank');
    }
  };

  return (
    <div className="tieup-page">
      {/* Hero Section */}
      <section className="tieup-hero">
        <div className="tieup-hero-overlay"></div>
        <div className="tieup-hero-content">
          <div className="tieup-hero-text">
            <div className="tieup-badge">
              <IconSparkles />
              Our Network
            </div>
            <h1>
              College & University <br />
              <span className="highlight">Partners</span>
            </h1>
            <p>
              We are proud to collaborate with leading educational institutions across Maharashtra. 
              Our academic partnerships ensure quality education, industry exposure, and placement 
              opportunities for students.
            </p>
            <div className="tieup-hero-stats">
              <div className="tieup-stat">
                <span className="tieup-stat-number">150+</span>
                <span className="tieup-stat-label">Partner Colleges</span>
              </div>
              <div className="tieup-stat">
                <span className="tieup-stat-number">{Object.keys(cityCounts).length}</span>
                <span className="tieup-stat-label">Cities Covered</span>
              </div>
              <div className="tieup-stat">
                <span className="tieup-stat-number">100%</span>
                <span className="tieup-stat-label">Placement Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="tieup-filters">
        <div className="tieup-filters-content">
          <div className="tieup-search-box">
            <IconSearch />
            <input
              type="text"
              placeholder="Search colleges by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="tieup-search-input"
            />
          </div>
          <div className="tieup-filter-select">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="tieup-select"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <IconChevronDown />
          </div>
        </div>
      </section>

      {/* Colleges Grid */}
      <section className="tieup-colleges">
        <div className="tieup-colleges-header">
          <h2>Our <span className="highlight">Partner</span> Institutions</h2>
          <p className="tieup-colleges-subtitle">
            {filteredColleges.length} colleges found {selectedCity !== 'All' && `in ${selectedCity}`}
          </p>
        </div>

        <div className="tieup-colleges-grid">
          {filteredColleges.map((college) => (
            <div className="tieup-college-card" key={college.id}>
              <div className="tieup-college-image">
                <img src={college.image} alt={college.name} />
                <div className="tieup-college-badge">
                  {college.type}
                </div>
              </div>
              <div className="tieup-college-info">
                <h3>{college.name}</h3>
                <div className="tieup-college-location">
                  <IconMap />
                  <span>{college.location}</span>
                </div>
                <div className="tieup-college-details">
                  <div className="tieup-college-detail-item">
                    <IconBuilding />
                    <span>Est. {college.established}</span>
                  </div>
                  <div className="tieup-college-detail-item">
                    <IconUsers />
                    <span>{college.students}+ Students</span>
                  </div>
                </div>
                <div className="tieup-college-footer">
                  <button 
                    className="tieup-view-btn"
                    onClick={() => handleViewDetails(college.website)}
                  >
                    <IconGlobe />
                    Visit Website
                    <IconExternalLink />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="tieup-no-results">
            <p>No colleges found matching your search criteria.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="tieup-cta">
        <div className="tieup-cta-content">
          <h2>
            Want to become a <span className="highlight">Partner Institution</span>?
          </h2>
          <p>
            Join our growing network of educational partners and provide your students 
            with industry-relevant training and placement opportunities.
          </p>
          <div className="tieup-cta-buttons">
            <button type="button" className="tieup-btn-primary" onClick={() => setShowPartnershipForm(true)}>
              Partner With Us <IconArrowRight />
            </button>
            <Link to="/contact" className="tieup-btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>

      {showPartnershipForm && (
        <div className="partnership-modal-overlay" onClick={closePartnershipForm}>
          <div className="partnership-modal" role="dialog" aria-modal="true" aria-labelledby="partnership-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="partnership-close" onClick={closePartnershipForm} aria-label="Close partnership form">×</button>
            {partnershipSubmitted ? (
              <div className="partnership-success" role="status">
                <div className="partnership-success-icon">✓</div>
                <h2 id="partnership-title">Registration received!</h2>
                <p>Thank you, {partnershipForm.name}. Our partnership team will contact you shortly.</p>
                <button type="button" className="tieup-btn-primary" onClick={closePartnershipForm}>Done</button>
              </div>
            ) : (
              <>
                <div className="partnership-modal-header">
                  <span>College Partnership</span>
                  <h2 id="partnership-title">Partner With Us</h2>
                  <p>Register your institution to explore training and placement opportunities.</p>
                </div>
                <form className="partnership-form" onSubmit={handlePartnershipSubmit}>
                  <label>
                    Name
                    <input name="name" value={partnershipForm.name} onChange={handlePartnershipChange} autoFocus required placeholder="Enter your full name" />
                  </label>
                  <label>
                    Designation
                    <select name="designation" value={partnershipForm.designation} onChange={handlePartnershipChange} required>
                      <option value="">Select designation</option>
                      <option>Faculty</option>
                      <option>Department Head</option>
                      <option>TPO</option>
                      <option>Vice Principal</option>
                      <option>Principal</option>
                    </select>
                  </label>
                  <label>
                    Contact No.
                    <input type="tel" name="contact" value={partnershipForm.contact} onChange={handlePartnershipChange} required placeholder="Enter contact number" />
                  </label>
                  <label>
                    Email ID
                    <input type="email" name="email" value={partnershipForm.email} onChange={handlePartnershipChange} required placeholder="Enter email address" />
                  </label>
                  <label className="partnership-full-field">
                    College Name
                    <input name="collegeName" value={partnershipForm.collegeName} onChange={handlePartnershipChange} required placeholder="Enter college name" />
                  </label>
                  {partnershipError && <p role="alert">{partnershipError}</p>}
                  <button type="submit" className="partnership-submit" disabled={partnershipSubmitting}>{partnershipSubmitting ? 'Submitting...' : 'Submit Registration'} <IconArrowRight /></button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeTieup;
