// Navbar.jsx - Professional Design with Top Bar & Social Icons
import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import logo from "/assets/logo/logo1.png";
import { 
  FaPhone, FaEnvelope, FaChevronDown, FaBars, FaTimes,
  FaInstagram, FaFacebookF
} from "react-icons/fa";

const coursesLinks = [
  { label: "Data Analytics with Generative AI", href: "/courses/data-analytics-with-gen-ai" },
  { label: "Data Science with Generative AI", href: "/courses/data-science-with-gen-ai" },
  { label: "Java Full Stack Development with Generative AI", href: "/courses/java-fullstack-with-gen-ai" },
  { label: "Digital Marketing", href: "/courses/digital-marketing" },
];

const discoverLinks = [
  { label: "About Us", href: "/about" },
  { label: "College Tieups", href: "/college-tieups" },
  { label: "Placement", href: "/placement" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
  { label: "Notices", href: "/notice" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const coursesRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (coursesRef.current && !coursesRef.current.contains(event.target)) {
        setCoursesOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDiscoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 992) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navbar-wrapper">
      {/* Top Bar - Blue Background with Contact Info & Social Icons */}
      <div className="topbar">
        <div className="topbar-container">
          <div className="topbar-left">
            <div className="topbar-contact">
              <FaPhone className="topbar-icon" />
              <span className="topbar-text">+91 95295 07256</span>
            </div>
            <div className="topbar-divider"></div>
            <div className="topbar-contact">
              <FaEnvelope className="topbar-icon" />
              <span className="topbar-text">Contact@plexusskills.in</span>
            </div>
          </div>
          <div className="topbar-right">
            {/* Social Media Icons */}
            <div className="topbar-social">
              <a 
                href="https://www.instagram.com/plexusskills/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link instagram"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61582945473975" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link facebook"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </div>
            <div className="topbar-divider"></div>
            <span className="topbar-badge">Enroll Now</span>
            <span className="topbar-badge">Placement Support</span>
          </div>
        </div>
      </div>

      {/* Main Navbar - Full Gray Background */}
      <div className="navbar-main">
        <div className="navbar-container">
          {/* Left side: logo + Courses dropdown */}
          <div className="navbar-left">
            <a href="/" className="navbar-logo">
              <img src={logo} alt="Plexus Skills" />
            </a>

            <div className="navbar-dropdown" ref={coursesRef}>
              <button
                className="navbar-courses-btn"
                onClick={() => setCoursesOpen((prev) => !prev)}
                aria-expanded={coursesOpen}
              >
                Courses
                <FaChevronDown className={`navbar-caret ${coursesOpen ? "is-open" : ""}`} />
              </button>

              <div
                className={`navbar-dropdown-menu navbar-dropdown-menu--left ${
                  coursesOpen ? "is-open" : ""
                }`}
              >
                <div className="dropdown-header">
                  <span className="dropdown-title">Our Programs</span>
                </div>
                {coursesLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="navbar-dropdown-item"
                    onClick={() => {
                      setCoursesOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="item-dot"></span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Hamburger toggle for mobile */}
          <button
            className={`navbar-hamburger ${menuOpen ? "is-active" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Right side: Reviews, Discover dropdown, Register Now */}
          <nav className={`navbar-right ${menuOpen ? "navbar-right--open" : ""}`}>
            <a href="/reviews" className="navbar-link">
              Reviews
            </a>

            <div className="navbar-dropdown" ref={dropdownRef}>
              <button
                className="navbar-dropdown-toggle"
                onClick={() => setDiscoverOpen((prev) => !prev)}
                aria-expanded={discoverOpen}
              >
                Discover
                <FaChevronDown className={`navbar-caret ${discoverOpen ? "is-open" : ""}`} />
              </button>

              <div className={`navbar-dropdown-menu ${discoverOpen ? "is-open" : ""}`}>
                <div className="dropdown-header">
                  <span className="dropdown-title">Explore More</span>
                </div>
                {discoverLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="navbar-dropdown-item"
                    onClick={() => {
                      setDiscoverOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="item-dot"></span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <button className="navbar-register-btn">
              Register Now
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}