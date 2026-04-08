import MoonBabu from "./assets/Moon.jpeg";

const socialLinks = [
  {
    label: "WhatsApp",
    className: "whatsapp",
    icon: "fab fa-whatsapp",
    href: "https://wa.me/+8801842741365",
  },
  {
    label: "LinkedIn",
    className: "linkedin",
    icon: "fab fa-linkedin-in",
    href: "https://www.linkedin.com/in/md-moon-babu-75b335322/",
  },
  {
    label: "GitHub",
    className: "github",
    icon: "fab fa-github",
    href: "https://github.com/MominulMoon",
  },
  {
    label: "Instagram",
    className: "instagram",
    icon: "fab fa-instagram",
    href: "https://www.instagram.com/mdmominulislammoon/",
  },
];

const stats = [
  { number: "15+", label: "Projects Completed" },
  { number: "1+", label: "Years Experience" },
  { number: "CSE", label: "RUET" },
];

const floatingCards = [
  { icon: "fas fa-code", label: "Clean Code", cardClass: "card-1" },
  { icon: "fas fa-mobile-alt", label: "Learner", cardClass: "card-2" },
  { icon: "fas fa-rocket", label: "Problem Solver", cardClass: "card-3" },
];

function ProfileCard() {
  return (
    <div>
      <section id="home" className="section home">
        <div className="container">
          <div className="home-content">
            <div className="home-text">
              <div className="greeting">👋 Assalamulaikum</div>
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
                {stats.map(({ number, label }) => (
                  <div key={label} className="stat">
                    <span className="stat-number">{number}</span>
                    <span className="stat-label">{label}</span>
                  </div>
                ))}
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
                {socialLinks.map(({ label, className, icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`social-icon ${className}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={icon}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="home-image">
              <div className="image-container">
                <img
                  src={MoonBabu}
                  alt="Profile photo of Moon Babu"
                  className="profile-image"
                />
                {floatingCards.map(({ icon, label, cardClass }) => (
                  <div key={label} className={`floating-card ${cardClass}`}>
                    <i className={icon}></i>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileCard;
