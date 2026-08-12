import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ScrollReveal.css";

const sectionSelector = ".app main > section, .app .home > section";
const itemSelector = [
  ".course-card-one-line",
  ".testimonial-card",
  ".review-card",
  ".gallery-card",
  ".notice-card",
  ".blog-card",
  ".webinar-session-card",
  ".outcome-item",
  ".placement-card",
  ".feature-card",
  ".offer-card",
  ".why-choose-item",
  ".roadmap-step",
].join(",");

export default function ScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const sections = [...document.querySelectorAll(sectionSelector)];
    const items = [...document.querySelectorAll(itemSelector)];
    const directions = ["bottom", "left", "right", "bottom", "top"];

    sections.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.dataset.revealFrom = index === 0 ? "bottom" : directions[index % directions.length];
    });

    items.forEach((element, index) => {
      element.classList.add("scroll-reveal", "scroll-reveal-item");
      element.dataset.revealFrom = index % 2 === 0 ? "bottom" : "right";
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    [...sections, ...items].forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      [...sections, ...items].forEach((element) => {
        element.classList.remove("scroll-reveal", "scroll-reveal-item", "is-revealed");
        element.removeAttribute("data-reveal-from");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
