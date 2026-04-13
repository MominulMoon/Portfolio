import { useRef, useEffect, useState } from "react";

import MyMovieList from "../assets/MyMovieList.png";
import QRCode from "../assets/QRCode.png";
import TravelList from "../assets/TravelList.png";
import Profile from "../assets/Portfolio0.png";
import CF from "../assets/CF.png";
import SpaceShooter from "../assets/SpaceShooter.png";
import CursedKnight from "../assets/CursedKnight.jpeg";

import {
  // eslint-disable-next-line no-unused-vars
  motion,
  useMotionValue,
  useScroll,
  useTransform,
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
    liveLink: "https://moonportfolio2715.netlify.app/",
    githubLink: "https://github.com/MominulMoon/Portfolio",
    tech: ["React", "CSS3", "HTML5", "Framer Motion"],
  },
  {
    id: 5,
    image: CursedKnight,
    alt: "Cursed Knight",
    title: "Cursed Knight",
    description:
      "A 2D action-adventure game made in Godot Engine during a game jam.",
    liveLink: null,
    githubLink: "https://github.com/MominulMoon/Gamejam-Project",
    tech: ["Godot Engine", "GDScript"],
  },
  {
    id: 6,
    image: SpaceShooter,
    alt: "Space Shooter Game",
    title: "Space Shooter Game",
    description: "Space shooter game made in godot",
    liveLink: null,
    githubLink: "https://github.com/MominulMoon/Space-Shooter-Game",
    tech: ["Godot Engine", "GDScript"],
  },
  {
    id: 7,
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
    id: 8,
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

function ProjectCard({ project, onLiveClick }) {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const depthY = useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, -120]);
  const depthScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.84, 1.03, 0.88]);
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -18]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.35]);

  const onMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 10);
  };

  const resetTilt = () => {
    animate(rotateX, 0, { duration: 0.4 });
    animate(rotateY, 0, { duration: 0.4 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card group relative"
      style={{
        rotateX,
        rotateY,
        y: depthY,
        scale: depthScale,
        opacity,
        transformPerspective: 1200,
      }}
      onMouseMove={onMove}
      onMouseLeave={resetTilt}
      whileHover={{
        scale: 1.03,
        rotateZ: 0.5,
        transition: { duration: 0.2 },
      }}
    >
      <motion.div className="project-card-glass" style={{ rotateX: scrollRotateX }}>
        <div className="project-image">
          <img src={project.image} alt={project.alt} draggable="false" />
          <div className="project-overlay">
            <div className="project-links">
              <a
                href={project.liveLink || "#"}
                className={`project-link ${!project.liveLink ? "project-link--disabled" : ""}`}
                rel="noreferrer"
                title={project.liveLink ? "Live demo" : "No live demo available"}
                onClick={(e) => onLiveClick(e, project.liveLink, project.title)}
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
    </motion.div>
  );
}

/**
 * Projects
 * An interactive portfolio gallery that fetches a declarative list of projects
 * and allows the user to filter dynamically by clicking category pills (e.g. 'React').
 * Triggers Framer layout animations when filtering and scrollReveal when entering the viewport.
 */
function Projects({ scrollReveal }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (scrollReveal) {
      const cleanup = scrollReveal(".project-card");
      return () => cleanup && cleanup();
    }
  }, [scrollReveal]);

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
      <div className="container perspective-[1200px]">
        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-grid projects-grid-3d">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onLiveClick={handleLiveClick}
            />
          ))}
        </div>
      </div>

      <Toast message={toast} onDone={() => setToast(null)} />
    </section>
  );
}

export default Projects;
