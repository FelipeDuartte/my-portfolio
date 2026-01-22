import { Star } from "./Star.js";
import { Meteor } from "./Meteor.js";

export async function initGalaxyAnimation() {
  const canvas = document.getElementById("galaxyCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  let animationId;
  let isVisible = true;

  // Pré-carregar imagens dos meteoros
  await Meteor.preloadImages();

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Limpar cache de gradientes ao redimensionar
    Meteor.clearGradientCache();
  }
  
  resize();
  window.addEventListener("resize", resize);

  const isMobile = window.innerWidth < 768;

  // ⭐ ESTRELAS
  const stars = Array.from(
    { length: isMobile ? 80 : 160 },
    () => new Star(canvas)
  );

  // ☄ METEOROS - Um de cada vez com delays escalonados
  const meteors = isMobile
    ? [new Meteor(canvas, ctx, 0)]
    : [
        new Meteor(canvas, ctx, 0),
        new Meteor(canvas, ctx, 1)
      ];

  // FPS CONTROLADO
  const FPS = 30;
  const interval = 1000 / FPS;
  let lastTime = 0;

  function animate(time) {
    if (!isVisible) return;

    if (time - lastTime < interval) {
      animationId = requestAnimationFrame(animate);
      return;
    }

    lastTime = time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ⭐ Estrelas
    stars.forEach(star => {
      star.update(time);
      star.draw(ctx);
    });

    // ☄ Meteoros - apenas os visíveis
    meteors.forEach(meteor => {
      meteor.update(time);
      if (meteor.isVisible()) {
        meteor.draw();
      }
    });

    animationId = requestAnimationFrame(animate);
  }

  // Observador de visibilidade para pausar quando fora da tela
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          lastTime = performance.now();
          animate(lastTime);
        } else {
          cancelAnimationFrame(animationId);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(canvas);
  animate(performance.now());

  // Cleanup function
  return {
    destroy() {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      Meteor.clearGradientCache();
    }
  };
}