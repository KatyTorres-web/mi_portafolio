# Portafolio académico de Katy

Portafolio estático desarrollado con **HTML, CSS y JavaScript**, preparado para publicarse en **GitHub Pages**. No requiere Node.js, compilación ni dependencias.

## Estructura

```text
portafolio-katy/
├── index.html
├── README.md
├── .nojekyll
├── assets/
│   ├── css/style.css
│   ├── js/script.js
│   └── img/                 # fotografía y evidencias
├── docs/                    # CV u otros documentos que quieras publicar
└── semanas/
    ├── semana-1.md
    ├── semana-2.md
    └── semana-3.md
```

## Cómo probarlo localmente

1. Descomprime la carpeta.
2. Abre `index.html` en tu navegador. También puedes abrir la carpeta con Visual Studio Code y usar Live Server.
3. Cambia los textos de ejemplo, enlaces y datos de contacto.
4. Comprueba los enlaces, el menú móvil y los temas claro/oscuro.

## Personalización rápida

- **Presentación y secciones:** `index.html`.
- **Colores, tamaños y diseño adaptable:** `assets/css/style.css`. Las variables principales están al inicio del archivo.
- **Animaciones, menú, tema y pestañas:** `assets/js/script.js`.
- **Foto:** coloca tu imagen en `assets/img/foto.jpg`.
- **CV:** coloca el PDF en `docs/CV-Katy.pdf`. Si no vas a publicar un CV, elimina los botones correspondientes.
- **Proyectos:** sustituye los nombres, descripciones y enlaces `href="#"` por tus proyectos reales.
- **Cuaderno:** actualiza cada semana en la sección `#cuaderno`. Los archivos Markdown de `semanas/` sirven como borradores de apoyo; GitHub Pages no los incorpora automáticamente a la página.

> Importante: no publiques datos personales que no quieras hacer públicos. Todo lo que subas a un repositorio público podrá ser visto por otras personas.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `portafolio-academico`.
2. Sube el contenido de esta carpeta. `index.html` debe quedar en la raíz del repositorio, no dentro de otra carpeta.
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/(root)` y guarda.
6. Espera a que termine la publicación y abre la URL que GitHub Pages muestre en esa pantalla.

Cada vez que edites y hagas `commit` y `push` a la rama configurada, GitHub Pages actualizará el sitio.

## Lista de revisión antes de entregar

- [ ] Reemplacé los textos de ejemplo y revisé ortografía.
- [ ] Actualicé correo, GitHub y LinkedIn.
- [ ] Reemplacé o quité enlaces `#`.
- [ ] Añadí fotografía y CV, o eliminé sus referencias.
- [ ] Completé las tres semanas y la reflexión final.
- [ ] Añadí libros y páginas web realmente consultados (sin videos).
- [ ] Probé el sitio en móvil y escritorio.
- [ ] Activé GitHub Pages y comprobé la URL publicada.
