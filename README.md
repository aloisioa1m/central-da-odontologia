# Central da Odontologia - Landing Page Profissional

Versão reorganizada e modernizada da landing page odontológica com estrutura profissional, CSS/JS modularizados, dark/light mode, lazy loading, WebP e glassmorphism.

## 📋 Características

### ✨ Funcionalidades Principais
- **Dark Mode Premium**: Tema escuro sofisticado com glassmorphism
- **Light Mode Clean**: Tema claro minimalista e profissional
- **Lazy Loading**: Carregamento otimizado de imagens
- **WebP Format**: Imagens em formato moderno para melhor performance
- **Google Maps Responsivo**: Mapa integrado com botão para abrir no Google Maps
- **Glassmorphism Moderno**: Efeito visual premium com blur e transparência
- **Animações Avançadas**: Transições suaves e animações de scroll
- **Mobile-First**: Design totalmente responsivo
- **SEO Otimizado**: Meta tags, alt em imagens, estrutura semântica

### 🎨 Temas
- **Dark Mode**: Fundo preto (#000000) com acentos em coral e verde
- **Light Mode**: Fundo branco (#FFFFFF) com cores complementares
- **Toggle Automático**: Detecta preferência do sistema

### 📱 Responsividade
- **Mobile** (320px - 480px): Layout otimizado para celulares
- **Tablet** (481px - 768px): Interface adaptada para tablets
- **Desktop Pequeno** (769px - 1024px): Layout intermediário
- **Desktop Grande** (1025px+): Layout completo

### ⚡ Performance
- CSS modularizado (5 arquivos)
- JavaScript modularizado (4 arquivos)
- Imagens em WebP com lazy loading
- Preload de recursos críticos
- Defer em scripts
- Minificação recomendada

## 📁 Estrutura do Projeto

```
project/
├── index.html                 # HTML principal
├── assets/
│   ├── css/
│   │   ├── style.css         # Estilos base e variáveis
│   │   ├── dark.css          # Dark mode premium
│   │   ├── light.css         # Light mode clean
│   │   ├── responsive.css    # Mobile-first responsiveness
│   │   └── animations.css    # Animações avançadas
│   ├── js/
│   │   ├── main.js           # Funcionalidades gerais
│   │   ├── gallery.js        # Gerenciamento de galeria
│   │   ├── theme-switcher.js # Dark/light mode toggle
│   │   └── animations.js     # Animações avançadas
│   ├── img/
│   │   ├── hero/
│   │   │   └── hero-bg.webp
│   │   ├── gallery/
│   │   │   ├── clinic-1.webp
│   │   │   ├── clinic-2.webp
│   │   │   ├── clinic-3.webp
│   │   │   └── patient-1.webp
│   │   ├── services/
│   │   │   └── whitening.webp
│   │   ├── about/
│   │   ├── testimonials/
│   │   ├── icons/
│   │   └── logos/
│   └── fonts/
└── README.md
```

## 🚀 Como Usar

### 1. Abrir o Projeto
```bash
# Abrir index.html em um navegador
open index.html
# ou
firefox index.html
```

### 2. Alternar Tema
- Clique no botão de sol/lua no topo direito
- Ou use a preferência do sistema automaticamente

### 3. Navegar
- Use os links do menu para navegação suave
- Clique nas thumbnails da galeria para mudar imagens
- Use setas do teclado para navegar na galeria

## 🎯 Variáveis CSS

### Cores Primárias
```css
--coral: #E86C4A;      /* Cor principal */
--verde: #2C9B4B;      /* Cor secundária */
--preto: #000000;      /* Fundo escuro */
--branco: #FFFFFF;     /* Texto claro */
```

### Espaçamento
```css
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 1.5rem;
--spacing-lg: 2rem;
--spacing-xl: 3rem;
--spacing-2xl: 4rem;
```

### Transições
```css
--transition: all 0.3s ease;
--transition-slow: all 0.5s ease;
```

## 📦 Classes Utilitárias

### Animações
- `.animate-fade-in`: Fade in suave
- `.animate-fade-in-up`: Fade in com movimento para cima
- `.animate-slide-in-left`: Slide in pela esquerda
- `.animate-zoom-in`: Zoom in suave
- `.animate-pulse`: Pulsação contínua
- `.animate-float`: Flutuação suave

### Espaçamento
- `.mt-1` a `.mt-5`: Margin top
- `.mb-1` a `.mb-5`: Margin bottom
- `.p-1` a `.p-5`: Padding

### Tipografia
- `.text-center`: Centralizar texto
- `.text-muted`: Texto com cor reduzida

## 🔧 Customização

### Alterar Cores
Edite as variáveis CSS em `assets/css/style.css`:

```css
:root {
    --coral: #E86C4A;
    --verde: #2C9B4B;
    /* ... */
}
```

### Adicionar Imagens
1. Coloque imagens em `assets/img/{categoria}/`
2. Converta para WebP: `ffmpeg -i imagem.jpg imagem.webp`
3. Atualize o HTML com o novo caminho

### Modificar Animações
Edite `assets/css/animations.css` para customizar transições e efeitos.

## 📊 Performance

### Otimizações Implementadas
- ✅ Lazy loading de imagens
- ✅ WebP format para melhor compressão
- ✅ CSS modularizado
- ✅ JavaScript defer
- ✅ Preload de recursos críticos
- ✅ Glassmorphism com GPU acceleration
- ✅ Intersection Observer para animações

### Métricas Esperadas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: 90+

## 🌐 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Recursos Requeridos
- CSS Grid
- CSS Flexbox
- CSS Custom Properties
- Intersection Observer API
- LocalStorage

## ♿ Acessibilidade

### Implementações
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Alt text em imagens
- ✅ Contraste de cores
- ✅ Focus states
- ✅ Prefers reduced motion

## 📝 SEO

### Otimizações
- ✅ Meta description
- ✅ Open Graph tags
- ✅ Structured data
- ✅ Mobile-friendly
- ✅ Fast loading
- ✅ Clean URLs
- ✅ Alt text em imagens

## 🔐 Segurança

### Medidas Implementadas
- ✅ rel="noopener noreferrer" em links externos
- ✅ Content Security Policy ready
- ✅ HTTPS recommended
- ✅ No inline scripts (exceto necessários)

## 📞 Contato

**Central da Odontologia**
- WhatsApp: (35) 99931-7870
- Instagram: @centraldaodontologiapa
- Localização: Pouso Alegre - MG

## 📄 Licença

© 2024 Central da Odontologia. Todos os direitos reservados.

## 🎓 Documentação Técnica

### Estrutura de Dados

#### Gallery Class
```javascript
const gallery = new Gallery({
    mainImageSelector: '#main-image',
    thumbSelector: '.thumb',
    activeClass: 'active',
    transitionDuration: 300
});

gallery.nextImage();
gallery.prevImage();
gallery.goToImage(2);
gallery.startAutoplay(5000);
```

#### ThemeSwitcher Class
```javascript
const themeSwitcher = new ThemeSwitcher({
    storageKey: 'theme-preference',
    toggleSelector: '.theme-toggle',
    darkClass: 'dark-mode',
    lightClass: 'light-mode'
});

themeSwitcher.setTheme('dark');
themeSwitcher.toggleTheme();
themeSwitcher.getCurrentTheme();
```

#### AnimationManager Class
```javascript
const animationManager = new AnimationManager();

animationManager.animateElement(element, 'animate-fade-in');
animationManager.animateSequence(elements, 'animate-fade-in-up');
animationManager.animateParallel(elements, 'animate-zoom-in');
```

### Eventos Customizados

```javascript
// Listener para mudança de tema
document.addEventListener('themechange', (e) => {
    console.log('Tema alterado para:', e.detail.theme);
});
```

### Funções Utilitárias

```javascript
// Disponíveis em window.ODUtils
ODUtils.debounce(func, wait);
ODUtils.throttle(func, limit);
ODUtils.validateEmail(email);
ODUtils.validatePhone(phone);
ODUtils.copyToClipboard(text);
ODUtils.scrollToElement(selector, offset);
```

## 🐛 Troubleshooting

### Imagens não carregam
- Verifique se os caminhos estão corretos
- Confirme que as imagens estão em `assets/img/`
- Teste em um servidor local (não abra arquivo direto)

### Tema não persiste
- Limpe o cache do navegador
- Verifique se localStorage está habilitado
- Tente em modo incógnito

### Animações não funcionam
- Verifique se JavaScript está habilitado
- Confirme que os arquivos JS estão carregando
- Abra o console para ver erros

### Google Maps não carrega
- Verifique a conexão com internet
- Confirme se o iframe está correto
- Teste a URL do mapa diretamente

## 🚀 Deploy

### Recomendações
1. Minificar CSS e JavaScript
2. Otimizar imagens com ferramentas como TinyPNG
3. Habilitar GZIP compression no servidor
4. Usar CDN para arquivos estáticos
5. Configurar cache headers
6. Usar HTTPS

### Plataformas Recomendadas
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 📚 Recursos Adicionais

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)
- [Font Awesome Icons](https://fontawesome.com/)

---

**Desenvolvido com ❤️ para sua saúde bucal**
