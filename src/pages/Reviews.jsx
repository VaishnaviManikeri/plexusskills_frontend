// Reviews.jsx - Editorial Alumni Reviews
import React from "react";
import "./Reviews.css";
import {
  FaStar, FaGoogle, FaLinkedin, FaUserGraduate, FaBriefcase,
  FaAward, FaThumbsUp, FaCalendarAlt, FaCheckCircle,
  FaQuoteLeft, FaArrowRight
} from "react-icons/fa";
import { SiTrustpilot } from "react-icons/si";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Ashish",
      program: "Data Analytics Program",
      rating: 5,
      date: "2026",
      text: "I appreciated the mock interviews and resume-building sessions — they made a huge difference when I started applying for analytics roles.",
      platform: "Google",
      platformIcon: <FaGoogle />,
      company: "Plexus Skills Pvt. Ltd.",
      featured: true
    },
    {
      id: 2,
      name: "Priya Patel",
      program: "Data Science with AI",
      rating: 5,
      date: "2026",
      text: "The curriculum is comprehensive and up-to-date with industry requirements. The mentors are highly knowledgeable and always ready to help.",
      platform: "Trustpilot",
      platformIcon: <SiTrustpilot />,
      company: "Tech Solutions Inc.",
      featured: false
    },
    {
      id: 3,
      name: "Rahul Desai",
      program: "Full Stack Development",
      rating: 5,
      date: "2025",
      text: "Excellent learning experience with real-world projects. The placement support team was amazing and helped me prepare for interviews.",
      platform: "LinkedIn",
      platformIcon: <FaLinkedin />,
      company: "Digital Innovations",
      featured: false
    },
    {
      id: 4,
      name: "Sneha Reddy",
      program: "Data Analytics Program",
      rating: 5,
      date: "2025",
      text: "The mock interviews and resume reviews were game-changers for my job search. I felt confident and well-prepared for every interview.",
      platform: "Google",
      platformIcon: <FaGoogle />,
      company: "Analytics Hub",
      featured: true
    },
    {
      id: 5,
      name: "Karan Mehta",
      program: "Investment Banking & Capital Markets",
      rating: 5,
      date: "2026",
      text: "Placeholder review — replace with real text. The trading simulations and case studies gave me hands-on exposure I couldn't get anywhere else.",
      platform: "Google",
      platformIcon: <FaGoogle />,
      company: "Meridian Capital",
      featured: false
    },
    {
      id: 6,
      name: "Aditi Sharma",
      program: "Full Stack Development",
      rating: 5,
      date: "2026",
      text: "Placeholder review — replace with real text. Building end-to-end projects during the program made technical interviews feel much less intimidating.",
      platform: "LinkedIn",
      platformIcon: <FaLinkedin />,
      company: "Nimbus Software",
      featured: true
    },
    {
      id: 7,
      name: "Vikram Nair",
      program: "Data Science with AI",
      rating: 4,
      date: "2025",
      text: "Placeholder review — replace with real text. Strong technical depth overall; would have liked a few more live doubt-clearing sessions.",
      platform: "Trustpilot",
      platformIcon: <SiTrustpilot />,
      company: "Northstar Analytics",
      featured: false
    },
    {
      id: 8,
      name: "Meera Iyer",
      program: "Digital Marketing Program",
      rating: 5,
      date: "2025",
      text: "Placeholder review — replace with real text. The placement cell followed up consistently and helped me land a role within weeks of finishing.",
      platform: "Google",
      platformIcon: <FaGoogle />,
      company: "Brightwave Media",
      featured: false
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`star ${i < rating ? "filled" : ""}`}
      />
    ));
  };

  return (
    <div className="reviews-container">
      {/* Header Section */}
      <div className="reviews-header-section">
        <div className="hero-glow"></div>
        <FaQuoteLeft className="hero-quote-mark" />
        <div className="reviews-header-content">
          <span className="reviews-badge">Testimonials</span>
          <h1>What Our <span className="highlight">Alumni Say</span></h1>
          <p className="reviews-description">
            Real stories from professionals who transformed their careers with Plexus Skills.
          </p>
        </div>
      </div>

      {/* Main Reviews Section - Editorial Grid */}
      <section className="reviews-main">
        <div className="reviews-container-inner">
          <div className="alumni-grid">
            {reviews.map((review) => (
              <article
                key={review.id}
                className={`alumni-card ${review.featured ? "featured" : ""}`}
              >
                <div className="alumni-card-top">
                  {review.featured && (
                    <span className="available-badge">Featured Review</span>
                  )}
                  <FaQuoteLeft className="card-quote-mark" />
                </div>

                <p className="alumni-quote">{review.text}</p>

                <div className="alumni-path">
                  <span className="path-node">{review.program}</span>
                  <FaArrowRight className="path-arrow" />
                  <span className="path-node path-node-end">{review.company}</span>
                </div>

                <div className="alumni-card-footer">
                  <div className="alumni-identity">
                    <h3>{review.name}</h3>
                    <div className="alumni-meta">
                      <span className="meta-item">
                        <FaCalendarAlt />
                        {review.date}
                      </span>
                      <span className="meta-item verified">
                        <FaCheckCircle />
                        Verified
                      </span>
                    </div>
                  </div>
                  <div className="alumni-rating-block">
                    <div className="stars">{renderStars(review.rating)}</div>
                    <div className="platform-badge">
                      <span className="platform-icon">{review.platformIcon}</span>
                      <span>{review.platform}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="trust-content">
          <span className="trust-eyebrow">Why It Works</span>
          <h2>Trusted by <span className="highlight">Industry Leaders</span></h2>
          <div className="trust-grid">
            <div className="trust-card">
              <span className="trust-icon-ring"><FaUserGraduate className="trust-icon" /></span>
              <h3>Industry-Validated</h3>
              <p>Curriculum designed with input from top industry experts</p>
            </div>
            <div className="trust-card">
              <span className="trust-icon-ring"><FaBriefcase className="trust-icon" /></span>
              <h3>Career-Focused</h3>
              <p>Practical skills that employers are actively seeking</p>
            </div>
            <div className="trust-card">
              <span className="trust-icon-ring"><FaAward className="trust-icon" /></span>
              <h3>Quality Assured</h3>
              <p>High-quality training with proven results</p>
            </div>
            <div className="trust-card">
              <span className="trust-icon-ring"><FaThumbsUp className="trust-icon" /></span>
              <h3>Student Approved</h3>
              <p>Rated highly by our alumni community</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;