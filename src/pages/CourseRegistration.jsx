import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaGraduationCap, FaPaperPlane } from "react-icons/fa";
import "./CourseRegistration.css";

const courses = [
  "Data Analytics with Generative AI",
  "Data Science with Generative AI",
  "Java Full Stack Development with Generative AI",
  "Digital Marketing"
];

export default function CourseRegistration() {
  const [searchParams] = useSearchParams();
  const selectedCourse = searchParams.get("course") || "";
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: courses.includes(selectedCourse) ? selectedCourse : "",
    education: "",
    mode: "",
    city: "",
    message: ""
  });

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="registration-page">
      <section className="registration-hero">
        <FaGraduationCap className="registration-hero-icon" />
        <span>Start Your Learning Journey</span>
        <h1>Course <strong>Registration</strong></h1>
        <p>Complete the form and our admissions team will contact you with the next steps.</p>
      </section>

      <section className="registration-card">
        {submitted ? (
          <div className="registration-success" role="status">
            <FaCheckCircle />
            <h2>Registration received!</h2>
            <p>Thank you, {formData.name}. Our admissions team will contact you shortly about {formData.course}.</p>
            <button type="button" onClick={() => setSubmitted(false)}>Submit another registration</button>
          </div>
        ) : (
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="registration-heading">
              <h2>Student details</h2>
              <p>Fields marked with * are required.</p>
            </div>

            <div className="registration-grid">
              <label>Full Name *<input name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" /></label>
              <label>Phone Number *<input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone number" /></label>
              <label>Email Address *<input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" /></label>
              <label>City *<input name="city" value={formData.city} onChange={handleChange} required placeholder="Enter your city" /></label>
              <label>
                Interested Course *
                <select name="course" value={formData.course} onChange={handleChange} required>
                  <option value="">Select a course</option>
                  {courses.map((course) => <option key={course} value={course}>{course}</option>)}
                </select>
              </label>
              <label>
                Preferred Learning Mode *
                <select name="mode" value={formData.mode} onChange={handleChange} required>
                  <option value="">Select a mode</option>
                  <option>Online</option>
                  <option>Offline</option>
                  <option>Hybrid</option>
                </select>
              </label>
              <label className="registration-full">Education / Qualification *<input name="education" value={formData.education} onChange={handleChange} required placeholder="Enter your highest qualification" /></label>
              <label className="registration-full">Questions or Comments<textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us anything you would like the admissions team to know" /></label>
            </div>

            <label className="registration-consent">
              <input type="checkbox" required />
              <span>I agree to be contacted by Plexus Skills regarding this registration.</span>
            </label>

            <button type="submit" className="registration-submit"><FaPaperPlane /> Submit Registration</button>
          </form>
        )}
      </section>
    </main>
  );
}
