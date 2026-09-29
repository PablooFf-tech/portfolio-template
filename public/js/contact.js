/* ==========================================================================
   PORTFOLIO — CONTACT FORM & EMAIL COPY LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initEmailCopy();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. COPY EMAIL TO CLIPBOARD WITH TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initEmailCopy() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toastNotification');

  if (!copyBtn || !toast) return;

  copyBtn.addEventListener('click', () => {
    const emailText = copyBtn.getAttribute('data-email') || 'contacto@ejemplo.com';

    navigator.clipboard.writeText(emailText).then(() => {
      if (window.sileo) {
        window.sileo.success({
          title: 'Correo copiado',
          description: emailText,
          position: 'top-center',
          duration: 1800,
        });
      } else {
        showToast('¡Email copiado al portapapeles! 📋');
      }
    }).catch(err => {
      console.error('Error al copiar email: ', err);
      showToast('Email: ' + emailText);
    });
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* --------------------------------------------------------------------------
   2. CONTACT FORM SUBMISSION HANDLING
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotification');
  const submitBtn = document.getElementById('submitFormBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Por favor, completa todos los campos del formulario.');
      return;
    }

    if (name.length > 120 || email.length > 254 || message.length > 5000) {
      showToast('Uno de los campos supera el tamaño máximo permitido.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('Introduce un email válido.');
      return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Enviando...';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    submitBtn.disabled = true;

    // Client-only feedback (no backend endpoint on this static site).
    setTimeout(() => {
      submitBtn.innerHTML = '<i data-lucide="check"></i> ¡Mensaje enviado!';
      if (typeof lucide !== 'undefined') lucide.createIcons();
      submitBtn.style.background = '#10b981';

      showToast(`¡Gracias ${name}! Tu mensaje ha sido recibido.`);
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 3500);
    }, 1200);
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}
