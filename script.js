// ========== OBSERVADOR DE ELEMENTOS (Animações com IntersectionObserver) ==========
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
// ========== /OBSERVADOR DE ELEMENTOS (Animações com IntersectionObserver) ==========
// ========== ANIMAÇÃO DO FUNDO ESTRELADO ==========
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("galaxyCanvas");
  const ctx = canvas.getContext("2d");

  // Responsividade
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const starsCount = Math.min(
    100,
    Math.floor((canvas.width * canvas.height) / 5000)
  ); // Reduzido o número de estrelas
  const colors = ["hsl(0, 0%, 100%)", "hsl(0, 0%, 95%)", "hsl(0, 0%, 90%)"];

  class Star {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 0.6 + 0.4;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speed = Math.random() * 0.08 + 0.03; // Velocidade reduzida
      this.alpha = Math.random() * 0.8 + 0.2;
      this.distance = Math.random() * 1.6 + 1; // Distância reduzida
      this.twinkleSpeed = Math.random() * 0.005 + 0.002; // Piscar mais lento
      this.angle = Math.random() * Math.PI * 2;
      this.glowRadius = this.radius * 8; // Brilho reduzido
    }

    update() {
      this.y += this.speed * this.distance;
      this.angle += this.twinkleSpeed;
      this.alpha = 0.6 + Math.sin(this.angle) * 0.4;

      if (this.y > canvas.height + 30) {
        this.y = -30;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      const glow = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.glowRadius
      );
      glow.addColorStop(0, this.color);
      glow.addColorStop(0.4, `hsla(0, 0%, 100%, ${this.alpha * 0.5})`);
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.globalAlpha = this.alpha * 0.6; // Opacidade reduzida
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(0, 0%, 100%, 1)";
      ctx.globalAlpha = this.alpha * 1.5;
      ctx.fill();
    }
  }

  const stars = Array.from({ length: starsCount }, () => new Star());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      star.update();
      star.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        canvas.style.opacity = entry.isIntersecting ? "1" : "0";
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(canvas);
});
// ========== /ANIMAÇÃO DO FUNDO ESTRELADO ==========

// ========== BOTÃO VOLTAR AO TOPO ==========
window.addEventListener("scroll", () => {
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

document.getElementById("scrollToTop").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ========== FORMULÁRIO DE CONTATO ==========
function EnviarContato() {
  const inputs = [
    document.getElementById("nome"),
    document.getElementById("email"),
    document.getElementById("mensagem"),
  ];

  const allFilled = inputs.every((input) => input && input.value.trim() !== "");

  if (allFilled) {
    alert("Obrigado, logo mais entrarei em contato!");
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}
// ========== /FORMULÁRIO DE CONTATO ==========