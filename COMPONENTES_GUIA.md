# 📁 Estrutura de Componentes JavaScript

## Como usar

No seu `index.html`, substitua:

```html
<script src="script.js"></script>
```

Por:

```html
<script type="module" src="scriptModular.js"></script>
```

## 📦 Componentes criados

### `scrollObserver.js`

- Gerencia a animação de scroll (fade-in de elementos)
- Função: `initScrollObserver()`

### `Star.js`

- Classe para as estrelas da galáxia
- Propriedades: posição, tamanho, brilho, efeito de piscar
- Método: `update()`, `draw(ctx)`

### `Nebula.js`

- Classe para as nebulosas de fundo
- Propriedades: tamanho, cor, movimento
- Método: `update()`, `draw(ctx)`

### `Meteor.js`

- Classe para os meteoros com efeito de fogo
- Propriedades: velocidade, rastro, partículas
- Método: `update()`, `draw(ctx)`

### `galaxyAnimation.js`

- Gerencia toda a animação do canvas (galáxia)
- Cria stars, nebulas e meteoros
- Controla o loop de animação e responsividade

### `scrollToTop.js`

- Componente do botão voltar ao topo
- Função: `initScrollToTop()`

### `contactForm.js`

- Gerencia o formulário de contato
- Valida campos preenchidos
- Função: `initContactForm()`

### `scriptModular.js` (arquivo principal)

- Importa todos os componentes
- Inicializa tudo quando o DOM está pronto

## ✅ Benefícios desta estrutura

- ✔️ Código mais organizado e modular
- ✔️ Fácil manutenção e reutilização
- ✔️ Melhor performance (lazy loading)
- ✔️ Evita conflitos de namespace
- ✔️ Cada componente tem responsabilidade única (SRP)
- ✔️ Facilita testes unitários futuros
