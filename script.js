
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

// ---------- Pricing toggle ----------
const sw = $('#sw');

if (sw) {
  sw.addEventListener('click', () => {
    const yearly = sw.getAttribute('aria-pressed') !== 'true';

    sw.setAttribute('aria-pressed', String(yearly));

    $$('.amt').forEach(el => {
      el.textContent = yearly ? el.dataset.y : el.dataset.m;
    });
  });
}

// ---------- Dashboard menu ----------
const dots = $('#dots');
const menu = $('#menu');

if (dots && menu) {
  dots.addEventListener('click', e => {
    e.stopPropagation();
    menu.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    menu.classList.remove('open');
  });

  menu.addEventListener('click', e => {
    e.stopPropagation();
  });
}

// ---------- Plan buttons ----------
$$('[data-plan]').forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = $('#plan');

    if (plan) {
      plan.value = btn.dataset.plan;
    }
  });
});

// ---------- Form validation ----------
function setError(input, message) {
  if (!input) return false;

  input.classList.toggle('bad', Boolean(message));

  const error = input.parentElement.querySelector('.err');

  if (error) {
    error.textContent = message || '';
  }

  return !message;
}

const form = $('#form');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = $('#name');
    const email = $('#email');
    const msg = $('#msg');

    if (!name || !email || !msg) return;

    const nameOk = setError(
      name,
      name.value.trim().length < 2
        ? 'Enter your full name.'
        : ''
    );

    const emailOk = setError(
      email,
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())
        ? ''
        : 'Enter a valid email, like name@company.com.'
    );

    const msgOk = setError(
      msg,
      msg.value.trim().length < 10
        ? 'Write at least 10 characters.'
        : ''
    );

    if (nameOk && emailOk && msgOk) {
      const ok = $('#ok');

      if (ok) {
        ok.textContent =
          `Thanks, ${name.value.trim().split(' ')[0]}! We received your request and will email you within one business day.`;

        ok.style.display = 'block';
      }

      form.reset();

      [name, email, msg].forEach(input => {
        input.classList.remove('bad');

        const error = input.parentElement.querySelector('.err');

        if (error) {
          error.textContent = '';
        }
      });
    }
  });

  // Clear errors while typing
  ['name', 'email', 'msg'].forEach(id => {
    const input = $('#' + id);

    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('bad');

        const error = input.parentElement.querySelector('.err');

        if (error) {
          error.textContent = '';
        }
      });
    }
  });
}

// ---------- Mobile menu ----------
const links = $('#links');
const burger = $('#burger');

if (links && burger) {
  burger.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');

    burger.setAttribute('aria-expanded', String(isOpen));
  });

  $$('#links a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Active navbar section ----------
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $$('#links a').forEach(a => {
          a.classList.toggle(
            'active',
            a.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, {
    rootMargin: '-45% 0px -50% 0px'
  });

  $$('main section[id]').forEach(section => {
    spy.observe(section);
  });
}
