/* ========================================
   CENTRAL DA ODONTOLOGIA - MAIN.JS
   Script Principal e Funcionalidades Gerais
   ======================================== */

'use strict';

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Central da Odontologia - Inicializando...');
    
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initLazyLoading();
    initPerformance();
    
    console.log('Central da Odontologia - Pronto!');
});

// ========================================
// MOBILE MENU - HAMBURGER
// ========================================

function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('mobile-active');
    }
}

function closeMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('mobile-active');
    }
}

function initMobileMenu() {
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const nav = document.querySelector('nav');
        
        if (hamburger && navLinks && nav) {
            if (!nav.contains(event.target) && navLinks.classList.contains('mobile-active')) {
                closeMenu();
            }
        }
    });
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('navLinks');
            
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('mobile-active');
            }
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar URL
                    window.history.pushState(null, null, href);
                }
            }
        });
    });
}

// ========================================
// SCROLL REVEAL
// ========================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// LAZY LOADING DE IMAGENS
// ========================================

function initLazyLoading() {
    // Verificar suporte nativo
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Carregar imagem
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback para navegadores antigos
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
    }
}

// ========================================
// PERFORMANCE
// ========================================

function initPerformance() {
    // Monitorar performance
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log('Tempo de carregamento da página: ' + pageLoadTime + 'ms');
        });
    }
    
    // Preload de recursos críticos
    preloadCriticalResources();
}

function preloadCriticalResources() {
    const criticalResources = [
        { rel: 'preload', as: 'style', href: 'assets/css/style.css' },
        { rel: 'preload', as: 'image', href: 'assets/img/hero/hero-bg.webp' }
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = resource.rel;
        link.as = resource.as;
        link.href = resource.href;
        document.head.appendChild(link);
    });
}

// ========================================
// UTILITÁRIOS
// ========================================

/**
 * Debounce function para otimizar event listeners
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function para limitar execução
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Adicionar classe quando elemento está visível
 */
function addClassOnScroll(selector, className) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => observer.observe(element));
}

/**
 * Remover classe quando elemento sai da visão
 */
function removeClassOnScroll(selector, className) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.classList.remove(className);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => observer.observe(element));
}

/**
 * Animar número até um valor
 */
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
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

/**
 * Copiar texto para clipboard
 */
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Texto copiado!');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
        });
    } else {
        // Fallback para navegadores antigos
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

/**
 * Formatar telefone
 */
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

/**
 * Validar email
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validar telefone
 */
function validatePhone(phone) {
    const regex = /^(\+\d{1,3}[- ]?)?\d{10,}$/;
    return regex.test(phone.replace(/\D/g, ''));
}

/**
 * Obter parâmetro da URL
 */
function getUrlParameter(name) {
    const url = new URL(window.location);
    return url.searchParams.get(name);
}

/**
 * Definir parâmetro na URL
 */
function setUrlParameter(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.replaceState({}, document.title, url);
}

/**
 * Verificar se elemento está em viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Scroll para elemento
 */
function scrollToElement(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (element) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetPosition = element.offsetTop - headerHeight - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Detectar dispositivo
 */
function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
        return 'mobile';
    } else if (/tablet|ipad/i.test(userAgent)) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}

/**
 * Detectar navegador
 */
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    
    let browser = 'Unknown';
    let version = 'Unknown';
    
    if (userAgent.indexOf('Chrome') > -1) {
        browser = 'Chrome';
        version = userAgent.substring(userAgent.indexOf('Chrome') + 7, userAgent.indexOf('Chrome') + 10);
    } else if (userAgent.indexOf('Safari') > -1) {
        browser = 'Safari';
        version = userAgent.substring(userAgent.indexOf('Version') + 8, userAgent.indexOf('Version') + 11);
    } else if (userAgent.indexOf('Firefox') > -1) {
        browser = 'Firefox';
        version = userAgent.substring(userAgent.indexOf('Firefox') + 8, userAgent.indexOf('Firefox') + 11);
    }
    
    return { browser, version };
}

/**
 * Verificar suporte de features
 */
function checkFeatureSupport() {
    return {
        localStorage: typeof(Storage) !== 'undefined',
        sessionStorage: typeof(sessionStorage) !== 'undefined',
        serviceWorker: 'serviceWorker' in navigator,
        geolocation: 'geolocation' in navigator,
        notification: 'Notification' in window,
        vibration: 'vibrate' in navigator,
        clipboard: navigator.clipboard !== undefined,
        webGL: !!window.WebGLRenderingContext
    };
}

/**
 * Adicionar evento com suporte a múltiplos elementos
 */
function addEvent(selector, eventType, callback) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.addEventListener(eventType, callback);
    });
}

/**
 * Remover evento de múltiplos elementos
 */
function removeEvent(selector, eventType, callback) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.removeEventListener(eventType, callback);
    });
}

/**
 * Delegação de eventos
 */
function delegateEvent(parentSelector, childSelector, eventType, callback) {
    const parent = document.querySelector(parentSelector);
    
    if (parent) {
        parent.addEventListener(eventType, (e) => {
            const child = e.target.closest(childSelector);
            if (child) {
                callback.call(child, e);
            }
        });
    }
}

/**
 * Exportar funções globais
 */
window.ODUtils = {
    debounce,
    throttle,
    addClassOnScroll,
    removeClassOnScroll,
    animateNumber,
    copyToClipboard,
    formatPhone,
    validateEmail,
    validatePhone,
    getUrlParameter,
    setUrlParameter,
    isInViewport,
    scrollToElement,
    getDeviceType,
    getBrowserInfo,
    checkFeatureSupport,
    addEvent,
    removeEvent,
    delegateEvent
};
