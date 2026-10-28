const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    navigation.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.focus();
  }
});
document.querySelectorAll('[data-open]').forEach(link => link.addEventListener('click', () => {
  document.getElementById(link.dataset.open).open = true;
}));
const form = document.querySelector('#appointment-form');
const status = document.querySelector('#form-status');
const fieldset = form.querySelector('fieldset');
const submit = form.querySelector('[type=submit]');
const dateInput = form.querySelector('[name=date]');
const today = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Karachi',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
dateInput.min = today;
document.querySelectorAll('[data-package]').forEach(link => link.addEventListener('click', () => {
  form.elements.namedItem('package').value = link.dataset.package;
  form.elements.namedItem('service').value = link.dataset.package === 'Full Body Hijama' ? 'Full Body Hijama' : 'Personalized Hijama Sessions';
}));
const monthButtons = document.querySelectorAll('[data-month]');
monthButtons.forEach(button => button.addEventListener('click', () => {
  monthButtons.forEach(other => other.setAttribute('aria-pressed',String(other===button)));
  document.querySelectorAll('.month').forEach(month => {month.hidden = month.id !== `month-${button.dataset.month}`;});
}));
// Without JavaScript both months are visible; the enhanced calendar shows one at a time.
document.querySelector('#month-11').hidden = true;
if (today > '2026-11-02') {
  document.querySelector('#schedule-note').textContent = 'Archived October–November 2026 schedule supplied by the centre. These dates have passed. Please ask on WhatsApp for the current locally confirmed Pakistan lunar schedule.';
}
let pending = false;
form.addEventListener('input', () => { if (!pending) status.replaceChildren(); });
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (pending || !form.reportValidity()) return;
  const body = new URLSearchParams(new FormData(form));
  pending = true; fieldset.disabled = true;
  submit.textContent = 'Sending your request…'; status.replaceChildren();
  try {
    const response = await fetch('/', {
      method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:body.toString(), signal:AbortSignal.timeout(15000)
    });
    const text = await response.text();
    if (!response.ok || /\bdata-netlify\s*=|id=["']appointment-form["']/i.test(text)) throw new Error('Form handling unavailable');
    fieldset.hidden = true;
    status.innerHTML = '<div class="success"><h3>Your request has been received.</h3><p>The centre will contact you to confirm availability. Your preferred date and time are not reserved yet.</p><button class="button" type="button">Send another request</button></div>';
    status.querySelector('button').addEventListener('click', () => {
      form.reset(); fieldset.hidden = false; status.replaceChildren(); form.querySelector('[name=name]').focus();
    });
    status.focus();
  } catch {
    status.innerHTML = '<p class="error" role="alert">We could not confirm your request was received. Your details are preserved. Please try again or <a href="https://wa.me/923059799959">contact us on WhatsApp</a>.</p>';
    status.focus();
  } finally {
    pending = false; fieldset.disabled = false; submit.textContent = 'Request Appointment →';
  }
});
