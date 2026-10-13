# Semana 6 — React: eventos, formularios, rutas y consumo de APIs

Repositorio relacionado: [Practica-semana-6_misk-i-bitter](https://github.com/KatyTorres-web/Practica-semana-6_misk-i-bitter).

La guía de la semana 6 propone trabajar con navegación del lado del cliente, formularios controlados, renderizado condicional e iterativo y consumo de APIs con Axios y `async/await`.

**Fecha o tema principal:** React: eventos, renderizado condicional e iterativo, formularios, routing y consumo de APIs.

## Temas aprendidos

### Tema 1: Eventos y renderizado en React

**Definición con mis palabras:** Los eventos permiten responder a las acciones del usuario, como hacer clic o escribir en un formulario. El renderizado condicional muestra contenido según una condición, mientras que el renderizado iterativo permite generar elementos a partir de una colección de datos.

**Procedimiento:**

1. Revisé el manejo de eventos en componentes React.
2. Analicé el uso de condiciones y del método `.map()` para mostrar información.
3. Estudié el manejo del estado mediante `useState` y la importancia de asignar una clave única a cada elemento de una lista.

**Conceptos clave:** Eventos, `useState`, renderizado condicional, `.map()`, `key` y formularios controlados.

### Tema 2: Navegación y consumo de APIs

**Definición con mis palabras:** El routing permite cambiar entre vistas de una aplicación sin recargar completamente la página. Las APIs permiten obtener información de otros servicios, y Axios facilita las solicitudes HTTP desde JavaScript.

**Procedimiento:**

1. Revisé la organización de rutas mediante React Router.
2. Analicé la obtención de información mediante Axios y `async/await`.
3. Estudié cómo gestionar los estados de carga, datos y error para ofrecer una respuesta adecuada al usuario.

**Conceptos clave:** React Router, `BrowserRouter`, `Routes`, `Route`, Axios, `async/await`, `useEffect` y manejo de errores.

## Ejercicios de laboratorio y resultados

### Ejercicio 1: Navegación entre vistas

**Objetivo:** Organizar una aplicación React con diferentes páginas y facilitar la navegación entre ellas.

**Procedimiento:** Revisé la estructura propuesta con páginas como Home, List, Form y NotFound, utilizando componentes de React Router para definir las rutas.

**Resultado:** Comprendí cómo estructurar la navegación del lado del cliente y separar las vistas de una aplicación.

### Ejercicio 2: Consumo de información desde una API

**Objetivo:** Obtener y presentar datos externos en una interfaz web.

**Procedimiento:** Revisé el uso de Axios junto con `async/await`, la gestión del estado de carga y el tratamiento de errores durante las solicitudes.

**Resultado:** Reforcé el proceso de obtención de información externa y la importancia de contemplar estados de carga, éxito y error.

### Ejercicio 3: Formularios controlados

**Objetivo:** Capturar información ingresada por el usuario y gestionar su estado dentro de React.

**Procedimiento:** Analicé el uso de `useState`, `onChange` y `onSubmit` para controlar los valores y el envío de formularios.

**Resultado:** Comprendí cómo conectar los campos de un formulario con el estado de un componente.

## Reflexión semanal

- **¿Qué aprendí?** Aprendí cómo React permite gestionar eventos, mostrar información de manera condicional, navegar entre vistas y consumir datos externos.
- **¿Cómo aprendí?** Mediante la revisión de la estructura de una aplicación React, el análisis de rutas, formularios y solicitudes a APIs.
- **¿Qué necesito reforzar?** Necesito practicar el manejo de errores en las solicitudes, la actualización del estado y la validación de formularios para construir aplicaciones más robustas.
