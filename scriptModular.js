// ========== ARQUIVO PRINCIPAL ==========
// Importar componentes
import { initScrollObserver } from "./components/scrollObserver.js";
import { initGalaxyAnimation } from "./components/galaxyAnimation.js";
import { initScrollToTop } from "./components/scrollToTop.js";
import { initContactForm } from "./components/contactForm.js";

// Inicializar todos os componentes quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  initScrollObserver();
  initGalaxyAnimation();
  initScrollToTop();
  initContactForm();
});
// ========== /ARQUIVO PRINCIPAL ==========
