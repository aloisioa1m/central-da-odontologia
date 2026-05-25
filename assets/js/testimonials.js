/* ========================================
   CENTRAL DA ODONTOLOGIA - TESTIMONIALS.JS
   Gerenciamento de Depoimentos
   ======================================== */

'use strict';

class TestimonialsManager {
    constructor(options = {}) {
        this.containerSelector = options.containerSelector || '.testimonials-container';
        this.cardSelector = options.cardSelector || '.testimonial-card';
        this.btnSelector = options.btnSelector || '.testimonial-btn';
        this.activeClass = options.activeClass || 'active';
        this.autoplayInterval = options.autoplayInterval || 5000;
        this.autoplay = options.autoplay || false;
        
        this.currentIndex = 0;
        this.cards = document.querySelectorAll(this.cardSelector);
        this.buttons = document.querySelectorAll(this.btnSelector);
        
        this.init();
    }
    
    init() {
        if (this.cards.length === 0 || this.buttons.length === 0) {
            console.warn('Testimonials: Elementos não encontrados');
            return;
        }
        
        this.attachEventListeners();
        this.setupKeyboardNavigation();
        
        if (this.autoplay) {
            this.startAutoplay();
        }
    }
    
    attachEventListeners() {
        this.buttons.forEach((btn, index) => {
            btn.addEventListener('click', () => this.showTestimonial(index));
            btn.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showTestimonial(index);
                }
            });
        });
    }
    
    showTestimonial(index) {
        if (index < 0 || index >= this.cards.length) return;
        
        // Remover classe ativa de todos os cards e botões
        this.cards.forEach(card => card.classList.remove(this.activeClass));
        this.buttons.forEach(btn => btn.classList.remove(this.activeClass));
        
        // Adicionar classe ativa ao card e botão selecionado
        this.cards[index].classList.add(this.activeClass);
        this.buttons[index].classList.add(this.activeClass);
        
        this.currentIndex = index;
        
        // Scroll para o card se necessário
        this.scrollToCard(this.cards[index]);
    }
    
    scrollToCard(card) {
        const container = card.parentElement;
        if (container) {
            const cardRect = card.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            if (cardRect.top < containerRect.top) {
                container.scrollTop -= containerRect.top - cardRect.top;
            } else if (cardRect.bottom > containerRect.bottom) {
                container.scrollTop += cardRect.bottom - containerRect.bottom;
            }
        }
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.cards || this.cards.length === 0) return;
            
            if (e.key === 'ArrowLeft') {
                const prevIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
                this.showTestimonial(prevIndex);
            } else if (e.key === 'ArrowRight') {
                const nextIndex = (this.currentIndex + 1) % this.cards.length;
                this.showTestimonial(nextIndex);
            }
        });
    }
    
    nextTestimonial() {
        const nextIndex = (this.currentIndex + 1) % this.cards.length;
        this.showTestimonial(nextIndex);
    }
    
    prevTestimonial() {
        const prevIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.showTestimonial(prevIndex);
    }
    
    startAutoplay() {
        this.autoplayTimer = setInterval(() => {
            this.nextTestimonial();
        }, this.autoplayInterval);
    }
    
    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
        }
    }
    
    destroy() {
        this.stopAutoplay();
        this.buttons.forEach(btn => {
            btn.removeEventListener('click', this.showTestimonial);
        });
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar testimonials manager
    const testimonialsManager = new TestimonialsManager({
        containerSelector: '.testimonials-container',
        cardSelector: '.testimonial-card',
        btnSelector: '.testimonial-btn',
        activeClass: 'active',
        autoplayInterval: 6000,
        autoplay: false // Alterar para true para autoplay automático
    });
    
    // Exportar para escopo global
    window.testimonialsManager = testimonialsManager;

    // Lightbox para imagens de depoimentos
    function createImageModal() {
        if (document.getElementById('image-modal-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'image-modal-overlay';
        overlay.className = 'image-modal-overlay';

        const img = document.createElement('img');
        img.alt = '';
        overlay.appendChild(img);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.setAttribute('aria-label', 'Fechar imagem');
        closeBtn.innerHTML = '&times;';
        overlay.appendChild(closeBtn);

        // fechar ao clicar no overlay (fora da imagem) ou no botão
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target === closeBtn) {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            }
        });

        // fechar com ESC
        function onKey(e) {
            if (e.key === 'Escape') {
                if (document.getElementById('image-modal-overlay')) {
                    document.body.removeChild(overlay);
                    document.body.style.overflow = '';
                    document.removeEventListener('keydown', onKey);
                }
            }
        }

        document.addEventListener('keydown', onKey);

        document.body.appendChild(overlay);
        return overlay;
    }

    function openImageModal(src, alt) {
        const overlay = createImageModal();
        const img = overlay.querySelector('img');
        img.src = src;
        img.alt = alt || '';
        document.body.style.overflow = 'hidden';
    }

    // Anexa ouvintes às imagens de depoimentos
    const testimonialImgs = document.querySelectorAll('.testimonial-print img');
    testimonialImgs.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            // usar versão maior se existir (data-full-src) senão usar src
            const fullSrc = img.dataset.fullSrc || img.src;
            openImageModal(fullSrc, img.alt);
        });
    });
});

// ========================================
// FUNÇÃO COMPATÍVEL COM HTML INLINE
// ========================================

function showTestimonial(index) {
    if (window.testimonialsManager) {
        window.testimonialsManager.showTestimonial(index);
    } else {
        // Fallback se manager não estiver inicializado
        const cards = document.querySelectorAll('.testimonial-card');
        const buttons = document.querySelectorAll('.testimonial-btn');
        
        if (index >= 0 && index < cards.length) {
            cards.forEach(card => card.classList.remove('active'));
            buttons.forEach(btn => btn.classList.remove('active'));
            
            cards[index].classList.add('active');
            buttons[index].classList.add('active');
        }
    }
}

// Exportar classe
window.TestimonialsManager = TestimonialsManager;
