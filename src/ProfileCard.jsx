import MoonBabu from "./assets/Moon.jpeg";
function ProfileCard() {
  return (
    <div>
      {" "}
      <section id="home" className="section home">
        <div className="container">
          <div className="home-content">
            <div className="home-text">
              <div className="greeting">👋 Assalamulaikum </div>
              <h1 className="hero-title">
                I'm <span className="accent">MD Moon Babu</span>
              </h1>
              <h2 className="hero-subtitle" id="rotating-profession">
                Web Developer
              </h2>
              <p className="hero-desc">
                I'm Moon, a CSE undergraduate at RUET with a strong passion for
                development and problem solving. I'm currently learning the MERN
                stack and actively practicing competitive programming to sharpen
                my algorithmic thinking. I work with C++, Java, Python, and
                modern web technologies, and I enjoy building efficient,
                scalable applications that turn ideas into real-world solutions.
                ⚡🧠
              </p>

              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">1+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">CSE</span>
                  <span className="stat-label">RUET</span>
                </div>
              </div>

              <div className="hero-actions">
                <button className="hire-btn primary">
                  <span>Hire Me</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
                <button className="hire-btn secondary">
                  <i className="fas fa-download"></i>
                  <span>Download CV</span>
                </button>
              </div>

              <div className="social-links">
                <a
                  href="#"
                  aria-label="WhatsApp"
                  className="social-icon whatsapp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="social-icon linkedin"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" aria-label="GitHub" className="social-icon github">
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="social-icon instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            <div className="home-image">
              <div className="image-container">
                <img
                  src={MoonBabu}
                  alt="Profile photo of Asep"
                  className="profile-image"
                />
                <div className="floating-card card-1">
                  <i className="fas fa-code"></i>
                  <span>Clean Code</span>
                </div>
                <div className="floating-card card-2">
                  <i className="fas fa-mobile-alt"></i>
                  <span>Learner</span>
                </div>
                <div className="floating-card card-3">
                  <i className="fas fa-rocket"></i>
                  <span>Problem Solver</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileCard;
