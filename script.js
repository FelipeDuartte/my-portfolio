// ========== OBSERVADOR DE ELEMENTOS (Animações com IntersectionObserver) ==========
function createObserver(elementsSelector, animationClass) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
      } else {
        entry.target.classList.remove(animationClass);
      }
    });
  });

  document
    .querySelectorAll(elementsSelector)
    .forEach((element) => observer.observe(element));
}
createObserver(".hidden", "show");
// ========== /OBSERVADOR DE ELEMENTOS (Animações com IntersectionObserver) ==========
// ========== ANIMAÇÃO DO FUNDO GALÁXIA MELHORADO ==========
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("galaxyCanvas");
  const ctx = canvas.getContext("2d");

  // Responsividade
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Quantidade de estrelas baseada no tamanho da tela
  const starsCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 4000));
  
  // Paleta de cores mais variada para galáxia
  const colors = [
    'rgba(255, 255, 255, 0.9)',  // Branco
    'rgba(200, 220, 255, 0.8)',  // Azul claro
    'rgba(255, 240, 220, 0.7)',  // Amarelo suave
    'rgba(220, 200, 255, 0.6)'   // Roxo suave
  ];

  // Classe Star melhorada
  class Star {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height; // Posição inicial aleatória
      this.age = Math.random() * Math.PI * 2;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -30;
      this.z = Math.random() * canvas.width;
      this.radius = Math.random() * 1.2 + 0.3;
      this.colorIndex = Math.floor(Math.random() * colors.length);
      this.speed = Math.random() * 0.15 + 0.05;
      this.alpha = Math.random() * 0.5 + 0.5;
      this.twinkleSpeed = Math.random() * 0.01 + 0.005;
      this.angle = Math.random() * Math.PI * 2;
    }

    update() {
      this.y += this.speed;
      this.angle += this.twinkleSpeed;
      this.age += 0.01;
      
      // Efeito de piscar (twinkle)
      this.alpha = 0.3 + Math.abs(Math.sin(this.angle)) * 0.7;

      // Resetar quando sair da tela
      if (this.y > canvas.height + 30) {
        this.reset();
      }
    }

    draw() {
      const color = colors[this.colorIndex];
      
      // Brilho externo (glow)
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 6
      );
      
      gradient.addColorStop(0, color.replace('0.', '0.'));
      gradient.addColorStop(0.3, color.replace(/[\d.]+\)/, '0.3)'));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      // Desenhar brilho
      ctx.globalAlpha = this.alpha * 0.4;
      ctx.fillStyle = gradient;
      ctx.fillRect(
        this.x - this.radius * 6,
        this.y - this.radius * 6,
        this.radius * 12,
        this.radius * 12
      );

      // Desenhar núcleo da estrela
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();

      // Ponto central brilhante
      ctx.globalAlpha = this.alpha * 1.5;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Classe para nebulosas de fundo
  class Nebula {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 200 + 100;
      this.color = Math.random() > 0.5 
        ? 'rgba(96, 165, 250, 0.03)' 
        : 'rgba(139, 92, 246, 0.03)';
      this.speed = Math.random() * 0.02 + 0.01;
      this.angle = Math.random() * Math.PI * 2;
    }

    update() {
      this.y += this.speed;
      this.angle += 0.001;
      
      if (this.y > canvas.height + this.size) {
        this.y = -this.size;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size
      );
      
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
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

  // Criar estrelas e nebulosas
  const stars = Array.from({ length: starsCount }, () => new Star());
  const nebulas = Array.from({ length: 3 }, () => new Nebula());

  // Meteoros com rastro de fogo intenso
  class Meteor {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width + canvas.width * 0.2;
      this.y = -50;
      this.length = Math.random() * 250 + 200; // Cauda muito mais longa
      this.speed = Math.random() * 12 + 8;
      this.thickness = Math.random() * 4 + 3;
      this.opacity = Math.random() * 0.4 + 0.6;
      this.active = false;
      this.waitTime = Math.random() * 400 + 300;
      this.angle = Math.random() * 0.3 + 0.3;
      this.color = Math.random() > 0.5 
        ? { r: 255, g: 180, b: 50 } // Laranja/amarelo intenso
        : { r: 255, g: 100, b: 50 }; // Vermelho/laranja
      this.particles = [];
      this.trail = []; // Rastro persistente
    }

    update() {
      if (!this.active) {
        this.waitTime--;
        if (this.waitTime <= 0) {
          this.active = true;
        }
        return;
      }

      // Movimento diagonal
      this.x -= this.speed;
      this.y += this.speed * this.angle;
      this.opacity -= 0.005;

      // Adicionar pontos ao rastro
      this.trail.push({
        x: this.x,
        y: this.y,
        opacity: this.opacity,
        size: this.thickness
      });

      // Limitar tamanho do rastro
      if (this.trail.length > 50) {
        this.trail.shift();
      }

      // Criar MUITAS partículas de fogo
      if (Math.random() > 0.3) { // Mais frequente
        for (let i = 0; i < 3; i++) { // Múltiplas partículas por frame
          this.particles.push({
            x: this.x + Math.random() * 10 - 5,
            y: this.y + Math.random() * 10 - 5,
            size: Math.random() * 5 + 2,
            opacity: this.opacity * (0.6 + Math.random() * 0.4),
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 3 - 1.5,
            color: Math.random() > 0.5 
              ? { r: 255, g: 200, b: 100 }
              : { r: 255, g: 150, b: 50 }
          });
        }
      }

      // Atualizar partículas
      this.particles = this.particles.filter(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= 0.015;
        p.size *= 0.98;
        return p.opacity > 0;
      });

      if (this.opacity <= 0 || this.x < -this.length || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      if (!this.active) return;

      // Desenhar rastro de fogo (múltiplas camadas)
      for (let layer = 0; layer < 3; layer++) {
        const layerOffset = layer * 80;
        const layerOpacity = this.opacity * (1 - layer * 0.25);
        const layerThickness = this.thickness * (3 - layer);

        const gradient = ctx.createLinearGradient(
          this.x, this.y,
          this.x + this.length + layerOffset, this.y - (this.length + layerOffset) * this.angle
        );

        if (layer === 0) {
          // Camada interna - mais brilhante
          gradient.addColorStop(0, `rgba(255, 255, 255, ${layerOpacity})`);
          gradient.addColorStop(0.1, `rgba(${this.color.r}, ${this.color.g + 50}, ${this.color.b + 100}, ${layerOpacity * 0.9})`);
          gradient.addColorStop(0.3, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${layerOpacity * 0.7})`);
        } else if (layer === 1) {
          // Camada média - laranja
          gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${layerOpacity * 0.8})`);
          gradient.addColorStop(0.4, `rgba(${this.color.r - 50}, ${this.color.g - 50}, ${this.color.b - 30}, ${layerOpacity * 0.5})`);
        } else {
          // Camada externa - vermelho/preto
          gradient.addColorStop(0, `rgba(${this.color.r - 50}, ${Math.max(this.color.g - 100, 0)}, 0, ${layerOpacity * 0.6})`);
          gradient.addColorStop(0.5, `rgba(100, 0, 0, ${layerOpacity * 0.3})`);
        }
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.globalAlpha = layerOpacity;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = layerThickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length + layerOffset, this.y - (this.length + layerOffset) * this.angle);
        ctx.stroke();
      }

      // Desenhar partículas de fogo
      this.particles.forEach(p => {
        const particleGradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 2
        );
        particleGradient.addColorStop(0, `rgba(255, 255, 200, ${p.opacity})`);
        particleGradient.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity * 0.8})`);
        particleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Núcleo do meteoro (super brilhante)
      const coreGradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.thickness * 5
      );
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
      coreGradient.addColorStop(0.2, `rgba(255, 255, 200, ${this.opacity * 0.9})`);
      coreGradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.7})`);
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.thickness * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const meteors = Array.from({ length: 3 }, () => new Meteor());

  // Função de animação
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar nebulosas
    nebulas.forEach(nebula => {
      nebula.update();
      nebula.draw();
    });

    // Desenhar estrelas
    stars.forEach(star => {
      star.update();
      star.draw();
    });

    // Desenhar meteoros
    meteors.forEach(meteor => {
      meteor.update();
      meteor.draw();
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();

  // Observer para performance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        canvas.style.opacity = entry.isIntersecting ? "1" : "0";
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(canvas);
});
// ========== /ANIMAÇÃO DO FUNDO GALÁXIA MELHORADO ==========
// ========== BOTÃO VOLTAR AO TOPO ==========
window.addEventListener("scroll", () => {
  const scrollToTopBtn = document.getElementById("scrollToTop");
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

document.getElementById("scrollToTop").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ========== FORMULÁRIO DE CONTATO ==========
function EnviarContato() {
  const inputs = [
    document.getElementById("nome"),
    document.getElementById("email"),
    document.getElementById("mensagem"),
  ];

  const allFilled = inputs.every((input) => input && input.value.trim() !== "");

  if (allFilled) {
    alert("Obrigado, logo mais entrarei em contato!");
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}
// ========== /FORMULÁRIO DE CONTATO ==========
