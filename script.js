const navigation = document.querySelector('.nav');
const menuToggle = navigation.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');
const mobileLayout = window.matchMedia('(max-width: 860px)');

function setMenuOpen(open, restoreFocus = false) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  menu.hidden = mobileLayout.matches && !open;
  if (restoreFocus) menuToggle.focus();
}

function syncLayout() {
  const focusInMenu = menu.contains(document.activeElement);
  const focusOnToggle = document.activeElement === menuToggle;
  menuToggle.hidden = !mobileLayout.matches;
  setMenuOpen(false, mobileLayout.matches && focusInMenu);
  if (!mobileLayout.matches && focusOnToggle) menu.querySelector('a').focus();
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false, true);
  }
});

document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
    setMenuOpen(false, menu.contains(document.activeElement));
  }
});

menu.addEventListener('click', (event) => {
  if (mobileLayout.matches && event.target.closest('a')) setMenuOpen(false, true);
});

navigation.addEventListener('focusout', (event) => {
  if (!navigation.contains(event.relatedTarget)) setMenuOpen(false);
});

mobileLayout.addEventListener('change', syncLayout);
syncLayout();
