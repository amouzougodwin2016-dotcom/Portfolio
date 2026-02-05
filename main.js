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
    }
});

// Mobile Menu Toggle
const menuToggle = document.createElement('div');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';

const navContainer = document.querySelector('nav .container');
if (navContainer) {
    navContainer.appendChild(menuToggle);
}

// Create Mobile Menu Drawer if it doesn't exist
let mobileMenu = document.querySelector('.mobile-menu');
if (!mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';

    const navLinks = document.querySelector('.nav-links').cloneNode(true);
    navLinks.className = 'nav-links-mobile';

    mobileMenu.appendChild(navLinks);
    document.body.appendChild(mobileMenu);
}

// Create Overlay
let overlay = document.querySelector('.menu-overlay');
if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
}

const toggleMenu = () => {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');

    // Toggle icon
    const icon = menuToggle.querySelector('ion-icon');
    if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('name', 'close-outline');
    } else {
        icon.setAttribute('name', 'menu-outline');
    }
};

menuToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        menuToggle.querySelector('ion-icon').setAttribute('name', 'menu-outline');
    });
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
