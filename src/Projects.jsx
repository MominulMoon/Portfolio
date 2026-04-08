import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const projectsData = [
  {
    id: 1,
    image: "https://placehold.co/400x220?text=My-Movie-lsit",
    alt: "My Movie List",
    title: "My Movie List",
    description:
      "A simple personal movie list project where I keep track of movies I’ve watched and rate them for my own reference.",
    liveLink: "#",
    githubLink: "https://github.com/MominulMoon/My-Movie-List",
    tech: ["React", "Node.js", "Express.js", "CSS3"],
  },
  {
    id: 2,
    image: "https://placehold.co/400x220?text=QR Code Generator",
    alt: "QR Code Generator",
    title: "QR Code Generator",
    description:
      "A simple and beginner-friendly QR Code Generator built using Node.js. This project allows users to generate QR codes instantly from any text or URL.",
    liveLink: "#",
    githubLink: "https://github.com/MominulMoon/QR-Code-Generator",
    tech: ["Node.js", "JavaScript", "npm QRcode package"],
  },
  {
    id: 3,
    image: "https://placehold.co/400x220?text=Hand Pose Detector",
    alt: "Hand Pose Detector",
    title: "Hand Pose Detector",
    description:
      "Video-Handpose-Detector is a JavaScript-based web application that detects and tracks hand poses in video streams. Built with modern web technologies, this project enables real-time hand pose detection and analysis through a browser-based interface.",
    liveLink: "#",
    githubLink: "https://github.com/MominulMoon/Video-Handpose-Detector",
    tech: ["React", "TensorFlow.js", "React Webcam"],
  },
  {
    id: 4,
    image: "https://placehold.co/400x220?text=Space Shooter Game",
    alt: "Space Shooter Game",
    title: "Space Shooter Game",
    description: "Space shooter game made in godot",
    liveLink: "#",
    githubLink: "https://github.com/MominulMoon/Space-Shooter-Game",
    tech: ["Godot Engine", "GDScript"],
  },

  {
    id: 5,
    image: "https://placehold.co/400x220?text=Portfolio ",
    alt: "Portfolio Website",
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with React, showcasing my projects, skills, and experience in a clean and responsive design.",
    liveLink: "#",
    githubLink: "https://github.com/MominulMoon/Portfolio",
    tech: ["React", "CSS3", "HTML5", "Motion-Animations"],
  },
  {
    id: 6,
    image: "https://placehold.co/400x220?text=Simon Says Game",
    alt: "Simon Says Game",
    title: "Simon Says Game",
    description:
      "A classic Simon Says memory game built using HTML, CSS, JavaScript, and jQuery. Test your memory by repeating the color pattern shown by the game. Each level increases the difficulty by adding a new color to the sequence.",
    liveLink: "#",
    githubLink: "https://github.com/MominulMoon/Simon-Says-Game",
    tech: ["HTML5", "CSS3", "JavaScript", "jQuery"],
  },
  {
    id: 7,
    image: "https://placehold.co/400x220?text=Codeforce Problem Solutions",
    alt: "Codeforce Problem Solutions",
    title: "Codeforce Problem Solutions",
    description:
      "This repository contains solutions to various Codeforces competitive programming problems implemented in C++ and Java.",
    liveLink: "#",
    githubLink: "https://github.com/MominulMoon/Codeforce-Problems-Solutions",
    tech: ["C++", "Java"],
  },
];

const CARD_WIDTH = 364; // 340px card + 24px gap
const SPEED = 0.6; // px per animation frame

function Projects() {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const rafRef = useRef(null);
  const isPaused = useRef(false);
  const x = useMotionValue(0);

  // Calculates how far left the track can travel
  const getMaxDrag = () => {
    if (!carouselRef.current || !containerRef.current) return 0;
    return -(
      carouselRef.current.scrollWidth - containerRef.current.offsetWidth
    );
  };

  // rAF loop: nudges x left every frame, loops back to 0 at the end
  const startScroll = useCallback(() => {
    const tick = () => {
      if (!isPaused.current) {
        const current = x.get();
        const max = getMaxDrag();
        x.set(current <= max ? 0 : current - SPEED);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [x]);

  useEffect(() => {
    startScroll();
    return () => cancelAnimationFrame(rafRef.current);
  }, [startScroll]);

  const pause = () => {
    isPaused.current = true;
  };
  const resume = () => {
    isPaused.current = false;
  };

  // Pause auto-scroll, spring-animate to the new position, then resume
  const moveTo = (delta) => {
    pause();
    const next = Math.min(0, Math.max(x.get() + delta, getMaxDrag()));
    animate(x, next, {
      type: "spring",
      stiffness: 250,
      damping: 28,
      onComplete: resume,
    });
  };

  const arrowBase = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(0,0,0,0.55)",
    color: "#fff",
    fontSize: "22px",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(6px)",
    transition: "background 0.2s",
  };

  return (
    <section id="project" className="section projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        {/* Wrapper is relative so arrows can be positioned over the edges */}
        <div style={{ position: "relative" }}>
          <button
            aria-label="Scroll left"
            style={{ ...arrowBase, left: "-20px" }}
            onClick={() => moveTo(+CARD_WIDTH)}
            onMouseEnter={pause}
            onMouseLeave={resume}
          >
            ‹
          </button>

          <button
            aria-label="Scroll right"
            style={{ ...arrowBase, right: "-20px" }}
            onClick={() => moveTo(-CARD_WIDTH)}
            onMouseEnter={pause}
            onMouseLeave={resume}
          >
            ›
          </button>

          {/* Hover over the track pauses auto-scroll */}
          <div
            ref={containerRef}
            style={{ overflow: "hidden", cursor: "grab" }}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onMouseDown={(e) => (e.currentTarget.style.cursor = "grabbing")}
            onMouseUp={(e) => (e.currentTarget.style.cursor = "grab")}
          >
            <motion.div
              ref={carouselRef}
              drag="x"
              dragConstraints={containerRef}
              dragElastic={0.08}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
              style={{
                x,
                display: "flex",
                gap: "24px",
                padding: "16px 4px",
                width: "max-content",
                userSelect: "none",
              }}
              onDragStart={pause}
              onDragEnd={resume}
              whileTap={{ cursor: "grabbing" }}
            >
              {projectsData.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  style={{ width: "340px", flexShrink: 0 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <div className="project-image">
                    <img
                      src={project.image}
                      alt={project.alt}
                      draggable="false"
                    />
                    <div className="project-overlay">
                      <div className="project-links">
                        <a
                          href={project.liveLink}
                          className="project-link"
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                        <a
                          href={project.githubLink}
                          className="project-link"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="View GitHub Repository"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((t, i) => (
                        <span key={i}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
