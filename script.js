
// Carousel / project rotator logic
// Supports two modes:
// 1) Multiple .project-card elements inside .projects-carousel -> overlap + fade between them
// 2) Single element with id #projectCard -> rotates through a projects[] array of strings

/* ── CURSOR GLOW ── */
  const glow = document.getElementById('cursor-glow');
  let mx = -999, my = -999, gx = -999, gy = -999, rafId;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    gx += (mx - gx) * 0.10;
    gy += (my - gy) * 0.10;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(loop);
  })();
 
  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
 
  // Add hidden class immediately so elements start invisible
  revealEls.forEach(el => el.classList.add('hidden'));
 
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.remove('hidden');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
 
  revealEls.forEach(el => observer.observe(el));
 
  /* carousel removed – replaced with project cards */
 
  /* ── NAV ACTIVE HIGHLIGHT on scroll ── */
  const sections = document.querySelectorAll('#about, #skills, #projects');
  const navLinks = document.querySelectorAll('nav a');
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.style.color = '');
        const id = e.target.id;
        const active = document.querySelector(`nav a[href="#${id}"]`);
        if (active) active.style.color = 'var(--blush-light)';
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => navObs.observe(s));