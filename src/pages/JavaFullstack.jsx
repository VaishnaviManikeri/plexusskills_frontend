// JavaFullstack.jsx
import React from 'react';
import './JavaFullstack.css';
import { Link } from "react-router-dom";
// Technology icon paths
const javaIcon = '/assets/images/java-icon.png';
const javaIcon1 = '/assets/images/java-icon1.png';

const springIcon = '/assets/images/spring-icon.png';
const reactIcon = '/assets/images/react-icon.png';
const mysqlIcon = '/assets/images/sql-icon.png';
const htmlIcon = '/assets/images/html-icon.png';
const cssIcon = '/assets/images/css-icon.png';
const jsIcon = '/assets/images/js-icon.png';
const bootstrapIcon = '/assets/images/bootstrap-icon.png';
const gitIcon = '/assets/images/git-icon.png';
const genaiIcon = '/assets/images/genai-icon.png';
const promptIcon = '/assets/images/prompt-icon.png';
const projectsIcon = '/assets/images/projects-icon.png';

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

const JavaFullstack = () => {
  const technologies = [
    { name: 'Core Java', icon: javaIcon },
    { name: 'Advanced Java', icon: javaIcon1 },
    { name: 'JDBC', icon: javaIcon },
    { name: 'Spring Framework', icon: springIcon },
    { name: 'Spring Boot', icon: springIcon },
    { name: 'Hibernate', icon: springIcon },
    { name: 'REST APIs', icon: springIcon },
    { name: 'HTML5', icon: htmlIcon },
    { name: 'CSS3', icon: cssIcon },
    { name: 'JavaScript', icon: jsIcon },
    { name: 'Bootstrap', icon: bootstrapIcon },
    { name: 'React JS', icon: reactIcon },
    { name: 'MySQL', icon: mysqlIcon },
    { name: 'Git & GitHub', icon: gitIcon },
    { name: 'Generative AI for Developers', icon: genaiIcon },
    { name: 'Prompt Engineering', icon: promptIcon },
    { name: 'Project Deployment', icon: projectsIcon },
    { name: 'Real-Time Projects', icon: projectsIcon },
  ];

  const trainingModes = ['Online', 'Offline (Classroom Training)', 'Hybrid'];

  const eligibilityList = [
    'BE/B.Tech', 'BCA', 'MCA', 'B.Sc. (Computer Science/IT)',
    'Diploma Students', 'MSc CS / IT', 'Working Professionals'
  ];

  const careerOpportunities = [
    'Java Developer', 'Full Stack Developer', 'Software Engineer',
    'Backend Developer', 'Web Application Developer'
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
    <div className="java-fullstack-page">
      {/* Hero Section with Background Image - Content Right Aligned */}
      <section className="jf-hero">
        <div className="jf-hero-overlay"></div>
        <div className="jf-hero-content">
          <div className="jf-hero-text">
            <div className="jf-badge">
              <IconSparkles />
              Next-Gen Program
            </div>
            <h1>
              Java Full Stack Development <br />
              <span className="highlight">with Generative AI</span>
            </h1>
            <p>
              Become a Full Stack Java Developer by learning front-end, back-end, databases, 
              cloud deployment, and Generative AI tools. Build real-world web applications 
              and prepare for software development careers.
            </p>
            <div className="jf-hero-stats">
              <div className="jf-stat">
                <span className="jf-stat-number">6</span>
                <span className="jf-stat-label">Months Duration</span>
              </div>
              <div className="jf-stat">
                <span className="jf-stat-number">100%</span>
                <span className="jf-stat-label">Placement Support</span>
              </div>
              <div className="jf-stat">
                <span className="jf-stat-number">18+</span>
                <span className="jf-stat-label">Technologies</span>
              </div>
            </div>
            <div className="jf-hero-buttons">
<Link to="/enroll?course=Java%20Full%20Stack%20Development%20with%20Generative%20AI" className="ds-btn-primary">
  Enroll Now <IconArrowRight />
</Link>              <a href="/assets/brochure/JAVA.pdf" download="Plexus-Java-Full-Stack-Brochure.pdf" className="jf-btn-secondary">
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview Section */}
      <section className="jf-overview">
        <div className="jf-overview-content">
          <h2>Course Overview</h2>
          <p>
            Become a Full Stack Java Developer by learning front-end, back-end, databases, 
            cloud deployment, and Generative AI tools. Build real-world web applications 
            and prepare for software development careers.
          </p>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="jf-technologies">
        <h2>
          <span className="highlight">Technologies</span> You Will Learn
        </h2>
        <div className="jf-tech-grid">
          {technologies.map((tech) => (
            <div className="jf-tech-item" key={tech.name}>
              <img src={tech.icon} alt={tech.name} className="jf-tech-icon" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Details Section - Clean & Simple with Navy Blue Borders */}
      <section className="jf-details">
        <div className="jf-details-grid">
          {/* Duration Card */}
          <div className="jf-detail-card">
            <div className="jf-detail-icon-wrapper">
              <div className="jf-detail-icon">
                <IconClock />
              </div>
            </div>
            <h3>Duration</h3>
            <p className="jf-detail-value">6 Months</p>
            <span className="jf-detail-sub">Comprehensive training program</span>
            <div className="jf-detail-features">
              <span>Weekend & Weekday Batches</span>
              <span>Flexible Schedule</span>
            </div>
          </div>

          {/* Training Mode Card */}
          <div className="jf-detail-card">
            <div className="jf-detail-icon-wrapper">
              <div className="jf-detail-icon">
                <IconLaptop />
              </div>
            </div>
            <h3>Training Mode</h3>
            <div className="jf-mode-list">
              {trainingModes.map((mode) => (
                <span key={mode}>{mode}</span>
              ))}
            </div>
            <div className="jf-detail-features">
              <span>Live Interactive Sessions</span>
              <span>Recorded Lectures Available</span>
            </div>
          </div>

          {/* Eligibility Card */}
          <div className="jf-detail-card">
            <div className="jf-detail-icon-wrapper">
              <div className="jf-detail-icon">
                <IconGraduation />
              </div>
            </div>
            <h3>Eligibility</h3>
            <div className="jf-eligibility-list">
              {eligibilityList.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="jf-detail-features">
              <span>No prior coding experience required</span>
            </div>
          </div>

          {/* Course Fee Card */}
          <div className="jf-detail-card jf-fee-card">
            <div className="jf-detail-icon-wrapper">
              <div className="jf-detail-icon">
                <IconWallet />
              </div>
            </div>
            <h3>Course Fee</h3>
            <p className="jf-fee-amount">₹35,000 /-</p>
            <span className="jf-fee-note">Flexible payment options available</span>
            <div className="jf-detail-features">
              <span>EMI Options Available</span>
              <span>Group Discounts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="jf-careers">
        <h2>
          <span className="highlight">Career</span> Opportunities
        </h2>
        <p className="jf-careers-subtitle">
          Unlock diverse career paths in the full stack development domain
        </p>
        <div className="jf-careers-grid">
          {careerOpportunities.map((career) => (
            <div className="jf-career-item" key={career}>
              <IconBriefcase />
              <h4>{career}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Section */}
      <section className="jf-facilities">
        <h2>
          <span className="highlight">Facilities</span> & Support
        </h2>
        <div className="jf-facilities-grid">
          {facilities.map((facility) => (
            <div className="jf-facility-item" key={facility}>
              <IconCheck />
              <p>{facility}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="jf-cta">
        <div className="jf-cta-content">
          <h2>
            Ready to become a <span className="highlight">Full Stack Developer</span>?
          </h2>
          <p>
            Join our comprehensive program and launch your career in full stack development 
            with the power of Generative AI. Get 100% placement support and hands-on training.
          </p>
          <div className="jf-cta-buttons">
<Link to="/enroll?course=Java%20Full%20Stack%20Development%20with%20Generative%20AI" className="jf-btn-primary">
  Enroll Now <IconArrowRight />
</Link>            <Link to="/advisor?course=Java%20Full%20Stack%20Development%20with%20Generative%20AI" className="jf-btn-secondary">
              Talk to an Adviser
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JavaFullstack;
