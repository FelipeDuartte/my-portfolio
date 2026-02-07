export class Meteor {
  static meteors = [];
  static gradientCache = new Map();

  constructor(canvas, ctx, index) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 3 + 1;
    this.size = Math.random() * 3 + 2;
    this.opacity = 1;
    this.life = 1;
    this.maxLife = Math.random() * 3000 + 2000;
    this.creation = Date.now();
    this.isImage = false;
    this.image = null;
  }

  static clearGradientCache() {
    this.gradientCache.clear();
  }

  static async preloadImages() {
    // Aqui você pode precarregar imagens se necessário
  }

  update(time) {
    const now = Date.now();
    const elapsed = now - this.creation;

    if (elapsed > this.maxLife) {
      this.life = 0;
      return;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.opacity = 1 - elapsed / this.maxLife;
    this.life = this.opacity;

    // Resetar quando sair da tela
    if (
      this.x < -50 ||
      this.x > this.canvas.width + 50 ||
      this.y < -50 ||
      this.y > this.canvas.height + 50
    ) {
      this.reset();
    }
  }

  draw() {
    if (this.opacity <= 0) return;

    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = "#FF6347";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();

    // Cauda do meteoro
    const trailLength = this.size * 10;
    const angle = Math.atan2(this.vy, this.vx);
    const gradient = this.ctx.createLinearGradient(
      this.x,
      this.y,
      this.x - Math.cos(angle) * trailLength,
      this.y - Math.sin(angle) * trailLength,
    );
    gradient.addColorStop(0, `rgba(255, 99, 71, ${this.opacity})`);
    gradient.addColorStop(1, "rgba(255, 99, 71, 0)");

    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = this.size / 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(
      this.x - Math.cos(angle) * trailLength,
      this.y - Math.sin(angle) * trailLength,
    );
    this.ctx.stroke();

    this.ctx.globalAlpha = 1.0;
  }

  isVisible() {
    return this.life > 0;
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = -50;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 3 + 1;
    this.creation = Date.now();
    this.life = 1;
  }
}
