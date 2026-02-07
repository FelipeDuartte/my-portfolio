import { useEffect } from "react";

export function useNavbarVisibility() {
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const header = document.querySelector("header");
    if (!header) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            navbar.classList.remove("hidden");
            navbar.classList.add("show");
          } else {
            navbar.classList.add("hidden");
            navbar.classList.remove("show");
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px",
      },
    );

    observer.observe(header);

    return () => {
      observer.disconnect();
    };
  }, []);
}
