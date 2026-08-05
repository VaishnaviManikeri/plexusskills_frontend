import React from "react";
import "./Footer.css";
import logo from "/assets/logo/logo1.png";

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
  { label: "Contact Us", href: "/contact" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Reviews", href: "/reviews" },
  { label: "Register Now", href: "/register" },
  // { label: "Privacy Policy", href: "/privacy-policy" },
  // { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Main footer body */}
      <div className="footer__body">
        <div className="footer__container">
          {/* Brand + contact column */}
          <div className="footer__brand-col">
            <a href="/" className="footer__logo">
              <img src={logo} alt="Logo" />
            </a>

            <div className="footer__contact">
              <p className="footer__contact-item">
                <span className="footer__contact-label">Phone:</span>
                <a href="tel:+917821007170">+91 7821007170</a>
                <span className="footer__contact-sep">/</span>
                <a href="tel:+919529507256">+91 9529507256</a>
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-label">Email:</span>
                <a href="mailto:contact@plexusskills.in">contact@plexusskills.in</a>
              </p>
              <p className="footer__contact-item footer__contact-address">
                <span className="footer__contact-label">Address:</span>
                F10, 04th Floor, Shri Sai Vandan Apartment, Paud Phata, Karve
                Road, Erandvane, Pune, Maharashtra 411038
              </p>
            </div>

            <div className="footer__socials">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="footer__social-icon"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 21v-7.5H16l.5-3h-3V8.4c0-.87.24-1.46 1.5-1.46H16.5V4.34C16.17 4.3 15.03 4.2 13.71 4.2c-2.76 0-4.65 1.68-4.65 4.77v2.53H6.5v3h2.56V21h4.44z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="footer__social-icon"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47-.66.26-1.22.6-1.77 1.16-.56.55-.9 1.11-1.16 1.77-.25.64-.42 1.37-.47 2.43C2 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43.26.66.6 1.22 1.16 1.77.55.56 1.11.9 1.77 1.16.64.25 1.37.42 2.43.47C8.94 22 9.28 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47.66-.26 1.22-.6 1.77-1.16.56-.55.9-1.11 1.16-1.77.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.16-1.77 4.9 4.9 0 0 0-1.77-1.16c-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.72 2 12 2zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.2 1.85.34.47.18.8.4 1.15.75.35.35.57.68.75 1.15.14.36.3.87.34 1.85.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.2 1.5-.34 1.85-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.36.14-.87.3-1.85.34-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.2-1.85-.34a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.14-.36-.3-.87-.34-1.85C3.81 14.99 3.8 14.67 3.8 12s.01-2.99.06-4.04c.04-.98.2-1.5.34-1.85.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.36-.14.87-.3 1.85-.34C9.01 3.81 9.33 3.8 12 3.8z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="footer__social-icon"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 5.9c-.66.3-1.36.5-2.1.6.75-.45 1.33-1.16 1.6-2.01-.7.42-1.48.72-2.31.89A3.63 3.63 0 0 0 12.9 8.7c0 .28.03.56.09.83-3.02-.15-5.7-1.6-7.5-3.8-.31.55-.49 1.18-.49 1.85 0 1.28.65 2.41 1.64 3.07-.6-.02-1.17-.19-1.67-.46v.05c0 1.79 1.27 3.28 2.96 3.62-.31.08-.63.13-.97.13-.24 0-.47-.02-.69-.07.47 1.47 1.83 2.54 3.44 2.57a7.3 7.3 0 0 1-4.52 1.56c-.29 0-.58-.02-.86-.05A10.3 10.3 0 0 0 9.58 20c6.7 0 10.37-5.55 10.37-10.37 0-.16 0-.31-.01-.47.71-.51 1.33-1.15 1.82-1.88-.65.29-1.35.48-2.08.57z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Courses column */}
          <div className="footer__link-col">
            <h4 className="footer__col-title">Courses</h4>
            <ul className="footer__link-list">
              {coursesLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover column */}
          <div className="footer__link-col">
            <h4 className="footer__col-title">Discover</h4>
            <ul className="footer__link-list">
              {discoverLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links column */}
          <div className="footer__link-col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__link-list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p>
          &copy; {year} <span>Tijja Media Works</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}