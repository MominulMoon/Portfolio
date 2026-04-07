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
      <section id="about" className="section about">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <div className="image-wrapper">
                <img src={MoonBabu} alt="About Asep" className="about-img" />
                <div className="experience-badge">
                  <span className="badge-number">1+</span>
                  <span className="badge-text">
                    Years
                    <br />
                    Experience
                  </span>
                </div>
                <div className="floating-card card-4">
                  <i className="fas fa-rocket"></i>
                  <span>Hello👋🏻 !</span>
                </div>
              </div>
            </div>

            <div className="about-text">
              <h2 className="section-title">About Me</h2>
              <div className="about-description">
                <p>
                  I'm Moon, a CSE undergraduate at RUET and a passionate
                  developer with a strong interest in both web development and
                  data-driven technologies. My programming journey began with
                  core languages like C++ and Java, and since then I've been
                  continuously expanding my skills while improving my
                  problem-solving ability through competitive programming.
                </p>

                <p>
                  I specialize in building responsive, user-friendly web
                  applications using modern technologies. Currently, I'm focused
                  on mastering the MERN stack while also diving into Data
                  Science. I'm learning how to analyze data, work with
                  Python-based tools, and understand the fundamentals of machine
                  learning, data visualization, and statistical thinking. This
                  allows me to combine development skills with data-driven
                  decision making.
                </p>

                <p>
                  My goal is to create applications that are not only functional
                  and scalable but also intelligent and insightful by leveraging
                  data. I enjoy blending logical problem-solving with creativity
                  to build efficient solutions.
                </p>

                <p>
                  When I'm not coding, I practice competitive programming,
                  explore new technologies, and continue learning Data Science
                  concepts such as data analysis, visualization, and basic
                  machine learning to strengthen my overall skill set and stay
                  aligned with modern industry trends.
                </p>
              </div>

              <div className="about-highlights">
                <div className="highlight">
                  <i className="fas fa-graduation-cap"></i>
                  <div>
                    <h4>Education</h4>
                    <p>Computer Science Engineering | RUET </p>
                  </div>
                </div>
                <div className="highlight">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h4>Location</h4>
                    <p>Kazla,Rajshahi,Bangladesh</p>
                  </div>
                </div>
                <div className="highlight">
                  <i className="fas fa-briefcase"></i>
                  <div>
                    <h4>Currently Learning </h4>
                    <p>MERN Stack, Data Science, Machine Learning</p>
                  </div>
                </div>
              </div>

              <div className="about-actions">
                <button className="about-btn">
                  <span>Download CV</span>
                  <i className="fas fa-download"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileCard;
