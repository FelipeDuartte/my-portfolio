// ========== GALÁXIA - CLASSE STAR ==========
export class Star {
  constructor(canvas, colors) {
    this.canvas = canvas;
    this.colors = colors;
    this.reset();
    this.y = Math.random() * canvas.height;
    this.age = Math.random() * Math.PI * 2;
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = -30;
    this.z = Math.random() * this.canvas.width;
    this.radius = Math.random() * 1.2 + 0.3;
    this.colorIndex = Math.floor(Math.random() * this.colors.length);
    this.speed = Math.random() * 0.15 + 0.05;
    this.alpha = Math.random() * 0.5 + 0.5;
    this.twinkleSpeed = Math.random() * 0.01 + 0.005;
    this.angle = Math.random() * Math.PI * 2;
  }

  update() {
    this.y += this.speed;
    this.angle += this.twinkleSpeed;
    this.age += 0.01;

    this.alpha = 0.3 + Math.abs(Math.sin(this.angle)) * 0.7;

    if (this.y > this.canvas.height + 30) {
      this.reset();
    }
  }

  draw(ctx) {
    const color = this.colors[this.colorIndex];

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius * 6
    );

    gradient.addColorStop(0, color.replace("0.", "0."));
    gradient.addColorStop(0.3, color.replace(/[\d.]+\)/, "0.3)"));
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.globalAlpha = this.alpha * 0.4;
    ctx.fillStyle = gradient;
    ctx.fillRect(
      this.x - this.radius * 6,
      this.y - this.radius * 6,
      this.radius * 12,
      this.radius * 12
    );

    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = this.alpha * 1.5;
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
}
// ========== /GALÁXIA - CLASSE STAR ==========
