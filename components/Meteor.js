export class Meteor {
  // Logos das tecnologias (URLs públicas)
  static techLogos = [
    {
      name: 'React',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'rgba(97, 218, 251, 0.8)'
    },
    {
      name: 'JavaScript',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      color: 'rgba(240, 219, 79, 0.8)'
    },
    {
      name: 'MySQL',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      color: 'rgba(0, 117, 143, 0.8)'
    },
    {
      name: 'Python',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: 'rgba(255, 212, 59, 0.8)'
    }
  ];

  static imagesLoaded = false;
  static loadedImages = {};
  static gradientCache = new Map(); // Cache de gradientes

  // Método estático para pré-carregar todas as imagens
  static async preloadImages() {
    if (this.imagesLoaded) return Promise.resolve();

    const promises = this.techLogos.map(tech => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          this.loadedImages[tech.name] = img;
          resolve();
        };
        img.onerror = () => {
          console.warn(`Falha ao carregar imagem: ${tech.name}`);
          resolve();
        };
        img.src = tech.url;
      });
    });

    await Promise.all(promises);
    this.imagesLoaded = true;
  }

  constructor(canvas, ctx, delayIndex = 0) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.baseDelay = delayIndex * 3000;
    this.selectRandomTech();
    this.reset(true);
    
    // Pre-calcular valores constantes
    this.halfIconSize = 21; // iconSize / 2
    this.lengthAngle = 0; // Será calculado no reset
  }

  selectRandomTech() {
    const tech = Meteor.techLogos[Math.floor(Math.random() * Meteor.techLogos.length)];
    this.tech = tech;
    this.image = Meteor.loadedImages[tech.name];
  }

  reset(initial = false) {
    this.x = this.canvas.width + Math.random() * 200;
    this.y = this.canvas.height * Math.random() * 0.4;

    this.length = 140;
    this.speed = 900;
    this.angle = 0.35;
    
    // Pre-calcular multiplicações constantes
    this.lengthAngle = this.length * this.angle;

    this.alpha = 1;
    this.active = false;

    this.waitTime = initial
      ? this.baseDelay + 1000
      : 3000 + Math.random() * 4000;

    this.lastTime = performance.now();
    this.selectRandomTech();
  }

  update(time) {
    const delta = (time - this.lastTime) * 0.001; // Divisão por constante
    this.lastTime = time;

    if (!this.active) {
      this.waitTime -= delta * 1000;
      if (this.waitTime <= 0) {
        this.active = true;
      }
      return;
    }

    const speedDelta = this.speed * delta;
    this.x -= speedDelta;
    this.y += speedDelta * this.angle;
    this.alpha -= delta * 0.6;

    // Verificação simplificada
    if (this.alpha <= 0 || this.x < -this.length) {
      this.reset();
    }
  }

  draw(ctx) {
    if (!this.active) return;

    const alpha = this.alpha;
    
    ctx.save();
    ctx.globalAlpha = alpha;

    // Criar ou reutilizar gradiente do cache
    const gradKey = `${this.tech.name}`;
    let gradient = Meteor.gradientCache.get(gradKey);
    
    if (!gradient) {
      gradient = ctx.createLinearGradient(0, 0, this.length, -this.lengthAngle);
      gradient.addColorStop(0, this.tech.color);
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      Meteor.gradientCache.set(gradKey, gradient);
    }

    // Aplicar transformação uma vez
    ctx.translate(this.x, this.y);
    
    // Trilha
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.tech.color;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.length, -this.lengthAngle);
    ctx.stroke();

    // Logo (se carregado)
    if (this.image && Meteor.imagesLoaded) {
      ctx.shadowBlur = 25;
      ctx.shadowColor = 'rgba(255, 255, 255, 1)';
      
      // Desenhar 2 vezes em vez de 3 (performance vs qualidade)
      ctx.drawImage(this.image, -this.halfIconSize, -this.halfIconSize, 42, 42);
      ctx.drawImage(this.image, -this.halfIconSize, -this.halfIconSize, 42, 42);
    }

    ctx.restore();
  }
}