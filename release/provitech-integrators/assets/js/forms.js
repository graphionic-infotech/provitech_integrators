/**
 * PROVITECH INTEGRATORS — Contact Form Module
 * Frontend demonstration only — PHP processing will be implemented in Phase 7.
 * Handles client-side validation and accessible inline feedback without window.alert().
 */

export function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  const feedbackArea = contactForm.querySelector('.form-feedback');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check HTML5 validity
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const nameInput = contactForm.querySelector('#name');
    const userName = nameInput ? nameInput.value.trim() : 'there';

    if (feedbackArea) {
      feedbackArea.className = 'form-feedback form-feedback--info is-visible';
      feedbackArea.innerHTML = `
        <strong>Thank you, ${escapeHtml(userName)}!</strong>
        <p style="margin-top: 4px; margin-bottom: 0;">
          Your inquiry has been received (frontend demonstration). For immediate consultation, please call our Surat team directly or email us.
          <em>(Server-side email dispatch will be connected in Phase 7).</em>
        </p>
      `;
      feedbackArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Reset form inputs
    contactForm.reset();
  });

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
}
