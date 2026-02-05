// Navigation Scroll Effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.padding = '1rem 0';
    } else {
        nav.classList.remove('scrolled');
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.padding = '1.5rem 0';
    }
});

// Reveal Animations on Scroll
const revealElements = document.querySelectorAll('[data-reveal]');
const skillBars = document.querySelectorAll('.progress');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight / 5 * 4;

    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add('active');
            // Check if this revealed element contains skill bars
            const bars = el.querySelectorAll('.progress');
            bars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }
    });
};

// Also check specifically for skill section if it's not inside a data-reveal wrapper or acts independently
const animateSkills = () => {
    const triggerBottom = window.innerHeight;
    skillBars.forEach(bar => {
        const top = bar.getBoundingClientRect().top;
        if (top < triggerBottom) {
            bar.style.width = bar.getAttribute('data-width');
        }
    });
}

window.addEventListener('scroll', () => {
    revealOnScroll();
    animateSkills();
});

// Initial call
revealOnScroll();

// Stats Counter Animation
const counters = document.querySelectorAll('.stat-number');
let started = false; // Function started ?

function startCount(el) {
    let goal = el.dataset.count;
    let count = setInterval(() => {
        let text = el.innerText;
        // remove symbols like +, %
        let current = parseInt(text.replace(/\D/g, '')) || 0;

        if (current < goal) {
            el.innerText = (current + 1) + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '');
        } else {
            el.innerText = goal + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '');
            clearInterval(count);
        }
    }, 2000 / goal); // Duration
}

// Add Scroll listener for stats
window.addEventListener('scroll', () => {
    if (!started) {
        counters.forEach(counter => {
            if (counter.getBoundingClientRect().top < window.innerHeight) {
                startCount(counter);
                started = true; // Run only once basically (simple implementation)
            }
        });
    }
});

// Typewriter Effect
const typewriterEl = document.getElementById('typewriter');
const words = ["optimiste", "aspirant à être créatif", "à la recherche d'opportunités"];
let wordIdx = 0;
let charIdx = 0;
let isDel = false;

function playTypewriter() {
    const currentWord = words[wordIdx];
    let speed = 40; // Super fast typing

    if (isDel) {
        typewriterEl.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        speed = 20; // Super fast deleting
    } else {
        typewriterEl.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    if (!isDel && charIdx === currentWord.length) {
        isDel = true;
        speed = 1000; // Shorter pause at the end
    } else if (isDel && charIdx === 0) {
        isDel = false;
        wordIdx = (wordIdx + 1) % words.length;
        speed = 200; // Quick transition to next word
    }

    setTimeout(playTypewriter, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typewriterEl) {
        playTypewriter();
    }
});
// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('ion-icon');
        icon.name = navLinks.classList.contains('active') ? 'close-outline' : 'menu-outline';
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('ion-icon');
        if (icon) icon.name = 'menu-outline';
    });
});
