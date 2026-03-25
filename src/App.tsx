import { useEffect, useState } from 'react'
import './App.css'

const projects = [
  {
    title: "Construction Helper",
    repo: "https://github.com/Sreejesh75/Construction_Helper-.git",
    description: [
      "Create & Track projects with real-time budget monitoring.",
      "Categorized Inventory management (Cement, Steel, Bricks).",
      "Secure Digital Document Storage for Blueprints & Permits.",
      "Professional Dashboard for high-level project overview."
    ],
    tags: ["Flutter", "Node.js", "MongoDB", "BLoC", "Dio"],
    screens: ["/first.png", "/second.png", "/third.png", "/fourth.png"],
    is3D: false
  },
  {
    title: "Found You AI",
    repo: "https://github.com/Sreejesh75/fount_you_ai.git",
    description: [
      "Enterprise attendance system using AI Face Detection (Google ML Kit).",
      "Live Analytics Dashboard with fl_chart for weekly attendance trends.",
      "Automated Daily Wage tracking and worker lifecycle management.",
      "Professional reports with real-time analytics and audit logs.",
      "Secure production backend using Node.js, MongoDB, and JWT Auth."
    ],
    tags: ["Flutter", "Node.js", "MongoDB", "ML Kit", "BLoC", "JWT", "Cloudinary", "fl_chart"],
    screens: ["/pic 1.png", "/pic 2.png", "/pic 3.png"],
    is3D: false
  },
  {
    title: "Cooky – Recipe App",
    repo: "https://github.com/Sreejesh75/Recipe_app.git",
    description: [
      "Animated Onboarding flow with premium Lottie animations.",
      "Daily Meal recommendations with interactive zoom effects.",
      "Live integration with TheMealDB REST API for global recipes.",
      "State Management via Provider for reactive UI updates."
    ],
    tags: ["Flutter 3.x", "Provider", "Lottie", "REST API", "State Management"],
    screens: ["/recipe.png", "/recipe.png", "/recipe.png"]
  }
];

function App() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showResume, setShowResume] = useState(false);
  const [cookyScreen, setCookyScreen] = useState(0);


  useEffect(() => {
    // Parallax logic optimized using requestAnimationFrame
    let requestId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (requestId) cancelAnimationFrame(requestId);
      requestId = requestAnimationFrame(() => {
        const heroContent = document.querySelector('.hero-content') as HTMLElement | null;
        if (heroContent) {
          // Reduced intensity of transform to make it smoother
          const x = (e.clientX / window.innerWidth - 0.5) * 15;
          const y = (e.clientY / window.innerHeight - 0.5) * 15;
          heroContent.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Escape Key to close Modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setShowResume(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Scroll Reveal Logic using Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Unobserve after animating once for performance
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, []);

  // Isolate the interval for the modal screens
  useEffect(() => {
    let screenInterval: any;
    if (selectedProject !== null) {
      screenInterval = setInterval(() => {
        setCookyScreen((prev) => prev + 1);
      }, 3000);
    }
    return () => clearInterval(screenInterval);
  }, [selectedProject]);

  return (
    <div className="portfolio">
      {/* Removed heavy custom cursor elements to improve rendering performance */}
      {/* Navigation Bar */}
      <nav className="glass-nav">
        <div className="nav-container">
          <div className="nav-logo">Sreejesh <span className="title-gradient">OS</span></div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
      {/* Modal Overlay */}
      {selectedProject !== null && (
        <div className="phone-overlay" onClick={() => setSelectedProject(null)}>
          <div className="close-overlay">&times;</div>

          {projects[selectedProject].is3D !== false ? (
            <div className="phone-3d-wrapper" onClick={(e) => e.stopPropagation()}>
              <div className="phone-3d">
                <div className="phone-face phone-front">
                  <div className="phone-notch"></div>
                  <div className="phone-screen">
                    <img src={projects[selectedProject].screens[cookyScreen % projects[selectedProject].screens.length]} alt="App Screen" />
                    <div className="phone-reflection"></div>
                  </div>
                </div>
                <div className="phone-face phone-back"></div>
                <div className="phone-side phone-side-left"></div>
                <div className="phone-side phone-side-right"></div>
                <div className="phone-top-bottom phone-top"></div>
                <div className="phone-top-bottom phone-bottom"></div>
              </div>
            </div>
          ) : (
            <div className="simple-image-wrapper" onClick={(e) => e.stopPropagation()}>
              <img
                src={projects[selectedProject].screens[cookyScreen % projects[selectedProject].screens.length]}
                alt="App Screen"
                className="simple-modal-image"
              />
            </div>
          )}

          <div style={{ position: 'absolute', bottom: '50px', textAlign: 'center', width: '100%' }}>
            <h2 className="title-gradient">{projects[selectedProject].title}</h2>
            <p style={{ color: 'var(--primary)', marginTop: '10px', fontFamily: 'monospace', letterSpacing: '2px' }}>
              INITIALIZING PROJECT PREVIEW...
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="floating-elements">
          <div className="float-item item-1"></div>
          <div className="float-item item-2"></div>
          <div className="float-item item-3"></div>
        </div>
        <div
          className="container hero-content"
          style={{
            position: 'relative',
            zIndex: 1,
            transform: 'translate(0px, 0px)',
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="hero-text-section">
            <h1 className="hero-name">Sreejesh <span className="title-gradient">OS</span></h1>
            <p className="hero-tagline">Software Engineer building high-performance mobile and web solutions with Flutter & Node.js.</p>
            <div className="cta-buttons">
              <a href="#projects" className="btn btn-primary">View Projects</a>
              <button onClick={() => setShowResume(true)} className="btn btn-secondary resume-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Resume
              </button>
              <a href="#contact" className="btn btn-secondary">Hire Me</a>
            </div>
          </div>

          <div className="hero-image-section">
            <div className="hero-image-backdrop"></div>
            {/* <img src="/hero_avathar.jpeg" alt="Sreejesh OS" className="hero-shape-image" /> */}
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrows">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="reveal">
        <h2 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '30px' }}>About Me</h2>
        <div className="glass-card">
          <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: '1.8' }}>
            Hai I am Sreejesh OS, software engineer and tech stack Flutter and Nodejs. Flutter Developer with 1 year of self-learning and project development experience in <strong>Dart</strong> and
            <strong> cross-platform</strong> mobile app development and deploying full-stack mobile applications using
            <strong> Flutter, Firebase, and REST APIs</strong>. Proficient in implementing <strong>Clean Architecture</strong> and
            <strong> MVVM</strong> design patterns for scalable, maintainable code bases. Successfully developed and published
            production-ready apps featuring state management with <strong>Provider, Riverpod, GetX, and Bloc</strong>.
            Strong problem-solving skills and a passion for delivering user-focused, high-performance mobile solutions.
          </p>
          <div style={{ marginTop: '20px', borderTop: '1px solid var(--glass-border)', paddingTop: '15px', fontStyle: 'italic', color: 'var(--primary)', fontFamily: 'monospace' }}>
            "Designing logic, building experiences."
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section id="skills" className="reveal">
        <h2 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Technical Arsenal</h2>
        <div className="skills-grid">
          {/* Frontend Card */}
          <div className="glass-card">
            <div className="skill-header">
              <div className="icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              </div>
              <h3>Frontend Development</h3>
            </div>
            <div className="skill-tags-container">
              <span className="skill-tag">Flutter SDK</span>
              <span className="skill-tag">Dart</span>
              <span className="skill-tag">Android/iOS</span>
              <span className="skill-tag">Material Design</span>
              <span className="skill-tag">Clean Architecture</span>
            </div>
          </div>

          {/* Backend Card */}
          <div className="glass-card">
            <div className="skill-header">
              <div className="icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
              </div>
              <h3>Backend & Cloud</h3>
            </div>
            <div className="skill-tags-container">
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Firebase</span>
              <span className="skill-tag">Supabase</span>
              <span className="skill-tag">RESTful APIs</span>
              <span className="skill-tag">SQL/NoSQL</span>
            </div>
          </div>

          {/* State Management Card */}
          <div className="glass-card">
            <div className="skill-header">
              <div className="icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
              </div>
              <h3>State Management</h3>
            </div>
            <div className="skill-tags-container">
              <span className="skill-tag">Bloc/Cubit</span>
              <span className="skill-tag">Riverpod</span>
              <span className="skill-tag">Provider</span>
              <span className="skill-tag">GetX</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Ticker */}
        <div className="tech-ticker">
          <div className="tech-ticker-content">
            {['Flutter', 'Dart', 'Node.js', 'MongoDB', 'Firebase', 'BLoC', 'Riverpod', 'Provider', 'TypeScript', 'React', 'Next.js', 'CI/CD', 'Clean Architecture', 'Git', 'REST API'].map((tech, i) => (
              <span key={i} className="tech-ticker-item">{tech}</span>
            ))}
            {/* Duplicate for seamless loop */}
            {['Flutter', 'Dart', 'Node.js', 'MongoDB', 'Firebase', 'BLoC', 'Riverpod', 'Provider', 'TypeScript', 'React', 'Next.js', 'CI/CD', 'Clean Architecture', 'Git', 'REST API'].map((tech, i) => (
              <span key={i + 100} className="tech-ticker-item">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="reveal">
        <h2 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>What I Offer</h2>
        <div className="skills-grid">
          <div className="glass-card">
            <div className="icon-box" style={{ marginBottom: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
            </div>
            <h3>Mobile App Development</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '15px', lineHeight: '1.7' }}>
              Building high-quality, cross-platform mobile applications with smooth UI/UX and native performance using Flutter.
            </p>
          </div>
          <div className="glass-card">
            <div className="icon-box" style={{ marginBottom: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17L10 11 4 5" /><path d="M12 19h8" /></svg>
            </div>
            <h3>Backend Solutions</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '15px', lineHeight: '1.7' }}>
              Developing scalable server-side systems and RESTful APIs using Node.js and Firebase/Supabase.
            </p>
          </div>
          <div className="glass-card">
            <div className="icon-box" style={{ marginBottom: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <h3>UI/UX Implementation</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '15px', lineHeight: '1.7' }}>
              Transforming complex designs into pixel-perfect, responsive interfaces with a focus on user engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="reveal">
        <h2 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Professional Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">December 2025 - Present</div>
            <div className="glass-card">
              <h3>Flutter Developer</h3>
              <p style={{ color: 'var(--primary)', marginBottom: '10px' }}>EQsoft Business Solutions, Thrissur</p>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '20px' }}>
                <li>Developing billing and business management systems using Flutter and Dart.</li>
                <li>Implementing complex tax calculation (CGST/SGST) and consolidation logic.</li>
                <li>Integrating REST APIs and optimizing production code performance.</li>
              </ul>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">March 2025 - November 2025</div>
            <div className="glass-card">
              <h3>Junior Flutter Developer</h3>
              <p style={{ color: 'var(--primary)', marginBottom: '10px' }}>Skill Park, Kochi</p>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '20px' }}>
                <li>Built reusable UI components following Material Design standards.</li>
                <li>Implemented state management using Provider and BLoC.</li>
                <li>Worked with Firebase Auth, Firestore, and Realtime Database.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="reveal">
        <h2 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Selected Projects</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '50px' }}>Click a project to view the interactive demo or gallery.</p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card" onClick={() => setSelectedProject(index)}>
              <div className="project-content">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    Source Code
                  </a>
                </div>
                <ul className="project-bullet-points">
                  {(project.description as string[]).map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="skill-tags-container">
                {project.tags.map(tag => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
              <div className="project-hint">
                {project.is3D !== false ? 'Click to view 3D interactive demo' : 'Click to view project gallery'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="reveal">
        <h2 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="glass-card">
              <h3>Contact Information</h3>
              <div className="contact-item">
                <span style={{ color: 'var(--primary)' }}>📧</span>
                <span>sreejeshos7510@gmail.com</span>
              </div>
              <div className="contact-item">
                <span style={{ color: 'var(--primary)' }}>📞</span>
                <span>+91 7510716007</span>
              </div>
              <div className="contact-item">
                <span style={{ color: 'var(--primary)' }}>📍</span>
                <span>Thrissur, India</span>
              </div>
              <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
                <a href="https://www.linkedin.com/in/sreejesh-os-71a490259" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '10px 20px' }}>LinkedIn</a>
                <a href="https://github.com/Sreejesh75" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '10px 20px' }}>GitHub</a>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <div className="glass-card">
              <h3>Send a Message</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea rows={5} placeholder="Your Message" required></textarea>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', border: 'none' }}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Modal */}
      {showResume && (
        <div className="resume-overlay" onClick={() => setShowResume(false)}>
          <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
            <div className="resume-header">
              <h2 className="title-gradient">Professional Resume</h2>
              <div className="resume-controls">
                <a href="/Sreejesh_O_S_Flutter(1).pdf" download className="resume-control-btn" title="Download Resume">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </a>
                <button className="resume-control-btn close-btn" onClick={() => setShowResume(false)}>
                  &times;
                </button>
              </div>
            </div>
            <div className="resume-body">
              <iframe 
                src="/Sreejesh_O_S_Flutter(1).pdf#toolbar=0" 
                title="Resume Viewer"
                className="resume-iframe"
              >
                <p>Your browser does not support iframes. <a href="/Sreejesh_O_S_Flutter(1).pdf">Click here to view the PDF.</a></p>
              </iframe>
            </div>
            <div className="resume-footer">
              <span>Press ESC to close</span>
            </div>
          </div>
        </div>
      )}

      <footer style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid var(--glass-border)', marginTop: '50px' }}>
        <p style={{ color: 'var(--text-muted)' }}>&copy; {new Date().getFullYear()} Sreejesh OS. Designed for Excellence.</p>
      </footer>
    </div>
  )
}

export default App
