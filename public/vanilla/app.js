/* ==========================================================================
   Asta — Versión HTML + JavaScript (Paso 2)
   - Objeto con la información de los videojuegos
   - Generación dinámica de tarjetas manipulando el DOM
   - Filtro por categoría (botones + menú desplegable sincronizados)
   - Validación del formulario de contacto
   ========================================================================== */
'use strict';

// --------------------------------------------------------------------------
// 1. Objeto de datos
// --------------------------------------------------------------------------
// Carátulas oficiales publicadas en el CDN de Steam
const STEAM_CDN = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps';

const tienda = {
  nombre: 'Asta',
  moneda: 'CLP',
  videojuegos: [
    { id: 1, nombre: 'Elden Ring', categoria: 'RPG', precio: 39990, descripcion: 'Explora las Tierras Intermedias en un mundo abierto lleno de jefes desafiantes y secretos.', imagen: `${STEAM_CDN}/1245620/library_600x900.jpg` },
    { id: 2, nombre: 'Red Dead Redemption 2', categoria: 'Aventura', precio: 29990, descripcion: 'Vive el ocaso del salvaje oeste junto a Arthur Morgan y la banda de Van der Linde.', imagen: `${STEAM_CDN}/1174180/library_600x900.jpg` },
    { id: 3, nombre: 'EA Sports FC 25', categoria: 'Deportes', precio: 44990, descripcion: 'Fútbol con más de 19.000 jugadores licenciados, modo carrera y Ultimate Team.', imagen: `${STEAM_CDN}/2669320/library_600x900.jpg` },
    { id: 4, nombre: 'God of War Ragnarök', categoria: 'Acción', precio: 34990, descripcion: 'Kratos y Atreus enfrentan el fin de los tiempos en los nueve reinos nórdicos.', imagen: `${STEAM_CDN}/2322010/library_600x900.jpg` },
    { id: 5, nombre: 'Forza Horizon 5', categoria: 'Carreras', precio: 29990, descripcion: 'Conduce cientos de autos por los paisajes de México en un festival de mundo abierto.', imagen: `${STEAM_CDN}/1551360/library_600x900.jpg` },
    { id: 6, nombre: 'Civilization VI', categoria: 'Estrategia', precio: 19990, descripcion: 'Lleva a tu civilización desde la edad de piedra hasta la era de la información.', imagen: `${STEAM_CDN}/289070/library_600x900.jpg` },
    { id: 7, nombre: 'Baldur’s Gate 3', categoria: 'RPG', precio: 49990, descripcion: 'Rol por turnos basado en Dungeons & Dragons, con decisiones que cambian la historia.', imagen: `${STEAM_CDN}/1086940/library_600x900.jpg` },
    { id: 8, nombre: 'Marvel’s Spider-Man 2', categoria: 'Acción', precio: 59990, descripcion: 'Peter Parker y Miles Morales protegen Nueva York de nuevas amenazas.', imagen: `${STEAM_CDN}/2651280/library_600x900.jpg` },
    { id: 9, nombre: 'Need for Speed Unbound', categoria: 'Carreras', precio: 34990, descripcion: 'Carreras callejeras con estilo urbano, tuning de autos y persecuciones policiales.', imagen: `${STEAM_CDN}/1846380/library_600x900.jpg` },
    { id: 10, nombre: 'NBA 2K25', categoria: 'Deportes', precio: 42990, descripcion: 'Baloncesto con modo MyCAREER, MyTEAM y las plantillas actualizadas de la temporada.', imagen: `${STEAM_CDN}/2878980/library_600x900.jpg` },
    { id: 11, nombre: 'Hollow Knight', categoria: 'Aventura', precio: 9990, descripcion: 'Metroidvania dibujado a mano en un reino subterráneo de insectos.', imagen: `${STEAM_CDN}/367520/library_600x900.jpg` },
    { id: 12, nombre: 'Age of Empires IV', categoria: 'Estrategia', precio: 24990, descripcion: 'Estrategia en tiempo real a través de batallas históricas de la Edad Media.', imagen: `${STEAM_CDN}/1466860/library_600x900.jpg` },
  ],
};

const TODAS = 'Todas';
let categoriaActiva = TODAS;

// Referencias al DOM
const $lista = document.getElementById('lista-juegos');
const $filtros = document.getElementById('filtros');
const $select = document.getElementById('filtro-select');
const $contador = document.getElementById('contador');

const formatoPrecio = new Intl.NumberFormat('es-CL', { style: 'currency', currency: tienda.moneda });

// --------------------------------------------------------------------------
// 2. Utilidades de DOM
// --------------------------------------------------------------------------
/** Crea un elemento con clases, atributos y texto. Usa textContent (no innerHTML) para evitar inyección de HTML. */
function crear(etiqueta, { clases = '', texto, attrs = {} } = {}) {
  const el = document.createElement(etiqueta);
  if (clases) el.className = clases;
  if (texto !== undefined) el.textContent = texto;
  Object.entries(attrs).forEach(([clave, valor]) => el.setAttribute(clave, valor));
  return el;
}

function obtenerCategorias() {
  const unicas = [...new Set(tienda.videojuegos.map((j) => j.categoria))].sort((a, b) => a.localeCompare(b, 'es'));
  return [TODAS, ...unicas];
}

// --------------------------------------------------------------------------
// 3. Generación dinámica de tarjetas
// --------------------------------------------------------------------------
function crearTarjeta(juego) {
  const article = crear('article', { clases: 'card pv-card' });

  const figura = crear('div', { clases: 'pv-card__media' });
  const img = crear('img', { attrs: { src: juego.imagen, alt: `Carátula de ${juego.nombre}`, loading: 'lazy', width: '600', height: '900' } });
  img.addEventListener('error', () => { img.src = '../img/placeholder.svg'; }, { once: true });
  const badge = crear('span', { clases: 'badge pv-card__badge', texto: juego.categoria });
  figura.append(img, badge);

  const cuerpo = crear('div', { clases: 'card-body' });
  const titulo = crear('h3', { clases: 'card-title h5 mb-0', texto: juego.nombre });
  const desc = crear('p', { clases: 'card-text mb-0', texto: juego.descripcion });
  const precio = crear('p', { clases: 'pv-price mb-0', texto: formatoPrecio.format(juego.precio) });
  const boton = crear('button', { clases: 'btn btn-primary w-100', texto: 'Ver detalle', attrs: { type: 'button' } });
  boton.addEventListener('click', () => alert(`${juego.nombre}\n${juego.categoria} · ${formatoPrecio.format(juego.precio)}\n\n${juego.descripcion}`));

  cuerpo.append(titulo, desc, precio, boton);
  article.append(figura, cuerpo);
  return article;
}

function renderizarJuegos() {
  const filtrados = categoriaActiva === TODAS
    ? tienda.videojuegos
    : tienda.videojuegos.filter((j) => j.categoria === categoriaActiva);

  // DocumentFragment: una sola inserción en el DOM por renderizado
  const fragmento = document.createDocumentFragment();
  filtrados.forEach((juego) => fragmento.append(crearTarjeta(juego)));
  $lista.replaceChildren(fragmento);

  if (filtrados.length === 0) {
    $lista.append(crear('p', { clases: 'pv-empty', texto: 'No hay videojuegos en esta categoría.' }));
  }

  $contador.textContent = `Mostrando ${filtrados.length} de ${tienda.videojuegos.length} videojuegos`;
}

// --------------------------------------------------------------------------
// 4. Filtros (botones + select sincronizados)
// --------------------------------------------------------------------------
function renderizarFiltros() {
  const categorias = obtenerCategorias();

  $filtros.replaceChildren(...categorias.map((cat) => {
    const total = cat === TODAS ? tienda.videojuegos.length : tienda.videojuegos.filter((j) => j.categoria === cat).length;
    const btn = crear('button', {
      clases: `pv-filter-btn${cat === categoriaActiva ? ' active' : ''}`,
      attrs: { type: 'button', 'data-categoria': cat, 'aria-pressed': String(cat === categoriaActiva) },
    });
    btn.append(document.createTextNode(`${cat} `), crear('span', { clases: 'badge rounded-pill', texto: String(total) }));
    return btn;
  }));

  $select.replaceChildren(...categorias.map((cat) => {
    const opcion = crear('option', { texto: cat, attrs: { value: cat } });
    opcion.selected = cat === categoriaActiva;
    return opcion;
  }));
}

function cambiarCategoria(categoria) {
  categoriaActiva = categoria;
  renderizarFiltros();
  renderizarJuegos();
}

// Delegación de eventos: un solo listener para todos los botones
$filtros.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-categoria]');
  if (btn) cambiarCategoria(btn.dataset.categoria);
});
$select.addEventListener('change', (e) => cambiarCategoria(e.target.value));

// --------------------------------------------------------------------------
// 5. Validación del formulario de contacto
// --------------------------------------------------------------------------
const $form = document.getElementById('form-contacto');
const $alerta = document.getElementById('alerta-form');
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validarCampo(nombre, valor) {
  const v = valor.trim();
  switch (nombre) {
    case 'nombre':
      if (!v) return 'El nombre es obligatorio.';
      if (v.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
      if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/.test(v)) return 'El nombre solo puede contener letras y espacios.';
      return '';
    case 'email':
      if (!v) return 'El email es obligatorio.';
      if (!REGEX_EMAIL.test(v)) return 'Ingresa un email válido (ej: nombre@correo.cl).';
      return '';
    case 'mensaje':
      if (!v) return 'El mensaje es obligatorio.';
      if (v.length < 10) return `El mensaje debe tener al menos 10 caracteres (llevas ${v.length}).`;
      if (v.length > 500) return 'El mensaje no puede superar los 500 caracteres.';
      return '';
    default:
      return '';
  }
}

function mostrarEstado(input, error) {
  const $error = document.getElementById(`error-${input.name}`);
  input.classList.toggle('is-invalid', Boolean(error));
  input.classList.toggle('is-valid', !error);
  input.setAttribute('aria-invalid', String(Boolean(error)));
  input.setAttribute('aria-describedby', `error-${input.name}`);
  $error.textContent = error;
}

// Validación en tiempo real una vez que el usuario sale del campo
['nombre', 'email', 'mensaje'].forEach((campo) => {
  const input = $form.elements[campo];
  input.addEventListener('blur', () => mostrarEstado(input, validarCampo(campo, input.value)));
  input.addEventListener('input', () => {
    if (input.classList.contains('is-invalid')) mostrarEstado(input, validarCampo(campo, input.value));
  });
});

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  let primerError = null;

  ['nombre', 'email', 'mensaje'].forEach((campo) => {
    const input = $form.elements[campo];
    const error = validarCampo(campo, input.value);
    mostrarEstado(input, error);
    if (error && !primerError) primerError = input;
  });

  if (primerError) {
    $alerta.className = 'alert alert-pv-error';
    $alerta.textContent = 'Revisa los campos marcados antes de enviar.';
    primerError.focus();
    return;
  }

  $alerta.className = 'alert alert-pv-success';
  $alerta.textContent = `¡Gracias, ${$form.elements.nombre.value.trim()}! Tu mensaje fue enviado correctamente.`;
  $form.reset();
  $form.querySelectorAll('.is-valid').forEach((el) => el.classList.remove('is-valid'));
});

// --------------------------------------------------------------------------
// 6. Inicio
// --------------------------------------------------------------------------
document.getElementById('anio').textContent = new Date().getFullYear();
renderizarFiltros();
renderizarJuegos();
