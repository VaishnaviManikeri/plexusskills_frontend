// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import React, { useState, useEffect, useRef } from 'react';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import NoticeAdmin from './pages/admin/NoticeAdmin';
import CareerAdmin from './pages/admin/CareerAdmin';
import BlogAdmin from './pages/admin/BlogAdmin';

// Public Pages
import Gallery from './pages/Gallery';
import Notice from './pages/Notice';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./pages/home";
import Reviews from "./pages/Reviews";
import "./App.css";
import DataAnalytics from './pages/DataAnalytics';
import DataScience from './pages/DataScience';
import JavaFullStack from './pages/JavaFullStack';
import DigitalMarketing from './pages/Marketing';
import CollegeTieup from './pages/CollegeTieup';
import Placement from './pages/Placement';
import Contact from './pages/Contact';

// Icons
import { FaWhatsapp, FaTimes, FaMinus, FaRobot, FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import aiIcon from '/assets/images/ai.png';

// Course Data for AI Assistant
const courseData = {
  'data analytics with generative ai': {
    name: 'Data Analytics with Generative AI',
    duration: '5 Months',
    fee: '₹35,000',
    mode: 'Online, Offline, Hybrid',
    eligibility: 'Any Graduate, BE/B.Tech, BCA, B.Sc., B.Com., BBA, MCA, MBA, MSc CS / IT, Working Professionals',
    career: 'Data Analyst, Business Analyst, MIS Executive, Reporting Analyst, Power BI Developer, Tableau Developer, Junior Data Consultant, Python Developer',
    technologies: 'Advanced Excel, SQL Database, Python Programming, Power BI, Tableau, Statistics, Data Visualization, Business Analytics, Prompt Engineering, Generative AI Tools'
  },
  'data science with generative ai': {
    name: 'Data Science with Generative AI',
    duration: '6 Months',
    fee: '₹40,000',
    mode: 'Online, Offline, Hybrid',
    eligibility: 'Any Graduate, BE/B.Tech, BCA, MCA, B.Sc., M.Sc., MBA, MSc CS / IT / Electronics, Working Professionals',
    career: 'Data Scientist, Machine Learning Engineer, AI Engineer, Data Analyst, Research Associate, Business Intelligence Analyst',
    technologies: 'Python, Advanced Statistics, Data Analysis, Data Visualization, SQL, Machine Learning, Deep Learning, Generative AI, Power BI, Tableau'
  },
  'java full stack development with generative ai': {
    name: 'Java Full Stack Development with Generative AI',
    duration: '6 Months',
    fee: '₹35,000',
    mode: 'Online, Offline, Hybrid',
    eligibility: 'BE/B.Tech, BCA, MCA, B.Sc. (CS/IT), Diploma, MSc CS / IT, Working Professionals',
    career: 'Java Developer, Full Stack Developer, Software Engineer, Backend Developer, Web Application Developer',
    technologies: 'Core Java, Advanced Java, JDBC, Spring, Spring Boot, Hibernate, REST APIs, HTML5, CSS3, JavaScript, Bootstrap, React JS, MySQL, Git'
  },
  'digital marketing': {
    name: 'Digital Marketing',
    duration: '3 Months',
    fee: '₹30,000',
    mode: 'Online, Offline, Hybrid',
    eligibility: '12th Pass, Any Graduate, Business Owners, Entrepreneurs, Freelancers, Marketing Professionals, Working Professionals, Students',
    career: 'Digital Marketing Executive, SEO Executive, Social Media Manager, Performance Marketing Executive, PPC Specialist, Content Marketer, Freelancer',
    technologies: 'SEO, Google Analytics, Google Ads, Meta Ads, Social Media Marketing, Content Marketing, Email Marketing, YouTube Marketing, Canva, AI Tools'
  }
};

const collegeTieups = [
  'Jaywant College of Engineering and Polytechnic Kille Machhindragad Karad',
  'Sadguru Gadge Maharaj College Karad',
  'Nanasaheb Mahadik College of Engineering Pethnaka Sangli',
  'New Institute of Technology Kolhapur',
  'Dattajirao Kadam Arts, Science & Commerce College, Ichalkaranji Kolhapur',
  'Rajarshi Chhatrapati Shahu College, Kadamwadi Road, Kolhapur',
  'Kamala College, Rajarampuri, Kolhapur',
  'Dattakala College of Engineering Bhigwan Pune',
  'Green Fingers College of Computer Science Akluj Solapur',
  'Shri Dnyaneshwar College Newasa Ahilyanagar',
  'Hi Tech Institute of Management and Computer Science Bajajnagar Chhatrapati Sambhajinagar',
  'Modern College of Computer Science and Information Technology Samarth Nagar Chhatrapati Sambhajinagar',
  'Shivchhatrapati College Chhatrapati Sambhajinagar',
  'Deogiri College Chhatrapati Sambhajinagar',
  'Abhaysingh Raje Bhosale Institute of Technology Shendre Satara',
  'Daulatrao Aher College of Engineering Karad',
  'Shri Santkrupa College of Engineering Ghogaon Karad',
  'Savitribai Phule Mahila Mahavidyalaya Satara',
  'Shri Muktanand College Gangapur Chhatrapati Sambhajinagar',
  'MIT Arts Commerce and Science College Alandi Pune',
  'Shahada Taluka Educational and Co-Op. Educational Society\'s Ltd. Senior Science College Shahada Nandurbar',
  'Shahada Taluka Educational and Co-Op. Educational Society\'s Ltd. Institute of Management Research and Development Shahada Nandurbar',
  'Shahada Taluka Educational and Co-Op. Educational Society\'s Ltd. Senior Arts Mahila Mahavidyalay Shahada Nandurbar',
  'Vidya Pratishthan\'s Kamalnayan Bajaj Institute of Engineering and Technology Baramati Pune',
  'Sharadchandra Pawar College of Engineering and Technology Someshwar nagar Baramati Pune',
  'H B Arts Commerce and Science College Pishor Kannad Chhatrapati Sambhajinagar'
];

const placementCompanies = [
  'Deloitte', 'TATA CONSULTANCY SERVICES', 'ORACLE', 'amazon', 'MICRO FOCUS',
  'Honeywell', 'mahindra Rise', 'Infosys', 'Tech mahindra', 'DXC technology',
  'accenture', 'IBM', 'amdocs', 'KONE', 'Enzigma', 'Barclays',
  'QUICKENSOL', 'YOUNGMINDS', 'Zensar', 'MIND IT', 'EY'
];

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: '👋 Hi there! I\'m Plexus AI Assistant. I can help you with:\n\n• Course Information\n• College Tie-ups\n• Placement Opportunities\n• Fee Details\n• Career Guidance\n\nWhat would you like to know?' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isChatOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  const getAIResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Check for course-related queries
    for (const [key, course] of Object.entries(courseData)) {
      if (lowerQuery.includes(key) || lowerQuery.includes(course.name.toLowerCase())) {
        return `📚 **${course.name}**\n\n⏱ Duration: ${course.duration}\n💰 Fee: ${course.fee}\n📋 Mode: ${course.mode}\n\n🎓 **Eligibility:**\n${course.eligibility}\n\n💼 **Career Opportunities:**\n${course.career}\n\n🛠 **Technologies:**\n${course.technologies}`;
      }
    }

    // Check for fee-related queries
    if (lowerQuery.includes('fee') || lowerQuery.includes('cost') || lowerQuery.includes('price') || lowerQuery.includes('amount')) {
      let response = '💰 **Course Fees:**\n\n';
      for (const [key, course] of Object.entries(courseData)) {
        response += `• ${course.name}: ${course.fee}\n`;
      }
      return response + '\nFor scholarships or EMI options, please contact our admissions team!';
    }

    // Check for duration-related queries
    if (lowerQuery.includes('duration') || lowerQuery.includes('month') || lowerQuery.includes('long')) {
      let response = '⏱ **Course Durations:**\n\n';
      for (const [key, course] of Object.entries(courseData)) {
        response += `• ${course.name}: ${course.duration}\n`;
      }
      return response;
    }

    // Check for college tie-ups
    if (lowerQuery.includes('college') || lowerQuery.includes('tie-up') || lowerQuery.includes('tieup') || lowerQuery.includes('university')) {
      let response = '🏛 **Our College Tie-ups:**\n\n';
      const displayColleges = collegeTieups.slice(0, 10);
      displayColleges.forEach(college => {
        response += `• ${college}\n`;
      });
      if (collegeTieups.length > 10) {
        response += `\n...and ${collegeTieups.length - 10} more colleges. Contact us for the complete list!`;
      }
      return response;
    }

    // Check for placement/companies
    if (lowerQuery.includes('placement') || lowerQuery.includes('company') || lowerQuery.includes('recruit') || lowerQuery.includes('job')) {
      let response = '🏢 **Top Recruiting Companies:**\n\n';
      placementCompanies.forEach(company => {
        response += `• ${company}\n`;
      });
      response += '\n🎯 We provide 100% placement support with resume building, interview preparation, and communication skills training.';
      return response;
    }

    // Check for specific course offerings
    if (lowerQuery.includes('course') || lowerQuery.includes('program') || lowerQuery.includes('offer')) {
      let response = '📚 **Our Courses:**\n\n';
      for (const [key, course] of Object.entries(courseData)) {
        response += `• ${course.name} (${course.duration}) - ${course.fee}\n`;
      }
      response += '\nAll courses include:\n✅ 100% Placement Support\n✅ Industry Expert Trainers\n✅ Hands-on Projects\n✅ Communication Skills Training\n✅ Resume & Interview Preparation';
      return response;
    }

    // Check for contact info
    if (lowerQuery.includes('contact') || lowerQuery.includes('phone') || lowerQuery.includes('email') || lowerQuery.includes('address')) {
      return `📞 **Contact Information:**\n\n📧 Email: Contact@plexusskills.in\n📱 Phone: +91 7821007170\n📍 Address: F10, 4th Floor, Shri Sai Vandan Apartment, Paud Phata, Karve Road, Pune, Maharashtra 411038\n\n🕐 Working Hours: Mon-Sat 9:00 AM - 6:00 PM`;
    }

    // Check for placement support
    if (lowerQuery.includes('support') || lowerQuery.includes('help')) {
      return `🎯 **Our Support Facilities:**\n\n✅ 100% Placement Support\n✅ Communication Skills Development Course\n✅ Course Completion & Internship Certificate\n✅ Industry Relevant Curriculum\n✅ Industry Expert Trainers\n✅ Practical Hands-on Training\n✅ LinkedIn & GitHub Profile Optimization\n✅ Resume Building & Interview Preparation`;
    }

    // Check for about company
    if (lowerQuery.includes('about') || lowerQuery.includes('company') || lowerQuery.includes('plexus') || lowerQuery.includes('who')) {
      return `🏢 **About Plexus Skills Pvt. Ltd.**\n\nWe are a forward-thinking education company founded in 2022, headquartered in Pune, Maharashtra. We empower students with industry-ready skills in:\n\n• Data Analytics with Generative AI\n• Data Science with Generative AI\n• Java Full Stack Development with Generative AI\n• Digital Marketing\n\nOur mission is to bridge the gap between education and employability through expert-led training and comprehensive career support.`;
    }

    // Default response
    return `I'm here to help you with information about Plexus Skills! You can ask me about:\n\n📚 Courses & Programs\n💰 Fee Structure\n⏱ Course Durations\n🏛 College Tie-ups\n🏢 Placement Companies\n📞 Contact Information\n🎓 Career Opportunities\n\nWhat would you like to know more about?`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />

          <Route path="/courses/data-analytics-with-gen-ai" element={<DataAnalytics />} />
          <Route path="/courses/data-science-with-gen-ai" element={<DataScience />} />
          <Route path="/courses/java-fullstack-with-gen-ai" element={<JavaFullStack />} />
          <Route path="/courses/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/college-tieups" element={<CollegeTieup />} />
          <Route path="/placement" element={<Placement />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/gallery" element={
            <ProtectedRoute>
              <GalleryAdmin />
            </ProtectedRoute>
          } />
          <Route path="/admin/notices" element={
            <ProtectedRoute>
              <NoticeAdmin />
            </ProtectedRoute>
          } />
          <Route path="/admin/careers" element={
            <ProtectedRoute>
              <CareerAdmin />
            </ProtectedRoute>
          } />
          <Route path="/admin/blogs" element={
            <ProtectedRoute>
              <BlogAdmin />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer />

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/917821007170?text=Hi!%20I%20want%20to%20know%20more%20about%20Plexus%20Skills%20courses."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="whatsapp-icon" />
        <span className="whatsapp-tooltip">Chat on WhatsApp</span>
      </a>

      {/* AI Assistant Floating Button */}
      <div className="ai-assistant-container">
        {!isChatOpen && (
          <button 
            className="ai-float-btn"
            onClick={() => setIsChatOpen(true)}
            aria-label="Open AI Assistant"
          >
            <img src={aiIcon} alt="AI Assistant" className="ai-float-icon" />
            <span className="ai-pulse"></span>
          </button>
        )}

        {isChatOpen && (
          <div className={`ai-chat-window ${isMinimized ? 'minimized' : ''}`}>
            {/* Chat Header */}
            <div className="ai-chat-header">
              <div className="ai-header-left">
                <img src={aiIcon} alt="AI Assistant" className="ai-header-icon" />
                <div>
                  <h3>Plexus AI</h3>
                  <span className="ai-status">Online</span>
                </div>
              </div>
              <div className="ai-header-actions">
                <button 
                  className="ai-minimize-btn"
                  onClick={() => setIsMinimized(!isMinimized)}
                  aria-label="Minimize"
                >
                  <FaMinus />
                </button>
                <button 
                  className="ai-close-btn"
                  onClick={() => setIsChatOpen(false)}
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Messages */}
                <div className="ai-chat-messages">
                  {messages.map((msg, index) => (
                    <div key={index} className={`ai-message ${msg.type}`}>
                      {msg.type === 'bot' && (
                        <img src={aiIcon} alt="AI" className="ai-msg-avatar" />
                      )}
                      <div className="ai-msg-bubble">
                        {msg.text.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < msg.text.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="ai-message bot">
                      <img src={aiIcon} alt="AI" className="ai-msg-avatar" />
                      <div className="ai-msg-bubble typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Quick Suggestions */}
                <div className="ai-quick-suggestions">
                  <button onClick={() => {
                    setInputMessage('Tell me about courses');
                    setTimeout(() => handleSendMessage(), 100);
                  }}>
                    📚 Courses
                  </button>
                  <button onClick={() => {
                    setInputMessage('Tell me about placement');
                    setTimeout(() => handleSendMessage(), 100);
                  }}>
                    💼 Placement
                  </button>
                  <button onClick={() => {
                    setInputMessage('Tell me about college tie-ups');
                    setTimeout(() => handleSendMessage(), 100);
                  }}>
                    🏛 Tie-ups
                  </button>
                  <button onClick={() => {
                    setInputMessage('Tell me about fees');
                    setTimeout(() => handleSendMessage(), 100);
                  }}>
                    💰 Fees
                  </button>
                </div>

                {/* Chat Input */}
                <div className="ai-chat-input">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="ai-input"
                  />
                  <button 
                    className="ai-send-btn"
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;