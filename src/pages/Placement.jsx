// Placement.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Placement.css";
import {
  Briefcase,
  Users,
  Award,
  TrendingUp,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Building2,
  CheckCircle,
  ArrowRight,
  Phone,
  Calendar,
  FileText,
  UserCheck,
  Target,
  BarChart3,
  Sparkles
} from "lucide-react";

// ============ PLACEMENT COMPANIES DATA ============
const placementCompanies = [
  { id: 1, name: "Deloitte", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1kU6hZN-zfX93xw1UqbOzCy8Kkp0SlbBvewWVPxraw&s=10" },
  { id: 2, name: "TCS", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXg3wLtvRLwAq_LUoPgbsu9NBo5o-hS2OrFfIhazAWKg&s=10" },
  { id: 3, name: "Oracle", logo: "https://mma.prnewswire.com/media/467598/Oracle_Logo.jpg?p=facebook" },
  { id: 4, name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/Amazon_2024.svg" },
  { id: 5, name: "Micro Focus", logo: "https://rttswebproperties.s3.amazonaws.com/content-images/partner-logos/querysurge/micro-focus.png" },
  { id: 6, name: "Honeywell", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8QGOk078F4oIgbhXUCWdpayXhwtVzpjSIZzgtjvcsL8xLi5sLc4c-og&s=10" },
  { id: 7, name: "Mahindra", logo: "https://logos-world.net/wp-content/uploads/2022/12/Mahindra-Mahindra-Logo-2012.png" },
  { id: 8, name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/500px-Infosys_logo.svg.png?_=20100302211036" },
  { id: 9, name: "Tech Mahindra", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Tech_Mahindra_New_Logo.svg/3840px-Tech_Mahindra_New_Logo.svg.png" },
  { id: 10, name: "DXC Technology", logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/DXC_Logo_2021_Purple_Black.png" },
  { id: 11, name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/3840px-Accenture.svg.png" },
  { id: 12, name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1280px-IBM_logo.svg.png" },
  { id: 13, name: "Amdocs", logo: "https://agilebrandguide.com/wp-content/uploads/2024/12/amdocs-logo-0678CD2F09-seeklogo.com_.png" },
  { id: 14, name: "KONE", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_imOOPcCIOYw4cBF6VdwOu_9mEa8BHNWHmvp_Fg8gVHIXGQ_2cOsOJj86&s=10" },
  { id: 15, name: "Enzigma", logo: "https://www.enzigma.com/wp-content/uploads/2024/08/image-2-2.png" },
  { id: 16, name: "Barclays", logo: "https://icon2.cleanpng.com/20180908/vbh/kisspng-logo-barclays-bank-barclays-wealth-investment-ma-barclays-logo-svg-vector-amp-png-transparent-v-1713942676305.webp" },
  { id: 17, name: "Quickensol", logo: "https://www.quickensol.com/images/logo.png" },
  { id: 18, name: "Youngminds", logo: "https://ymtsindia.com/assets/youngminds-logo-new.jpg" },
  { id: 19, name: "Zensar", logo: "https://www.apax.com/media/1790/_0098_zensar-technologies.png?rmode=max&width=800&height=400&saturation=0" },
  { id: 20, name: "MIND IT", logo: "https://minditworks.com/wordpress/wp-content/uploads/2022/12/logo-black-new.png" },
  { id: 21, name: "EY", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/EY_logo_2019.svg/1280px-EY_logo_2019.svg.png" }
];

// ============ PLACEMENT STATS ============
const placementStats = [
  { id: 1, icon: <Users size={28} />, number: "500+", label: "Students Placed" },
  { id: 2, icon: <TrendingUp size={28} />, number: "54%", label: "Average Salary Hike" },
  { id: 3, icon: <Award size={28} />, number: "220+", label: "Hiring Partners" },
  { id: 4, icon: <Building2 size={28} />, number: "150+", label: "Partner Colleges" }
];

// ============ PLACEMENT HIGHLIGHTS ============
const placementHighlights = [
  { id: 1, icon: <Target size={24} />, title: "100% Placement Support", description: "Dedicated placement cell with personalized guidance" },
  { id: 2, icon: <FileText size={24} />, title: "Resume Building", description: "Professional resume writing and optimization sessions" },
  { id: 3, icon: <UserCheck size={24} />, title: "Mock Interviews", description: "Practice interviews with industry experts" },
  { id: 4, icon: <Calendar size={24} />, title: "Campus Drives", description: "Regular campus recruitment drives with top companies" },
  { id: 5, icon: <BarChart3 size={24} />, title: "Industry Exposure", description: "Live projects and internships with partner companies" },
  { id: 6, icon: <Sparkles size={24} />, title: "AI-Powered Training", description: "Generative AI integrated curriculum for future-ready skills" }
];

// ============ RECENT PLACEMENTS ============
const recentPlacements = [
  { id: 1, name: "Deepak Patil", company: "Deloitte", role: "Data Analyst", location: "Bangalore" },
  { id: 2, name: "Ashish Kumar", company: "TCS", role: "Software Engineer", location: "Pune" },
  { id: 3, name: "Harshada Sukase", company: "Accenture", role: "Business Analyst", location: "Mumbai" },
  { id: 4, name: "Mohit Sharma", company: "Amazon", role: "Transaction Specialist", location: "Hyderabad" },
  { id: 5, name: "Priya Deshmukh", company: "Infosys", role: "Data Scientist", location: "Bangalore" },
  { id: 6, name: "Rahul Patil", company: "Tech Mahindra", role: "Full Stack Developer", location: "Pune" }
];

const Placement = () => {
  const [currentRow1Index, setCurrentRow1Index] = useState(0);
  const [currentRow2Index, setCurrentRow2Index] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  // Split companies into two rows
  const halfIndex = Math.ceil(placementCompanies.length / 2);
  const row1Companies = placementCompanies.slice(0, halfIndex);
  const row2Companies = placementCompanies.slice(halfIndex);

  // Visible items per row (responsive)
  const getVisibleItems = () => {
    if (window.innerWidth < 480) return 3;
    if (window.innerWidth < 768) return 4;
    if (window.innerWidth < 1024) return 5;
    return 6;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleItems());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleItems());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide for both rows
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        const totalRow1 = row1Companies.length - visibleCount;
        const totalRow2 = row2Companies.length - visibleCount;
        
        setCurrentRow1Index((prev) => 
          prev >= totalRow1 ? 0 : prev + 1
        );
        setCurrentRow2Index((prev) => 
          prev >= totalRow2 ? 0 : prev + 1
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, visibleCount, row1Companies.length, row2Companies.length]);

  // Get visible companies with loop
  const getVisibleCompanies = (companies, currentIndex) => {
    if (companies.length <= visibleCount) return companies;
    
    const endIndex = currentIndex + visibleCount;
    if (endIndex <= companies.length) {
      return companies.slice(currentIndex, endIndex);
    } else {
      const firstPart = companies.slice(currentIndex);
      const secondPart = companies.slice(0, endIndex - companies.length);
      return [...firstPart, ...secondPart];
    }
  };

  const visibleRow1 = getVisibleCompanies(row1Companies, currentRow1Index);
  const visibleRow2 = getVisibleCompanies(row2Companies, currentRow2Index);

  // Navigation functions
  const goToPrevious = (row) => {
    if (row === 1) {
      setCurrentRow1Index((prev) =>
        prev === 0 ? row1Companies.length - visibleCount : prev - 1
      );
    } else {
      setCurrentRow2Index((prev) =>
        prev === 0 ? row2Companies.length - visibleCount : prev - 1
      );
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = (row) => {
    if (row === 1) {
      setCurrentRow1Index((prev) =>
        prev >= row1Companies.length - visibleCount ? 0 : prev + 1
      );
    } else {
      setCurrentRow2Index((prev) =>
        prev >= row2Companies.length - visibleCount ? 0 : prev + 1
      );
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <div className="placement-page">
      {/* Hero Section */}
      <section className="placement-hero">
        <div className="placement-hero-overlay"></div>
        <div className="placement-hero-content">
          <div className="placement-hero-badge">
            <Sparkles size={16} />
            <span>Career Success Stories</span>
          </div>
          <h1 className="placement-hero-title">
            Your <span className="highlight">Career</span> Starts Here
          </h1>
          <p className="placement-hero-subtitle">
            Join 500+ successful alumni who transformed their careers with Plexus Skills
          </p>
          <div className="placement-hero-stats">
            {placementStats.map((stat) => (
              <div className="placement-hero-stat" key={stat.id}>
                <div className="placement-hero-stat-icon">{stat.icon}</div>
                <div className="placement-hero-stat-number">{stat.number}</div>
                <div className="placement-hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Partners Section */}
      <section className="placement-partners">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Briefcase size={16} /> OUR HIRING PARTNERS
            </span>
            <h2 className="section-title">
              Trusted by <span className="highlight">Top Companies</span>
            </h2>
            <p className="section-subtitle">
              Leading organizations that hire Plexus Skills graduates
            </p>
          </div>

          <div className="partners-slider-wrapper">
            {/* Row 1 */}
            <div className="partners-row">
              <button 
                className="partners-arrow prev" 
                onClick={() => goToPrevious(1)}
              >
                <ChevronLeft size={20} />
              </button>
              <div className="partners-track" ref={row1Ref}>
                <div className="partners-logos">
                  {visibleRow1.map((company) => (
                    <div key={company.id} className="partner-logo-item">
                      <img 
                        src={company.logo} 
                        alt={company.name}
                        className="partner-logo"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/images/placeholder-logo.png';
                        }}
                      />
                      <span className="partner-name">{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                className="partners-arrow next" 
                onClick={() => goToNext(1)}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Row 2 */}
            <div className="partners-row">
              <button 
                className="partners-arrow prev" 
                onClick={() => goToPrevious(2)}
              >
                <ChevronLeft size={20} />
              </button>
              <div className="partners-track" ref={row2Ref}>
                <div className="partners-logos">
                  {visibleRow2.map((company) => (
                    <div key={company.id} className="partner-logo-item">
                      <img 
                        src={company.logo} 
                        alt={company.name}
                        className="partner-logo"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/images/placeholder-logo.png';
                        }}
                      />
                      <span className="partner-name">{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button 
                className="partners-arrow next" 
                onClick={() => goToNext(2)}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="partners-dots">
              {Array.from({ length: Math.ceil(row1Companies.length / visibleCount) }).map((_, index) => (
                <button
                  key={index}
                  className={`partners-dot ${index === Math.floor(currentRow1Index / visibleCount) ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentRow1Index(index * visibleCount);
                    setCurrentRow2Index(index * visibleCount);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section className="placement-highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Award size={16} /> WHY WE STAND OUT
            </span>
            <h2 className="section-title">
              Placement <span className="highlight">Highlights</span>
            </h2>
            <p className="section-subtitle">
              What makes our placement program exceptional
            </p>
          </div>
          <div className="highlights-grid">
            {placementHighlights.map((item) => (
              <div className="highlight-card" key={item.id}>
                <div className="highlight-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Placements */}
      <section className="placement-recent">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Users size={16} /> RECENT SUCCESS
            </span>
            <h2 className="section-title">
              Our <span className="highlight">Recent Placements</span>
            </h2>
            <p className="section-subtitle">
              Meet some of our recently placed students
            </p>
          </div>
          <div className="recent-grid">
            {recentPlacements.map((placement) => (
              <div className="recent-card" key={placement.id}>
                <div className="recent-card-header">
                  <div className="recent-avatar">
                    <UserCheck size={24} />
                  </div>
                  <div className="recent-info">
                    <h4>{placement.name}</h4>
                    <p className="recent-role">{placement.role}</p>
                  </div>
                </div>
                <div className="recent-card-body">
                  <div className="recent-company">
                    <Building2 size={16} />
                    <span>{placement.company}</span>
                  </div>
                  <div className="recent-location">
                    <MapPin size={16} />
                    <span>{placement.location}</span>
                  </div>
                </div>
                <div className="recent-card-footer">
                  <CheckCircle size={16} className="success-icon" />
                  <span>Successfully Placed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="placement-cta">
        <div className="container">
          <div className="placement-cta-content">
            <h2>
              Ready to Build Your <span className="highlight">Career</span>?
            </h2>
            <p>
              Join Plexus Skills and get access to our extensive hiring network
            </p>
            <div className="placement-cta-buttons">
              <Link to="/#courses" className="cta-btn-primary">
                Explore Programs <ArrowRight size={18} />
              </Link>
              <Link to="/advisor" className="cta-btn-secondary">
                <Phone size={18} /> Talk to an Adviser
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Placement;
