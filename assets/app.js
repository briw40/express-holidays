/**
 * Express Holidays — Site Interactivity
 * Features implemented for Week 5:
 * 1) Back-to-Top button (appears after scroll; smooth-scrolls to top)
 * 2) Image Lightbox for destination galleries (click to enlarge, ESC/Backdrop/✕ to close)
 *
 * Sources (documented fully in your Word report in APA):
 * - MDN Web Docs: window.scrollTo({behavior:"smooth"}), addEventListener, keyboard events
 * - Common modal/lightbox patterns (vanilla JS event delegation)
 */

// ---------- Back-to-Top ----------
(() => {
  const btn = document.createElement('button');
  btn.id = 'toTop';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.textContent = '↑';
  document.body.appendChild(btn);

  const toggle = () => {
    if (window.scrollY > 300) btn.classList.add('show');
    else btn.classList.remove('show');
  };

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ---------- Lightbox (for .gallery img) ----------
(() => {
  // Build lightbox DOM once
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = `
    <div class="lb-backdrop" data-lb-close></div>
    <button class="lb-close" aria-label="Close" data-lb-close>×</button>
    <img class="lb-img" alt="Expanded image">
  `;
  document.body.appendChild(lb);

  const imgEl = lb.querySelector('.lb-img');

  const open = (src, alt) => {
    imgEl.src = src;
    imgEl.alt = alt || 'Expanded image';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lb.classList.remove('open');
    imgEl.removeAttribute('src');
    document.body.style.overflow = '';
  };

  // Click any gallery image to open
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.matches('.gallery img')) {
      e.preventDefault();
      const src = t.getAttribute('src');
      const alt = t.getAttribute('alt') || '';
      open(src, alt);
    }
    // Close when clicking backdrop or X
    if (t && (t.hasAttribute('data-lb-close'))) {
      close();
    }
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('open')) {
      close();
    }
  });
})();
