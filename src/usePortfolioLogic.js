import { useEffect } from "react";
import { animate, inView, useScroll, useMotionValueEvent } from "framer-motion";

// ─── Sticky Header — Framer Motion useScroll ─────────────────────────────────
// useScroll gives a live scrollY motion value; no manual event listener needed.
function useStickyHeader() {
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    document.querySelector("header")?.classList.toggle("scrolled", y > 50);
  });
}

// ─── Smooth Scroll for Nav Links ─────────────────────────────────────────────
function useSmoothScroll() {
  useEffect(() => {
    function handleClick(e) {
      const href = e.currentTarget.getAttribute("href");
      if (!href?.startsWith("#")) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const headerH = document.querySelector("header")?.offsetHeight ?? 80;
      window.scrollTo({ top: target.offsetTop - headerH, behavior: "smooth" });
    }

    const links = document.querySelectorAll(".nav-link");
    links.forEach((l) => l.addEventListener("click", handleClick));
    return () =>
      links.forEach((l) => l.removeEventListener("click", handleClick));
  }, []);
}


// ─── Toast Notifications — Framer Motion animate slide ───────────────────────
// Replaces CSS transform transitions with Framer Motion's animate().
function useNotifications() {
  useEffect(() => {
    function showToast(message, type = "info") {
      const toast = document.createElement("div");
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `<i class="fas fa-info-circle"></i><span>${message}</span>`;
      document.body.appendChild(toast);

      // Slide in from the right
      animate(
        toast,
        { x: ["120%", "0%"] },
        { duration: 0.35, ease: "easeOut" },
      );

      // Slide out and remove after 3 s
      setTimeout(() => {
        animate(toast, { x: "120%" }, { duration: 0.35, ease: "easeIn" }).then(
          () => toast.remove(),
        );
      }, 3000);
    }

    window.showPortfolioToast = showToast;
    return () => delete window.showPortfolioToast;
  }, []);
}

// ─── Page Load Fade-in ────────────────────────────────────────────────────────
function usePageLoad() {
  useEffect(() => {
    const timer = setTimeout(() => document.body.classList.add("loaded"), 100);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove("loaded");
    };
  }, []);
}

// ─── Master hook — compose all features ───────────────────────────────────────
export function usePortfolioLogic() {
  useStickyHeader(); // Shrink header on scroll      ← Framer Motion useScroll
  useSmoothScroll(); // Smooth anchor scrolling

  useNotifications(); // Toast slide in/out            ← Framer Motion animate
  usePageLoad(); // Body fade-in on mount
}
