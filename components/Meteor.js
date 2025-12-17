// ========== GALÁXIA - CLASSE METEOR ==========
export class Meteor {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = this.canvas.width * 0.6 + Math.random() * this.canvas.width * 0.4;
    this.y =
      this.canvas.height * 0.2 + Math.random() * this.canvas.height * 0.3;
    this.length = Math.random() * 250 + 200;
    this.speed = Math.random() * 12 + 8;
    this.thickness = Math.random() * 4 + 3;
    this.opacity = Math.random() * 0.4 + 0.6;
    this.active = false;
    this.waitTime = Math.random() * 400 + 300;
    this.angle = Math.random() * 0.2 + 0.4;
    this.color =
      Math.random() > 0.5
        ? { r: 255, g: 180, b: 50 }
        : { r: 255, g: 100, b: 50 };
    this.particles = [];
    this.trail = [];
  }

  update() {
    if (!this.active) {
      this.waitTime--;
      if (this.waitTime <= 0) {
        this.active = true;
      }
      return;
    }

    this.x -= this.speed;
    this.y += this.speed * this.angle;
    this.opacity -= 0.005;

    this.trail.push({
      x: this.x,
      y: this.y,
      opacity: this.opacity,
      size: this.thickness,
    });

    if (this.trail.length > 50) {
      this.trail.shift();
    }

    if (Math.random() > 0.3) {
      for (let i = 0; i < 3; i++) {
        this.particles.push({
          x: this.x + Math.random() * 10 - 5,
          y: this.y + Math.random() * 10 - 5,
          size: Math.random() * 5 + 2,
          opacity: this.opacity * (0.6 + Math.random() * 0.4),
          speedX: Math.random() * 3 - 1.5,
          speedY: Math.random() * 3 - 1.5,
          color:
            Math.random() > 0.5
              ? { r: 255, g: 200, b: 100 }
              : { r: 255, g: 150, b: 50 },
        });
      }
    }

    this.particles = this.particles.filter((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity -= 0.015;
      p.size *= 0.98;
      return p.opacity > 0;
    });

    if (
      this.opacity <= 0 ||
      this.x < -this.length ||
      this.y > this.canvas.height
    ) {
      this.reset();
    }
  }

  draw(ctx) {
    if (!this.active) return;

    // Desenhar rastro de fogo (múltiplas camadas)
    for (let layer = 0; layer < 3; layer++) {
      const layerOffset = layer * 80;
      const layerOpacity = this.opacity * (1 - layer * 0.25);
      const layerThickness = this.thickness * (3 - layer);

      const gradient = ctx.createLinearGradient(
        this.x,
        this.y,
        this.x + this.length + layerOffset,
        this.y - (this.length + layerOffset) * this.angle
      );

      if (layer === 0) {
        gradient.addColorStop(0, `rgba(255, 255, 255, ${layerOpacity})`);
        gradient.addColorStop(
          0.1,
          `rgba(${this.color.r}, ${this.color.g + 50}, ${this.color.b + 100}, ${
            layerOpacity * 0.9
          })`
        );
        gradient.addColorStop(
          0.3,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${
            layerOpacity * 0.7
          })`
        );
      } else if (layer === 1) {
        gradient.addColorStop(
          0,
          `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${
            layerOpacity * 0.8
          })`
        );
        gradient.addColorStop(
          0.4,
          `rgba(${this.color.r - 50}, ${this.color.g - 50}, ${
            this.color.b - 30
          }, ${layerOpacity * 0.5})`
        );
      } else {
        gradient.addColorStop(
          0,
          `rgba(${this.color.r - 50}, ${Math.max(this.color.g - 100, 0)}, 0, ${
            layerOpacity * 0.6
          })`
        );
        gradient.addColorStop(1, `rgba(100, 0, 0, ${layerOpacity * 0.3})`);
      }
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.globalAlpha = layerOpacity;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = layerThickness;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x + this.length + layerOffset,
        this.y - (this.length + layerOffset) * this.angle
      );
      ctx.stroke();
    }

    // Desenhar partículas de fogo
    this.particles.forEach((p) => {
      const particleGradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.size * 2
      );
      particleGradient.addColorStop(0, `rgba(255, 255, 200, ${p.opacity})`);
      particleGradient.addColorStop(
        0.4,
        `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity * 0.8})`
      );
      particleGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = particleGradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Núcleo do meteoro
    const coreGradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.thickness * 5
    );
    coreGradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
    coreGradient.addColorStop(
      0.2,
      `rgba(255, 255, 200, ${this.opacity * 0.9})`
    );
    coreGradient.addColorStop(
      0.5,
      `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${
        this.opacity * 0.7
      })`
    );
    coreGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.thickness * 5, 0, Math.PI * 2);
    ctx.fill();
  }
}
// ========== /GALÁXIA - CLASSE METEOR ==========
