import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  FaArrowRight, FaBriefcase, FaCalendarAlt, FaCheck, FaClock,
  FaGraduationCap, FaLaptopCode, FaLightbulb, FaQuestionCircle,
  FaTimes, FaUserTie, FaUsers
} from 'react-icons/fa';
import './Webinar.css';
import './WebinarFont.css';

const sessions = [
  {
    title: 'Data Analytics with AI',
    icon: FaLightbulb,
    label: 'Most Popular',
    description: 'Discover how data and AI drive modern decisions, the tools employers value, and the roadmap to a high-growth analytics career.'
  },
  {
    title: 'Java Full Stack Development',
    icon: FaLaptopCode,
    label: 'In Demand',
    description: 'Understand the complete web development ecosystem and learn how front-end, Java, databases, APIs, and cloud skills fit together.'
  },
  {
    title: 'Business Analytics',
    icon: FaBriefcase,
    label: 'Career Focused',
    description: 'Learn how business insight meets data, explore analyst roles across industries, and identify the skills needed to solve real business problems.'
  },
  {
    title: 'Web Development',
    icon: FaGraduationCap,
    label: 'Beginner Friendly',
    description: 'Explore how modern websites are built, which technologies to learn first, and how to turn development skills into rewarding opportunities.'
  }
];

const outcomes = [
  { icon: FaBriefcase, text: 'Understand career opportunities in your chosen domain.' },
  { icon: FaLaptopCode, text: 'Learn the required skills and a practical industry roadmap.' },
  { icon: FaGraduationCap, text: 'Choose the right career path based on your interests.' },
  { icon: FaQuestionCircle, text: 'Get your questions answered in a live expert Q&A.' }
];

const initialForm = {
  session: sessions[0].title,
  fullName: '',
  mobile: '',
  email: '',
  organization: '',
  qualification: '',
  attendeeType: 'Student'
};

export default function Webinar() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(initialForm);

  const openForm = (session = sessions[0].title) => {
    setForm((current) => ({ ...current, session }));
    setSubmitted(false);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  useEffect(() => {
    if (!showForm) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => event.key === 'Escape' && closeForm();
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [showForm]);

  const updateForm = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="webinar-page">
      <section className="webinar-hero">
        <div className="webinar-orb webinar-orb-one" />
        <div className="webinar-orb webinar-orb-two" />
        <div className="webinar-hero-inner">
          <div className="webinar-hero-copy">
            <span className="webinar-eyebrow"><span className="live-dot" /> Live Career Webinar Series</span>
            <h1>Learn from experts.<br /><span>Build your future.</span></h1>
            <p>Explore high-demand careers, understand the skills employers need, and get a clear industry roadmap directly from experienced professionals.</p>
            <div className="webinar-quick-facts">
              <span><FaCalendarAlt /> Every Sunday</span>
              <span><FaClock /> 11:00 AM IST</span>
              <span><FaUsers /> 2 Hours Live</span>
            </div>
            <button type="button" className="webinar-primary-btn" onClick={() => openForm()}>
              Register Now <FaArrowRight />
            </button>
            <small>Free for students • Limited seats every week</small>
          </div>

          <div className="webinar-hero-card">
            <div className="webinar-card-topline">
              <span>Next Live Session</span>
              <strong>FREE</strong>
            </div>
            <div className="webinar-date-tile"><b>SUN</b><strong>11:00</strong><span>AM IST</span></div>
            <h2>Career Clarity with Industry Experts</h2>
            <p>Practical insights. Real career paths. Live answers.</p>
            <div className="webinar-speaker-mini">
              <div className="speaker-avatar"><FaUserTie /></div>
              <div><strong>Industry Expert</strong><span>10+ years of experience</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="webinar-section webinar-sessions">
        <div className="webinar-section-heading">
          <span>Choose Your Domain</span>
          <h2>Upcoming webinar sessions</h2>
          <p>Pick the field you want to explore and reserve your seat for this Sunday.</p>
        </div>
        <div className="webinar-session-grid">
          {sessions.map((session, index) => {
            const Icon = session.icon;
            return (
              <article className="webinar-session-card" key={session.title}>
                <div className="session-card-number">0{index + 1}</div>
                <span className="session-label">{session.label}</span>
                <div className="session-icon"><Icon /></div>
                <h3>{session.title}</h3>
                <p>{session.description}</p>
                <div className="session-meta"><span><FaCalendarAlt /> Sunday</span><span><FaClock /> 2 Hours</span></div>
                <button type="button" className="webinar-card-cta" onClick={() => openForm(session.title)}>Reserve My Seat <FaArrowRight /></button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="webinar-section webinar-value-section">
        <div className="webinar-outcomes">
          <div className="webinar-section-heading left">
            <span>What You Will Gain</span>
            <h2>Walk away with clarity and a career roadmap</h2>
            <p>This is more than an introduction—it is a focused session designed to help you make your next career decision confidently.</p>
          </div>
          <div className="outcome-list">
            {outcomes.map(({ icon: Icon, text }, index) => (
              <div className="outcome-item" key={text}><span>{index + 1}</span><Icon /><p>{text}</p></div>
            ))}
          </div>
        </div>
        <aside className="webinar-expert-card">
          <div className="expert-icon"><FaUserTie /></div>
          <span className="expert-kicker">Meet Your Speaker</span>
          <h2>Learn from someone who has done it</h2>
          <p>Every webinar is led by an industry expert with more than 10 years of hands-on experience in the respective domain.</p>
          <ul>
            <li><FaCheck /> Real-world industry experience</li>
            <li><FaCheck /> Current hiring and skills insights</li>
            <li><FaCheck /> Live, interactive Q&A</li>
          </ul>
        </aside>
      </section>

      <section className="webinar-pricing">
        <div className="pricing-copy">
          <span>Simple Pricing</span>
          <h2>Invest two hours in your future</h2>
          <p>Accessible learning for students and focused career value for professionals.</p>
        </div>
        <div className="pricing-options">
          <div className="price-card featured"><span>Students</span><strong>Free</strong><small>Valid student details required</small></div>
          <div className="price-card"><span>Working Professionals</span><strong>Coming Soon</strong><small>Pricing updated per webinar</small></div>
        </div>
      </section>

      <section className="webinar-final-cta">
        <div><span>Seats fill quickly</span><h2>Ready to find your next career direction?</h2><p>Join us this Sunday at 11:00 AM IST and learn directly from an industry expert.</p></div>
        <button type="button" className="webinar-primary-btn light" onClick={() => openForm()}>Register Now <FaArrowRight /></button>
      </section>

      {showForm && createPortal(
        <div className="webinar-modal-backdrop" onMouseDown={closeForm}>
          <div className="webinar-modal" role="dialog" aria-modal="true" aria-labelledby="webinar-form-title" onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className="webinar-modal-close" onClick={closeForm} aria-label="Close registration form"><FaTimes /></button>
            {submitted ? (
              <div className="webinar-success">
                <div className="success-check"><FaCheck /></div>
                <span>Registration Complete</span>
                <h2 id="webinar-form-title">Your seat is reserved!</h2>
                <p>Thanks, {form.fullName}. We will share the webinar details with you by email and mobile.</p>
                <button type="button" className="webinar-primary-btn" onClick={closeForm}>Done</button>
              </div>
            ) : (
              <div className="webinar-form-layout">
                <div className="webinar-form-intro">
                  <span className="webinar-eyebrow"><span className="live-dot" /> Sunday Live</span>
                  <h2 id="webinar-form-title">Reserve your webinar seat</h2>
                  <p>Complete the form and take the first step towards a clearer career path.</p>
                  <div><FaCalendarAlt /><span><b>Every Sunday</b>11:00 AM IST • 2 Hours</span></div>
                </div>
                <form className="webinar-form" onSubmit={submitForm}>
                  <label className="webinar-form-wide">Webinar Session<select name="session" value={form.session} onChange={updateForm}>{sessions.map((session) => <option key={session.title}>{session.title}</option>)}</select></label>
                  <label>Full Name<input name="fullName" value={form.fullName} onChange={updateForm} required placeholder="Enter your name" autoFocus /></label>
                  <label>Mobile Number<input name="mobile" type="tel" value={form.mobile} onChange={updateForm} required placeholder="Enter mobile number" /></label>
                  <label>Email Address<input name="email" type="email" value={form.email} onChange={updateForm} required placeholder="Enter email address" /></label>
                  <label>College / Company<input name="organization" value={form.organization} onChange={updateForm} required placeholder="Enter organization" /></label>
                  <label>Qualification<input name="qualification" value={form.qualification} onChange={updateForm} required placeholder="Highest qualification" /></label>
                  <label>You are a<select name="attendeeType" value={form.attendeeType} onChange={updateForm}><option>Student</option><option>Working Professional</option></select></label>
                  <button className="webinar-submit-btn webinar-form-wide" type="submit">Confirm Registration <FaArrowRight /></button>
                  <small className="webinar-form-wide form-note">By registering, you agree to receive webinar updates from Plexus Skills.</small>
                </form>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </main>
  );
}
