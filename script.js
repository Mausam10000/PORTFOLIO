/* ============================================================
   MAUSAM ACHARYA — PORTFOLIO JS
   Advanced Interactions | Animations | Modern
   ============================================================ */

'use strict';

/* ============================================================
   1. LOADER
   ============================================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    // Kick off entrance animations after loader
    document.body.style.overflow = '';
    animateHeroEntrance();
  }, 1200);
});

// Prevent scroll during load
document.body.style.overflow = 'hidden';


/* ============================================================
   2. CUSTOM DUAL CURSOR
   ============================================================ */
const cursorDot     = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Smooth outline follow via rAF
function animateCursor() {
  outlineX += (mouseX - outlineX) * 0.12;
  outlineY += (mouseY - outlineY) * 0.12;
  cursorOutline.style.left = outlineX + 'px';
  cursorOutline.style.top  = outlineY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover expand
const hoverTargets = document.querySelectorAll(
  'a, button, .skill-card, .project-card, .interest-card, .filter-btn, .back-top'
);

hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.classList.add('hovered');
    cursorOutline.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('hovered');
    cursorOutline.classList.remove('hovered');
  });
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity    = '0';
  cursorOutline.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity    = '1';
  cursorOutline.style.opacity = '1';
});


/* ============================================================
   3. NAVBAR — SCROLL STATE + ACTIVE LINK
   ============================================================ */
const header   = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // scrolled class
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // active nav link highlight
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // back to top
  handleBackTop();

  // reveal elements
  revealOnScroll();
});


/* ============================================================
   4. MOBILE MENU
   ============================================================ */
const menuBtn    = document.getElementById('menuBtn');
const navLinksList = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  navLinksList.classList.toggle('open');
});

// Close on nav link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    navLinksList.classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (
    navLinksList.classList.contains('open') &&
    !navLinksList.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    menuBtn.classList.remove('open');
    navLinksList.classList.remove('open');
  }
});


/* ============================================================
   5. SMOOTH SCROLL FOR ALL ANCHOR LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 90;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ============================================================
   6. TYPING EFFECT
   ============================================================ */
const words = [
  'BIT Student',
  'Python Developer',
  'Django Learner',
  'Backend Enthusiast',
  'Creative Thinker',
];

let wordIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
let typingEl   = document.getElementById('typing');

function typeEffect() {
  const word     = words[wordIndex];
  const speed    = isDeleting ? 55 : 100;
  const pauseEnd = 1600;
  const pauseStart = 300;

  typingEl.textContent = word.substring(0, charIndex);

  if (!isDeleting) {
    charIndex++;
    if (charIndex > word.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseEnd);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, pauseStart);
      return;
    }
  }

  setTimeout(typeEffect, speed);
}

typeEffect();


/* ============================================================
   7. HERO ENTRANCE ANIMATION
   ============================================================ */
function animateHeroEntrance() {
  const items = [
    '.badge',
    '.intro-label',
    '.hero-name',
    '.hero-role',
    '.hero-desc',
    '.hero-cta',
    '.hero-socials',
    '.profile-wrapper',
  ];

  items.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity   = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    setTimeout(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }, 180 + i * 110);
  });
}


/* ============================================================
   8. SCROLL REVEAL
   ============================================================ */
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('active');
      animateSkillBars(el);
    }
  });
}

// Initial check (above fold)
revealOnScroll();


/* ============================================================
   9. SKILL BAR ANIMATION
   ============================================================ */
function animateSkillBars(container) {
  const cards = container.querySelectorAll
    ? container.querySelectorAll('.skill-card')
    : [];

  if (!cards.length) return;

  cards.forEach((card, i) => {
    if (card.classList.contains('animated')) return;
    setTimeout(() => {
      card.classList.add('animated');
    }, i * 120);
  });
}

// Also trigger if skills section already visible on load
window.addEventListener('load', () => {
  setTimeout(revealOnScroll, 1400);
});


/* ============================================================
   10. PROJECT FILTER TABS
   ============================================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter || cat === 'all';

      if (show) {
        card.classList.remove('hidden');
        card.style.animation = 'filterIn 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Inject keyframe for filter animation
const filterStyle = document.createElement('style');
filterStyle.textContent = `
  @keyframes filterIn {
    from { opacity:0; transform:translateY(16px) scale(0.97); }
    to   { opacity:1; transform:translateY(0)    scale(1);    }
  }
`;
document.head.appendChild(filterStyle);


/* ============================================================
   11. CONTACT FORM SUBMISSION
   ============================================================ */
const contactForm   = document.getElementById('contactForm');
const formSuccess   = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    submitBtn.disabled  = true;

    // Simulate async send (replace with actual API call)
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.disabled  = false;
      contactForm.reset();
      formSuccess.classList.add('show');

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    }, 1800);
  });
}


/* ============================================================
   12. BACK TO TOP BUTTON
   ============================================================ */
const backTopBtn = document.getElementById('backTop');

function handleBackTop() {
  if (window.scrollY > 500) {
    backTopBtn.classList.add('show');
  } else {
    backTopBtn.classList.remove('show');
  }
}

backTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================================
   13. TILT EFFECT ON PROJECT CARDS
   ============================================================ */
document.querySelectorAll('.project-card:not(.project-placeholder)').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect    = card.getBoundingClientRect();
    const centerX = rect.left + rect.width  / 2;
    const centerY = rect.top  + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -6;
    const rotateY = ((e.clientX - centerX) / (rect.width  / 2)) *  6;

    card.style.transform =
      `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform 0.4s ease';
  });
});


/* ============================================================
   14. SKILL CARD SUBTLE GLOW ON HOVER
   ============================================================ */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--gx', x + '%');
    card.style.setProperty('--gy', y + '%');
  });
});


/* ============================================================
   15. FLOATING TAGS PARALLAX ON MOUSE
   ============================================================ */
const floatTags = document.querySelectorAll('.float-tag');

document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  floatTags.forEach((tag, i) => {
    const depth  = (i + 1) * 6;
    const moveX  = dx * depth;
    const moveY  = dy * depth;
    tag.style.transform = `translate(${moveX}px, ${moveY}px)`;
    tag.style.transition = 'transform 0.6s ease';
  });
});


/* ============================================================
   16. COUNTER ANIMATION (ABOUT STATS)
   ============================================================ */
function animateCounter(el, target, isText) {
  if (isText) { el.textContent = target; return; }
  let count    = 0;
  const step   = Math.ceil(target / 40);
  const suffix = el.dataset.suffix || '+';
  const timer  = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = count + suffix;
  }, 40);
}

// Trigger counters when about section is visible
const aboutSection = document.getElementById('about');
let countersRan    = false;

function checkCounters() {
  if (countersRan || !aboutSection) return;
  const rect = aboutSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    countersRan = true;
    document.querySelectorAll('.stat-num').forEach(el => {
      const raw = el.textContent.trim();
      const num  = parseInt(raw);
      const isText = isNaN(num);
      animateCounter(el, isText ? raw : num, isText);
    });
  }
}

window.addEventListener('scroll', checkCounters);
checkCounters();


/* ============================================================
   17. ACTIVE SECTION HIGHLIGHT IN NAV (INTERSECTION OBSERVER)
   ============================================================ */
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(sec => observer.observe(sec));
}


/* ============================================================
   18. INTEREST CARD RIPPLE
   ============================================================ */
document.querySelectorAll('.interest-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect   = card.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    Object.assign(ripple.style, {
      width:     size + 'px',
      height:    size + 'px',
      left:      x + 'px',
      top:       y + 'px',
      position:  'absolute',
      borderRadius: '50%',
      background:   'rgba(0,212,255,0.15)',
      transform: 'scale(0)',
      animation: 'rippleAnim 0.6s ease',
      pointerEvents: 'none',
    });

    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});

// Ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);


/* ============================================================
   19. CONSOLE SIGNATURE
   ============================================================ */
const styles = [
  'background: linear-gradient(135deg, #00d4ff, #7c5cfc)',
  'color: white',
  'padding: 8px 20px',
  'border-radius: 6px',
  'font-size: 14px',
  'font-weight: bold',
].join(';');

console.log('%c Mausam Acharya | Portfolio ', styles);
console.log('%c Python • Django • BIT Student — Kathmandu, Nepal ', 'color:#8892a4;font-size:12px');
console.log('%c github.com/mausam ', 'color:#00d4ff;font-size:12px');
