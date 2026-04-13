import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Moon from "../assets/Moon2.jpeg";

const highlights = [
  {
    icon: "fas fa-graduation-cap",
    title: "Education",
    content: "Computer Science Engineering | RUET",
  },
  {
    icon: "fas fa-map-marker-alt",
    title: "Location",
    content: "Kazla,Rajshahi,Bangladesh",
  },
  {
    icon: "fas fa-briefcase",
    title: "Currently Learning",
    content: "MERN Stack, Data Science, Machine Learning",
  },
];

/**
 * About
 * Displays the author's biography block. Registers its own `.stat-item` elements
 * with the `scrollReveal` prop to ensure they animate into view smoothly
 * when the user scrolls to the `#about` module.
 */
function About({ scrollReveal, buttonAction }) {
  useEffect(() => {
    if (scrollReveal) {
      const cleanups = [
        scrollReveal(".about-highlights .highlight"),
        scrollReveal(".floating-card"),
      ];
      return () => cleanups.forEach((c) => c && c());
    }
  }, [scrollReveal]);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div>
      <section id="about" className="section about">
        <div className="container">
          <div className="about-content">
            <motion.div
              className="about-image"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="image-wrapper about-image-3d"
                whileHover={{ rotateY: -5, rotateX: 5, scale: 1.01 }}
                transition={{ duration: 0.35 }}
              >
                <img src={Moon} alt="About Asep" className="about-img" />
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
              </motion.div>
            </motion.div>

            <div className="about-text about-text-dynamic">
              <h2 className="section-title">About Me</h2>
              <div className="about-description">
                <p>
                  I'm MD. Moon , a CSE undergraduate at RUET and a passionate
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
                {highlights.map((item) => (
                  <motion.div
                    key={item.title}
                    className="highlight dynamic-highlight"
                    whileHover={{ y: -6, rotateX: 2 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    onMouseMove={handleCardMouseMove}
                  >
                    <i className={item.icon}></i>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="about-actions">
                <a
                  href="/CV.pdf"
                  download="CV.pdf"
                  className="about-btn"
                  onClick={buttonAction}
                  style={{ textDecoration: "none", display: "inline-flex" }}
                >
                  <span>Download CV</span>
                  <i className="fas fa-download"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
