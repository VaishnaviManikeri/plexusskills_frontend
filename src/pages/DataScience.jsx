// DataScience.jsx
import './DataScience.css';

import { Link } from "react-router-dom";
// Technology icon paths
const pythonIcon = '/assets/images/python-icon.png';
const statsIcon = '/assets/images/stats-icon.png';
const sqlIcon = '/assets/images/sql-icon.png';
const powerbiIcon = '/assets/images/powerbi-icon.png';
const tableauIcon = '/assets/images/tableau-icon.png';
const visualizationIcon = '/assets/images/visualization-icon.png';
const promptIcon = '/assets/images/prompt-icon.png';
const genaiIcon = '/assets/images/genai-icon.png';
const aiAnalysisIcon = '/assets/images/ai-analysis-icon.png';
const projectsIcon = '/assets/images/projects-icon.png';
const brainIcon = '/assets/images/brain-icon.png';
const layersIcon = '/assets/images/layers-icon.png';
const serverIcon = '/assets/images/server-icon.png';

// Simple SVG Icon components (no external dependencies)
const IconClock = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconLaptop = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>
  </svg>
);

const IconGraduation = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 1.5 6 3 6 3s6-1.5 6-3v-5"/>
  </svg>
);

const IconWallet = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
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

const IconBriefcase = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const IconCheck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const DataScience = () => {
  const technologies = [
    { name: 'Python Programming', icon: pythonIcon },
    { name: 'Advanced Statistics', icon: statsIcon },
    { name: 'Data Analysis', icon: aiAnalysisIcon },
    { name: 'Data Visualization', icon: visualizationIcon },
    { name: 'SQL', icon: sqlIcon },
    { name: 'Machine Learning', icon: brainIcon },
    { name: 'Deep Learning Fundamentals', icon: layersIcon },
    { name: 'Generative AI', icon: genaiIcon },
    { name: 'Prompt Engineering', icon: promptIcon },
    { name: 'AI Model Applications', icon: aiAnalysisIcon },
    { name: 'Power BI', icon: powerbiIcon },
    { name: 'Tableau', icon: tableauIcon },
    { name: 'Real-Time Projects', icon: projectsIcon },
    { name: 'Model Deployment', icon: serverIcon },
  ];

  const trainingModes = ['Online', 'Offline (Classroom Training)', 'Hybrid'];

  const eligibilityList = [
    'Any Graduate', 'BE/B.Tech', 'BCA', 'MCA', 'B.Sc.',
    'M.Sc.', 'MBA', 'MSc CS / IT / Electronics', 'Working Professionals'
  ];

  const careerOpportunities = [
    'Data Scientist', 'Machine Learning Engineer', 'AI Engineer',
    'Data Analyst', 'Research Associate', 'Business Intelligence Analyst'
  ];

  const facilities = [
    '100% Placement Support',
    'A Separate English Communication Skills Development Course',
    'Course Completion and Internship Certificate',
    'Industry relevant Curriculum',
    'Industry Expert Trainers',
    'Practical Hands on Training',
    'LinkedIn profile, GitHub profile optimization',
    'Resume Building and Interview Preparation'
  ];

  return (
    <div className="data-science-page">
      {/* Hero Section with Background Image - Content Right Aligned */}
      <section className="ds-hero">
        <div className="ds-hero-overlay"></div>
        <div className="ds-hero-content">
          <div className="ds-hero-text">
            <div className="ds-badge">
              <IconSparkles />
              Next-Gen Program
            </div>
            <h1>
              Data Science with <br />
              <span className="highlight">Generative AI</span>
            </h1>
            <p>
              Master Data Science and Artificial Intelligence with industry-oriented training. 
              Learn how to collect, process, analyze, and build machine learning models using 
              Python while leveraging Generative AI to increase productivity and automate workflows.
            </p>
            <div className="ds-hero-stats">
              <div className="ds-stat">
                <span className="ds-stat-number">6</span>
                <span className="ds-stat-label">Months Duration</span>
              </div>
              <div className="ds-stat">
                <span className="ds-stat-number">100%</span>
                <span className="ds-stat-label">Placement Support</span>
              </div>
              <div className="ds-stat">
                <span className="ds-stat-number">14+</span>
                <span className="ds-stat-label">Technologies</span>
              </div>
            </div>
            <div className="ds-hero-buttons">
<Link to="/enroll?course=Data%20Science%20with%20Generative%20AI" className="ds-btn-primary">
  Enroll Now <IconArrowRight />
</Link>              <a href="/assets/brochure/DATA%20SCIENCE.pdf" download="Plexus-Data-Science-Brochure.pdf" className="ds-btn-secondary">
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview Section */}
      <section className="ds-overview">
        <div className="ds-overview-content">
          <h2>Course Overview</h2>
          <p>
            Master Data Science and Artificial Intelligence with industry-oriented training. 
            Learn how to collect, process, analyze, and build machine learning models using 
            Python while leveraging Generative AI to increase productivity and automate workflows.
          </p>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="ds-technologies">
        <h2>
          <span className="highlight">Technologies</span> You Will Learn
        </h2>
        <div className="ds-tech-grid">
          {technologies.map((tech) => (
            <div className="ds-tech-item" key={tech.name}>
              <img src={tech.icon} alt={tech.name} className="ds-tech-icon" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Details Section - Clean & Simple with Navy Blue Borders */}
      <section className="ds-details">
        <div className="ds-details-grid">
          {/* Duration Card */}
          <div className="ds-detail-card">
            <div className="ds-detail-icon-wrapper">
              <div className="ds-detail-icon">
                <IconClock />
              </div>
            </div>
            <h3>Duration</h3>
            <p className="ds-detail-value">6 Months</p>
            <span className="ds-detail-sub">Comprehensive training program</span>
            <div className="ds-detail-features">
              <span>Weekend & Weekday Batches</span>
              <span>Flexible Schedule</span>
            </div>
          </div>

          {/* Training Mode Card */}
          <div className="ds-detail-card">
            <div className="ds-detail-icon-wrapper">
              <div className="ds-detail-icon">
                <IconLaptop />
              </div>
            </div>
            <h3>Training Mode</h3>
            <div className="ds-mode-list">
              {trainingModes.map((mode) => (
                <span key={mode}>{mode}</span>
              ))}
            </div>
            <div className="ds-detail-features">
              <span>Live Interactive Sessions</span>
              <span>Recorded Lectures Available</span>
            </div>
          </div>

          {/* Eligibility Card */}
          <div className="ds-detail-card">
            <div className="ds-detail-icon-wrapper">
              <div className="ds-detail-icon">
                <IconGraduation />
              </div>
            </div>
            <h3>Eligibility</h3>
            <div className="ds-eligibility-list">
              {eligibilityList.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="ds-detail-features">
              <span>No prior coding experience required</span>
            </div>
          </div>

          {/* Course Fee Card */}
          <div className="ds-detail-card ds-fee-card">
            <div className="ds-detail-icon-wrapper">
              <div className="ds-detail-icon">
                <IconWallet />
              </div>
            </div>
            <h3>Course Fee</h3>
            <p className="ds-fee-amount">₹40,000 /-</p>
            <span className="ds-fee-note">Flexible payment options available</span>
            <div className="ds-detail-features">
              <span>EMI Options Available</span>
              <span>Group Discounts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="ds-careers">
        <h2>
          <span className="highlight">Career</span> Opportunities
        </h2>
        <p className="ds-careers-subtitle">
          Unlock diverse career paths in the data science domain
        </p>
        <div className="ds-careers-grid">
          {careerOpportunities.map((career) => (
            <div className="ds-career-item" key={career}>
              <IconBriefcase />
              <h4>{career}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Section */}
      <section className="ds-facilities">
        <h2>
          <span className="highlight">Facilities</span> & Support
        </h2>
        <div className="ds-facilities-grid">
          {facilities.map((facility) => (
            <div className="ds-facility-item" key={facility}>
              <IconCheck />
              <p>{facility}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="ds-cta">
        <div className="ds-cta-content">
          <h2>
            Ready to become a <span className="highlight">Data Scientist</span>?
          </h2>
          <p>
            Join our comprehensive program and launch your career in data science 
            with the power of Generative AI. Get 100% placement support and hands-on training.
          </p>
          <div className="ds-cta-buttons">
<Link to="/enroll?course=Data%20Science%20with%20Generative%20AI" className="ds-btn-primary">
  Enroll Now <IconArrowRight size={18} />
</Link>            <Link to="/advisor?course=Data%20Science%20with%20Generative%20AI" className="ds-btn-secondary">
              Talk to an Adviser
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataScience;
