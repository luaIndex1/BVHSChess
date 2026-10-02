// Mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
if (navLinks) navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll reveal
const io = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      e.target.querySelectorAll('.score-bar i').forEach(bar => {
        bar.style.width = bar.dataset.w;
      });
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// License modal
const modal = document.getElementById('licenseModal');
const openModal = () => modal.classList.add('open');
const closeModal = () => modal.classList.remove('open');
const licenseLink = document.getElementById('licenseLink');
if (licenseLink) licenseLink.addEventListener('click', e => { e.preventDefault(); openModal(); });
const modalClose = document.getElementById('modalClose');
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Slideshow (gallery page only)
const slides = document.querySelectorAll('.slide-wrap img');
if (slides.length) {
  let current = 0;
  const counter = document.querySelector('.slide-counter');
  const caption = document.querySelector('.slide-caption');
  function show(i) {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    current = i;
    if (counter) counter.textContent = (i + 1) + ' / ' + slides.length;
    if (caption) caption.textContent = slides[i].alt || '';
  }
  function next() { show((current + 1) % slides.length); }
  function prev() { show((current - 1 + slides.length) % slides.length); }
  document.querySelector('.slide-nav.next')?.addEventListener('click', next);
  document.querySelector('.slide-nav.prev')?.addEventListener('click', prev);
  // auto-advance every 5 seconds
  const timer = setInterval(next, 5000);
  document.querySelector('.slide-wrap')?.addEventListener('mouseenter', () => clearInterval(timer));
  document.querySelector('.slide-wrap')?.addEventListener('mouseleave', () => { clearInterval(timer); setTimeout(next, 5000); });
  show(0);
}