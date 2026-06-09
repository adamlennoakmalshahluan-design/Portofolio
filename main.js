/* =====================================================
   ADAM LENNO — PORTFOLIO
   main.js  |  Interactions & Animations
   ===================================================== */

'use strict';

// =====================================================
// 1. LOADER
// =====================================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }
    initAll();
  }, 1600);
});

document.body.style.overflow = 'hidden';

function initAll() {
  initCursor();
  initNavbar();
  initHamburger();
  initTyped();
  initScrollReveal();
  initStatCounters();
  initSkillBars();
  initProjectFilter();
  initContactForm();
  initActiveNav();
}

// =====================================================
// 2. CUSTOM CURSOR
// =====================================================
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect
  const hoverEls = document.querySelectorAll('a, button, .skill-card, .project-card, .contact-link, .filter-btn');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.opacity = '0.5';
      follower.style.width = '60px';
      follower.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursor.style.opacity = '1';
      follower.style.width = '36px';
      follower.style.height = '36px';
    });
  });
}

// =====================================================
// 3. NAVBAR — scroll & shrink
// =====================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// =====================================================
// 4. HAMBURGER MENU
// =====================================================
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close when a link is clicked
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      btn.classList.remove('open');
      links.classList.remove('open');
    }
  });
}

// =====================================================
// 5. TYPED TEXT EFFECT
// =====================================================
function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;

  const texts = [
    'UI/UX Designer',
    'Web Developer',
    'Project Manager',
    'Filmmaker',
    'Digital Creator',
  ];

  let textIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseTime = 0;

  function type() {
    const currentText = texts[textIdx];

    if (!deleting) {
      el.textContent = currentText.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentText.length) {
        deleting = true;
        pauseTime = 2000;
        setTimeout(type, pauseTime);
        return;
      }
    } else {
      el.textContent = currentText.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
        setTimeout(type, 400);
        return;
      }
    }

    setTimeout(type, deleting ? 50 : 80);
  }

  setTimeout(type, 1000);
}

// =====================================================
// 6. SCROLL REVEAL
// =====================================================
function initScrollReveal() {
  // Add reveal class to elements
  const revealSelectors = [
    '#hero-badge', '#hero-title', '#hero-subtitle', '#hero-desc', '#hero-cta',
    '.stat-card', '.about-visual', '.about-content', '.value-item',
    '.skill-card', '.timeline-item', '.project-card',
    '#contact-info', '#contact-form',
    '.section-header',
  ];

  const allRevealEls = [];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      if (i === 1) el.classList.add('reveal-delay-1');
      if (i === 2) el.classList.add('reveal-delay-2');
      if (i === 3) el.classList.add('reveal-delay-3');
      allRevealEls.push(el);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  allRevealEls.forEach(el => observer.observe(el));
}

// =====================================================
// 7. STAT COUNTERS
// =====================================================
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCount(el, 0, target, 1500);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}

function animateCount(el, start, end, duration) {
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(start + (end - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = end;
  }
  requestAnimationFrame(update);
}

// =====================================================
// 8. SKILL BARS
// =====================================================
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width;
        const fill = bar.querySelector('.skill-bar-fill');
        if (fill) {
          setTimeout(() => {
            fill.style.width = width + '%';
          }, 200);
        }
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// =====================================================
// 9. PROJECT FILTER
// =====================================================
function initProjectFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category;
        const match = filter === 'all' || cat === filter;

        if (match) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// =====================================================
// 10. CONTACT FORM
// =====================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const sendBtn = document.getElementById('btn-send');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      // Shake invalid fields
      [document.getElementById('form-name'),
        document.getElementById('form-email'),
        document.getElementById('form-message')].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#f87171';
          field.style.animation = 'shake 0.4s ease';
          setTimeout(() => {
            field.style.borderColor = '';
            field.style.animation = '';
          }, 600);
        }
      });
      return;
    }

    // Simulate send
    sendBtn.innerHTML = '<span>Mengirim...</span>';
    sendBtn.disabled = true;

    setTimeout(() => {
      sendBtn.innerHTML = '<span>Kirim Pesan</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      sendBtn.disabled = false;
      form.reset();
      if (successMsg) {
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }
    }, 1800);
  });
}

// =====================================================
// 11. ACTIVE NAV LINK ON SCROLL
// =====================================================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
}

// =====================================================
// 12. ADD SHAKE ANIMATION
// =====================================================
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-6px)}
    40%{transform:translateX(6px)}
    60%{transform:translateX(-4px)}
    80%{transform:translateX(4px)}
  }
  @keyframes fadeIn {
    from{opacity:0;transform:scale(0.96)}
    to{opacity:1;transform:scale(1)}
  }
`;
document.head.appendChild(shakeStyle);
