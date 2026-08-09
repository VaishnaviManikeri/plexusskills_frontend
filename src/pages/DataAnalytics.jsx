// DataAnalytics.jsx
import { Link } from "react-router-dom";
import './DataAnalytics.css';
import { IconArrowRight } from "@tabler/icons-react";
import {
  Clock,
  Laptop,
  GraduationCap,
  Wallet,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

// Technology icon paths
const excelIcon = '/assets/images/excel-icon.png';
const sqlIcon = '/assets/images/sql-icon.png';
const pythonIcon = '/assets/images/python-icon.png';
const powerbiIcon = '/assets/images/powerbi-icon.png';
const tableauIcon = '/assets/images/tableau-icon.png';
const statsIcon = '/assets/images/stats-icon.png';
const visualizationIcon = '/assets/images/visualization-icon.png';
const businessIcon = '/assets/images/business-icon.png';
const promptIcon = '/assets/images/prompt-icon.png';
const genaiIcon = '/assets/images/genai-icon.png';
const aiAnalysisIcon = '/assets/images/ai-analysis-icon.png';
const projectsIcon = '/assets/images/projects-icon.png';

const DataAnalytics = () => {
  const technologies = [
    { name: 'Advanced Excel', icon: excelIcon },
    { name: 'SQL Database', icon: sqlIcon },
    { name: 'Python Programming', icon: pythonIcon },
    { name: 'Power BI', icon: powerbiIcon },
    { name: 'Tableau', icon: tableauIcon },
    { name: 'Statistics for Data Analytics', icon: statsIcon },
    { name: 'Data Cleaning & Data Visualization', icon: visualizationIcon },
    { name: 'Business Analytics', icon: businessIcon },
    { name: 'Prompt Engineering', icon: promptIcon },
    { name: 'Generative AI Tools', icon: genaiIcon },
    { name: 'AI for Data Analysis', icon: aiAnalysisIcon },
    { name: 'Real-Time Projects', icon: projectsIcon },
  ];

  const trainingModes = ['Online', 'Offline (Classroom Training)', 'Hybrid'];

  const eligibilityList = [
    'Any Graduate', 'BE/B.Tech', 'BCA', 'B.Sc.', 'B.Com.',
    'BBA', 'MCA', 'MBA', 'MSc CS / IT', 'Working Professionals'
  ];

  const careerOpportunities = [
    'Data Analyst', 'Business Analyst', 'MIS Executive',
    'Reporting Analyst', 'Power BI Developer', 'Tableau Developer',
    'Junior Data Consultant', 'Python Developer'
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
    <div className="data-analytics-page">
      {/* Hero Section with Background Image - Content Right Aligned */}
      <section className="da-hero">
        <div className="da-hero-overlay"></div>
        <div className="da-hero-content">
          <div className="da-hero-text">
            <div className="da-badge">
              <Sparkles size={16} />
              Next-Gen Program
            </div>
            <h1>
              Data Analytics with <br />
              <span className="highlight">Generative AI</span>
            </h1>
            <p>
              Become a job-ready Data Analyst by learning the most in-demand analytics tools 
              and AI technologies. This course combines data visualization, business intelligence, 
              Python programming, SQL and Generative AI to analyze data, create dashboards
              and make data-driven business decisions.
            </p>
            <div className="da-hero-stats">
              <div className="da-stat">
                <span className="da-stat-number">5</span>
                <span className="da-stat-label">Months Duration</span>
              </div>
              <div className="da-stat">
                <span className="da-stat-number">100%</span>
                <span className="da-stat-label">Placement Support</span>
              </div>
              <div className="da-stat">
                <span className="da-stat-number">12+</span>
                <span className="da-stat-label">Technologies</span>
              </div>
            </div>
            <div className="da-hero-buttons">
<Link to="/enroll?course=Data%20Analytics%20with%20Generative%20AI" className="ds-btn-primary">
  Enroll Now <IconArrowRight />
</Link>              <a href="/assets/brochure/DATA%20ANALYTICS.pdf" download="Plexus-Data-Analytics-Brochure.pdf" className="da-btn-secondary">
                Download Brochure
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview Section */}
      <section className="da-overview">
        <div className="da-overview-content">
          <h2>Course Overview</h2>
          <p>
            Become a job-ready Data Analyst by learning the most in-demand analytics tools 
            and AI technologies. This course combines data visualization, business intelligence, 
            Python programming, SQL and Generative AI to analyze data, create dashboards
            and make data-driven business decisions.
          </p>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="da-technologies">
        <h2>
          <span className="highlight">Technologies</span> You Will Learn
        </h2>
        <div className="da-tech-grid">
          {technologies.map((tech) => (
            <div className="da-tech-item" key={tech.name}>
              <img src={tech.icon} alt={tech.name} className="da-tech-icon" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Details Section - Enhanced with Equal Cards */}
      <section className="da-details">
        <div className="da-details-grid">
          {/* Duration Card */}
          <div className="da-detail-card">
            <div className="da-detail-icon-wrapper">
              <div className="da-detail-icon">
                <Clock size={36} />
              </div>
            </div>
            <h3>Duration</h3>
            <p className="da-detail-value">5 Months</p>
            <span className="da-detail-sub">Comprehensive training program</span>
            <div className="da-detail-features">
              <span>Weekend & Weekday Batches</span>
              <span>Flexible Schedule</span>
            </div>
          </div>

          {/* Training Mode Card */}
          <div className="da-detail-card">
            <div className="da-detail-icon-wrapper">
              <div className="da-detail-icon">
                <Laptop size={36} />
              </div>
            </div>
            <h3>Training Mode</h3>
            <div className="da-mode-list">
              {trainingModes.map((mode) => (
                <span key={mode}>{mode}</span>
              ))}
            </div>
            <div className="da-detail-features">
              <span>Live Interactive Sessions</span>
              <span>Recorded Lectures Available</span>
            </div>
          </div>

          {/* Eligibility Card */}
          <div className="da-detail-card">
            <div className="da-detail-icon-wrapper">
              <div className="da-detail-icon">
                <GraduationCap size={36} />
              </div>
            </div>
            <h3>Eligibility</h3>
            <div className="da-eligibility-list">
              {eligibilityList.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="da-detail-features">
              <span>No prior coding experience required</span>
            </div>
          </div>

          {/* Course Fee Card */}
          <div className="da-detail-card da-fee-card">
            <div className="da-detail-icon-wrapper">
              <div className="da-detail-icon">
                <Wallet size={36} />
              </div>
            </div>
            <h3>Course Fee</h3>
            <p className="da-fee-amount">₹35,000 /-</p>
            <span className="da-fee-note">Flexible payment options available</span>
            <div className="da-detail-features">
              <span>EMI Options Available</span>
              <span>Group Discounts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="da-careers">
        <h2>
          <span className="highlight">Career</span> Opportunities
        </h2>
        <p className="da-careers-subtitle">
          Unlock diverse career paths in the data analytics domain
        </p>
        <div className="da-careers-grid">
          {careerOpportunities.map((career) => (
            <div className="da-career-item" key={career}>
              <Briefcase size={24} className="da-career-icon" />
              <h4>{career}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Section */}
      <section className="da-facilities">
        <h2>
          <span className="highlight">Facilities</span> & Support
        </h2>
        <div className="da-facilities-grid">
          {facilities.map((facility) => (
            <div className="da-facility-item" key={facility}>
              <CheckCircle2 size={28} className="da-facility-icon" />
              <p>{facility}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="da-cta">
        <div className="da-cta-content">
          <h2>
            Ready to become a <span className="highlight">Data Analyst</span>?
          </h2>
          <p>
            Join our comprehensive program and launch your career in data analytics 
            with the power of Generative AI. Get 100% placement support and hands-on training.
          </p>
          <div className="da-cta-buttons">
<Link to="/enroll?course=Data%20Analytics%20with%20Generative%20AI" className="da-btn-primary">
  Enroll Now <ArrowRight size={18} />
</Link>            <Link to="/advisor?course=Data%20Analytics%20with%20Generative%20AI" className="da-btn-secondary">
              Talk to an Adviser
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataAnalytics;
