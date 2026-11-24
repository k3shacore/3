const nav = document.getElementById('nav');
document.getElementById('burger').onclick = () => nav.classList.toggle('open');
nav.onclick = () => nav.classList.remove('open');

const form = document.getElementById('form');
const msg = document.getElementById('msg');
const f = form.elements;
for (let h = 10; h < 21; h++) f.time.add(new Option(h + ':00', h + ':00'));
f.date.min = new Date().toISOString().slice(0, 10);

form.onsubmit = e => {
  e.preventDefault();
  const checks = {
    name: f.name.value.trim().length >= 2,
    phone: /^\+?[\d\s()-]{10,}$/.test(f.phone.value.trim()),
    service: f.service.value !== '',
    master: f.master.value !== '',
    date: f.date.value !== '' && f.date.value >= f.date.min,
    time: f.time.value !== ''
  };
  let ok = true;
  for (const k in checks) {
    f[k].classList.toggle('err', !checks[k]);
    ok = ok && checks[k];
  }
  msg.style.color = ok ? '#1d2f55' : '#b3262e';
  msg.textContent = ok
    ? `${f.name.value.trim()}, вы записаны: ${f.service.value}, ${f.date.value} в ${f.time.value}.`
    : 'Проверьте выделенные поля.';
  if (ok) form.reset();
};