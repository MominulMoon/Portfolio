import { useRef, useEffect, useCallback, useState } from "react";

import MyMovieList from "./assets/MyMovieList.png";
import QRCode from "./assets/QRCode.png";
import TravelList from "./assets/TravelList.png";
import Profile from "./assets/Portfolio0.png";
import CF from "./assets/CF.png";
import SpaceShooter from "./assets/SpaceShooter.png";

import {
  motion,
  useMotionValue,
  animate,
  AnimatePresence,
} from "framer-motion";

const projectsData = [
  {
    id: 1,
    image: MyMovieList,
    alt: "My Movie List",
    title: "My Movie List",
    description:
      "A simple personal movie list project where I keep track of movies I've watched and rate them for my own reference.",
    liveLink: null,
    githubLink: "https://github.com/MominulMoon/My-Movie-List",
    tech: ["React", "Node.js", "Express.js", "CSS3"],
  },
  {
    id: 2,
    image: QRCode,
    alt: "QR Code Generator",
    title: "QR Code Generator",
    description:
      "A simple and beginner-friendly QR Code Generator built using Node.js. This project allows users to generate QR codes instantly from any text or URL.",
    liveLink: null,
    githubLink: "https://github.com/MominulMoon/QR-Code-Generator",
    tech: ["Node.js", "JavaScript", "npm QRcode package"],
  },
  {
    id: 3,
    image: TravelList,
    alt: "Travel List",
    title: "Travel List",
    description:
      "A simple personal travel list project where I keep track of things I need to pack for my trips, ensuring I never forget essential items when traveling.",
    liveLink: null,
    githubLink: "https://github.com/MominulMoon/Travel-List",
    tech: ["React"],
  },
  {
    id: 4,
    image: Profile,
    alt: "Portfolio Website",
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with React, showcasing my projects, skills, and experience.",
    liveLink: null,
    githubLink: "https://github.com/MominulMoon/Portfolio",
    tech: ["React", "CSS3", "HTML5", "Framer Motion"],
  },
  {
    id: 5,
    image: SpaceShooter,
    alt: "Space Shooter Game",
    title: "Space Shooter Game",
    description: "Space shooter game made in godot",
    liveLink: null,
    githubLink: "https://github.com/MominulMoon/Space-Shooter-Game",
    tech: ["Godot Engine", "GDScript"],
  },
  {
    id: 6,
    image: "https://placehold.co/400x220?text=Hand Pose Detector",
    alt: "Hand Pose Detector",
    title: "Hand Pose Detector",
    description:
      "Video-Handpose-Detector is a JavaScript-based web application that detects and tracks hand poses in video streams.",
    liveLink: null,
    githubLink: "https://github.com/MominulMoon/Video-Handpose-Detector",
    tech: ["React", "TensorFlow.js", "React Webcam"],
  },
  {
    id: 7,
    image: CF,
    alt: "Codeforce Problem Solutions",
    title: "Codeforce Problem Solutions",
    description:
      "Solutions to various Codeforces competitive programming problems implemented in C++ and Java.",
    liveLink: null,
    githubLink: "https://github.com/MominulMoon/Codeforce-Problems-Solutions",
    tech: ["C++", "Java"],
  },
];

const CARD_WIDTH = 364;
const SPEED = 0.6;

function Toast({ message, onDone }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          className="toast"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          onAnimationComplete={() => setTimeout(onDone, 2800)}
        >
          <span className="toast-icon">i</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Projects
 * An interactive portfolio gallery that fetches a declarative list of projects
 * and allows the user to filter dynamically by clicking category pills (e.g. 'React').
 * Triggers Framer layout animations when filtering and scrollReveal when entering the viewport.
 */
function Projects({ scrollReveal }) {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const rafRef = useRef(null);
  const isPaused = useRef(false);
  const x = useMotionValue(0);
  const [toast, setToast] = useState(null);

  // Calculates the physical maximum scroll offset allowed so we don't drag past the last item
  const getMaxDrag = () => {
    if (!carouselRef.current || !containerRef.current) return 0;
    return -(
      carouselRef.current.scrollWidth - containerRef.current.offsetWidth
    );
  };

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

  useEffect(() => {
    if (scrollReveal) {
      const cleanup = scrollReveal(".project-card");
      return () => cleanup && cleanup();
    }
  }, [scrollReveal]);

  const pause = () => {
    isPaused.current = true;
  };
  const resume = () => {
    isPaused.current = false;
  };

  const moveTo = (delta) => {
    pause();
    // Clamp the next calculated offset between 0 and getMaxDrag()
    const next = Math.min(0, Math.max(x.get() + delta, getMaxDrag()));
    
    // Animate the Framer motion value 'x' to the new offset, pausing auto-scroll during transition
    animate(x, next, {
      type: "spring",
      stiffness: 250,
      damping: 28,
      onComplete: resume,
    });
  };

  const handleLiveClick = (e, liveLink, title) => {
    e.stopPropagation();
    if (liveLink) {
      window.open(liveLink, "_blank", "noreferrer");
    } else {
      e.preventDefault();
      setToast(
        `"${title}" doesn't have a live demo yet.Pleae use the GitHub link to view the code.`,
      );
    }
  };

  return (
    <section id="project" className="section projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div className="carousel-wrapper">
          <button
            aria-label="Scroll left"
            className="carousel-arrow carousel-arrow--left"
            onClick={() => moveTo(+CARD_WIDTH)}
            onMouseEnter={pause}
            onMouseLeave={resume}
          >
            ‹
          </button>

          <button
            aria-label="Scroll right"
            className="carousel-arrow carousel-arrow--right"
            onClick={() => moveTo(-CARD_WIDTH)}
            onMouseEnter={pause}
            onMouseLeave={resume}
          >
            ›
          </button>

          <div
            ref={containerRef}
            className="carousel-container"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onMouseDown={(e) => e.currentTarget.classList.add("grabbing")}
            onMouseUp={(e) => e.currentTarget.classList.remove("grabbing")}
          >
            <motion.div
              ref={carouselRef}
              className="carousel-track"
              drag="x"
              dragConstraints={containerRef}
              dragElastic={0.08}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
              style={{ x }}
              onDragStart={pause}
              onDragEnd={resume}
              whileTap={{ cursor: "grabbing" }}
            >
              {projectsData.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card"
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
                          href={project.liveLink || "#"}
                          className={`project-link ${!project.liveLink ? "project-link--disabled" : ""}`}
                          rel="noreferrer"
                          title={
                            project.liveLink
                              ? "Live demo"
                              : "No live demo available"
                          }
                          onClick={(e) =>
                            handleLiveClick(e, project.liveLink, project.title)
                          }
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

      <Toast message={toast} onDone={() => setToast(null)} />
    </section>
  );
}

export default Projects;
