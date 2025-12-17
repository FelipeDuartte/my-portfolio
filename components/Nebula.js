// ========== GALÁXIA - CLASSE NEBULA ==========
export class Nebula {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 200 + 100;
    this.color =
      Math.random() > 0.5
        ? "rgba(96, 165, 250, 0.03)"
        : "rgba(139, 92, 246, 0.03)";
    this.speed = Math.random() * 0.02 + 0.01;
    this.angle = Math.random() * Math.PI * 2;
  }

  update() {
    this.y += this.speed;
    this.angle += 0.001;

    if (this.y > this.canvas.height + this.size) {
      this.y = -this.size;
      this.x = Math.random() * this.canvas.width;
    }
  }

  draw(ctx) {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size
    );

    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.globalAlpha = 0.5 + Math.sin(this.angle) * 0.3;
    ctx.fillStyle = gradient;
    ctx.fillRect(
      this.x - this.size,
      this.y - this.size,
      this.size * 2,
      this.size * 2
    );
  }
}
// ========== /GALÁXIA - CLASSE NEBULA ==========
