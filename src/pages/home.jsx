// Home.jsx - Updated CTA Section with Single Button
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "./home.css";
import Testimonials from "../components/Testimonials";
import { 
  Search, 
  BarChart2, 
  Database, 
  Code, 
  Megaphone,
  ChevronRight,
  GraduationCap,
  MapPin,
  Users,
  Award,
  BookOpen,
  Building,
  Laptop,
  UserCheck,
  Star,
  Briefcase,
  TrendingUp,
  Zap,
  Clock,
  ArrowRight,
  X,
  Send,
  CheckCircle,
  ShieldCheck,
  Target,
  Rocket
} from "lucide-react";
import logo from "/assets/logo/logo1.png";

// ============ COURSES DATA ============
const courses = [
  {
    id: 1,
    title: "Data Analytics with Generative AI",
    icon: <BarChart2 size={32} />,
    description: "Become a job-ready Data Analyst by learning the most in-demand analytics tools and AI technologies. This course combines data visualization, business intelligence, Python programming, SQL and Generative AI to analyze data, create dashboards and make data-driven business decisions.",
    duration: "5 Months",
    level: "Beginner to Advanced",
    students: "500+",
    href: "/courses/data-analytics-with-gen-ai"
  },
  {
    id: 2,
    title: "Data Science with Generative AI",
    icon: <Database size={32} />,
    description: "Master Data Science and Artificial Intelligence with industry-oriented training. Learn how to collect, process, analyze, and build machine learning models using Python while leveraging Generative AI to increase productivity and automate workflows.",
    duration: "5 Months",
    level: "Intermediate to Advanced",
    students: "400+",
    href: "/courses/data-science-with-gen-ai"
  },
  {
    id: 3,
    title: "Java Full Stack Development with Generative AI",
    icon: <Code size={32} />,
    description: "Become a Full Stack Java Developer by learning front-end, back-end, databases, cloud deployment, and Generative AI tools. Build real-world web applications and prepare for software development careers.",
    duration: "5 Months",
    level: "Beginner to Advanced",
    students: "350+",
    href: "/courses/java-fullstack-with-gen-ai"
  },
  {
    id: 4,
    title: "Digital Marketing",
    icon: <Megaphone size={32} />,
    description: "Build a successful career in Digital Marketing by mastering SEO, Social Media Marketing, Paid Advertising, Content Marketing, Analytics, and AI-powered marketing tools. Gain hands-on experience through live campaigns and real-world projects.",
    duration: "4 Months",
    level: "Beginner to Advanced",
    students: "300+",
    href: "/courses/digital-marketing"
  }
];

const searchDestinations = [
  { label: "Courses", path: "/", sectionId: "courses", keywords: "programs training" },
  { label: "Data Analytics with Generative AI", path: "/courses/data-analytics-with-gen-ai", keywords: "data analyst analytics course" },
  { label: "Data Science with Generative AI", path: "/courses/data-science-with-gen-ai", keywords: "data scientist science course" },
  { label: "Java Full Stack Development with Generative AI", path: "/courses/java-fullstack-with-gen-ai", keywords: "java fullstack developer development course" },
  { label: "Digital Marketing", path: "/courses/digital-marketing", keywords: "seo social media marketing course" },
  { label: "Hiring Partners", path: "/", sectionId: "hiring-partners", keywords: "placement companies recruiters jobs" },
  { label: "Why Choose Us", path: "/", sectionId: "why-choose-us", keywords: "benefits expert trainers curriculum" },
  { label: "College Tie-Ups", path: "/college-tieups", keywords: "colleges partners university" },
  { label: "Start Your Career", path: "/", sectionId: "career-cta", keywords: "transform career enroll enquiry" },
  { label: "About Us", path: "/about", keywords: "about plexus company" },
  { label: "Placements", path: "/placement", keywords: "jobs companies recruiters hiring" },
  { label: "Reviews", path: "/reviews", keywords: "testimonials student feedback" },
  { label: "Gallery", path: "/gallery", keywords: "photos images events" },
  { label: "Notices", path: "/notice", keywords: "announcements updates" },
  { label: "Careers", path: "/careers", keywords: "vacancies jobs openings" },
  { label: "Blogs", path: "/blogs", keywords: "articles news insights" },
  { label: "Contact Us", path: "/contact", keywords: "phone email address enquiry" },
  { label: "Talk to an Adviser", path: "/advisor", keywords: "advisor counsellor counseling callback guidance" },
  { label: "Course Registration", path: "/enroll", keywords: "enroll admission apply register" }
];

// ============ WHY CHOOSE US DATA ============
const whyChooseUs = [
  {
    id: 1,
    icon: <UserCheck size={28} />,
    title: "Expert Trainers",
    description: "Plexus Skills brings you industry-experienced trainers who have real-world exposure in Data Analytics, Data Science, Full Stack Development, and Digital Marketing, ensuring practical, job-ready learning."
  },
  {
    id: 2,
    icon: <BookOpen size={28} />,
    title: "Updated Curriculum",
    description: "Our course material is regularly updated with the latest tools, frameworks, and Generative AI technologies, keeping it aligned with current industry standards and hiring trends."
  },
  {
    id: 3,
    icon: <Laptop size={28} />,
    title: "Live Online & Offline Classes",
    description: "Learn the way that suits you best. Plexus Skills offers flexible live interactive sessions, both online and offline, along with recorded content for anytime access."
  },
  {
    id: 4,
    icon: <Award size={28} />,
    title: "Placement Assistance",
    description: "With Tie-Ups across 150+ colleges and a dedicated placement cell, we support students with resume building, interview preparation, and direct industry connections for career success."
  }
];

// ============ PLACEMENT COMPANIES DATA ============
const placementCompanies = [
  { id: 1, name: "Deloitte", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1kU6hZN-zfX93xw1UqbOzCy8Kkp0SlbBvewWVPxraw&s=10" },
  { id: 2, name: "TCS", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXg3wLtvRLwAq_LUoPgbsu9NBo5o-hS2OrFfIhazAWKg&s=10" },
  { id: 3, name: "Oracle", logo: "https://mma.prnewswire.com/media/467598/Oracle_Logo.jpg?p=facebook" },
  { id: 4, name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/Amazon_2024.svg" },
  { id: 5, name: "Micro Focus", logo: "https://rttswebproperties.s3.amazonaws.com/content-images/partner-logos/querysurge/micro-focus.png" },
  { id: 6, name: "Honeywell", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8QGOk078F4oIgbhXUCWdpayXhwtVzpjSIZzgtjvcsL8xLi5sLc4c-og&s=10" },
  { id: 7, name: "Mahindra", logo: "https://logos-world.net/wp-content/uploads/2022/12/Mahindra-Mahindra-Logo-2012.png" },
  { id: 8, name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/500px-Infosys_logo.svg.png?_=20100302211036" },
  { id: 9, name: "Tech Mahindra", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Tech_Mahindra_New_Logo.svg/3840px-Tech_Mahindra_New_Logo.svg.png" },
  { id: 10, name: "DXC Technology", logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/DXC_Logo_2021_Purple_Black.png" },
  { id: 11, name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/3840px-Accenture.svg.png" },
  { id: 12, name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1280px-IBM_logo.svg.png" },
  { id: 13, name: "Amdocs", logo: "https://agilebrandguide.com/wp-content/uploads/2024/12/amdocs-logo-0678CD2F09-seeklogo.com_.png" },
  { id: 14, name: "KONE", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_imOOPcCIOYw4cBF6VdwOu_9mEa8BHNWHmvp_Fg8gVHIXGQ_2cOsOJj86&s=10" },
  { id: 15, name: "Enzigma", logo: "https://www.enzigma.com/wp-content/uploads/2024/08/image-2-2.png" },
  { id: 16, name: "Barclays", logo: "https://icon2.cleanpng.com/20180908/vbh/kisspng-logo-barclays-bank-barclays-wealth-investment-ma-barclays-logo-svg-vector-amp-png-transparent-v-1713942676305.webp" },
  { id: 17, name: "Quickensol", logo: "https://www.quickensol.com/images/logo.png" },
  { id: 18, name: "Youngminds", logo: "https://ymtsindia.com/assets/youngminds-logo-new.jpg" },
  { id: 19, name: "Zensar", logo: "https://www.apax.com/media/1790/_0098_zensar-technologies.png?rmode=max&width=800&height=400&saturation=0" },
  { id: 20, name: "MIND IT", logo: "https://minditworks.com/wordpress/wp-content/uploads/2022/12/logo-black-new.png" },
  { id: 21, name: "EY", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/EY_logo_2019.svg/1280px-EY_logo_2019.svg.png" }
];

const placementMidpoint = Math.ceil(placementCompanies.length / 2);
const placementRowOne = placementCompanies.slice(0, placementMidpoint);
const placementRowTwo = placementCompanies.slice(placementMidpoint);

// ============ COLLEGES DATA ============
const colleges = [
  {
    id: 1,
    name: "Jaywant College of Engineering and Polytechnic",
    location: "Kille Machhindragad, Karad",
    image: "/assets/images/college1.png",
    info: "Established with a vision to provide quality technical education, Jaywant College offers engineering and polytechnic courses with state-of-the-art infrastructure and experienced faculty.",
    courses: "Engineering, Polytechnic, Computer Science",
    established: "2008"
  },
  {
    id: 2,
    name: "Sadguru Gadge Maharaj College",
    location: "Karad",
    image: "/assets/images/college2.png",
    info: "A premier educational institution offering diverse courses in arts, science, and commerce with a focus on holistic development and academic excellence.",
    courses: "Arts, Science, Commerce",
    established: "1995"
  },
  {
    id: 3,
    name: "Nanasaheb Mahadik College of Engineering",
    location: "Pethnaka, Sangli",
    image: "/assets/images/college3.png",
    info: "Known for its engineering excellence, this college provides cutting-edge technical education with modern laboratories and industry-oriented curriculum.",
    courses: "Engineering, Technology",
    established: "2010"
  },
  {
    id: 4,
    name: "New Institute of Technology",
    location: "Kolhapur",
    image: "/assets/images/college4.png",
    info: "A leading technical institute offering innovative programs in engineering and technology with strong industry connections and placement opportunities.",
    courses: "Engineering, Technology, Computer Applications",
    established: "2012"
  },
  {
    id: 5,
    name: "Dattajirao Kadam Arts, Science & Commerce College",
    location: "Ichalkaranji, Kolhapur",
    image: "/assets/images/college5.png",
    info: "A multidisciplinary college offering quality education in arts, science, and commerce with a focus on research and innovation.",
    courses: "Arts, Science, Commerce",
    established: "2003"
  },
  {
    id: 6,
    name: "Rajarshi Chhatrapati Shahu College",
    location: "Kadamwadi Road, Kolhapur",
    image: "/assets/images/college6.png",
    info: "Named after the great reformer, this college is committed to providing accessible education and empowering students from all backgrounds.",
    courses: "Arts, Commerce, Science",
    established: "1998"
  },
  {
    id: 7,
    name: "Kamala College",
    location: "Rajarampuri, Kolhapur",
    image: "/assets/images/college7.png",
    info: "A prestigious institution known for its academic rigor and comprehensive programs in arts, science, and commerce.",
    courses: "Arts, Science, Commerce",
    established: "2000"
  },
  {
    id: 8,
    name: "Dattakala College of Engineering",
    location: "Bhigwan, Pune",
    image: "/assets/images/college8.png",
    info: "A premier engineering college offering world-class education with modern facilities and experienced faculty in various engineering disciplines.",
    courses: "Engineering, Technology",
    established: "2015"
  },
  {
    id: 9,
    name: "Green Fingers College of Computer Science",
    location: "Akluj, Solapur",
    image: "/assets/images/college9.png",
    info: "Specializing in computer science and IT education, this college prepares students for careers in the rapidly evolving technology sector.",
    courses: "Computer Science, IT",
    established: "2011"
  },
  {
    id: 10,
    name: "Shri Dnyaneshwar College",
    location: "Newasa, Ahilyanagar",
    image: "/assets/images/college10.png",
    info: "A college dedicated to providing quality education in arts, science, and commerce with a focus on cultural and spiritual values.",
    courses: "Arts, Science, Commerce",
    established: "2005"
  },
  {
    id: 11,
    name: "Hi Tech Institute of Management and Computer Science",
    location: "Bajajnagar, Chhatrapati Sambhajinagar",
    image: "/assets/images/college11.png",
    info: "A leading institute offering specialized programs in management and computer science with industry-relevant curriculum.",
    courses: "Management, Computer Science",
    established: "2013"
  },
  {
    id: 12,
    name: "Modern College of Computer Science and Information Technology",
    location: "Samarth Nagar, Chhatrapati Sambhajinagar",
    image: "/assets/images/college12.png",
    info: "A modern institution focused on providing cutting-edge education in computer science and information technology.",
    courses: "Computer Science, IT",
    established: "2014"
  },
  {
    id: 13,
    name: "Shivchhatrapati College",
    location: "Chhatrapati Sambhajinagar",
    image: "/assets/images/college13.png",
    info: "A college committed to academic excellence and holistic development of students through comprehensive programs.",
    courses: "Arts, Science, Commerce",
    established: "2006"
  },
  {
    id: 14,
    name: "Deogiri College",
    location: "Chhatrapati Sambhajinagar",
    image: "/assets/images/college14.png",
    info: "One of the oldest and most prestigious colleges in the region, offering diverse programs with a focus on research and innovation.",
    courses: "Arts, Science, Commerce, Management",
    established: "1985"
  },
  {
    id: 15,
    name: "Abhaysingh Raje Bhosale Institute of Technology",
    location: "Shendre, Satara",
    image: "/assets/images/college15.png",
    info: "A technology-focused institute offering engineering and technical programs with strong industry partnerships.",
    courses: "Engineering, Technology",
    established: "2016"
  },
  {
    id: 16,
    name: "Daulatrao Aher College of Engineering",
    location: "Karad",
    image: "/assets/images/college16.png",
    info: "A renowned engineering college known for its academic excellence and strong placement record in various industries.",
    courses: "Engineering, Technology",
    established: "2017"
  },
  {
    id: 17,
    name: "Shri Santkrupa College of Engineering",
    location: "Ghogaon, Karad",
    image: "/assets/images/college17.png",
    info: "A college dedicated to providing quality engineering education with modern infrastructure and experienced faculty.",
    courses: "Engineering, Technology",
    established: "2018"
  },
  {
    id: 18,
    name: "Savitribai Phule Mahila Mahavidyalaya",
    location: "Satara",
    image: "/assets/images/college18.png",
    info: "A women's college committed to empowering women through quality education in arts, science, and commerce.",
    courses: "Arts, Science, Commerce",
    established: "2001"
  },
  {
    id: 19,
    name: "Shri Muktanand College",
    location: "Gangapur, Chhatrapati Sambhajinagar",
    image: "/assets/images/college19.png",
    info: "A college offering comprehensive programs in arts, science, and commerce with a focus on rural development.",
    courses: "Arts, Science, Commerce",
    established: "2007"
  },
  {
    id: 20,
    name: "MIT Arts Commerce and Science College",
    location: "Alandi, Pune",
    image: "/assets/images/college20.png",
    info: "Part of the prestigious MIT group, this college offers quality education in arts, commerce, and science with modern facilities.",
    courses: "Arts, Commerce, Science",
    established: "2010"
  },
  {
    id: 21,
    name: "Shahada Taluka Educational and Co-Op. Educational Society's Ltd. Senior Science College",
    location: "Shahada, Nandurbar",
    image: "/assets/images/college21.png",
    info: "A senior science college offering comprehensive science education with a focus on research and practical learning.",
    courses: "Science",
    established: "2002"
  },
  {
    id: 22,
    name: "Shahada Taluka Educational and Co-Op. Educational Society's Ltd. Institute of Management Research and Development",
    location: "Shahada, Nandurbar",
    image: "/assets/images/college22.png",
    info: "A premier management institute offering MBA and other management programs with industry-oriented curriculum.",
    courses: "Management, Research",
    established: "2012"
  },
  {
    id: 23,
    name: "Shahada Taluka Educational and Co-Op. Educational Society's Ltd. Senior Arts Mahila Mahavidyalay",
    location: "Shahada, Nandurbar",
    image: "/assets/images/college23.png",
    info: "A women's arts college dedicated to empowering women through quality education in humanities and social sciences.",
    courses: "Arts",
    established: "2004"
  },
  {
    id: 24,
    name: "Vidya Pratishthan's Kamalnayan Bajaj Institute of Engineering and Technology",
    location: "Baramati, Pune",
    image: "/assets/images/college24.png",
    info: "A prestigious engineering institute with excellent infrastructure and strong industry connections for placements.",
    courses: "Engineering, Technology",
    established: "2006"
  },
  {
    id: 25,
    name: "Sharadchandra Pawar College of Engineering and Technology",
    location: "Someshwar Nagar, Baramati, Pune",
    image: "/assets/images/college25.png",
    info: "A technology-focused college offering modern engineering programs with hands-on training and industry exposure.",
    courses: "Engineering, Technology",
    established: "2014"
  },
  {
    id: 26,
    name: "H B Arts Commerce and Science College",
    location: "Pishor, Kannad, Chhatrapati Sambhajinagar",
    image: "/assets/images/college26.png",
    info: "A multidisciplinary college offering quality education in arts, commerce, and science with a focus on rural development.",
    courses: "Arts, Commerce, Science",
    established: "2009"
  }
];

// Keep Deogiri College first in every college listing.
colleges.sort((a, b) => Number(b.name === "Deogiri College") - Number(a.name === "Deogiri College"));

export default function Home() {
  const navigate = useNavigate();
  const [selectedCollege, setSelectedCollege] = useState(colleges[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [collegeSearchTerm, setCollegeSearchTerm] = useState("");

  // ============ POPUP STATE ============
  const [showPopup, setShowPopup] = useState(false);
  const [popupFormData, setPopupFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Show popup on page load
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('plexusPopupShown');
    if (!hasSeenPopup) {
      setTimeout(() => {
        setShowPopup(true);
      }, 1500);
    }
  }, []);

  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (!sectionId) return;

    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const handlePopupChange = (e) => {
    setPopupFormData({ ...popupFormData, [e.target.name]: e.target.value });
  };

  const handlePopupSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    sessionStorage.setItem('plexusPopupShown', 'true');
    setTimeout(() => {
      setShowPopup(false);
      setIsSubmitted(false);
      setPopupFormData({ name: "", email: "", phone: "", course: "", message: "" });
    }, 2000);
  };

  const closePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('plexusPopupShown', 'true');
  };

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(collegeSearchTerm.toLowerCase()) ||
    college.location.toLowerCase().includes(collegeSearchTerm.toLowerCase())
  );

  const matchingDestinations = searchDestinations.filter((destination) => {
    const query = searchTerm.trim().toLowerCase();
    return query && `${destination.label} ${destination.keywords}`.toLowerCase().includes(query);
  });

  // ============ HANDLE COURSE NAVIGATION ============
  const handleCourseNavigation = (href) => {
    navigate(href);
  };

  const openDestination = (destination) => {
    setSearchTerm("");

    if (destination.path === "/" && destination.sectionId) {
      document.getElementById(destination.sectionId)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(destination.path);
  };

  const handleExploreNow = () => {
    openDestination(matchingDestinations[0] || searchDestinations[0]);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleExploreNow();
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={16} />
            <span>Empowering Since 2022</span>
          </div>
          <h1 className="hero-title">
            Build Your Future with <br />
            <span className="highlight">Industry-Ready</span> Skills
          </h1>
          <p className="hero-subtitle">
            Join our comprehensive programs in Data Analytics, Data Science, 
            Java Full Stack Development and Digital Marketing powered by Generative AI.
          </p>
          <div className="hero-search-container">
            <div className="hero-search">
              <Search className="search-icon" size={20} />
              <input
                type="search"
                placeholder="Search any page or section..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                aria-label="Search website pages and sections"
                aria-controls="hero-search-results"
              />
              <button type="button" className="search-btn" onClick={handleExploreNow}>
                Explore Now
              </button>
            </div>
            {searchTerm.trim() && (
              <div id="hero-search-results" className="hero-search-results" role="listbox">
                {matchingDestinations.length > 0 ? (
                  matchingDestinations.slice(0, 6).map((destination) => (
                    <button
                      type="button"
                      className="hero-search-result"
                      key={`${destination.path}-${destination.sectionId || destination.label}`}
                      onClick={() => openDestination(destination)}
                      role="option"
                    >
                      <Search size={16} />
                      <span>{destination.label}</span>
                    </button>
                  ))
                ) : (
                  <p className="hero-search-empty">No matching page or section found.</p>
                )}
              </div>
            )}
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <Users size={24} className="stat-icon" />
              <div>
                <h3>500+</h3>
                <p>Students Placed</p>
              </div>
            </div>
            <div className="stat-item">
              <Award size={24} className="stat-icon" />
              <div>
                <h3>150+</h3>
                <p>Partner Colleges</p>
              </div>
            </div>
            <div className="stat-item">
              <BookOpen size={24} className="stat-icon" />
              <div>
                <h3>6+</h3>
                <p>Programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="courses-section">
        <div className="container">
          <div className="section-header courses-header">
            <h2 className="section-title">Our <span className="highlight">Courses</span></h2>
            <p className="section-subtitle">
              Industry-oriented programs designed with Generative AI to make you job-ready
            </p>
          </div>
          <div className="courses-grid-one-line">
            {courses.map((course) => (
              <div key={course.id} className="course-card-one-line">
                <div className="course-icon-wrapper">
                  <div className="course-icon">{course.icon}</div>
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span className="meta-tag">
                    <Clock size={14} /> {course.duration}
                  </span>
                  <span className="meta-tag">
                    <TrendingUp size={14} /> {course.level}
                  </span>
                  <span className="meta-tag">
                    <Users size={14} /> {course.students}
                  </span>
                </div>
                <button
                  className="course-btn"
                  onClick={() => handleCourseNavigation(course.href)}
                >
                  Learn More <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Section */}
      <section id="hiring-partners" className="placement-section">
        <div className="container">
          <div className="section-header">
            <span className="placement-tag">
              <Briefcase size={16} /> INDUSTRY EXPOSURE
            </span>
            <h2 className="section-title">
              Our <span className="highlight">Hiring Partners</span>
            </h2>
            <p className="section-subtitle">
              Leading companies that trust Plexus Skills graduates
            </p>
          </div>

          <div className="placement-slider-wrapper">
            <Swiper
              className="placement-swiper"
              modules={[Autoplay, FreeMode]}
              loop
              freeMode
              grabCursor
              slidesPerView="auto"
              spaceBetween={24}
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
            >
              {placementRowOne.map((company) => (
                <SwiperSlide key={company.id}>
                  <div className="placement-logo-item">
                      <img 
                        src={company.logo} 
                        alt={company.name}
                        className="company-logo"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/images/placeholder-logo.png';
                        }}
                      />
                      <span className="company-name">{company.name}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              className="placement-swiper placement-swiper-reverse"
              modules={[Autoplay, FreeMode]}
              loop
              freeMode
              grabCursor
              slidesPerView="auto"
              spaceBetween={24}
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                reverseDirection: true
              }}
            >
              {placementRowTwo.map((company) => (
                <SwiperSlide key={company.id}>
                  <div className="placement-logo-item">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="company-logo"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/images/placeholder-logo.png';
                      }}
                    />
                    <span className="company-name">{company.name}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="why-choose-section">
        <div className="container">
          <div className="why-choose-container">
            <div className="why-choose-left">
              <span className="why-choose-tag">
                <Award size={16} /> WHY CHOOSE US
              </span>
              <h2 className="why-choose-title">
                We Are Expert &amp; <span className="highlight">Do Our Best</span> For Your Goal
              </h2>
              <p className="why-choose-desc">
                Plexus Skills Pvt. Ltd. delivers quality, industry-driven training through
                experienced trainers, modern learning tools, and a student-friendly approach.
                With strong placement support, updated curriculum, and Generative AI integrated
                courses, we focus on the complete career development of every student.
              </p>

              <div className="why-choose-grid">
                {whyChooseUs.map((item) => (
                  <div key={item.id} className="why-choose-card">
                    <div className="why-choose-icon">{item.icon}</div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="why-choose-right">
              <div className="why-choose-image-wrap">
                <img 
                  src="/assets/images/1.png" 
                  alt="Plexus Skills Pvt. Ltd. Students"
                  className="why-choose-image"
                />
                <div className="floating-badge badge-1">
                  <Star size={18} />
                  <span>4.9 Rating</span>
                </div>
                <div className="floating-badge badge-2">
                  <Briefcase size={18} />
                  <span>500+ Placed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* College Tie-Ups Section */}
      <section id="college-tieups" className="college-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our <span className="highlight">College Tie-Ups</span></h2>
            <p className="section-subtitle">
              Partnered with leading educational institutions across Maharashtra
            </p>
          </div>
          
          <div className="college-container">
            <div className="college-sidebar">
              <div className="sidebar-header">
                <Building size={20} />
                <h4>Partner Colleges</h4>
                <span className="college-count">150+</span>
              </div>
              <div className="sidebar-search">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search colleges..."
                  value={collegeSearchTerm}
                  onChange={(e) => setCollegeSearchTerm(e.target.value)}
                />
              </div>
              <div className="college-list">
                {filteredColleges.map((college) => (
                  <div
                    key={college.id}
                    className={`college-item ${selectedCollege.id === college.id ? 'active' : ''}`}
                    onClick={() => setSelectedCollege(college)}
                  >
                    <div className="college-item-content">
                      <h5>{college.name}</h5>
                      <p className="college-location">
                        <MapPin size={14} /> {college.location}
                      </p>
                    </div>
                    <ChevronRight size={16} className="chevron-icon" />
                  </div>
                ))}
              </div>
            </div>

            <div className="college-details">
              {selectedCollege && (
                <div className="college-detail-card">
                  <div className="detail-header">
                    <div className="detail-image">
                      <img 
                        src={selectedCollege.image} 
                        alt={selectedCollege.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/images/placeholder.png';
                        }}
                      />
                    </div>
                    <div className="detail-badge">
                      <GraduationCap size={20} />
                      <span>Partner Institute</span>
                    </div>
                  </div>
                  
                  <div className="detail-content">
                    <h3>{selectedCollege.name}</h3>
                    <p className="detail-location">
                      <MapPin size={18} /> {selectedCollege.location}
                    </p>
                    
                    <div className="detail-info-grid">
                      <div className="detail-info-item">
                        <span className="info-label">Established</span>
                        <span className="info-value">{selectedCollege.established}</span>
                      </div>
                      <div className="detail-info-item">
                        <span className="info-label">Courses Offered</span>
                        <span className="info-value">{selectedCollege.courses}</span>
                      </div>
                    </div>
                    
                    <div className="detail-description">
                      <h4>About the College</h4>
                      <p>{selectedCollege.info}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Testimonials />

      {/* ============ CTA SECTION - SINGLE BUTTON ============ */}
      <section id="career-cta" className="cta-section">
        <div className="container">
          <div className="cta-wrapper">
            <div className="cta-content">
              <div className="cta-tag">
                <Rocket size={16} />
                <span>Launch Your Career</span>
              </div>
              
              <h2 className="cta-title">
                Ready to <span className="highlight">Transform</span> Your Career?
              </h2>
              
              <p className="cta-description">
                Join Plexus Skills and gain industry-ready skills with Generative AI integrated courses. 
                Get 100% placement support, expert mentorship, and hands-on training.
              </p>

             <Link to="/contact">
  <button className="cta-btn-primary">
    Enroll Now <ArrowRight size={18} />
  </button>
</Link>

              <div className="cta-features">
                <div className="cta-feature">
                  <ShieldCheck size={18} />
                  <span>100% Placement Support</span>
                </div>
                <div className="cta-feature">
                  <Target size={18} />
                  <span>Industry Expert Trainers</span>
                </div>
                <div className="cta-feature">
                  <Users size={18} />
                  <span>500+ Students Placed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INQUIRY POPUP ============ */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>
              <X size={24} />
            </button>
            
            {!isSubmitted ? (
              <>
                <div className="popup-header">
                  <div className="popup-logo-wrapper">
                    <img src={logo} alt="Plexus Skills" className="popup-logo" />
                  </div>
                  <h2>Get in Touch</h2>
                  <p>Fill in your details and we'll get back to you within 24 hours</p>
                </div>

                <form className="popup-form" onSubmit={handlePopupSubmit}>
                  <div className="popup-form-group">
                    <label htmlFor="popup-name">Full Name</label>
                    <input
                      type="text"
                      id="popup-name"
                      name="name"
                      placeholder="Enter your full name"
                      value={popupFormData.name}
                      onChange={handlePopupChange}
                      autoFocus
                      required
                    />
                  </div>

                  <div className="popup-form-group">
                    <label htmlFor="popup-email">Email Address</label>
                    <input
                      type="email"
                      id="popup-email"
                      name="email"
                      placeholder="Enter your email"
                      value={popupFormData.email}
                      onChange={handlePopupChange}
                      required
                    />
                  </div>

                  <div className="popup-form-group">
                    <label htmlFor="popup-phone">Phone Number</label>
                    <input
                      type="tel"
                      id="popup-phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={popupFormData.phone}
                      onChange={handlePopupChange}
                      required
                    />
                  </div>

                  <div className="popup-form-group">
                    <label htmlFor="popup-course">Interested Course</label>
                    <select
                      id="popup-course"
                      name="course"
                      value={popupFormData.course}
                      onChange={handlePopupChange}
                      required
                    >
                      <option value="">Select a course</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.title}>
                          {course.title}
                        </option>
                      ))}
                      <option value="Other">Other (Specify in message)</option>
                    </select>
                  </div>

                  <div className="popup-form-group">
                    <label htmlFor="popup-message">Message</label>
                    <textarea
                      id="popup-message"
                      name="message"
                      rows="3"
                      placeholder="Write your message here..."
                      value={popupFormData.message}
                      onChange={handlePopupChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="popup-submit-btn">
                    <Send size={18} /> Send Inquiry
                  </button>
                </form>
              </>
            ) : (
              <div className="popup-success">
                <CheckCircle size={56} className="success-icon" />
                <h2>Thank You!</h2>
                <p>Your inquiry has been sent successfully. Our team will get back to you within 24 hours.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
