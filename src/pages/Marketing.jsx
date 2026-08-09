// Marketing.jsx
import './Marketing.css';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// Technology icon paths
const seoIcon = '/assets/images/seo-icon.png';
const wordpressIcon = '/assets/images/wordpress-icon.png';
const googleIcon = '/assets/images/google-icon.png';
const socialIcon = '/assets/images/social-icon.png';
const contentIcon = '/assets/images/content.png';
const emailIcon = '/assets/images/email.png';
const youtubeIcon = '/assets/images/youtube.png';
const linkedinIcon = '/assets/images/linkedin-icon.png';
const canvaIcon = '/assets/images/canva-icon.png';
const genaiIcon = '/assets/images/genai.png';
const analyticsIcon = '/assets/images/analytics-icon.png';
const projectsIcon = '/assets/images/projects.png';
const marketingIcon = '/assets/images/digi.png';

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

const Marketing = () => {
  const technologies = [
    { name: 'Introduction to Digital Marketing', icon: marketingIcon },
    { name: 'Website Planning', icon: wordpressIcon },
    { name: 'WordPress', icon: wordpressIcon },
    { name: 'Search Engine Optimization (SEO)', icon: seoIcon },
    { name: 'Google Search Console', icon: googleIcon },
    { name: 'Google Analytics', icon: analyticsIcon },
    { name: 'Google Ads (PPC)', icon: googleIcon },
    { name: 'Meta Ads (Facebook & Instagram)', icon: socialIcon },
    { name: 'Social Media Marketing', icon: socialIcon },
    { name: 'Content Marketing', icon: contentIcon },
    { name: 'Email Marketing', icon: emailIcon },
    { name: 'YouTube Marketing', icon: youtubeIcon },
    { name: 'LinkedIn Marketing', icon: linkedinIcon },
    { name: 'Canva Design', icon: canvaIcon },
    { name: 'AI Tools for Digital Marketing', icon: genaiIcon },
    { name: 'Lead Generation', icon: marketingIcon },
    { name: 'Freelancing', icon: projectsIcon },
    { name: 'Real-Time Projects', icon: projectsIcon },
  ];

  const trainingModes = ['Online', 'Offline (Classroom Training)', 'Hybrid'];

  const eligibilityList = [
    '12th Pass', 'Any Graduate', 'Business Owners',
    'Entrepreneurs', 'Freelancers', 'Marketing Professionals',
    'Working Professionals', 'Students'
  ];

  const careerOpportunities = [
    'Digital Marketing Executive', 'SEO Executive', 'Social Media Manager',
    'Performance Marketing Executive', 'PPC Specialist',
    'Content Marketer', 'Digital Marketing Analyst', 'Freelancer'
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
    <div className="marketing-page">
      {/* Hero Section with Background Image - Content Right Aligned */}
      <section className="mk-hero">
        <div className="mk-hero-overlay"></div>
        <div className="mk-hero-content">
          <div className="mk-hero-text">
            <div className="mk-badge">
              <IconSparkles />
              Next-Gen Program
            </div>
            <h1>
              Digital <br />
              <span className="highlight">Marketing</span>
            </h1>
            <p>
              Build a successful career in Digital Marketing by mastering SEO, Social Media Marketing, 
              Paid Advertising, Content Marketing, Analytics, and AI-powered marketing tools. 
              Gain hands-on experience through live campaigns and real-world projects.
            </p>
            <div className="mk-hero-stats">
              <div className="mk-stat">
                <span className="mk-stat-number">3</span>
                <span className="mk-stat-label">Months Duration</span>
              </div>
              <div className="mk-stat">
                <span className="mk-stat-number">100%</span>
                <span className="mk-stat-label">Placement Support</span>
              </div>
              <div className="mk-stat">
                <span className="mk-stat-number">18+</span>
                <span className="mk-stat-label">Technologies</span>
              </div>
            </div>
            <div className="mk-hero-buttons">
<Link to="/enroll?course=Digital%20Marketing" className="ds-btn-primary">
  Enroll Now <IconArrowRight />
</Link>              <Link to="/brochure" className="mk-btn-secondary">
                Download Brochure
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview Section */}
      <section className="mk-overview">
        <div className="mk-overview-content">
          <h2>Course Overview</h2>
          <p>
            Build a successful career in Digital Marketing by mastering SEO, Social Media Marketing, 
            Paid Advertising, Content Marketing, Analytics, and AI-powered marketing tools. 
            Gain hands-on experience through live campaigns and real-world projects.
          </p>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="mk-technologies">
        <h2>
          <span className="highlight">Technologies</span> You Will Learn
        </h2>
        <div className="mk-tech-grid">
          {technologies.map((tech) => (
            <div className="mk-tech-item" key={tech.name}>
              <img src={tech.icon} alt={tech.name} className="mk-tech-icon" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Details Section - Clean & Simple with Navy Blue Borders */}
      <section className="mk-details">
        <div className="mk-details-grid">
          {/* Duration Card */}
          <div className="mk-detail-card">
            <div className="mk-detail-icon-wrapper">
              <div className="mk-detail-icon">
                <IconClock />
              </div>
            </div>
            <h3>Duration</h3>
            <p className="mk-detail-value">3 Months</p>
            <span className="mk-detail-sub">Comprehensive training program</span>
            <div className="mk-detail-features">
              <span>Weekend & Weekday Batches</span>
              <span>Flexible Schedule</span>
            </div>
          </div>

          {/* Training Mode Card */}
          <div className="mk-detail-card">
            <div className="mk-detail-icon-wrapper">
              <div className="mk-detail-icon">
                <IconLaptop />
              </div>
            </div>
            <h3>Training Mode</h3>
            <div className="mk-mode-list">
              {trainingModes.map((mode) => (
                <span key={mode}>{mode}</span>
              ))}
            </div>
            <div className="mk-detail-features">
              <span>Live Interactive Sessions</span>
              <span>Recorded Lectures Available</span>
            </div>
          </div>

          {/* Eligibility Card */}
          <div className="mk-detail-card">
            <div className="mk-detail-icon-wrapper">
              <div className="mk-detail-icon">
                <IconGraduation />
              </div>
            </div>
            <h3>Eligibility</h3>
            <div className="mk-eligibility-list">
              {eligibilityList.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="mk-detail-features">
              <span>No prior experience required</span>
            </div>
          </div>

          {/* Course Fee Card */}
          <div className="mk-detail-card mk-fee-card">
            <div className="mk-detail-icon-wrapper">
              <div className="mk-detail-icon">
                <IconWallet />
              </div>
            </div>
            <h3>Course Fee</h3>
            <p className="mk-fee-amount">₹30,000 /-</p>
            <span className="mk-fee-note">Flexible payment options available</span>
            <div className="mk-detail-features">
              <span>EMI Options Available</span>
              <span>Group Discounts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="mk-careers">
        <h2>
          <span className="highlight">Career</span> Opportunities
        </h2>
        <p className="mk-careers-subtitle">
          Unlock diverse career paths in the digital marketing domain
        </p>
        <div className="mk-careers-grid">
          {careerOpportunities.map((career) => (
            <div className="mk-career-item" key={career}>
              <IconBriefcase />
              <h4>{career}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Section */}
      <section className="mk-facilities">
        <h2>
          <span className="highlight">Facilities</span> & Support
        </h2>
        <div className="mk-facilities-grid">
          {facilities.map((facility) => (
            <div className="mk-facility-item" key={facility}>
              <IconCheck />
              <p>{facility}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mk-cta">
        <div className="mk-cta-content">
          <h2>
            Ready to become a <span className="highlight">Digital Marketing Expert</span>?
          </h2>
          <p>
            Join our comprehensive program and launch your career in digital marketing 
            with AI-powered tools. Get 100% placement support and hands-on training.
          </p>
          <div className="mk-cta-buttons">
<Link to="/enroll?course=Digital%20Marketing" className="mk-btn-primary">
  Enroll Now <ArrowRight size={18} />
</Link>            <Link to="/advisor?course=Digital%20Marketing" className="mk-btn-secondary">
              Talk to an Adviser
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketing;
