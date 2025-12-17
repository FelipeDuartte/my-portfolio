// ========== OBSERVADOR DE ELEMENTOS (Animações com IntersectionObserver) ==========
export function initScrollObserver() {
  function createObserver(elementsSelector, animationClass) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
        } else {
          entry.target.classList.remove(animationClass);
        }
      });
    });

    document
      .querySelectorAll(elementsSelector)
      .forEach((element) => observer.observe(element));
  }

  createObserver(".hidden", "show");
}
// ========== /OBSERVADOR DE ELEMENTOS ==========
