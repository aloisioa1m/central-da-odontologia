/* ========================================
   CENTRAL DA ODONTOLOGIA - ANIMATIONS.JS
   Gerenciamento de Animações Avançadas
   ======================================== */

'use strict';

class AnimationManager {
    constructor(options = {}) {
        this.animationClass = options.animationClass || 'animate-fade-in';
        this.observerOptions = options.observerOptions || {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
    }
    
    /**
     * Setup Intersection Observer para animações de scroll
     */
    setupIntersectionObserver() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        if (animatedElements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationClass = entry.target.dataset.animate || this.animationClass;
                    const delay = entry.target.dataset.animateDelay || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add(animationClass);
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    /**
     * Setup animações de scroll
     */
    setupScrollAnimations() {
        const scrollElements = document.querySelectorAll('.scroll-reveal');
        
        if (scrollElements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        scrollElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    /**
     * Setup animações de hover
     */
    setupHoverAnimations() {
        const hoverElements = document.querySelectorAll('[data-hover-animate]');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                const animation = element.dataset.hoverAnimate;
                element.classList.add(animation);
            });
            
            element.addEventListener('mouseleave', () => {
                const animation = element.dataset.hoverAnimate;
                element.classList.remove(animation);
            });
        });
    }
    
    /**
     * Animar elemento
     */
    animateElement(element, animationClass, duration = 600) {
        return new Promise((resolve) => {
            element.classList.add(animationClass);
            
            const handleAnimationEnd = () => {
                element.removeEventListener('animationend', handleAnimationEnd);
                resolve();
            };
            
            element.addEventListener('animationend', handleAnimationEnd);
            
            // Fallback se animação não funcionar
            setTimeout(() => {
                element.removeEventListener('animationend', handleAnimationEnd);
                resolve();
            }, duration);
        });
    }
    
    /**
     * Animar múltiplos elementos em sequência
     */
    async animateSequence(elements, animationClass, delay = 100) {
        for (const element of elements) {
            await this.animateElement(element, animationClass);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    /**
     * Animar múltiplos elementos em paralelo
     */
    animateParallel(elements, animationClass) {
        return Promise.all(
            Array.from(elements).map(element => 
                this.animateElement(element, animationClass)
            )
        );
    }
    
    /**
     * Remover classe de animação
     */
    removeAnimation(element, animationClass) {
        element.classList.remove(animationClass);
    }
    
    /**
     * Limpar todas as animações
     */
    clearAnimations(selector = '*') {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.remove(
                'animate-fade-in',
                'animate-fade-in-up',
                'animate-fade-in-down',
                'animate-fade-in-left',
                'animate-fade-in-right',
                'animate-slide-in-left',
                'animate-slide-in-right',
                'animate-slide-in-up',
                'animate-slide-in-down',
                'animate-zoom-in',
                'animate-scale-in',
                'animate-rotate-in'
            );
        });
    }
}

// ========================================
// SCROLL TRIGGER ANIMATIONS
// ========================================

class ScrollTrigger {
    constructor(options = {}) {
        this.elements = document.querySelectorAll(options.selector || '.scroll-reveal');
        this.offset = options.offset || 0;
        this.animationClass = options.animationClass || 'visible';
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.checkElements());
        this.checkElements(); // Verificar elementos inicialmente
    }
    
    checkElements() {
        this.elements.forEach(element => {
            if (this.isInView(element)) {
                element.classList.add(this.animationClass);
            }
        });
    }
    
    isInView(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight - this.offset &&
            rect.bottom >= 0
        );
    }
}

// ========================================
// PARALLAX EFFECT
// ========================================

class ParallaxEffect {
    constructor(selector = '.parallax', speed = 0.5) {
        this.elements = document.querySelectorAll(selector);
        this.speed = speed;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.updateParallax());
    }
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(element => {
            const elementOffset = element.offsetTop;
            const yPos = (elementOffset - scrolled) * this.speed;
            
            element.style.backgroundPosition = `center ${yPos}px`;
        });
    }
}

// ========================================
// COUNTER ANIMATION
// ========================================

class CounterAnimation {
    constructor(selector = '.counter', duration = 2000) {
        this.elements = document.querySelectorAll(selector);
        this.duration = duration;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        this.elements.forEach(element => observer.observe(element));
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.target) || parseInt(element.textContent);
        const increment = target / (this.duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ========================================
// STAGGER ANIMATION
// ========================================

class StaggerAnimation {
    constructor(selector = '.stagger-item', delay = 100) {
        this.elements = document.querySelectorAll(selector);
        this.delay = delay;
        
        this.init();
    }
    
    init() {
        this.elements.forEach((element, index) => {
            element.style.animationDelay = `${index * this.delay}ms`;
        });
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Animation Manager
    const animationManager = new AnimationManager({
        animationClass: 'animate-fade-in',
        observerOptions: {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    });
    
    // Inicializar Scroll Trigger
    const scrollTrigger = new ScrollTrigger({
        selector: '.scroll-reveal',
        offset: 100,
        animationClass: 'visible'
    });
    
    // Inicializar Parallax (opcional)
    // const parallax = new ParallaxEffect('.parallax', 0.5);
    
    // Inicializar Counter Animation
    const counterAnimation = new CounterAnimation('.counter', 2000);
    
    // Inicializar Stagger Animation
    const staggerAnimation = new StaggerAnimation('.stagger-item', 100);
    
    // Exportar para escopo global
    window.animationManager = animationManager;
    window.scrollTrigger = scrollTrigger;
    window.counterAnimation = counterAnimation;
    window.staggerAnimation = staggerAnimation;
});

// ========================================
// EXPORTAR CLASSES
// ========================================

window.AnimationManager = AnimationManager;
window.ScrollTrigger = ScrollTrigger;
window.ParallaxEffect = ParallaxEffect;
window.CounterAnimation = CounterAnimation;
window.StaggerAnimation = StaggerAnimation;
