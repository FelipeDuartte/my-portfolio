export class Star {
  constructor(canvas) {
    this.canvas = canvas;

    // Alpha base mais forte (visibilidade)
    this.baseAlpha = Math.random() * 0.35 + 0.4;

    // Pulsação ainda sutil
    this.pulseSpeed = Math.random() * 0.4 + 0.25;
    this.pulseOffset = Math.random() * Math.PI * 2;

    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;

    // Estrelas continuam pequenas
    this.radius = Math.random() * 0.4 + 0.2;

    // Movimento suave
    this.speed = Math.random() * 0.25 + 0.12;

    this.alpha = this.baseAlpha;
  }

  update(time = performance.now()) {
    this.y += this.speed;

    if (this.y > this.canvas.height) {
      this.y = 0;
      this.x = Math.random() * this.canvas.width;
    }

    this.alpha =
      this.baseAlpha +
      Math.sin(time * 0.0012 * this.pulseSpeed + this.pulseOffset) * 0.15;

    this.alpha = Math.max(0.25, this.alpha);
  }

  draw(ctx) {
    ctx.save();

    //  Glow maior, mas estrela ainda pequena
    const glow = this.radius * 3.5;

    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, glow
    );

    gradient.addColorStop(0, `rgba(255,255,255,${this.alpha})`);
    gradient.addColorStop(0.5, `rgba(255,255,255,${this.alpha * 0.65})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, glow, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
