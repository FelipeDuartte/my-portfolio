export class Meteor {
  // Constantes da classe
  static TECH_LOGOS = [
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
      name: 'Python',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: 'rgba(255, 212, 59, 0.8)'
    }
  ];

  // Configurações de animação
  static CONFIG = {
    ICON_SIZE: 38,
    TRAIL_LENGTH: 120,
    BASE_SPEED: 850,
    TRAIL_ANGLE: 0.35,
    FADE_SPEED: 0.7,
    LINE_WIDTH: 2,
    SHADOW_BLUR: 8,
    ICON_SHADOW_BLUR: 15,
    MIN_WAIT_TIME: 5000,
    MAX_WAIT_TIME: 10000,
    INITIAL_DELAY_MULTIPLIER: 5000
  };

  static imagesLoaded = false;
  static loadedImages = new Map();
  static gradientCache = new Map();

  /**
   * Pré-carrega todas as imagens dos logos
   * @returns {Promise<void>}
   */
  static async preloadImages() {
    if (this.imagesLoaded) return;

    const imagePromises = this.TECH_LOGOS.map(tech => 
      this.#loadImage(tech)
    );

    await Promise.all(imagePromises);
    this.imagesLoaded = true;
  }

  /**
   * Carrega uma única imagem
   * @private
   */
  static #loadImage(tech) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        this.loadedImages.set(tech.name, img);
        resolve();
      };
      
      img.onerror = () => {
        console.warn(`Failed to load image: ${tech.name}`);
        resolve();
      };
      
      img.src = tech.url;
    });
  }

  /**
   * Limpa o cache de gradientes (útil para redimensionamento)
   */
  static clearGradientCache() {
    this.gradientCache.clear();
  }

  constructor(canvas, ctx, delayIndex = 0) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.baseDelay = delayIndex * Meteor.CONFIG.INITIAL_DELAY_MULTIPLIER;
    
    // Valores pré-calculados
    this.halfIconSize = Meteor.CONFIG.ICON_SIZE / 2;
    this.trailEndX = Meteor.CONFIG.TRAIL_LENGTH;
    this.trailEndY = -Meteor.CONFIG.TRAIL_LENGTH * Meteor.CONFIG.TRAIL_ANGLE;
    
    this.#selectRandomTech();
    this.reset(true);
  }

  /**
   * Seleciona uma tecnologia aleatória
   * @private
   */
  #selectRandomTech() {
    const randomIndex = Math.floor(Math.random() * Meteor.TECH_LOGOS.length);
    this.tech = Meteor.TECH_LOGOS[randomIndex];
    this.image = Meteor.loadedImages.get(this.tech.name);
  }

  /**
   * Obtém ou cria um gradiente do cache
   * @private
   */
  #getGradient() {
    const key = this.tech.name;
    
    if (!Meteor.gradientCache.has(key)) {
      const gradient = this.ctx.createLinearGradient(
        0, 0, 
        this.trailEndX, 
        this.trailEndY
      );
      
      gradient.addColorStop(0, this.tech.color);
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      Meteor.gradientCache.set(key, gradient);
    }
    
    return Meteor.gradientCache.get(key);
  }

  /**
   * Reseta a posição e estado do meteoro
   * @param {boolean} initial - Se é o reset inicial
   */
  reset(initial = false) {
    // Posição inicial fora da tela
    this.x = this.canvas.width + Math.random() * 200;
    this.y = this.canvas.height * Math.random() * 0.4;

    this.alpha = 1;
    this.active = false;

    // Tempo de espera aumentado para evitar sobrecarga
    this.waitTime = initial 
      ? this.baseDelay + 3000
      : Meteor.CONFIG.MIN_WAIT_TIME + Math.random() * (Meteor.CONFIG.MAX_WAIT_TIME - Meteor.CONFIG.MIN_WAIT_TIME) + 3000;

    this.lastTime = performance.now();
    this.#selectRandomTech();
  }

  /**
   * Atualiza a posição e estado do meteoro
   * @param {number} time - Timestamp atual
   */
  update(time) {
    const deltaTime = (time - this.lastTime) / 1000;
    this.lastTime = time;

    if (!this.active) {
      this.waitTime -= deltaTime * 1000;
      if (this.waitTime <= 0) {
        this.active = true;
      }
      return;
    }

    // Atualizar posição
    const movement = Meteor.CONFIG.BASE_SPEED * deltaTime;
    this.x -= movement;
    this.y += movement * Meteor.CONFIG.TRAIL_ANGLE;

    // Atualizar opacidade
    this.alpha -= deltaTime * Meteor.CONFIG.FADE_SPEED;

    // Verificar se precisa resetar
    if (this.alpha <= 0 || this.x < -Meteor.CONFIG.TRAIL_LENGTH) {
      this.reset();
    }
  }

  /**
   * Renderiza o meteoro no canvas
   */
  draw() {
    if (!this.active || this.alpha <= 0) return;

    const ctx = this.ctx;
    
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);

    // Desenhar trilha
    this.#drawTrail(ctx);

    // Desenhar ícone
    if (this.image && Meteor.imagesLoaded) {
      this.#drawIcon(ctx);
    }

    ctx.restore();
  }

  /**
   * Desenha a trilha do meteoro
   * @private
   */
  #drawTrail(ctx) {
    ctx.strokeStyle = this.#getGradient();
    ctx.lineWidth = Meteor.CONFIG.LINE_WIDTH;
    ctx.lineCap = 'round';
    ctx.shadowBlur = Meteor.CONFIG.SHADOW_BLUR;
    ctx.shadowColor = this.tech.color;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.trailEndX, this.trailEndY);
    ctx.stroke();
    
    // Resetar shadow para não afetar o ícone
    ctx.shadowBlur = 0;
  }

  /**
   * Desenha o ícone do meteoro
   * @private
   */
  #drawIcon(ctx) {
    ctx.shadowBlur = Meteor.CONFIG.ICON_SHADOW_BLUR;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    
    // Desenhar ícone apenas uma vez (performance)
    const size = Meteor.CONFIG.ICON_SIZE;
    const offset = -this.halfIconSize;
    
    ctx.drawImage(this.image, offset, offset, size, size);
  }

  /**
   * Verifica se o meteoro está visível na tela
   * @returns {boolean}
   */
  isVisible() {
    return this.active && 
           this.x > -Meteor.CONFIG.TRAIL_LENGTH && 
           this.x < this.canvas.width + 200;
  }
}