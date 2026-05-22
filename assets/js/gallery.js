/* ========================================
   CENTRAL DA ODONTOLOGIA - GALLERY.JS
   Gerenciamento de Galeria
   ======================================== */

'use strict';

class Gallery {
    constructor(options = {}) {
        this.mainImageSelector = options.mainImageSelector || '#main-image';
        this.thumbSelector = options.thumbSelector || '.thumb';
        this.activeClass = options.activeClass || 'active';
        this.transitionDuration = options.transitionDuration || 300;
        
        this.mainImage = document.querySelector(this.mainImageSelector);
        this.thumbs = document.querySelectorAll(this.thumbSelector);
        
        this.init();
    }
    
    init() {
        if (!this.mainImage || this.thumbs.length === 0) {
            console.warn('Galeria: Elementos não encontrados');
            return;
        }
        
        this.attachEventListeners();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
    }
    
    attachEventListeners() {
        this.thumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.changeImage(thumb));
            thumb.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.changeImage(thumb);
                }
            });
        });
    }
    
    changeImage(element) {
        // Animação de saída
        this.mainImage.style.opacity = '0';
        
        setTimeout(() => {
            // Atualizar src
            if (element.src) {
                this.mainImage.src = element.src.replace('w=400', 'w=1200');
            }
            
            if (element.dataset.src) {
                this.mainImage.src = element.dataset.src;
            }
            
            // Atualizar alt
            if (element.alt) {
                this.mainImage.alt = element.alt;
            }
            
            // Animação de entrada
            this.mainImage.style.opacity = '1';
        }, this.transitionDuration);
        
        // Atualizar classe ativa
        this.thumbs.forEach(thumb => thumb.classList.remove(this.activeClass));
        element.classList.add(this.activeClass);
        
        // Scroll automático para thumbnail ativa
        this.scrollThumbIntoView(element);
    }
    
    scrollThumbIntoView(element) {
        const container = element.parentElement;
        if (container) {
            const elementRect = element.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            if (elementRect.left < containerRect.left) {
                container.scrollLeft -= containerRect.left - elementRect.left;
            } else if (elementRect.right > containerRect.right) {
                container.scrollLeft += elementRect.right - containerRect.right;
            }
        }
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.mainImage) return;
            
            const activeThumb = document.querySelector(`${this.thumbSelector}.${this.activeClass}`);
            if (!activeThumb) return;
            
            const currentIndex = Array.from(this.thumbs).indexOf(activeThumb);
            let nextIndex;
            
            if (e.key === 'ArrowLeft') {
                nextIndex = (currentIndex - 1 + this.thumbs.length) % this.thumbs.length;
                this.changeImage(this.thumbs[nextIndex]);
            } else if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % this.thumbs.length;
                this.changeImage(this.thumbs[nextIndex]);
            }
        });
    }
    
    setupTouchNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.mainImage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        this.mainImage.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, false);
        
        const handleSwipe = () => {
            const activeThumb = document.querySelector(`${this.thumbSelector}.${this.activeClass}`);
            if (!activeThumb) return;
            
            const currentIndex = Array.from(this.thumbs).indexOf(activeThumb);
            let nextIndex;
            
            if (touchStartX - touchEndX > 50) {
                // Swipe para esquerda
                nextIndex = (currentIndex + 1) % this.thumbs.length;
            } else if (touchEndX - touchStartX > 50) {
                // Swipe para direita
                nextIndex = (currentIndex - 1 + this.thumbs.length) % this.thumbs.length;
            }
            
            if (nextIndex !== undefined) {
                this.changeImage(this.thumbs[nextIndex]);
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
    
    /**
     * Ir para imagem específica pelo índice
     */
    goToImage(index) {
        if (index >= 0 && index < this.thumbs.length) {
            this.changeImage(this.thumbs[index]);
        }
    }
    
    /**
     * Próxima imagem
     */
    nextImage() {
        const activeThumb = document.querySelector(`${this.thumbSelector}.${this.activeClass}`);
        const currentIndex = Array.from(this.thumbs).indexOf(activeThumb);
        const nextIndex = (currentIndex + 1) % this.thumbs.length;
        this.changeImage(this.thumbs[nextIndex]);
    }
    
    /**
     * Imagem anterior
     */
    prevImage() {
        const activeThumb = document.querySelector(`${this.thumbSelector}.${this.activeClass}`);
        const currentIndex = Array.from(this.thumbs).indexOf(activeThumb);
        const prevIndex = (currentIndex - 1 + this.thumbs.length) % this.thumbs.length;
        this.changeImage(this.thumbs[prevIndex]);
    }
    
    /**
     * Autoplay da galeria
     */
    startAutoplay(interval = 5000) {
        this.autoplayInterval = setInterval(() => {
            this.nextImage();
        }, interval);
    }
    
    /**
     * Parar autoplay
     */
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }
    
    /**
     * Destruir galeria
     */
    destroy() {
        this.stopAutoplay();
        this.thumbs.forEach(thumb => {
            thumb.removeEventListener('click', this.changeImage);
        });
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar galeria
    const gallery = new Gallery({
        mainImageSelector: '#main-image',
        thumbSelector: '.thumb',
        activeClass: 'active',
        transitionDuration: 300
    });
    
    // Exportar para escopo global
    window.gallery = gallery;
    
    // Opcional: Iniciar autoplay
    // gallery.startAutoplay(5000);
});

// ========================================
// FUNÇÃO COMPATÍVEL COM CÓDIGO ANTIGO
// ========================================

function changeImage(element) {
    if (window.gallery) {
        window.gallery.changeImage(element);
    } else {
        // Fallback se galeria não estiver inicializada
        const mainImg = document.getElementById('main-image');
        if (mainImg) {
            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = element.src.replace('w=400', 'w=1200');
                mainImg.style.opacity = '1';
            }, 300);
            
            document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
            element.classList.add('active');
        }
    }
}

// Exportar classe
window.Gallery = Gallery;
