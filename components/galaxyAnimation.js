import { Star } from "./Star.js";
import { Meteor } from "./Meteor.js";

export async function initGalaxyAnimation() {
  const canvas = document.getElementById("galaxyCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { 
    alpha: true,
    desynchronized: true // Performance boost
  });
  
  let animationId;
  let isVisible = true;

  // Detectar dispositivo de baixa performance
  const isLowPerformance = navigator.hardwareConcurrency <= 2 || 
                          (/Android/i.test(navigator.userAgent) && window.innerWidth < 768);

  // Pré-carregar imagens dos meteoros
  await Meteor.preloadImages();

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    Meteor.clearGradientCache();
  }
  
  resize();
  
  // Debounce no resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 150);
  });

  const isMobile = window.innerWidth < 768;

  // ⭐ ESTRELAS - Reduzidas em dispositivos lentos
  const starCount = isLowPerformance 
    ? (isMobile ? 40 : 80)
    : (isMobile ? 80 : 160);
    
  const stars = Array.from(
    { length: starCount },
    () => new Star(canvas)
  );

  // ☄ METEOROS - Apenas 1 meteoro sempre
  const meteors = [new Meteor(canvas, ctx, 0)];

  // FPS adaptativo
  const FPS = isLowPerformance ? 24 : 30;
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
    for (let i = 0; i < stars.length; i++) {
      stars[i].update(time);
      stars[i].draw(ctx);
    }

    // ☄ Meteoros
    for (let i = 0; i < meteors.length; i++) {
      meteors[i].update(time);
      if (meteors[i].isVisible()) {
        meteors[i].draw();
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  // Observador com threshold maior para dispositivos lentos
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
    { threshold: isLowPerformance ? 0.25 : 0.1 }
  );

  observer.observe(canvas);
  animate(performance.now());

  return {
    destroy() {
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      Meteor.clearGradientCache();
    }
  };
}