import { useEffect } from "react";

export function useScrollToTop() {
  useEffect(() => {
    const scrollToTopButton = document.getElementById("scrollToTop");
    if (!scrollToTopButton) return;

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        scrollToTopButton.classList.add("show");
      } else {
        scrollToTopButton.classList.remove("show");
      }
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", toggleVisibility);
    scrollToTopButton.addEventListener("click", scrollToTop);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      scrollToTopButton.removeEventListener("click", scrollToTop);
    };
  }, []);
}
