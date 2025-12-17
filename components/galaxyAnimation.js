// ========== ANIMAÇÃO GALÁXIA ==========
import { Star } from "./Star.js";
import { Nebula } from "./Nebula.js";
import { Meteor } from "./Meteor.js";

export function initGalaxyAnimation() {
  const canvas = document.getElementById("galaxyCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Responsividade
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Quantidade de estrelas baseada no tamanho da tela
  const starsCount = Math.min(
    150,
    Math.floor((canvas.width * canvas.height) / 4000)
  );

  // Paleta de cores
  const colors = [
    "rgba(255, 255, 255, 0.9)", // Branco
    "rgba(200, 220, 255, 0.8)", // Azul claro
    "rgba(255, 240, 220, 0.7)", // Amarelo suave
    "rgba(220, 200, 255, 0.6)", // Roxo suave
  ];

  // Criar elementos
  const stars = Array.from(
    { length: starsCount },
    () => new Star(canvas, colors)
  );
  const nebulas = Array.from({ length: 3 }, () => new Nebula(canvas));
  const meteors = Array.from({ length: 3 }, () => new Meteor(canvas));

  // Função de animação
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nebulas.forEach((nebula) => {
      nebula.update();
      nebula.draw(ctx);
    });

    stars.forEach((star) => {
      star.update();
      star.draw(ctx);
    });

    meteors.forEach((meteor) => {
      meteor.update();
      meteor.draw(ctx);
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();

  // Observer para performance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        canvas.style.opacity = entry.isIntersecting ? "1" : "0";
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(canvas);
}
// ========== /ANIMAÇÃO GALÁXIA ==========
