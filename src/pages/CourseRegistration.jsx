import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaGraduationCap, FaPaperPlane } from "react-icons/fa";
import { enrollmentAPI } from "../api";
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    interestedCourse: courses.includes(selectedCourse) ? selectedCourse : ""
  });

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await enrollmentAPI.submit(formData);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "We could not submit your enrollment. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
            <p>Thank you, {formData.fullName}. Our admissions team will contact you shortly about {formData.interestedCourse}.</p>
            <button type="button" onClick={() => setSubmitted(false)}>Submit another registration</button>
          </div>
        ) : (
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="registration-heading">
              <h2>Details</h2>
              <p>Fields marked with * are required.</p>
            </div>

            <div className="registration-grid">
              <label>Full Name *<input name="fullName" value={formData.fullName} onChange={handleChange} required maxLength="100" autoComplete="name" placeholder="Enter your full name" /></label>
              <label>Mobile Number *<input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required pattern="[0-9+() -]{7,20}" maxLength="20" autoComplete="tel" placeholder="Enter your mobile number" /></label>
              <label className="registration-full">Email ID *<input type="email" name="email" value={formData.email} onChange={handleChange} required maxLength="150" autoComplete="email" placeholder="Enter your email ID" /></label>
              <label className="registration-full">
                Interested Course *
                <select name="interestedCourse" value={formData.interestedCourse} onChange={handleChange} required>
                  <option value="">Select a course</option>
                  {courses.map((course) => <option key={course} value={course}>{course}</option>)}
                </select>
              </label>
            </div>
            {error && <p className="registration-error" role="alert">{error}</p>}
            <button type="submit" className="registration-submit" disabled={submitting}><FaPaperPlane /> {submitting ? "Submitting..." : "Enroll Now"}</button>
          </form>
        )}
      </section>
    </main>
  );
}
