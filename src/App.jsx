import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  inView,
} from "framer-motion";

import { useState, useEffect, useCallback } from "react";

import Header from "./Header";
import Body from "./Body";
import Contact from "./Contact";

import { usePortfolioLogic } from "./usePortfolioLogic";

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

function useMobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const onDocClick = (e) => {
      // Close if clicking outside nav-menu and hamburger
      if (
        isMenuOpen &&
        !e.target.closest(".nav-menu") &&
        !e.target.closest(".hamburger")
      ) {
        setIsMenuOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    const onResize = () => window.innerWidth >= 769 && setIsMenuOpen(false);

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = ""; // ensure reset on unmount
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return { isMenuOpen, toggleMenu, closeMenu };
}

function useScrollReveal() {
  return useCallback((selector) => {
    const targets = document.querySelectorAll(selector);

    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
    });

    const cleanups = Array.from(targets).map((el, i) =>
      inView(
        el,
        () => {
          animate(
            el,
            { opacity: 1, y: [30, 0] },
            { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
          );
        },
        { amount: 0.15, margin: "0px 0px -50px 0px" },
      ),
    );

    return () => cleanups.forEach((stop) => stop?.());
  }, []);
}

function useButtonActions() {
  return useCallback((e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const ripple = document.createElement("span");
    Object.assign(ripple.style, {
      position: "absolute",
      borderRadius: "50%",
      width: `${size}px`,
      height: `${size}px`,
      left: `${e.clientX - rect.left - size / 2}px`,
      top: `${e.clientY - rect.top - size / 2}px`,
      background: "rgba(255,255,255,0.45)",
      pointerEvents: "none",
    });
    btn.appendChild(ripple);

    animate(
      ripple,
      { scale: [0, 4], opacity: [1, 0] },
      { duration: 0.6, ease: "linear" },
    ).then(() => ripple.remove());

    if (btn.classList.contains("cta-btn") || btn.textContent.includes("Hire")) {
      document
        .querySelector("#contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
}

function useActiveNav() {
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    let raf;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Short-circuit if we are at the very top of the page
        if (window.scrollY < 10) {
          setActiveSection("#home");
          return;
        }

        const headerH = document.querySelector("header")?.offsetHeight ?? 80;
        const scrollPos = window.scrollY + headerH + 50; // extra padding

        let current = "#home";
        document.querySelectorAll("section[id]").forEach((sec) => {
          if (scrollPos >= sec.offsetTop) current = `#${sec.id}`;
        });

        setActiveSection(current);
      });
    }

    // Delay initial check to allow DOM and Framer Motion layouts to settle
    const initialTimer = setTimeout(onScroll, 200);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(initialTimer);
    };
  }, []);

  return activeSection;
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
  usePortfolioLogic();
  const typedText = useTypewriter();
  const activeSection = useActiveNav();
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();
  const scrollReveal = useScrollReveal();
  const buttonAction = useButtonActions();

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
          <Header
            activeSection={activeSection}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            closeMenu={closeMenu}
            buttonAction={buttonAction}
          />
        </motion.div>

        {/* Body sections fade-up with a slight delay */}
        <motion.div
          key="body"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Body
            typedText={typedText}
            scrollReveal={scrollReveal}
            buttonAction={buttonAction}
          />
        </motion.div>

        {/* Contact section fades up last */}
        <motion.div
          key="contact"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Contact scrollReveal={scrollReveal} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
