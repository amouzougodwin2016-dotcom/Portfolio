document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4;
        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < triggerBottom) {
                el.classList.add('active');

                // Animate progress bars if they exist inside the revealed element
                const bars = el.querySelectorAll('.progress');
                bars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Typewriter Effect
    const typewriterEl = document.getElementById('typewriter');
    const words = ["optimiste", "aspirant à être créatif", "à la recherche d'opportunités"];
    let wordIdx = 0;
    let charIdx = 0;
    let isDel = false;

    function playTypewriter() {
        if (!typewriterEl) return;
        const currentWord = words[wordIdx];
        let speed = 40; // Matched with main.js

        if (isDel) {
            typewriterEl.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
            speed = 20; // Matched with main.js
        } else {
            typewriterEl.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
        }

        if (!isDel && charIdx === currentWord.length) {
            isDel = true;
            speed = 1000; // Matched with main.js
        } else if (isDel && charIdx === 0) {
            isDel = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 200; // Matched with main.js
        }

        setTimeout(playTypewriter, speed);
    }
    playTypewriter();

    // Bottom Nav Active State on Scroll
    const sections = document.querySelectorAll('section');
    const navTabs = document.querySelectorAll('.nav-tab');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('href').includes(current)) {
                tab.classList.add('active');
            }
        });
    });

    // Smooth Scroll for Nav Tabs
    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
});
