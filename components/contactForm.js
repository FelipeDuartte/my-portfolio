// ========== FORMULÁRIO DE CONTATO ==========
export function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  function enviarContato() {
    const inputs = [
      document.getElementById("nome"),
      document.getElementById("email"),
      document.getElementById("mensagem"),
    ];

    const allFilled = inputs.every(
      (input) => input && input.value.trim() !== ""
    );

    if (allFilled) {
      alert("Obrigado, logo mais entrarei em contato!");
      // Limpar formulário
      inputs.forEach((input) => {
        if (input) input.value = "";
      });
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }

  // Encontrar botão de envio e adicionar listener
  const submitBtn =
    contactForm.querySelector('button[type="submit"]') ||
    contactForm.querySelector("button");

  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      enviarContato();
    });
  }
}
// ========== /FORMULÁRIO DE CONTATO ==========
