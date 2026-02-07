import React, { useEffect, useRef } from "react";
import { Star } from "../utils/Star";
import { Meteor } from "../utils/Meteor";

function GalaxyCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    let animationId;
    let isVisible = true;

    // Detectar dispositivo de baixa performance
    const isLowPerformance =
      navigator.hardwareConcurrency <= 2 ||
      (/Android/i.test(navigator.userAgent) && window.innerWidth < 768);

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

    // Configurar quantidade de estrelas
    const starCount = isLowPerformance
      ? isMobile
        ? 40
        : 80
      : isMobile
        ? 80
        : 160;

    const stars = Array.from({ length: starCount }, () => new Star(canvas));
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

      // Desenhar estrelas
      for (let i = 0; i < stars.length; i++) {
        stars[i].update(time);
        stars[i].draw(ctx);
      }

      // Desenhar meteoros
      for (let i = 0; i < meteors.length; i++) {
        meteors[i].update(time);
        if (meteors[i].isVisible()) {
          meteors[i].draw();
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    // Observador para controlar visibilidade
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;

          if (isVisible) {
            lastTime = performance.now();
            animate(lastTime);
          } else {
            cancelAnimationFrame(animationId);
          }
        });
      },
      { threshold: 0 },
    );

    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="galaxyCanvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}

export default GalaxyCanvas;
