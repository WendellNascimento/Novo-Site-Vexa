const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const revealElements = document.querySelectorAll('.reveal');
const yearElement = document.getElementById('year');
const header = document.querySelector('.site-header');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (header) {
  const toggleHeaderState = () => {
    header.classList.toggle('scrolled', window.scrollY > 18);
  };

  toggleHeaderState();
  window.addEventListener('scroll', toggleHeaderState, { passive: true });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach((element) => observer.observe(element));
