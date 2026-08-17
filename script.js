const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#navMenu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


const livePhoto = document.querySelector('.live-photo');
if (livePhoto && window.matchMedia('(pointer:fine)').matches) {
  livePhoto.addEventListener('mousemove', (e) => {
    const r = livePhoto.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    livePhoto.style.transform = `rotateX(${(-y * 2.5).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg)`;
  });

  livePhoto.addEventListener('mouseleave', () => {
    livePhoto.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}


// Real magnifier preview for every service image.
document.querySelectorAll('.service-picture-card').forEach(card => {
  const picture = card.querySelector('.service-picture');
  const img = picture?.querySelector('img');
  if (!picture || !img) return;

  const lens = document.createElement('div');
  lens.className = 'magnifier-lens';
  picture.appendChild(lens);

  const updateLens = (event) => {
    const rect = picture.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    x = Math.max(0, Math.min(rect.width, x));
    y = Math.max(0, Math.min(rect.height, y));

    const zoom = 2.35;
    const lensSize = 155;
    const bgW = rect.width * zoom;
    const bgH = rect.height * zoom;

    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;
    lens.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
    lens.style.backgroundSize = `${bgW}px ${bgH}px`;
    lens.style.backgroundPosition =
      `${-(x * zoom - lensSize / 2)}px ${-(y * zoom - lensSize / 2)}px`;
  };

  picture.addEventListener('mouseenter', (event) => {
    card.classList.add('magnifying');
    updateLens(event);
  });

  picture.addEventListener('mousemove', updateLens);

  picture.addEventListener('mouseleave', () => {
    card.classList.remove('magnifying');
  });
});
