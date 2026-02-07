export class Star {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.twinkleSpeed = Math.random() * 0.02 + 0.01;
    this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
  }

  update(time) {
    // Piscar das estrelas
    this.opacity += this.twinkleSpeed * this.twinkleDirection;
    if (this.opacity <= 0.1 || this.opacity >= 1) {
      this.twinkleDirection *= -1;
    }
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
