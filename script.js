// ====== PAGE LOADER ======
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader-wrapper');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 800);
});

// ====== READING PROGRESS BAR ======
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});

// ====== MOUSE TRAIL ======
const trail = document.querySelector('.mouse-trail');
let isDesktop = window.innerWidth > 700;

window.addEventListener('resize', () => {
  isDesktop = window.innerWidth > 700;
  if (!isDesktop) {
    trail.classList.remove('active');
  }
});

document.addEventListener('mousemove', (e) => {
  if (!isDesktop) return;
  trail.classList.add('active');
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
});

document.addEventListener('mouseleave', () => {
  trail.classList.remove('active');
});

// ====== BACK TO TOP BUTTON ======
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ====== TYPING ANIMATION ======
const typingTexts = ['in control', 'productive', 'organized', 'stress-free'];
const typingElement = document.querySelector('.typing-text');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => { isDeleting = true; }, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
  }

  const speed = isDeleting ? 80 : 120;
  setTimeout(typeEffect, speed);
}

typeEffect();

// ====== MOUSE TILT & PARALLAX ON HERO IMAGE ======
const heroImage = document.querySelector('.hero-image img');

if (heroImage) {
  heroImage.addEventListener('mousemove', (e) => {
    const rect = heroImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt effect
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    // Parallax shift
    const shiftX = ((x - centerX) / centerX) * 15;
    const shiftY = ((y - centerY) / centerY) * 15;

    heroImage.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${shiftX}px, ${shiftY}px) scale(1.03)`;
    heroImage.style.transition = 'transform 0.1s ease-out';
  });

  heroImage.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translate(0px, 0px) scale(1)';
    heroImage.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  });
}

// ====== ANIMATED COUNTERS ======
const counters = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-count'));
      let current = 0;
      const increment = target / 40;
      const duration = 1500;
      const stepTime = duration / 40;

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          entry.target.textContent = target + (target > 1 ? '+' : '');
          clearInterval(counter);
        } else {
          entry.target.textContent = Math.floor(current);
        }
      }, stepTime);

      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ====== HERO STATS COUNTERS ======
const heroCounters = [
  { element: document.getElementById('counter1'), target: 500 },
  { element: document.getElementById('counter2'), target: 2 },
  { element: document.getElementById('counter3'), target: 17 }
];

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      heroCounters.forEach(({ element, target }) => {
        let current = 0;
        const increment = target / 40;
        const duration = 1500;
        const stepTime = duration / 40;

        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            element.textContent = Math.floor(target) + (target > 1 ? '+' : '');
            clearInterval(counter);
          } else {
            element.textContent = Math.floor(current);
          }
        }, stepTime);
      });
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats-mini');
if (heroStats) {
  heroObserver.observe(heroStats);
}

// ====== FADE IN ON SCROLL ======
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

// ====== GLASS NAVBAR SCROLL EFFECT ======
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ====== HAMBURGER MENU ======
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar')) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// ====== SMOOTH SCROLL ======
document.querySelectorAll('.nav-links a, .btn[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ====== PORTFOLIO CAROUSEL - AUTO SCROLLING ======
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;
let totalSlides = slides.length;
let autoPlayInterval;
let isTransitioning = false;

// Calculate visible slides based on screen width
function getVisibleSlides() {
  if (window.innerWidth <= 700) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

// Update carousel
function updateCarousel(index, animate = true) {
  if (isTransitioning && animate) return;
  isTransitioning = true;

  const visibleSlides = getVisibleSlides();
  const slideWidth = slides[0].offsetWidth + 24;
  const maxIndex = Math.max(0, totalSlides - visibleSlides);

  // Clamp index
  if (index < 0) index = maxIndex;
  if (index > maxIndex) index = 0;
  currentIndex = index;

  // Move track
  const offset = -currentIndex * slideWidth;
  track.style.transition = animate ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
  track.style.transform = `translateX(${offset}px)`;

  // Update dots
  const dotCount = Math.max(1, totalSlides - visibleSlides + 1);
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });

  // Enable/disable buttons
  prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
  prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
  nextBtn.style.opacity = currentIndex === maxIndex ? '0.3' : '1';
  nextBtn.style.pointerEvents = currentIndex === maxIndex ? 'none' : 'auto';

  setTimeout(() => {
    isTransitioning = false;
  }, 600);
}

// Create dots
function createDots() {
  const visibleSlides = getVisibleSlides();
  const dotCount = Math.max(1, totalSlides - visibleSlides + 1);
  dotsContainer.innerHTML = '';

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('data-index', i);
    dot.addEventListener('click', () => {
      if (!isTransitioning) {
        updateCarousel(i);
        resetAutoPlay();
      }
    });
    dotsContainer.appendChild(dot);
  }
}

// Next function
function nextSlide() {
  const visibleSlides = getVisibleSlides();
  const maxIndex = Math.max(0, totalSlides - visibleSlides);
  let nextIndex = currentIndex + 1;
  if (nextIndex > maxIndex) {
    nextIndex = 0;
  }
  updateCarousel(nextIndex);
}

// Prev function
function prevSlide() {
  if (currentIndex > 0) {
    updateCarousel(currentIndex - 1);
  } else {
    const visibleSlides = getVisibleSlides();
    const maxIndex = Math.max(0, totalSlides - visibleSlides);
    updateCarousel(maxIndex);
  }
}

// Auto-play
function startAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(nextSlide, 3500);
}

function resetAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }
}

// Event listeners
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });
}

// Handle resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    createDots();
    updateCarousel(currentIndex, false);
  }, 250);
});

// Initialize carousel
function initCarousel() {
  if (slides.length === 0) return;
  createDots();
  updateCarousel(0, false);
  startAutoPlay();
}

// Wait for images to load
if (document.readyState === 'complete') {
  setTimeout(initCarousel, 500);
} else {
  window.addEventListener('load', () => {
    setTimeout(initCarousel, 500);
  });
}

// Pause on hover
const carouselWrapper = document.querySelector('.carousel-wrapper');
if (carouselWrapper) {
  carouselWrapper.addEventListener('mouseenter', () => {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  });

  carouselWrapper.addEventListener('mouseleave', () => {
    startAutoPlay();
  });

  // Also handle touch devices
  carouselWrapper.addEventListener('touchstart', () => {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  });

  carouselWrapper.addEventListener('touchend', () => {
    startAutoPlay();
  });
}

// ====== CONTACT FORM ======
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    // Formspree handles submission natively
    // No need to prevent default
  });
}