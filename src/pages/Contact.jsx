// Contact.jsx
import { useState } from "react";
import "./Contact.css";
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaFacebookF, FaInstagram,
  FaPaperPlane, FaCheckCircle, FaUser, FaComment, FaBuilding
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus("success");
    setTimeout(() => {
      setFormStatus(null);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: ["Contact@plexusskills.in"],
      link: "mailto:Contact@plexusskills.in"
    },
    {
      icon: FaPhone,
      title: "Call Us",
      details: ["+91 7821007170"],
      link: "tel:+917821007170"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: [
        "F10, 4th Floor, Shri Sai Vandan Apartment,",
        "Paud Phata, Karve Road",
        "Pune, Maharashtra 411038"
      ]
    },
    {
      icon: FaClock,
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: Closed"]
    }
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: "https://www.facebook.com/profile.php?id=61582945473975", label: "Facebook" },
    { icon: FaInstagram, url: "https://www.instagram.com/plexusskills/", label: "Instagram" },
  ];

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get In <span className="highlight">Touch</span></h1>
          <p>We'd love to hear from you. Reach out to us for any inquiries about our programs, admissions, or partnerships.</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="contact-info-grid">
          {contactInfo.map((item, index) => (
            <div key={index} className="contact-info-card">
              <div className="info-icon">
                <item.icon />
              </div>
              <h3>{item.title}</h3>
              {item.details.map((detail, i) => (
                <p key={i}>{detail}</p>
              ))}
              {item.link && (
                <a href={item.link} className="info-link">
                  Contact Now <FaPaperPlane className="link-icon" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          {/* Left - Contact Form */}
          <div className="contact-form-wrapper">
            <div className="form-header">
              <span className="form-tag">Send Message</span>
              <h2>Let's <span className="highlight">Connect</span></h2>
              <p>Fill in the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser className="label-icon" /> Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="label-icon" /> Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    <FaPhone className="label-icon" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">
                    <FaBuilding className="label-icon" /> Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Enter subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">
                  <FaComment className="label-icon" /> Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                {formStatus === "success" ? (
                  <>
                    <FaCheckCircle className="btn-icon" /> Message Sent!
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="btn-icon" /> Send Message
                  </>
                )}
              </button>

              {formStatus === "success" && (
                <div className="success-message">
                  <FaCheckCircle /> Your message has been sent successfully. We'll get back to you soon!
                </div>
              )}
            </form>
          </div>

          {/* Right - Map & Social */}
          <div className="contact-right-wrapper">
            <div className="contact-map-card">
              <div className="contact-map-header">
                <div className="contact-map-heading">
                  <span className="contact-map-icon"><FaMapMarkerAlt /></span>
                  <div>
                    <h3>Our Location</h3>
                    <p>Paud Phata, Karve Road, Pune</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Plexus+Skills+Pvt+Ltd+Paud+Phata+Karve+Road+Pune+Maharashtra+411038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-map-link"
                >
                  Get Directions <FaPaperPlane />
                </a>
              </div>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps?q=Plexus+Skills+Pvt+Ltd,+Paud+Phata,+Karve+Road,+Pune,+Maharashtra+411038&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map showing Plexus Skills, Paud Phata, Pune"
                  className="map-iframe"
                ></iframe>
              </div>
            </div>

            <div className="social-connect">
              <h3>Connect With Us</h3>
              <p>Follow us on social media for updates and announcements</p>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon ${social.label.toLowerCase()}`}
                    aria-label={social.label}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
