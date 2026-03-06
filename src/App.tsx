import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const [cookyScreen, setCookyScreen] = useState(0);
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
      screens: ["/construction.png", "/construction.png", "/construction.png"]
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
    },
    {
      title: "UPI QR Scanner & Gen",
      repo: "https://github.com/Sreejesh75/qr_scanner_app.git",
      description: [
        "High-performance QR scanning with instant data extraction.",
        "Custom UPI QR code generation for personalized payments.",
        "Separation of concerns using Clean Architecture principles.",
        "Local data persistence using Shared Preferences."
      ],
      tags: ["Flutter", "Riverpod", "Clean Architecture", "Mobile Scanner", "Shared Prefs"],
      screens: ["/qr.png", "/qr.png", "/qr.png"]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
      // Delay cursor for trailing effect
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .project-card, .glass-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Scroll Reveal Logic
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));

    // Screen cycling for Cooky App
    const screenInterval = setInterval(() => {
      setCookyScreen((prev) => (prev + 1) % 3);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      reveals.forEach(reveal => observer.unobserve(reveal));
      clearInterval(screenInterval);
    };
  }, []);

  return (
    <div className="portfolio">

      {/* Glowing Diamond */}
      <div className="diamond-container">
        <div className="glowing-diamond"></div>
        <div className="glowing-diamond-shadow"></div>
      </div>

      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>
      <div
        className="cursor-dot"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>

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
      {/* 3D Phone Modal Overlay */}
      {selectedProject !== null && (
        <div className="phone-overlay" onClick={() => setSelectedProject(null)}>
          <div className="close-overlay">&times;</div>
          <div className="phone-3d-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="phone-3d">
              <div className="phone-face phone-front">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <img src={projects[selectedProject].screens[cookyScreen]} alt="App Screen" />
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
          className="container"
          style={{
            position: 'relative',
            zIndex: 1,
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <h1 className="hero-name">Sreejesh <span className="title-gradient">OS</span></h1>
          <p className="hero-tagline">Software Engineer building high-performance mobile and web solutions with Flutter & Node.js.</p>
          <div className="cta-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Hire Me</a>
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
        <p style={{ color: 'var(--text-muted)', marginBottom: '50px' }}>Touch a project to see the 3D demo.</p>

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
              <div className="project-hint">Click to view 3D interactive demo</div>
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

      <footer style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid var(--glass-border)', marginTop: '50px' }}>
        <p style={{ color: 'var(--text-muted)' }}>&copy; {new Date().getFullYear()} Sreejesh OS. Designed for Excellence.</p>
      </footer>
    </div>
  )
}

export default App
