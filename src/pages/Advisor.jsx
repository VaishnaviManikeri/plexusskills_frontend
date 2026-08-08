import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";
import "./Advisor.css";

const courses = [
  "Data Analytics with Generative AI",
  "Data Science with Generative AI",
  "Java Full Stack Development with Generative AI",
  "Digital Marketing"
];

export default function Advisor() {
  const [searchParams] = useSearchParams();
  const requestedCourse = searchParams.get("course") || "";
  const initialCourse = courses.includes(requestedCourse) ? requestedCourse : "";
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: initialCourse,
    preferredTime: "",
    message: ""
  });

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="advisor-page">
      <section className="advisor-hero">
        <span className="advisor-eyebrow">Free Career Guidance</span>
        <h1>Talk to an <span>Adviser</span></h1>
        <p>Discuss your goals, course options and career path with our admissions team.</p>
      </section>

      <section className="advisor-content">
        <div className="advisor-info">
          <h2>Get guidance that fits your goals</h2>
          <p>Our adviser will help you understand the curriculum, eligibility, learning mode and career opportunities.</p>
          <a href="tel:+917821007170"><FaPhone /> +91 7821007170</a>
          <a href="mailto:Contact@plexusskills.in"><FaEnvelope /> Contact@plexusskills.in</a>
          <p className="advisor-hours">Available Monday to Saturday, 9:00 AM–6:00 PM</p>
        </div>

        <div className="advisor-form-card">
          {submitted ? (
            <div className="advisor-success" role="status">
              <FaCheckCircle />
              <h2>Request received!</h2>
              <p>Thank you, {formData.name}. Our adviser will contact you soon.</p>
              <button type="button" onClick={() => setSubmitted(false)}>Send another request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="advisor-form">
              <h2>Request a callback</h2>
              <div className="advisor-form-grid">
                <label>
                  Full Name
                  <input name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" />
                </label>
                <label>
                  Phone Number
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone number" />
                </label>
                <label>
                  Email Address
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
                </label>
                <label>
                  Preferred Call Time
                  <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required />
                </label>
              </div>
              <label>
                Interested Course
                <select name="course" value={formData.course} onChange={handleChange} required>
                  <option value="">Select a course</option>
                  {courses.map((course) => <option key={course} value={course}>{course}</option>)}
                </select>
              </label>
              <label>
                What would you like help with?
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us about your goals or questions" />
              </label>
              <button type="submit" className="advisor-submit"><FaPaperPlane /> Request Callback</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
