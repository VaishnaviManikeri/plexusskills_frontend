// About.jsx
import { Link } from "react-router-dom";
import "./about.css";
import {
  FaLightbulb, FaRocket, FaHandsHelping, FaUsers,
  FaQuoteLeft, FaGraduationCap, FaBriefcase,
  FaArrowRight, FaCheckCircle, FaStar, FaMedal,
  FaTrophy, FaThumbsUp
} from "react-icons/fa";
import aboutIllustration from "/assets/images/about11.png";
import visionImage from "/assets/images/vision.png";
import missionImage from "/assets/images/mission.png";
import offerAnalytics from "/assets/images/offer-analytics.png";
import offerDataScience from "/assets/images/ds1.png";
import offerFullstack from "/assets/images/fullstack.png";
import offerCareer from "/assets/images/cs.png";

const About = () => {
  const stats = [
    { number: "2022", label: "Founded" },
    { number: "2000+", label: "Students Trained" },
    { number: "6+", label: "Programs" },
    { number: "95%", label: "Placement Rate" }
  ];

  const values = [
    { icon: FaGraduationCap, title: "Excellence in Education", desc: "Industry-relevant curriculum designed by experts" },
    { icon: FaUsers, title: "Student-Centric", desc: "Every decision driven by student success" },
    { icon: FaLightbulb, title: "Innovation First", desc: "Evolving with emerging technologies" },
    { icon: FaBriefcase, title: "Employability Focus", desc: "Measured by the careers our students build" }
  ];

  const offers = [
    { image: offerAnalytics, tag: "Trending", eyebrow: "Analytics Program", title: "Data Analytics with AI", desc: "Master SQL, Python, and AI-driven analytics", detail: "Industry-led curriculum", path: "/courses/data-analytics-with-gen-ai" },
    { image: offerDataScience, tag: "Popular", eyebrow: "Advanced Program", title: "Data Science with AI", desc: "Deep dive into ML, NLP, and predictive modeling", detail: "Hands-on projects", path: "/courses/data-science-with-gen-ai" },
    { image: offerFullstack, tag: "In-Demand", eyebrow: "Developer Program", title: "Full Stack Development", desc: "Modern frameworks, databases, and cloud", detail: "Career-ready training", path: "/courses/java-fullstack-with-gen-ai" },
    { image: offerCareer, tag: "Included", eyebrow: "Student Success", title: "Career Support", desc: "Resume reviews, mock interviews, placement assistance", detail: "Dedicated mentorship", path: "/placement" }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-hero-left">
            <div className="hero-badge">
              <FaRocket className="badge-icon" /> Leading EdTech Platform
            </div>
            <h1>
              <span className="highlight">Committed to your Success</span> at every
              step of your Learning Journey
            </h1>
            <p className="hero-description">
              At <strong>Plexus Skills</strong>, we provide industry-focused education
              through expert-led training, advanced technology, and comprehensive
              career support. Founded in 2022 in <strong>Pune, Maharashtra</strong>,
              we empower careers in <strong>Data Analytics, Data Science, and Full
              Stack Development</strong>.
            </p>
            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="hero-rating">
              <div className="rating-stars">
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
              </div>
              <span className="rating-score">4.9</span>
              <span className="rating-label">Average Rating</span>
              <span className="rating-count">(2,847 reviews)</span>
            </div>
            <Link to="/#courses" className="hero-cta">
              Explore Programs <FaArrowRight className="cta-icon" />
            </Link>
          </div>
          <div className="about-hero-right">
            <div className="hero-image-wrapper">
              <img src={aboutIllustration} alt="About Plexus Skills" />
              <div className="floating-card card-1">
                <FaStar className="float-icon" />
                <span>Top Rated</span>
              </div>
              <div className="floating-card card-2">
                <FaMedal className="float-icon" />
                <span>Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission">
        <div className="vm-row">
          <div className="vm-row-image">
            <div className="vm-ring">
              <img src={visionImage} alt="Our Vision" />
            </div>
          </div>
          <div className="vm-row-content">
            <div className="vm-icon">
              <FaRocket />
            </div>
            <h2>Our Vision</h2>
            <p>
              To bridge the gap between education and employability by offering
              cutting-edge, career-focused learning programs. We envision a future
              where every learner has access to high-quality, affordable training
              that leads to meaningful employment.
            </p>
            <div className="vm-tag">
              <FaTrophy className="tag-icon" /> Vision 2030
            </div>
          </div>
        </div>

        <div className="vm-row reverse">
          <div className="vm-row-image">
            <div className="vm-ring">
              <img src={missionImage} alt="Our Mission" />
            </div>
          </div>
          <div className="vm-row-content">
            <div className="vm-icon">
              <FaHandsHelping />
            </div>
            <h2>Our Mission</h2>
            <ul>
              <li>Deliver practical, hands-on training through project-based learning</li>
              <li>Foster a culture of continuous learning, mentorship, and innovation</li>
              <li>Guide students from classroom to career with portfolio building and placement support</li>
              <li>Partner with industry leaders to connect learners with real opportunities</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values">
        <div className="section-header">
          <span className="section-tag">Our Foundation</span>
          <h2>Core <span className="highlight">Values</span></h2>
          <p className="section-subtitle">The principles that guide everything we do</p>
        </div>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className={`value-card ${index === 0 ? 'featured' : ''}`}>
              <div className="value-icon">
                <value.icon />
              </div>
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
              {index === 0 && <div className="featured-badge">
                <FaTrophy className="badge-icon-small" /> Featured
              </div>}
            </div>
          ))}
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="what-we-offer">
        <div className="section-header">
          <span className="section-tag">Our Programs</span>
          <h2>What <span className="highlight">We Offer</span></h2>
          <p className="section-subtitle">Comprehensive programs designed for career success</p>
        </div>
        <div className="offer-grid">
          {offers.map((offer) => (
            <article key={offer.title} className="offer-card">
              <div className="offer-image-wrap">
                <img src={offer.image} alt={offer.title} className="offer-image" />
                <span className="offer-tag">{offer.tag}</span>
              </div>
              <div className="offer-card-body">
                <span className="offer-eyebrow">{offer.eyebrow}</span>
                <h3>{offer.title}</h3>
                <p>{offer.desc}</p>
                <div className="offer-card-footer">
                  <span className="offer-detail">
                    <FaCheckCircle aria-hidden="true" /> {offer.detail}
                  </span>
                  <Link to={offer.path} className="offer-view-more" aria-label={`Explore ${offer.title}`}>
                    Explore <FaArrowRight className="view-more-icon" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose">
        <div className="why-choose-content">
          <div className="why-left">
            <div className="section-header left-align">
              <span className="section-tag">Why Us</span>
              <h2>Why Choose <span className="highlight">Plexus Skills</span></h2>
            </div>
            <p className="why-description">
              We don't just teach — we transform careers. Our programs are designed to give
              you the skills, confidence, and network you need to succeed in today's competitive job market.
            </p>
            <div className="why-points">
              {[
                { title: "Industry-Relevant Curriculum", desc: "Learn what employers are actually looking for" },
                { title: "Hands-On Projects", desc: "Build a portfolio that showcases your real-world skills" },
                { title: "Expert Mentorship", desc: "Learn from industry professionals who have been there" },
                { title: "Placement Support", desc: "Get connected to top companies and job opportunities" }
              ].map((point, index) => (
                <div key={index} className="why-point">
                  <div className="why-check"><FaCheckCircle /></div>
                  <div>
                    <h4>{point.title}</h4>
                    <p>{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="why-right">
            <div className="testimonial-quote">
              <FaQuoteLeft className="quote-icon-big" />
              <p>
                "Plexus Skills gave me the confidence and skills I needed to land my first
                tech job. The hands-on projects and mentorship were invaluable."
              </p>
              <div className="testimonial-author">
                <span className="author-name">Ashish Sharma</span>
                <span className="author-role">Data Analytics Graduate</span>
                <div className="author-rating">
                  <FaStar className="star-icon-small" />
                  <FaStar className="star-icon-small" />
                  <FaStar className="star-icon-small" />
                  <FaStar className="star-icon-small" />
                  <FaStar className="star-icon-small" />
                  <span className="rating-text">5.0</span>
                </div>
              </div>
            </div>
            <div className="trust-badges">
              <div className="trust-badge">
                <FaTrophy className="badge-icon" /> Best EdTech 2023
              </div>
              <div className="trust-badge">
                <FaStar className="badge-icon" /> 4.9/5 Rating
              </div>
              <div className="trust-badge">
                <FaThumbsUp className="badge-icon" /> 95% Placement
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
