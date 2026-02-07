import { useEffect } from "react";

export function useScrollObserver() {
  useEffect(() => {
    const createObserver = (elementsSelector, animationClass) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(animationClass);
            } else {
              entry.target.classList.remove(animationClass);
            }
          });
        },
        {
          threshold: 0.1,
        },
      );

      document.querySelectorAll(elementsSelector).forEach((element) => {
        observer.observe(element);
      });

      return observer;
    };

    const observer = createObserver(".hidden", "show");

    return () => {
      observer.disconnect();
    };
  }, []);
}
