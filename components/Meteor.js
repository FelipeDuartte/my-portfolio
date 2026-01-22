export class Meteor {
  constructor(canvas, ctx, delayIndex = 0) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.baseDelay = delayIndex * 3000;
    this.reset(true);
  }

  reset(initial = false) {
    this.x = this.canvas.width + Math.random() * 200;
    this.y = Math.random() * this.canvas.height * 0.4;

    this.length = 140;
    this.speed = 900; // pixels por segundo
    this.angle = 0.35;

    this.alpha = 1;
    this.active = false;

    this.waitTime = initial
      ? this.baseDelay + 1000
      : 3000 + Math.random() * 4000;

    this.lastTime = performance.now();
  }

  update(time) {
    const delta = (time - this.lastTime) / 1000;
    this.lastTime = time;

    if (!this.active) {
      this.waitTime -= delta * 1000;
      if (this.waitTime <= 0) {
        this.active = true;
      }
      return;
    }

    this.x -= this.speed * delta;
    this.y += this.speed * this.angle * delta;
    this.alpha -= delta * 0.6;

    if (
      this.alpha <= 0 ||
      this.x < -this.length ||
      this.y > this.canvas.height + this.length
    ) {
      this.reset();
    }
  }

  draw(ctx) {
    if (!this.active) return;

    ctx.save();
    ctx.globalAlpha = this.alpha;

    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x + this.length,
      this.y - this.length * this.angle
    );
    ctx.stroke();

    ctx.restore();
  }
}
