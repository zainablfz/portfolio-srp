
// Carousel / project rotator logic
// Supports two modes:
// 1) Multiple .project-card elements inside .projects-carousel -> overlap + fade between them
// 2) Single element with id #projectCard -> rotates through a projects[] array of strings

document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.projects-carousel .project-card'));

  // Multi-card carousel (overlapping cards)
  if (cards.length > 1) {
    let current = 0;
    const container = document.querySelector('.projects-carousel');
    if (container) container.style.position = 'relative';

    cards.forEach((c, i) => {
      c.dataset.index = i;
      c.style.transition = 'opacity 300ms ease';
      c.style.position = 'absolute';
      c.style.inset = '0';
      c.style.display = 'flex';
      c.style.alignItems = 'center';
      c.style.justifyContent = 'center';
      c.style.opacity = i === current ? '1' : '0';
      c.style.pointerEvents = i === current ? 'auto' : 'none';
    });

    function show(idx) {
      current = (idx + cards.length) % cards.length;
      cards.forEach((c, i) => {
        const visible = i === current;
        c.style.opacity = visible ? '1' : '0';
        c.style.pointerEvents = visible ? 'auto' : 'none';
      });
    }

    window.prevProject = function () {
      show(current - 1);
    };
    window.nextProject = function () {
      show(current + 1);
    };
  }

  // Single-card text rotator
  const singleCard = document.getElementById('projectCard');
  if (cards.length <= 1 && singleCard) {
    const projects = ['Project 1', 'Project 2', 'Project 3'];
    let current = 0;
    singleCard.style.transition = 'opacity 250ms ease';

    function showText(idx) {
      current = (idx + projects.length) % projects.length;
      singleCard.style.opacity = '0';
      setTimeout(() => {
        singleCard.textContent = projects[current];
        singleCard.style.opacity = '1';
      }, 200);
    }

    window.nextProject = function () {
      showText(current + 1);
    };
    window.prevProject = function () {
      showText(current - 1);
    };
  }

  // Keyboard support (left/right arrows)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      if (typeof window.prevProject === 'function') window.prevProject();
    }
    if (e.key === 'ArrowRight') {
      if (typeof window.nextProject === 'function') window.nextProject();
    }
  });
});

