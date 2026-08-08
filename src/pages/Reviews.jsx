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
      name: "Yousouf Sk",
      program: "Data Analytics Program",
      rating: 5,
      date: "2026",
      text: "Excellent learning environment with supportive mentors. The trainers explain concepts in a simple and practical way. I appreciate the personal attention given to every student.",
      platform: "Google",
      platformIcon: <FaGoogle />,
      company: "Plexus Skills Pvt. Ltd.",
      featured: true
    },
    {
      id: 2,
      name: "Sunny Prajapathi",
      program: "Java full stack development course",
      rating: 5,
      date: "2026",
      text: "I completed the Java full stack developer course recently and had a positive experience. The trainer covered core Java, advanced Java, spring boot, and database concept with practical examples. The coding practice sessions helped me improve my confidence in programming. Thanks to Plexus skills private limited for the support throughout the course.",
      platform: "Trustpilot",
      platformIcon: <SiTrustpilot />,
      company: "Tech Solutions Inc.",
      featured: false
    },
    {
      id: 3,
      name: "Sriram Chavan",
      program: "Data Analytics training",
      rating: 5,
      date: "2025",
      text: "The best part about the Data Analytics training was the hands-on practice and regular assignments. The faculty was supportive and cleared all doubts patiently. The placement guidance sessions also helped me understand how to prepare for interviews. I would definitely recommend this to learn something practical to anyone who’s looking for Code or Development Courses",
      platform: "LinkedIn",
      platformIcon: <FaLinkedin />,
      company: "Digital Innovations",
      featured: false
    },
    {
      id: 4,
      name: "Shubham",
      program: "Data Analytics Program",
      rating: 5,
      date: "2025",
      text: "I joined the Data Analytics course with very little technical knowledge, but the trainers explained everything in a simple and practical way. The sessions on Excel, SQL, and Power BI were especially helpful. I also liked that we worked on real datasets instead of only theory. Overall, it was a good learning experience at Plexus Skills..",
      platform: "Google",
      platformIcon: <FaGoogle />,
      company: "Analytics Hub",
      featured: true
    },
    {
      id: 5,
      name: "Prathamesh Andhare",
      program: "JAVA developer with AI workshop",
      rating: 5,
      date: "2026",
      text: "Attended the JAVA developer with AI workshop here they have great tutors and trainers and have a vast core curriculum of workshop",
      platform: "Google",
      platformIcon: <FaGoogle />,
      company: "Meridian Capital",
      featured: false
    },
    {
      id: 6,
      name: "Nitin Jadhav",
      program: "Data Analytics course",
      rating: 5,
      date: "2026",
      text: "I recently finished a Data Analysis course conducted by Pushpraj Singh Rathore at Plexus Skills Private Limited, and it was a great learning experience for me. The course introduced several important tools used in the data industry, including SQL, Excel, Python, and Power BI.At the start, some of the topics felt a bit difficult, but the clear explanations and practical examples made everything easier to understand as the course progressed. It helped me build a better understanding of how to work with data and strengthened my analytical thinking.Completing this course has added valuable skills to my profile and helped me see new opportunities in the data field. I would definitely recommend it to anyone interested in learning data analysis.",
      platform: "LinkedIn",
      platformIcon: <FaLinkedin />,
      company: "Nimbus Software",
      featured: true
    },
    {
      id: 7,
      name: "Ayat Siddiqui",
      program: "Data Analyst course",
      rating: 4,
      date: "2025",
      text: "The Data Analyst course at Plexus Skills is very helpful for beginners. The teaching style of Pushpraj Singh Rathore Sir is simple and friendly.The best part is the Mock Interview sessions which give a real environment. Along with technical skills, Pushpraj Sir also gives good life lessons and motivation. Highly recommended..Thank you Sir",
      platform: "Trustpilot",
      platformIcon: <SiTrustpilot />,
      company: "Northstar Analytics",
      featured: false
    },
    {
      id: 8,
      name: "Saurav.",
      program: "Data Analytics training",
      rating: 5,
      date: "2025",
      text: "The best part about the Data Analytics training was the hands-on practice and regular assignments. The faculty was supportive and cleared all doubts patiently. The placement guidance sessions also helped me understand how to prepare for interviews.",
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
