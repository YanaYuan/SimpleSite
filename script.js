// Smooth scroll animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to gallery items
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(item);
});

// Apply animation to service items
document.querySelectorAll('.service-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(item);
});

// Gallery item hover effect
document.querySelectorAll('.gallery-item').forEach(item => {
    const image = item.querySelector('.gallery-image');
    
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const heroSpeed = 0.5;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * heroSpeed}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Cursor effect (optional - luxury touch)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'custom-cursor-dot';
document.body.appendChild(cursorDot);

// Add cursor styles
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 40px;
        height: 40px;
        border: 1px solid rgba(10, 10, 10, 0.3);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.15s ease;
        transition-property: width, height, border;
        mix-blend-mode: difference;
    }
    
    .custom-cursor-dot {
        width: 6px;
        height: 6px;
        background: rgba(10, 10, 10, 0.8);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    }
    
    .custom-cursor.hover {
        width: 60px;
        height: 60px;
        border-color: rgba(10, 10, 10, 0.5);
    }
    
    @media (max-width: 1024px) {
        .custom-cursor,
        .custom-cursor-dot {
            display: none;
        }
    }
`;
document.head.appendChild(style);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor follow
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    dotX += (mouseX - dotX) * 0.15;
    dotY += (mouseY - dotY) * 0.15;
    
    cursor.style.left = cursorX - 20 + 'px';
    cursor.style.top = cursorY - 20 + 'px';
    
    cursorDot.style.left = dotX - 3 + 'px';
    cursorDot.style.top = dotY - 3 + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .gallery-item, .service-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Hide default cursor
document.body.style.cursor = 'none';
document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.style.cursor = 'none';
});

// Number counter animation for stats
const animateCounter = (element, target) => {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

console.log('%c ATELIER ', 'background: #0a0a0a; color: #ffffff; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Design Studio © 2024 ', 'color: #666666; font-size: 12px;');
