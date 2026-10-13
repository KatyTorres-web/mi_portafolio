/* Portafolio académico | Interacciones sin dependencias externas */
"use strict";

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/* Texto animado de portada */
const typingEl = $("#typing");
const roles = ["Ingeniería de Sistemas", "Desarrollo Web", "Transformación Digital"];
let roleIndex = 0, charIndex = roles[0].length, deleting = false;
function typeRole() {
  if (!typingEl || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const current = roles[roleIndex];
  typingEl.textContent = current.slice(0, charIndex);
  if (!deleting && charIndex < current.length) {
    charIndex++;
    window.setTimeout(typeRole, 85);
  } else if (!deleting) {
    deleting = true;
    window.setTimeout(typeRole, 1500);
  } else if (charIndex > 0) {
    charIndex--;
    window.setTimeout(typeRole, 42);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    window.setTimeout(typeRole, 250);
  }
}
if (typingEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setTimeout(typeRole, 1200);
}

/* Imagen de respaldo cuando todavía no se ha agregado una fotografía */
const photo = $("#foto");
if (photo) {
  photo.addEventListener("error", () => {
    photo.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8877ed"/><stop offset="1" stop-color="#ff9fc5"/></linearGradient></defs>
        <rect width="400" height="400" fill="url(#g)"/><circle cx="200" cy="145" r="72" fill="#fff" opacity=".9"/><path d="M65 400c10-100 65-150 135-150s125 50 135 150" fill="#fff" opacity=".9"/><text x="200" y="365" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#7967dc">Tu fotografía</text>
      </svg>`
    );
  }, { once: true });
}

/* Menú móvil */
const menu = $("#menu");
const burger = $("#burger");
if (menu && burger) {
  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    burger.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  });
  $$("#menu a").forEach(link => link.addEventListener("click", () => {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menú");
    burger.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  }));
}

const currentPage = document.body.dataset.page;
if (currentPage) {
  $$("#menu a").forEach(link => {
    const active = link.dataset.page === currentPage;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

/* Tema claro/oscuro, con preferencia guardada */
const themeBtn = $("#themeToggle");
const root = document.documentElement;
function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (themeBtn) {
    themeBtn.innerHTML = theme === "dark"
      ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
    themeBtn.setAttribute("aria-label", theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  }
}
let savedTheme = null;
try { savedTheme = localStorage.getItem("portfolio-theme"); } catch (_) {}
const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (systemDark ? "dark" : "light"));
if (themeBtn) themeBtn.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try { localStorage.setItem("portfolio-theme", nextTheme); } catch (_) {}
});

/* Pestañas accesibles del cuaderno */
const tabs = $$(".tab[data-tab]");
const panels = $$(".tab-panel");
function activateTab(tab, moveFocus = false) {
  const panelId = tab.dataset.tab;
  tabs.forEach(item => {
    const active = item === tab;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  panels.forEach(panel => {
    const active = panel.id === panelId;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
  if (moveFocus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", event => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else return;
    event.preventDefault();
    activateTab(tabs[nextIndex], true);
  });
});

/* Animaciones de entrada; fallback para navegadores sin IntersectionObserver */
let revealObserver;
function observeReveals() {
  if (!("IntersectionObserver" in window)) {
    $$(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  $$(".reveal").forEach(el => {
    if (!el.classList.contains("visible")) revealObserver.observe(el);
  });
}

/* Botón volver arriba y año automático */
const toTop = $("#toTop");
if (toTop) {
  window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 420), { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

observeReveals();
