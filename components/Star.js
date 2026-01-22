export class Star {
  constructor(canvas) {
    this.canvas = canvas;

    this.baseAlpha = Math.random() * 0.5 + 0.3;
    this.pulseSpeed = Math.random() * 0.8 + 0.4;
    this.pulseOffset = Math.random() * Math.PI * 2;

    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;

    this.radius = Math.random() * 0.8 + 0.4;
    this.speed = Math.random() * 0.4 + 0.2;
    this.alpha = this.baseAlpha;
  }

  update(time) {
    const t = time || performance.now();

    this.y += this.speed;

    if (this.y > this.canvas.height) {
      this.y = 0;
      this.x = Math.random() * this.canvas.width;
    }

    this.alpha =
      this.baseAlpha +
      Math.sin(t * 0.002 * this.pulseSpeed + this.pulseOffset) * 0.15;

    this.alpha = Math.max(0.15, this.alpha);
  }

  draw(ctx) {
    ctx.save();

    const glow = this.radius * 4;
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, glow
    );

    gradient.addColorStop(0, `rgba(255,255,255,${this.alpha})`);
    gradient.addColorStop(0.5, `rgba(255,255,255,${this.alpha * 0.6})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, glow, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
