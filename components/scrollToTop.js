// ========== BOTÃO VOLTAR AO TOPO ==========
export function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (!scrollToTopBtn) return;

  function toggleScrollTopButton() {
  const isMobile = window.innerWidth < 768;
  const scrolled = window.scrollY > 300;

  if (isMobile && scrolled) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
}

  window.addEventListener("scroll", toggleScrollTopButton);
  window.addEventListener("resize", toggleScrollTopButton);

  scrollToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
// ========== /BOTÃO VOLTAR AO TOPO ==========
