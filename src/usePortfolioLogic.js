import { useEffect } from "react";
import { animate, inView, useScroll, useMotionValueEvent } from "framer-motion";

/**
 * useStickyHeader
 * Uses Framer Motion's `useScroll` to attach a scroll listener without needing
 * a manual `window.addEventListener`. It toggles a 'scrolled' class on the header
 * when the user scrolls down more than 50px, which applying styling for a shrunken/opaque header.
 */
function useStickyHeader() {
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    document.querySelector("header")?.classList.toggle("scrolled", y > 50);
  });
}

/**
 * useSmoothScroll
 * Intercepts clicks on all elements with the `.nav-link` class.
 * If the link targets an anchor (e.g., '#about'), it prevents the default jump and
 * calculates the exact scroll position, accounting for the header's fixed height.
 */
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

/**
 * useNotifications
 * Exposes a global window function `showPortfolioToast` to create temporary
 * notification toasts. It leverages Framer Motion's `animate` function to control
 * entering and exiting slide animations before removing the DOM node cleanly.
 */
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

/**
 * usePageLoad
 * Adds a 'loaded' class to the body object shortly after the app mounts.
 * Useful for transitioning in the initial layout without abrupt flashes.
 */
function usePageLoad() {
  useEffect(() => {
    const timer = setTimeout(() => document.body.classList.add("loaded"), 100);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove("loaded");
    };
  }, []);
}

/**
 * usePortfolioLogic
 * Acts as a centralized controller to mount our global vanilla-DOM hybrid functionality.
 * We run this once in the root App.jsx component.
 */
export function usePortfolioLogic() {
  useStickyHeader(); // Shrink header on scroll      ← Framer Motion useScroll
  useSmoothScroll(); // Smooth anchor scrolling

  useNotifications(); // Toast slide in/out            ← Framer Motion animate
  usePageLoad(); // Body fade-in on mount
}
