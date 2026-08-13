import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCheckCircle, FaGraduationCap, FaTimes } from "react-icons/fa";
import { enquiryAPI } from "../api";
import "./CourseEnquiryPopup.css";

const courses = [
  "Data Analytics with Generative AI",
  "Data Science with Generative AI",
  "Java Full Stack Development with Generative AI",
  "Digital Marketing",
];

const initialForm = { fullName: "", mobileNumber: "", email: "", qualification: "", interestedCourse: "", city: "" };

export default function CourseEnquiryPopup() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (pathname !== "/" || sessionStorage.getItem("plexusCourseEnquiryShown")) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("plexusCourseEnquiryShown", "true");
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleEscape = (event) => event.key === "Escape" && setIsOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await enquiryAPI.submit(form);
      setStatus("success");
      setForm(initialForm);
    } catch (requestError) {
      setStatus("error");
      setError(requestError.response?.data?.message || "We could not send your enquiry. Please try again.");
    }
  };

  const openForm = () => {
    setStatus("idle");
    setError("");
    setIsOpen(true);
  };

  return (
    <>
      {!isOpen && (
        <button className="enquiry-reopen" type="button" onClick={openForm} aria-label="Open course enquiry form">
          <span className="enquiry-reopen-label">Course Enquiry</span>
        </button>
      )}
      {isOpen && (
        <div className="enquiry-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)}>
          <section className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
            <button className="enquiry-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close enquiry form"><FaTimes /></button>
            {status === "success" ? (
              <div className="enquiry-success" role="status">
                <FaCheckCircle />
                <h2>Thank you for your enquiry!</h2>
                <p>Our career counsellor will contact you soon. If you entered an email address, we have also sent a confirmation to you.</p>
                <button type="button" onClick={() => setIsOpen(false)}>Done</button>
              </div>
            ) : (
              <>
                <header className="enquiry-header">
                  <span className="enquiry-icon"><FaGraduationCap /></span>
                  <div><p>Take the first step toward your career</p><h2 id="enquiry-title">Course Enquiry Form <span>(For Admission)</span></h2></div>
                </header>
                <form className="enquiry-form" onSubmit={handleSubmit}>
                  <div className="enquiry-grid">
                    <label>Full Name *<input name="fullName" value={form.fullName} onChange={handleChange} maxLength="100" autoComplete="name" required placeholder="Enter your full name" /></label>
                    <label>Mobile Number *<input type="tel" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} pattern={"[0-9+\\(\\) \\-]{7,20}"} maxLength="20" autoComplete="tel" required placeholder="Enter your mobile number" /></label>
                    <label>Email ID<input type="email" name="email" value={form.email} onChange={handleChange} maxLength="150" autoComplete="email" placeholder="Enter your email address" /></label>
                    <label>Qualification *<input name="qualification" value={form.qualification} onChange={handleChange} maxLength="100" required placeholder="Your highest qualification" /></label>
                    <label>Interested Course *<select name="interestedCourse" value={form.interestedCourse} onChange={handleChange} required><option value="">Select a course</option>{courses.map((course) => <option key={course}>{course}</option>)}</select></label>
                    <label>City *<input name="city" value={form.city} onChange={handleChange} maxLength="100" autoComplete="address-level2" required placeholder="Enter your city" /></label>
                  </div>
                  {error && <p className="enquiry-error" role="alert">{error}</p>}
                  <button className="enquiry-submit" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending..." : "Get Free Career Counselling"}</button>
                  <p className="enquiry-privacy">By submitting, you agree to be contacted by the Plexus Skills admissions team.</p>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
