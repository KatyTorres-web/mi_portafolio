/* Portafolio académico | Interacciones accesibles sin dependencias externas */
"use strict";

const $ = (selector, parent = document) => parent.querySelector(selector);

const $$ = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* =========================================================
   03. MÁQUINA DE ESCRIBIR
   Escribe y borra frases con transiciones naturales.
   ========================================================= */

const typingEl = $("#typing");

const roles = [
  "Ingeniería de Sistemas",
  "Desarrollo Web",
  "Transformación Digital",
];

if (typingEl && !reducedMotion) {
  let roleIndex = Math.max(0, roles.indexOf(typingEl.textContent.trim()));

  let charIndex = typingEl.textContent.trim().length;
  let deleting = false;
  let timerId;

  const tick = () => {
    const phrase = roles[roleIndex];

    if (!deleting) {
      charIndex = Math.min(phrase.length, charIndex + 1);

      typingEl.textContent = phrase.slice(0, charIndex);

      if (charIndex >= phrase.length) {
        deleting = true;
        timerId = window.setTimeout(tick, 2200);
        return;
      }

      timerId = window.setTimeout(tick, 62);
      return;
    }

    charIndex = Math.max(0, charIndex - 1);

    typingEl.textContent = phrase.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;

      timerId = window.setTimeout(tick, 260);
      return;
    }

    timerId = window.setTimeout(tick, 32);
  };

  timerId = window.setTimeout(() => {
    deleting = true;
    tick();
  }, 2400);

  window.addEventListener("pagehide", () => window.clearTimeout(timerId), {
    once: true,
  });
}

/* =========================================================
   01, 05 Y 06. PARTÍCULAS, ETIQUETAS Y HALO FOTOGRÁFICO
   Las partículas y las etiquetas se crean con JavaScript.
   El halo luminoso se controla mediante CSS.
   ========================================================= */

const heroPhoto = $(".hero-photo");

if (heroPhoto && !reducedMotion) {
  /* 01. Partículas mágicas alrededor de la fotografía */

  if (!heroPhoto.querySelector(".magic-particle")) {
    const colors = ["var(--accent)", "var(--pink)", "var(--mint)"];

    const particleCount = window.matchMedia("(max-width: 760px)").matches
      ? 10
      : 18;

    for (let i = 0; i < particleCount; i += 1) {
      const particle = document.createElement("span");

      particle.className = "magic-particle";
      particle.setAttribute("aria-hidden", "true");
      particle.textContent = i % 4 === 0 ? "✧" : "✦";

      particle.style.setProperty("--particle-x", `${7 + ((i * 37) % 87)}%`);

      particle.style.setProperty("--particle-y", `${5 + ((i * 29) % 87)}%`);

      particle.style.setProperty("--particle-size", `${9 + (i % 4) * 3}px`);

      particle.style.setProperty(
        "--particle-duration",
        `${3.1 + (i % 5) * 0.55}s`,
      );

      particle.style.setProperty("--particle-delay", `${-((i * 0.47) % 4)}s`);

      particle.style.setProperty("--particle-color", colors[i % colors.length]);

      heroPhoto.appendChild(particle);
    }
  }

  /* 05. Etiquetas flotantes alrededor de la fotografía */

  if (!heroPhoto.querySelector(".floating-chip")) {
    const labels = ["HTML · CSS", "JavaScript", "Datos & BI"];

    labels.forEach((label, index) => {
      const chip = document.createElement("span");

      chip.className = `floating-chip chip-${index + 1}`;
      chip.setAttribute("aria-hidden", "true");
      chip.textContent = label;

      heroPhoto.appendChild(chip);
    });
  }

  /* 01. Destellos al mover el cursor cerca de la fotografía */

  const canCreateCursorSparkles = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;

  if (canCreateCursorSparkles) {
    let lastSparkleAt = 0;
    let lastX = 0;
    let lastY = 0;
    let liveSparkles = 0;

    heroPhoto.addEventListener(
      "pointermove",
      (event) => {
        if (event.pointerType === "touch" || liveSparkles >= 8) {
          return;
        }

        const now = performance.now();

        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;

        /* Evita crear demasiados destellos */
        if (now - lastSparkleAt < 95 || dx * dx + dy * dy < 24 * 24) {
          return;
        }

        lastSparkleAt = now;
        lastX = event.clientX;
        lastY = event.clientY;

        const rect = heroPhoto.getBoundingClientRect();

        const sparkle = document.createElement("span");

        sparkle.className = "cursor-sparkle";
        sparkle.setAttribute("aria-hidden", "true");

        sparkle.textContent = Math.random() > 0.5 ? "✦" : "✧";

        sparkle.style.left = `${event.clientX - rect.left}px`;

        sparkle.style.top = `${event.clientY - rect.top}px`;

        sparkle.style.setProperty(
          "--sparkle-hue",
          Math.random() > 0.5 ? "var(--pink)" : "var(--accent)",
        );

        liveSparkles += 1;

        sparkle.addEventListener(
          "animationend",
          () => {
            sparkle.remove();
            liveSparkles = Math.max(0, liveSparkles - 1);
          },
          { once: true },
        );

        heroPhoto.appendChild(sparkle);
      },
      { passive: true },
    );
  }
}

/* =========================================================
   IMAGEN DE RESPALDO
   Se muestra una ilustración si no se encuentra la fotografía.
   ========================================================= */

const photo = $("#foto");

if (photo) {
  photo.addEventListener(
    "error",
    () => {
      photo.src =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 400 400">
            <defs>
              <linearGradient id="g"
                              x1="0" y1="0"
                              x2="1" y2="1">
                <stop stop-color="#8877ed"/>
                <stop offset="1"
                      stop-color="#ff9fc5"/>
              </linearGradient>
            </defs>

            <rect width="400" height="400"
                  fill="url(#g)"/>

            <circle cx="200" cy="145" r="72"
                    fill="#fff" opacity=".9"/>

            <path d="M65 400
                     c10-100 65-150 135-150
                     s125 50 135 150"
                  fill="#fff" opacity=".9"/>

            <text x="200" y="365"
                  text-anchor="middle"
                  font-family="sans-serif"
                  font-size="22"
                  fill="#7967dc">
              Tu fotografía
            </text>
          </svg>
        `);
    },
    { once: true },
  );
}

/* =========================================================
   MENÚ MÓVIL
   Conserva el comportamiento y el estado accesible.
   ========================================================= */

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

  $$("#menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");

      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Abrir menú");

      burger.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    });
  });
}

/* =========================================================
   NAVEGACIÓN ACTIVA
   Identifica la página actual mediante data-page.
   ========================================================= */

const currentPage = document.body.dataset.page;

if (currentPage) {
  $$("#menu a").forEach((link) => {
    const active = link.dataset.page === currentPage;

    link.classList.toggle("active", active);

    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

/* =========================================================
   TEMA CLARO Y OSCURO
   Guarda la preferencia del usuario cuando es posible.
   ========================================================= */

const themeBtn = $("#themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);

  if (themeBtn) {
    themeBtn.innerHTML =
      theme === "dark"
        ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';

    themeBtn.setAttribute(
      "aria-label",
      theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro",
    );
  }
}

let savedTheme = null;

try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch (_) {
  /* El sitio seguirá funcionando si localStorage no está disponible. */
}

const systemDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

applyTheme(savedTheme || (systemDark ? "dark" : "light"));

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const nextTheme =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch (_) {
      /* El cambio de tema sigue funcionando sin almacenamiento. */
    }
  });
}

/* =========================================================
   PESTAÑAS DEL CUADERNO
   Incluye navegación con las flechas del teclado.
   ========================================================= */

const tabs = $$(".tab[data-tab]");
const panels = $$(".tab-panel");

function activateTab(tab, moveFocus = false) {
  const panelId = tab.dataset.tab;

  const nextPanel = panels.find((panel) => panel.id === panelId);

  if (!nextPanel) return;

  tabs.forEach((item) => {
    const active = item === tab;

    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });

  panels.forEach((panel) => {
    const active = panel.id === panelId;

    panel.hidden = !active;
    panel.classList.toggle("active", active);
    panel.classList.remove("week-entering");
  });

  if (!reducedMotion) {
    window.requestAnimationFrame(() => {
      nextPanel.classList.add("week-entering");
    });

    nextPanel.addEventListener(
      "animationend",
      () => {
        nextPanel.classList.remove("week-entering");
      },
      { once: true },
    );
  }

  if (moveFocus) {
    tab.focus();
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    activateTab(tab);
  });

  tab.addEventListener("keydown", (event) => {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }

    event.preventDefault();

    activateTab(tabs[nextIndex], true);
  });
});

/* =========================================================
   ANIMACIONES DE ENTRADA AL DESPLAZARSE
   Usa IntersectionObserver con alternativa compatible.
   ========================================================= */

let revealObserver;

function observeReveals() {
  const reveals = $$(".reveal");

  if (reducedMotion) {
    reveals.forEach((el) => {
      el.classList.add("visible");
    });

    return;
  }

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => {
      el.classList.add("visible");
    });

    return;
  }

  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  /* Aparición escalonada de las tarjetas */
  $$(".grid, .cards-grid").forEach((group) => {
    group.querySelectorAll(":scope > .reveal").forEach((item, index) => {
      item.style.setProperty(
        "--reveal-delay",
        `${Math.min(index * 75, 375)}ms`,
      );
    });
  });

  reveals.forEach((el) => {
    if (!el.classList.contains("visible")) {
      el.classList.add("reveal-pending");
      revealObserver.observe(el);
    }
  });
}

/* =========================================================
   INCLINACIÓN 3D DE TARJETAS
   Solo en dispositivos con mouse o trackpad.
   ========================================================= */

const canTilt =
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !reducedMotion;

if (canTilt) {
  $$(".project, .card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 5;
      const rotateX = (0.5 - y) * 5;

      card.style.setProperty("--tilt-x", `${rotateY.toFixed(2)}deg`);

      card.style.setProperty("--tilt-y", `${rotateX.toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

/* =========================================================
   BOTÓN VOLVER ARRIBA
   Respeta la preferencia de movimiento del usuario.
   ========================================================= */

const toTop = $("#toTop");

if (toTop) {
  window.addEventListener(
    "scroll",
    () => {
      toTop.classList.toggle("show", window.scrollY > 420);
    },
    { passive: true },
  );

  toTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  });
}

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

observeReveals();
