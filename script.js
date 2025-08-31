// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form (Formspree helper)
const form = document.getElementById('contact-form');
if (form) {
  const statusEl = document.getElementById('form-status');
  form.addEventListener('submit', async (e) => {
    // If the user hasn't replaced the Formspree endpoint, fallback to mailto
    if (form.action.includes('YOUR_FORMSPREE_ID')) {
      e.preventDefault();
      window.location.href = 'mailto:hello@your-domain.com?subject=Adrift%20Yogi%20Enquiry&body=' + encodeURIComponent('Hi!\n\n');
      return;
    }
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' }});
      if (res.ok) {
        statusEl.textContent = 'Thanks! Your message has been sent.';
        form.reset();
      } else {
        const json = await res.json();
        statusEl.textContent = (json.errors && json.errors.length) ? json.errors.map(e => e.message).join(', ') : 'Oops, there was a problem submitting your form.';
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Please email hello@your-domain.com.';
    }
  });
}
