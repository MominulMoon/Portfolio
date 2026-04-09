import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

import { useState, useEffect } from "react";

import Header from "./Header";
import Body from "./Body";
import Contact from "./Contact";

function useTypewriter() {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const words = [
      "Full-Stack Developer",
      "Frontend Engineer",
      "Backend Developer",
      "Problem Solver",
      "Data Scientist",
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    function tick() {
      const word = words[wordIndex];
      const displayed = deleting
        ? word.slice(0, charIndex - 1)
        : word.slice(0, charIndex + 1);

      setDisplayedText(`I'm a ${displayed}`);

      if (deleting) charIndex--;
      else charIndex++;

      let delay = deleting ? 75 : 150;

      if (!deleting && charIndex === word.length) {
        delay = 2000; // pause at end of word
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 500; // pause before next word
      }

      timer = setTimeout(tick, delay);
    }

    tick();
    return () => clearTimeout(timer);
  }, []);

  return displayedText;
}

// Reusable fade-up animation variant for each section
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Slide-down variant for the header
const headerVariants = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function App() {
  const typedText = useTypewriter();

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const glowOpacity = useMotionValue(0);

  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px,
        rgba(113, 72, 250, 0.18) 0%,
        rgba(80, 160, 255, 0.10) 27%,
        transparent 80%)`,
  );

  // clientX/Y are always relative to the viewport — same coordinate space
  // as position:fixed, so the glow stays locked to the cursor even when scrolling.
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseEnter = () =>
    animate(glowOpacity, 1, { duration: 0.4, ease: "easeOut" });

  const handleMouseLeave = () =>
    animate(glowOpacity, 0, { duration: 0.6, ease: "easeIn" });

  return (
    // Outer wrapper that captures mouse position
    <div
      className="app-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Radial glow overlay ──────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="glow-overlay"
        style={{
          background: glowBackground,
          opacity: glowOpacity,
        }}
      />

      {/* ── Page content ─────────────────────────────────────────── */}
      <AnimatePresence>
        {/* Header slides in from the top */}
        <motion.div
          key="header"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <Header />
        </motion.div>

        {/* Body sections fade-up with a slight delay */}
        <motion.div
          key="body"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Body typedText={typedText} />
        </motion.div>

        {/* Contact section fades up last */}
        <motion.div
          key="contact"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Contact />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
