// ============================================================
// KASHIF DAWAR PORTFOLIO — MASTER SCRIPT v3.0
// ── ORIGINAL (PRESERVED) ──
//  1. Toggle Menu & Drawer
//  2. Read More Toggle
//  3. Scroll Fade-In Animation
//  4. Skill Bars Animation
//  5. Typing Effect on Hero Title
//  6. Particle Background in Header
//  7. Scroll Progress Bar
//  8. Active Nav Link Highlight
//  9. Back to Top Button
// 10. 3D Tilt Effect on Project Cards
// 11. Number Counter Animation + Stats Section
// ── NEW ──
// 12. Custom Cursor + Magnetic Buttons
// 13. Dot Navigation (Right Side)
// 14. Tech Arsenal Horizontal Ticker
// 15. Split Text Hero Animation
// ============================================================


// ============================================================
// 1. TOGGLE MENU LOGIC (ORIGINAL — PRESERVED)
// ============================================================
function toggleMenu() {
  document.getElementById("drawer").classList.toggle("active");
}

document.addEventListener("click", function (e) {
  const drawer = document.getElementById("drawer");
  const toggle = document.querySelector(".menu-toggle");
  if (
    drawer && toggle &&
    !drawer.contains(e.target) &&
    !toggle.contains(e.target)
  ) {
    drawer.classList.remove("active");
  }
});


// ============================================================
// 2. READ MORE TOGGLE (ORIGINAL — PRESERVED)
// ============================================================
function toggleAbout() {
  const content = document.getElementById('about-content');
  const btn = document.getElementById('about-btn');
  content.classList.toggle('expanded');
  if (content.classList.contains('expanded')) {
    btn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
  } else {
    btn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
  }
}


// ============================================================
// 3. SCROLL FADE-IN ANIMATION (ORIGINAL — PRESERVED)
// ============================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
}, { threshold: 0.1 });
document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));


// ============================================================
// 4. SKILL BARS ANIMATION (ORIGINAL — PRESERVED)
// ============================================================
const skills = [
  { name: "HTML/CSS",       level: 95 },
  { name: "JavaScript",     level: 90 },
  { name: "React/Next.js",  level: 88 },
  { name: "Node.js",        level: 82 },
  { name: "PostgreSQL",     level: 78 },
  { name: "Technical SEO",  level: 92 }
];

const container = document.getElementById("skill-bars-container");
if (container) {
  skills.forEach(s => {
    container.innerHTML += `
      <div class="skill-bar">
        <div class="skill-bar__text-overlay">
          <span class="skill-name">${s.name}</span>
          <span>${s.level}%</span>
        </div>
        <div class="skill-bar__fill" data-level="${s.level}" style="width:0%"></div>
      </div>`;
  });

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-bar__fill');
        fills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.getAttribute('data-level') + '%';
          }, i * 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillObserver.observe(container);
}


// ============================================================
// 5. TYPING EFFECT ON HERO TITLE (ORIGINAL — PRESERVED)
// ============================================================
(function initTypingEffect() {
  const heroTitle = document.querySelector('.hero__title');
  if (!heroTitle) return;

  const lines = [
    { text: "Full-Stack Web &", gradient: false },
    { text: "SEO Expert",       gradient: true  }
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let phase     = 'typing-line-0';

  const cursorCSS = document.createElement('style');
  cursorCSS.textContent = `
    @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
    .type-cursor {
      display: inline-block;
      color: #f72585;
      font-weight: 300;
      animation: cursorBlink 0.75s step-end infinite;
    }
  `;
  document.head.appendChild(cursorCSS);

  function renderHero(line0Text, line1Text, showCursor, cursorOnLine) {
    const gradSpan = (t) =>
      `<span style="background:linear-gradient(to right,#4361ee,#f72585);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;">${t}</span>`;
    const cursor = showCursor ? `<span class="type-cursor">|</span>` : '';

    let html = '';
    if (line0Text !== null) {
      html += (cursorOnLine === 0 && showCursor) ? line0Text + cursor : line0Text;
    }
    if (line1Text !== null) {
      html += '<br>';
      const content = lines[1].gradient ? gradSpan(line1Text) : line1Text;
      html += (cursorOnLine === 1 && showCursor) ? content + cursor : content;
    }
    heroTitle.innerHTML = html;
  }

  function tick() {
    if (phase === 'typing-line-0') {
      charIndex++;
      renderHero(lines[0].text.substring(0, charIndex), null, true, 0);
      if (charIndex < lines[0].text.length) {
        setTimeout(tick, 90);
      } else {
        phase = 'pause';
        setTimeout(tick, 550);
      }
    } else if (phase === 'pause') {
      phase = 'typing-line-1';
      charIndex = 0;
      setTimeout(tick, 80);
    } else if (phase === 'typing-line-1') {
      charIndex++;
      renderHero(lines[0].text, lines[1].text.substring(0, charIndex), true, 1);
      if (charIndex < lines[1].text.length) {
        setTimeout(tick, 95);
      } else {
        phase = 'done';
        setTimeout(tick, 400);
      }
    } else if (phase === 'done') {
      renderHero(lines[0].text, lines[1].text, true, 1);
      setTimeout(() => {
        renderHero(lines[0].text, lines[1].text, false, -1);
      }, 3000);
    }
  }

  setTimeout(tick, 900);
})();


// ============================================================
// 6. PARTICLE BACKGROUND IN HEADER (ORIGINAL — PRESERVED)
// ============================================================
(function initParticles() {
  const header = document.querySelector('header');
  if (!header) return;

  if (getComputedStyle(header).position === 'static') {
    header.style.position = 'relative';
  }

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = `
    position:absolute; top:0; left:0;
    width:100%; height:100%;
    pointer-events:none; z-index:1; opacity:0.45;
  `;
  header.insertBefore(canvas, header.firstChild);

  const headerInner = header.querySelector('.hero, .hero__content, .header__inner');
  if (headerInner) headerInner.style.position = 'relative';
  Array.from(header.children).forEach(child => {
    if (child !== canvas) child.style.position = 'relative';
  });

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = -999, mouseY = -999;
  let rafId;

  const COLORS = ['255,255,255', '247,37,133', '67,97,238', '114,9,183'];

  function resize() {
    canvas.width  = header.offsetWidth;
    canvas.height = header.offsetHeight;
  }

  function makeParticle() {
    return {
      x:        Math.random() * canvas.width,
      y:        Math.random() * canvas.height,
      r:        Math.random() * 2.5 + 0.8,
      vx:       (Math.random() - 0.5) * 0.75,
      vy:       (Math.random() - 0.5) * 0.75,
      alpha:    Math.random() * 0.55 + 0.2,
      color:    COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse:    Math.random() * Math.PI * 2,
      pulseSpd: 0.02 + Math.random() * 0.015
    };
  }

  function buildParticles() {
    particles = [];
    const n = Math.min(70, Math.floor((canvas.width * canvas.height) / 10000));
    for (let i = 0; i < n; i++) particles.push(makeParticle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${0.18 * (1 - dist / 110)})`;
          ctx.lineWidth   = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      const mdx   = p.x - mouseX;
      const mdy   = p.y - mouseY;
      const mdist = Math.hypot(mdx, mdy);
      if (mdist < 80) {
        const force = (80 - mdist) / 80;
        p.vx += (mdx / mdist) * force * 0.4;
        p.vy += (mdy / mdist) * force * 0.4;
      }

      const speed = Math.hypot(p.vx, p.vy);
      if (speed > 2) { p.vx = (p.vx / speed) * 2; p.vy = (p.vy / speed) * 2; }

      p.vx *= 0.995;
      p.vy *= 0.995;
      p.x  += p.vx;
      p.y  += p.vy;

      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      p.pulse += p.pulseSpd;
      const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${alpha})`;
      ctx.fill();
    });

    drawConnections();
    rafId = requestAnimationFrame(frame);
  }

  header.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  header.addEventListener('mouseleave', () => { mouseX = -999; mouseY = -999; });

  resize();
  buildParticles();
  frame();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); buildParticles(); }, 200);
  });
})();


// ============================================================
// 7. SCROLL PROGRESS BAR (ORIGINAL — PRESERVED)
// ============================================================
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress-bar';
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:3px; width:0%;
    background:linear-gradient(to right,#4361ee,#7209b7,#f72585);
    z-index:999999;
    box-shadow:0 0 10px rgba(247,37,133,0.7), 0 0 4px rgba(67,97,238,0.5);
    transition:width 0.08s linear;
    pointer-events:none;
  `;
  document.body.prepend(bar);

  const tip = document.createElement('div');
  tip.style.cssText = `
    position:absolute; right:-4px; top:50%;
    transform:translateY(-50%);
    width:8px; height:8px; border-radius:50%;
    background:#f72585;
    box-shadow:0 0 8px 2px rgba(247,37,133,0.9);
  `;
  bar.appendChild(tip);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled  = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min((scrolled / docHeight) * 100, 100) : 0;
        bar.style.width = pct + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


// ============================================================
// 8. ACTIVE NAV LINK HIGHLIGHT ON SCROLL (ORIGINAL — PRESERVED)
// ============================================================
(function initActiveNav() {
  const s = document.createElement('style');
  s.textContent = `
    .nav-active { color: #4361ee !important; }
    nav a.nav-active::after,
    .nav-links a.nav-active::after { width: 100% !important; background: #4361ee !important; }
    .nav-drawer a.nav-active { color: #4361ee !important; padding-left: 10px; border-left: 3px solid #4361ee; }
  `;
  document.head.appendChild(s);

  const allNavLinks = document.querySelectorAll('nav a[href^="#"], .nav-links a[href^="#"], .nav-drawer a[href^="#"]');
  const sectionIds  = ['about', 'arsenal', 'skills', 'portfolio', 'stats', 'contact'];

  function setActive(id) {
    allNavLinks.forEach(link => {
      link.classList.remove('nav-active');
      if (link.getAttribute('href') === `#${id}`) link.classList.add('nav-active');
    });
  }

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { threshold: 0.35, rootMargin: '-70px 0px -40% 0px' });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) navObserver.observe(el);
  });
})();


// ============================================================
// 9. BACK TO TOP BUTTON (ORIGINAL — PRESERVED)
// ============================================================
(function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btn.style.cssText = `
    position:fixed; bottom:28px; right:24px;
    width:50px; height:50px; border-radius:50%;
    background:linear-gradient(135deg,#4361ee,#7209b7);
    color:#fff; border:none; cursor:none;
    font-size:1.1rem;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 8px 28px rgba(67,97,238,0.45);
    opacity:0; transform:translateY(24px) scale(0.8);
    transition:opacity 0.4s ease, transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275),
               box-shadow 0.3s ease;
    z-index:9997; pointer-events:none;
  `;
  document.body.appendChild(btn);

  btn.addEventListener('mouseenter', () => {
    btn.style.transform  = 'translateY(-4px) scale(1.12)';
    btn.style.boxShadow  = '0 14px 38px rgba(247,37,133,0.55)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform  = 'translateY(0) scale(1)';
    btn.style.boxShadow  = '0 8px 28px rgba(67,97,238,0.45)';
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  let btnVisible = false;
  window.addEventListener('scroll', () => {
    const shouldShow = window.scrollY > 300;
    if (shouldShow && !btnVisible) {
      btnVisible = true;
      btn.style.opacity       = '1';
      btn.style.transform     = 'translateY(0) scale(1)';
      btn.style.pointerEvents = 'all';
    } else if (!shouldShow && btnVisible) {
      btnVisible = false;
      btn.style.opacity       = '0';
      btn.style.transform     = 'translateY(24px) scale(0.8)';
      btn.style.pointerEvents = 'none';
    }
  }, { passive: true });
})();


// ============================================================
// 10. 3D TILT EFFECT ON PROJECT CARDS (ORIGINAL — PRESERVED)
// ============================================================
(function initTiltEffect() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cards = document.querySelectorAll('.portfolio-card');

  const tiltCSS = document.createElement('style');
  tiltCSS.textContent = `
    .portfolio-card { will-change: transform; transform-style: preserve-3d; }
    .portfolio-card .portfolio-card__content,
    .portfolio-card img { transform: translateZ(0px); transition: transform 0.15s ease; }
    .portfolio-card:hover .portfolio-card__content { transform: translateZ(18px); }
    .portfolio-card:hover img { transform: translateZ(10px); }
  `;
  document.head.appendChild(tiltCSS);

  cards.forEach(card => {
    let rect;

    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
    });

    card.addEventListener('mousemove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x       = e.clientX - rect.left;
      const y       = e.clientY - rect.top;
      const cx      = rect.width  / 2;
      const cy      = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -10;
      const rotateY = ((x - cx) / cx) *  10;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
      card.style.boxShadow = `
        ${-rotateY * 2}px ${rotateX * 2}px 45px rgba(67,97,238,0.28),
        0 20px 60px rgba(0,0,0,0.12)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s ease';
      card.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      card.style.boxShadow  = '0 10px 30px -5px rgba(0,0,0,0.08)';
      rect = null;
    });
  });
})();


// ============================================================
// 11. NUMBER COUNTER ANIMATION + STATS SECTION (ORIGINAL — PRESERVED)
// ============================================================
(function initCounterStats() {
  const contactSection = document.getElementById('contact');
  if (!contactSection) return;

  const section = document.createElement('section');
  section.id = 'stats';
  section.className = 'fade-in';

  const statsCSS = document.createElement('style');
  statsCSS.textContent = `
    #stats { max-width:1100px; margin:90px auto; padding:0 20px; }
    .stats-grid {
      display:grid;
      grid-template-columns:repeat(auto-fit, minmax(200px,1fr));
      gap:28px; margin-top:30px;
    }
    .stat-card {
      background: rgba(255,255,255,0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-radius:24px;
      padding:38px 20px 32px;
      text-align:center;
      box-shadow:0 10px 35px -5px rgba(0,0,0,0.08);
      border:1px solid rgba(255,255,255,0.9);
      transition:transform 0.4s cubic-bezier(0.23,1,0.32,1),
                 box-shadow 0.4s ease, border-color 0.4s ease;
      cursor:default;
    }
    .stat-card:hover {
      transform:translateY(-10px) scale(1.02);
      box-shadow:0 24px 60px -8px rgba(67,97,238,0.22);
      border-color:rgba(67,97,238,0.3);
    }
    .stat-number {
      font-size:3.6rem; font-weight:800; line-height:1;
      background:linear-gradient(135deg,#4361ee,#7209b7,#f72585);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      background-clip:text;
    }
    .stat-label {
      color:#4a5568; font-weight:600; margin-top:10px;
      font-size:0.95rem; letter-spacing:0.02em;
    }
    .stat-icon { font-size:1.6rem; margin-bottom:12px; display:block; }
  `;
  document.head.appendChild(statsCSS);

  const stats = [
    { icon: '🏆', target: 13,  suffix: '+', label: 'Certifications'   },
    { icon: '🔍', target: 100, suffix: '',  label: 'SEO Score'         },
    { icon: '⚡', target: 96,  suffix: '',  label: 'Lighthouse Score'  },
    { icon: '🛠️', target: 10,  suffix: '+', label: 'Calculator Tools' },
  ];

  section.innerHTML = `
    <h2 class="section__title">By The Numbers</h2>
    <div class="stats-grid">
      ${stats.map(s => `
        <div class="stat-card" data-target="${s.target}" data-suffix="${s.suffix}">
          <span class="stat-icon">${s.icon}</span>
          <div class="stat-number">0${s.suffix}</div>
          <div class="stat-label">${s.label}</div>
        </div>
      `).join('')}
    </div>
  `;

  contactSection.parentNode.insertBefore(section, contactSection);

  function animateCounter(card, target, suffix, duration) {
    const numEl = card.querySelector('.stat-number');
    const start = performance.now();
    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      numEl.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else numEl.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.stat-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            const target = parseInt(card.dataset.target, 10);
            const suffix = card.dataset.suffix;
            animateCounter(card, target, suffix, 1800);
          }, i * 180);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counterObserver.observe(section);
  observer.observe(section);
})();


// ============================================================
// 12. CUSTOM CURSOR + MAGNETIC BUTTONS (NEW)
// ============================================================
(function initCustomCursor() {
  // Skip on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  // Create cursor elements
  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.id  = 'cursor-dot';
  ring.id = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let rafId;

  // Track real mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Smooth ring follows with lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state on interactive elements
  const hoverTargets = 'a, button, .portfolio-card, .cert-card, .tech-card, .stat-card, .link-btn, .read-more-btn, .view-all-btn, input, textarea, .service-btn, .tgl-btn';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Click pulse effect
  document.addEventListener('mousedown', () => {
    dot.style.transform  = 'translate(-50%, -50%) scale(0.6)';
    ring.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform  = '';
    ring.style.transform = '';
  });

  // ── MAGNETIC EFFECT on buttons ──
  const magnetTargets = document.querySelectorAll('.btn-header, .view-all-btn, .read-more-btn, .link-btn, .btn-contact');

  magnetTargets.forEach(el => {
    el.classList.add('magnetic');

    el.addEventListener('mousemove', (e) => {
      const rect   = el.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = e.clientX - cx;
      const dy     = e.clientY - cy;
      const dist   = Math.hypot(dx, dy);
      const maxDist = Math.max(rect.width, rect.height);
      const strength = Math.max(0, 1 - dist / maxDist);
      const moveX  = dx * strength * 0.35;
      const moveY  = dy * strength * 0.35;
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
})();


// ============================================================
// 13. DOT NAVIGATION — RIGHT SIDE (NEW)
// ============================================================
(function initDotNav() {
  // Only on desktop
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const sections = [
    { id: 'about',     label: 'About'        },
    { id: 'arsenal',   label: 'Tech Stack'   },
    { id: 'skills',    label: 'Skills'       },
    { id: 'portfolio', label: 'Projects'     },
    { id: 'stats',     label: 'Numbers'      },
    { id: 'contact',   label: 'Contact'      },
  ];

  const nav = document.createElement('nav');
  nav.id = 'dot-nav';
  nav.setAttribute('aria-label', 'Section navigation');

  sections.forEach(({ id, label }) => {
    const item = document.createElement('div');
    item.className = 'dot-nav-item';
    item.setAttribute('data-section', id);
    item.setAttribute('title', label);
    item.innerHTML = `<span class="dot-nav-label">${label}</span>`;
    item.addEventListener('click', () => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    nav.appendChild(item);
  });

  document.body.appendChild(nav);

  // Highlight active dot on scroll
  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.dot-nav-item').forEach(d => d.classList.remove('active'));
        const dot = nav.querySelector(`[data-section="${entry.target.id}"]`);
        if (dot) dot.classList.add('active');
      }
    });
  }, { threshold: 0.4, rootMargin: '-10% 0px -50% 0px' });

  sections.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) dotObserver.observe(el);
  });
})();


// ============================================================
// 14. TECH ARSENAL HORIZONTAL TICKER (NEW)
// ── Pure JS RAF — zero CSS animation conflict
// ── Works on ALL browsers — no WebKitCSSMatrix
// ── Mouse drag + Touch swipe + Momentum coast
// ── Infinite loop — never jumps back to start
// ============================================================
(function initTechTicker() {
  const arsenalSection = document.getElementById('arsenal');
  if (!arsenalSection) return;

  const existingGrid = arsenalSection.querySelector('.tech-grid');
  if (!existingGrid) return;

  const cards = Array.from(existingGrid.querySelectorAll('.tech-card'));
  if (!cards.length) return;

  // ── Build DOM ──
  const wrapper = document.createElement('div');
  wrapper.className = 'tech-ticker-wrapper';

  const track = document.createElement('div');
  track.className = 'tech-ticker-track';

  // Clone cards twice for seamless infinite loop
  [...cards, ...cards].forEach(card => {
    const clone = document.createElement('div');
    clone.className = 'ticker-card';
    clone.innerHTML = card.innerHTML;
    track.appendChild(clone);
  });

  wrapper.appendChild(track);
  existingGrid.replaceWith(wrapper);

  // ── Kill CSS animation — pure JS controls position ──
  track.style.animation = 'none';
  track.style.willChange = 'transform';

  // ── State variables ──
  let pos        = 0;      // current X position in px
  let autoSpeed  = -0.8;   // auto-scroll px per frame (negative = scroll left)
  let isDragging = false;
  let isHovered  = false;
  let dragLastX  = 0;
  let coastSpeed = 0;      // momentum after drag release
  let coastTimer = null;

  // ── Get half width for seamless wrap ──
  // Called after DOM paint so scrollWidth is accurate
  let halfWidth = 0;
  requestAnimationFrame(() => {
    halfWidth = track.scrollWidth / 2;
  });

  // ── Wrap position for infinite loop ──
  function wrap() {
    if (!halfWidth) return;
    if (pos <= -halfWidth) pos += halfWidth;
    if (pos >  0)          pos -= halfWidth;
  }

  // ── Main RAF loop ──
  function tick() {
    // Auto scroll — only when not dragging and not hovered
    if (!isDragging && !isHovered) {
      pos += autoSpeed;
    }

    // Coast momentum after drag
    if (!isDragging && Math.abs(coastSpeed) > 0.05) {
      pos        += coastSpeed;
      coastSpeed *= 0.88; // friction
      if (Math.abs(coastSpeed) <= 0.05) coastSpeed = 0;
    }

    wrap();
    track.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  // ── Hover pause — desktop only ──
  wrapper.addEventListener('mouseenter', () => { isHovered = true;  });
  wrapper.addEventListener('mouseleave', () => { isHovered = false; });

  // ── Drag start ──
  function onDragStart(x) {
    isDragging = true;
    dragLastX  = x;
    coastSpeed = 0;
    wrapper.classList.add('is-dragging');
  }

  // ── Drag move ──
  function onDragMove(x) {
    if (!isDragging) return;
    const delta = x - dragLastX;
    pos        += delta;
    coastSpeed  = delta; // track last velocity for momentum
    dragLastX   = x;
  }

  // ── Drag end — release with momentum ──
  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('is-dragging');
    // coastSpeed is already set — tick loop picks it up automatically
  }

  // ── Mouse events ──
  wrapper.addEventListener('mousedown', e => {
    e.preventDefault();
    onDragStart(e.clientX);
  });
  window.addEventListener('mousemove', e => {
    if (isDragging) onDragMove(e.clientX);
  });
  window.addEventListener('mouseup', () => onDragEnd());

  // ── Touch events ──
  wrapper.addEventListener('touchstart', e => {
    onDragStart(e.touches[0].clientX);
  }, { passive: true });

  wrapper.addEventListener('touchmove', e => {
    onDragMove(e.touches[0].clientX);
  }, { passive: true });

  wrapper.addEventListener('touchend', () => onDragEnd());
})();


// ============================================================
// 15. SPLIT TEXT HERO ANIMATION (NEW)
// ============================================================
(function initSplitHeroAnimation() {
  // Only runs AFTER the typing effect finishes (3s delay + typing time ~3.5s)
  // We hook into the hero subtitle instead so typing effect is untouched

  const subtitle = document.querySelector('.hero__subtitle');
  if (!subtitle) return;

  const originalText = subtitle.textContent;

  // Split into words
  const words = originalText.trim().split(' ');
  subtitle.innerHTML = words.map((word, i) => `
    <span class="split-word" style="
      display:inline-block;
      opacity:0;
      transform:translateY(30px);
      transition: opacity 0.5s ease ${i * 0.06}s, transform 0.5s cubic-bezier(0.23,1,0.32,1) ${i * 0.06}s;
    ">${word}&nbsp;</span>
  `).join('');

  // Trigger after page loads
  const subtitleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.querySelectorAll('.split-word').forEach(word => {
            word.style.opacity   = '1';
            word.style.transform = 'translateY(0)';
          });
        }, 400);
        subtitleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  subtitleObserver.observe(subtitle);
})();
