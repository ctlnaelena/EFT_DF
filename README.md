# 🐸 Asta — Tienda online de videojuegos

<p align="center"><img src="public/img/marca/asta-logo.webp" alt="Asta" width="320" /></p>

Sitio web de una tienda de videojuegos desarrollado con **HTML semántico, CSS, Bootstrap 5, JavaScript y React 18**.
Muestra el catálogo en tarjetas con la **carátula oficial** de cada juego, permite **filtrar por categoría**, **agregar y eliminar videojuegos del carrito** y contactar al administrador mediante un **formulario validado**.

| Versión | Ruta | Qué demuestra |
|---|---|---|
| **React** (principal) | `/` | Componentes, `state`, `props`, hooks, carga de datos con `fetch` |
| **HTML + JavaScript** | `/vanilla/` | Objeto JS, manipulación del DOM, filtro y validación sin frameworks |

---

## 📑 Índice

1. [Tecnologías](#-tecnologías)
2. [Requisitos previos](#-requisitos-previos)
3. [Instalación](#-instalación)
4. [Uso](#-uso)
5. [Scripts disponibles](#-scripts-disponibles)
6. [Estructura del proyecto](#-estructura-del-proyecto)
7. [Arquitectura de componentes](#-arquitectura-de-componentes-state-y-props)
8. [Paleta de colores](#-paleta-de-colores)
9. [Pruebas y compatibilidad](#-pruebas-y-compatibilidad)

---

## 🛠 Tecnologías

- **React 18** + **Vite 8** (entorno de desarrollo y build)
- **Bootstrap 5.3** (navbar, cards, formularios, grid, utilidades) y **Bootstrap Icons**
- **CSS personalizado** con variables, **CSS Grid** (catálogo) y **Flexbox** (hero, filtros, footer)
- **JavaScript ES2020+** (versión sin framework en `/vanilla`)
- **Vitest 5** para pruebas unitarias
- **GitHub Actions** para probar y publicar en GitHub Pages

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/) **22.12 o superior** (recomendado 22 LTS o 24 LTS) — verifica con `node -v`.
  Vite 8 y Vitest 5 no funcionan con versiones anteriores.
- npm 9+ (incluido con Node) — verifica con `npm -v`
- Git — verifica con `git --version`

## 📦 Instalación

```

# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

Abre **http://localhost:5173** en el navegador.
La versión HTML + JavaScript queda en **http://localhost:5173/vanilla/**.

## 🕹 Uso

**Navegación**
- La barra superior lleva a *Inicio*, *Catálogo* y *Contacto*; el enlace de la sección visible se resalta solo.
- En móvil, el botón ☰ abre y cierra el menú.

**Filtrar videojuegos**
- En escritorio/tablet: botones de categoría con el número de juegos en cada una.
- En móvil: menú desplegable *Filtrar por categoría*.
- El texto *Mostrando X de Y videojuegos* se actualiza con cada filtro.

**Carrito de compras (panel lateral)**
1. Presiona **Agregar al carrito** en cualquier tarjeta: se abre el panel **Mi carrito** desde la derecha.
2. El botón de esa tarjeta cambia a **En tu carrito!** en color Celadon. Al presionarlo, se abre el carrito.
3. El botón **Carrito** de la barra de navegación muestra el total de unidades y también abre el panel.
4. En el panel puedes cambiar la cantidad con **−** y **+**, **eliminar** un juego con 🗑, ver el subtotal de cada juego y el **total**, **vaciar** el carrito o **finalizar la compra** (simulada).
5. El panel se cierra con la ✕, haciendo clic fuera de él o con la tecla `Esc`.
6. El carrito se guarda en `localStorage`, así que se mantiene al recargar.

**Formulario de contacto**
- Valida antes de enviar:
  - *Nombre*: obligatorio, mínimo 3 caracteres, solo letras.
  - *Email*: obligatorio y con formato válido.
  - *Mensaje*: obligatorio, entre 10 y 500 caracteres.
- Los errores aparecen bajo cada campo; el foco va al primer campo inválido. Si todo está correcto, se muestra un mensaje de confirmación y el formulario se limpia.

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve `dist/` para revisar el build |
| `npm test` | Ejecuta las pruebas unitarias (Vitest) |
| `npm run datos` | Regenera `public/data/videojuegos.json` desde `src/data/videojuegos.js` |

## 🗂 Estructura del proyecto

```
asta-game-store/
├── index.html                    # HTML base (lang="es", meta viewport)
├── package.json
├── vite.config.js                # base './' para GitHub Pages
├── public/
│   ├── favicon.png               # Ícono de la pestaña (rana de Asta)
│   ├── img/marca/                # Logo "asta" y rana del banner (WebP)
│   ├── data/videojuegos.json     # Datos que React carga con fetch()
│   ├── img/placeholder.svg       # Imagen de respaldo si una carátula no carga
│   └── vanilla/                  # Versión HTML + JavaScript (Paso 2)
│       ├── index.html
│       ├── app.js
│       └── styles.css
├── scripts/
│   └── generar-datos.mjs         # Exporta el catálogo a JSON
└── src/
    ├── main.jsx                  # Punto de entrada: importa Bootstrap y estilos
    ├── App.jsx                   # Componente raíz: dueño del estado
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── FiltroCategorias.jsx
    │   ├── ListaVideojuegos.jsx
    │   ├── TarjetaVideojuego.jsx
    │   ├── Carrito.jsx
    │   ├── FormularioContacto.jsx
    │   ├── CampoFormulario.jsx   # Campo reutilizable con validación
    │   └── Footer.jsx
    ├── hooks/
    │   ├── useVideojuegos.js     # Carga el catálogo (fetch + respaldo local)
    │   ├── useCarrito.js         # Estado del carrito (agregar, eliminar, vaciar)
    │   └── useFormulario.js      # Lógica genérica de formularios
    ├── data/
    │   └── videojuegos.js        # Objeto JS con el catálogo
    ├── utils/
    │   ├── catalogo.js           # Filtro, conteo, formato CLP
    │   ├── carrito.js            # Agregar/eliminar ítems, total y unidades
    │   ├── validaciones.js       # Reglas de validación del contacto
    │   └── __tests__/            # Pruebas unitarias
    └── styles/
        └── index.css             # Paleta, overrides de Bootstrap, Grid/Flexbox
```

## 🧩 Arquitectura de componentes (state y props)

```
App  ── state: videojuegos (useVideojuegos), categoriaActiva, carrito + panel abierto (useCarrito)
 ├── Navbar               props: enlaces, marca, cantidadCarrito, onAbrirCarrito
 ├── Hero                 props: totalJuegos, totalCategorias, precioDesde
 ├── FiltroCategorias     props: categorias, activa, conteo, onCambiar ──► setCategoriaActiva
 ├── ListaVideojuegos     props: juegos (filtrados), cargando, categoria, idsEnCarrito, onAgregar, onVerCarrito
 │    └── TarjetaVideojuego   props: juego, enCarrito, onAgregar, onVerCarrito
 ├── FormularioContacto
 │    └── CampoFormulario ×3
 ├── Footer               props: marca
 └── Carrito (offcanvas)  props: abierto, items, onCerrar, onAumentar, onDisminuir, onEliminar, onVaciar
```

- **Flujo unidireccional**: el estado vive en `App`; los hijos lo reciben por **props** y avisan cambios con **callbacks** (`onCambiar`, `onAgregar`, `onEliminar`).
- Al filtrar, `categoriaActiva` cambia en `App` y `ListaVideojuegos` recibe la lista nueva automáticamente.
- Al agregar un juego, el estado cambia en `App`: se abre el panel `Carrito`, se actualiza el contador de la `Navbar` y el botón de la tarjeta pasa a **En tu carrito!** (renderizado condicional).
- El panel lateral usa las clases `offcanvas` de Bootstrap, pero se abre y cierra con estado de React (`abierto`), sin el JavaScript de Bootstrap.
- Las funciones de `utils/carrito.js` nunca modifican el arreglo original: devuelven uno nuevo (inmutabilidad), que es lo que React necesita para volver a renderizar.
- `useVideojuegos` carga `public/data/videojuegos.json` con `fetch` (con `AbortController`); si falla, usa el objeto local de respaldo.
- `CampoFormulario` y `useFormulario` evitan repetir código en los campos del formulario de contacto.

## 🎨 Paleta de colores

| Color | Hex | Uso |
|---|---|---|
| 01 Medium Slate Blue | `#6666ff` | Botón primario, íconos, degradados |
| 02 Periwinkle | `#b8baff` | Enlaces, hover de navegación, bordes |
| 03 Columbia Blue | `#c9e8ff` | Texto principal |
| 04 Rich Black | `#0c0c16` | Fondo general |
| 05 Celadon | `#b9f0d7` | Acentos, precios, botón secundario, foco |

Las tarjetas tienen un diseño estático (sin animaciones al pasar el cursor), siguiendo un modelo sencillo.

Los colores están definidos como variables CSS en `src/styles/index.css` y sobrescriben las variables de Bootstrap (`--bs-primary`, `--bs-body-bg`, etc.). Las combinaciones de texto se eligieron para mantener buen contraste sobre fondo oscuro.

## 🧪 Pruebas y compatibilidad

```bash
npm test
```

- **20 pruebas unitarias** (Vitest) sobre el carrito, la validación del contacto y las utilidades del catálogo.
- **Pruebas en navegador** realizadas sobre el build de producción:
  - Móvil (375 px), tablet (820 px) y escritorio (1366 px): 12 tarjetas visibles y sin desbordamiento horizontal.
  - Filtro por botones (RPG → 2 juegos) y por menú desplegable en móvil (Deportes → 2 juegos).
  - Formulario de contacto: envío vacío muestra los 3 errores; envío válido muestra la confirmación.
  - Carrito: el panel está oculto al cargar y se abre al agregar; los botones + y − cambian la cantidad y el total; se cierra con `Esc`, con la ✕ y con clic fuera; el botón de la tarjeta cambia a "En tu carrito!" y vuelve a "Agregar al carrito" al eliminar el juego.
  - Versión `/vanilla`: tarjetas, filtro y validación funcionando.
- **Navegadores objetivo**: Chrome, Edge, Firefox y Safari en sus versiones actuales (Bootstrap 5 y Vite no soportan Internet Explorer).

## 🔒 Seguridad de dependencias

`npm audit` reporta **0 vulnerabilidades**. Una versión anterior del proyecto mostraba 2 críticas, provenientes de `tinypool`, una dependencia interna de Vitest. Se corrigieron actualizando Vite y Vitest y reemplazando `gh-pages` por GitHub Actions.

