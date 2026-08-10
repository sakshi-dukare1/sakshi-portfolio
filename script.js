// ===== NAVBAR ACTIVE LINK + HAMBURGER =====
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navLinks');

// Hamburger toggle
hamburger.addEventListener('click', () => {
  navList.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
  });
});

// Active link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log('🚀 Portfolio loaded successfully!');