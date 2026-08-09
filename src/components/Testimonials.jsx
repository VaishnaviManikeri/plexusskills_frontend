// Testimonials.jsx - Small Cards with Navy Background
import { useState, useEffect } from "react";
import "./Testimonials.css";
import { 
  FaQuoteLeft, 
  FaChevronLeft, 
  FaChevronRight,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaGoogle,
  FaUserGraduate,
  FaGraduationCap
} from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Deepak Patil",
      program: "Postgraduate Financial Analysis Program",
      text: "I appreciated the mock interviews and resume-building sessions — they made a huge difference when I started applying for analytics roles.",
      rating: 4.8,
      source: "Google Review"
    },
    {
      id: 2,
      name: "Ashish Kumar",
      program: "Postgraduate Financial Analysis Program",
      text: "Learning full stack development via Plexus Skills helped me land an internship — the hands-on training was exactly what I needed.",
      rating: 4.9,
      source: "Google Review"
    },
    {
      id: 3,
      name: "Harshada Sukase",
      program: "Postgraduate Financial Analysis Program",
      text: "Plexus Skills Data Analytics program gave me real exposure to Excel, Power BI, and data viz — now I feel confident tackling business problems using data.",
      rating: 4.7,
      source: "Google Review"
    },
    {
      id: 4,
      name: "Mohit Sharma",
      program: "Data Analytics Program",
      text: "The mentorship at Plexus Skills was very practical. Through project-based learning, I built a portfolio that helped me in interviews.",
      rating: 4.8,
      source: "Google Review"
    },
    {
      id: 5,
      name: "Priya Deshmukh",
      program: "Data Science Program",
      text: "The Data Science program at Plexus Skills gave me a strong foundation in machine learning and AI. I was able to crack interviews at top firms.",
      rating: 4.9,
      source: "Google Review"
    },
    {
      id: 6,
      name: "Rahul Patil",
      program: "Java Full Stack Program",
      text: "The Java Full Stack program was comprehensive and industry-aligned. The live projects and mentorship helped me build confidence.",
      rating: 4.6,
      source: "Google Review"
    },
    {
      id: 7,
      name: "Sneha Joshi",
      program: "Digital Marketing Program",
      text: "The Digital Marketing program was incredibly practical. I learned SEO, SEM, and social media marketing through real campaigns.",
      rating: 4.7,
      source: "Google Review"
    },
    {
      id: 8,
      name: "Vikram Singh",
      program: "Data Analytics Program",
      text: "The hands-on projects and industry-relevant curriculum prepared me well for my role at Amazon. Highly recommended!",
      rating: 4.8,
      source: "Google Review"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);

  // Handle responsive visible cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 580) {
        setVisibleCards(1);
      } else if (window.innerWidth < 868) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - visibleCards ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length, visibleCards]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - visibleCards : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - visibleCards ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star-filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-empty" />);
      }
    }
    return stars;
  };

  // Get visible testimonials
  const getVisibleTestimonials = () => {
    if (testimonials.length <= visibleCards) {
      return testimonials;
    }
    
    const endIndex = currentIndex + visibleCards;
    if (endIndex <= testimonials.length) {
      return testimonials.slice(currentIndex, endIndex);
    } else {
      const firstPart = testimonials.slice(currentIndex);
      const secondPart = testimonials.slice(0, endIndex - testimonials.length);
      return [...firstPart, ...secondPart];
    }
  };

  const visibleTestimonials = getVisibleTestimonials();
  const totalSlides = Math.ceil(testimonials.length / visibleCards);

  return (
    <section className="testimonials-section">
      {/* Section Background Decoration */}
      <div className="testimonials-bg-decoration">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      {/* Section Header */}
      <div className="testimonials-header">
        <div className="container">
          <div className="testimonials-header-content">
            <span className="testimonials-badge">
              <FaGoogle /> 4.8/5 Average Rating
            </span>
            <h2 className="testimonials-title">
              What Our <span className="highlight">Alumni</span> Say
            </h2>
            <p className="testimonials-subtitle">
              Real stories from graduates who transformed their careers with Plexus Skills
            </p>
          </div>
        </div>
      </div>

      {/* Slider Container */}
      <div className="testimonials-slider-wrapper">
        <div className="container">
          <div className="testimonials-slider-container">
            <button className="slider-arrow prev-arrow" onClick={goToPrevious} aria-label="Previous testimonial">
              <FaChevronLeft />
            </button>

            <div className="testimonials-slider-track">
              {visibleTestimonials.map((testimonial) => (
                <div className="testimonial-card" key={testimonial.id}>
                  {/* Card Header */}
                  <div className="testimonial-card-header">
                    <div className="testimonial-user">
                      <div className="user-avatar">
                        <FaUserGraduate />
                      </div>
                      <div className="user-info">
                        <h4 className="user-name">{testimonial.name}</h4>
                        <span className="user-program">
                          <FaGraduationCap className="program-icon" />
                          {testimonial.program}
                        </span>
                      </div>
                    </div>
                    <div className="testimonial-rating">
                      <div className="stars-wrapper">
                        {renderStars(testimonial.rating)}
                      </div>
                      <span className="rating-value">{testimonial.rating}</span>
                    </div>
                  </div>

                  {/* Card Body - Quote */}
                  <div className="testimonial-card-body">
                    <FaQuoteLeft className="quote-icon" />
                    <p className="testimonial-text">"{testimonial.text}"</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="slider-arrow next-arrow" onClick={goToNext} aria-label="Next testimonial">
              <FaChevronRight />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="testimonials-dots">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`dot ${index === Math.floor(currentIndex / visibleCards) ? 'active' : ''}`}
                onClick={() => goToSlide(index * visibleCards)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
