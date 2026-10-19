# Portafolio de Katherine Torres

Sitio estático desarrollado con HTML, CSS y JavaScript. Tailwind CSS se compila
localmente y solo se incluyen en `assets/css/tailwind.css` las utilidades usadas
en las vistas.

## Compilar estilos

Requiere Node.js y npm:

```sh
npm install
npm run build:css
```

El archivo compilado se guarda en `assets/css/tailwind.css` y se sirve junto con
el resto del sitio. Para trabajar con recompilación automática:

```sh
npm run watch:css
```

Al desplegar el portafolio como sitio estático, conserva el archivo generado
`assets/css/tailwind.css`; no se necesita ejecutar Tailwind en el servidor.