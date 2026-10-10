const STEAM_CDN = 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps';

export const videojuegos = [
  {
    id: 1,
    nombre: 'Elden Ring',
    categoria: 'RPG',
    precio: 39990,
    descripcion: 'Explora las Tierras Intermedias en un mundo abierto lleno de jefes desafiantes y secretos.',
    imagen: `${STEAM_CDN}/1245620/library_600x900.jpg`,
  },
  {
    id: 2,
    nombre: 'Red Dead Redemption 2',
    categoria: 'Aventura',
    precio: 29990,
    descripcion: 'Vive el ocaso del salvaje oeste junto a Arthur Morgan y la banda de Van der Linde.',
    imagen: `${STEAM_CDN}/1174180/library_600x900.jpg`,
  },
  {
    id: 3,
    nombre: 'EA Sports FC 25',
    categoria: 'Deportes',
    precio: 44990,
    descripcion: 'Fútbol con más de 19.000 jugadores licenciados, modo carrera y Ultimate Team.',
    imagen: `${STEAM_CDN}/2669320/library_600x900.jpg`,
  },
  {
    id: 4,
    nombre: 'God of War Ragnarök',
    categoria: 'Acción',
    precio: 34990,
    descripcion: 'Kratos y Atreus enfrentan el fin de los tiempos en los nueve reinos nórdicos.',
    imagen: `${STEAM_CDN}/2322010/library_600x900.jpg`,
  },
  {
    id: 5,
    nombre: 'Forza Horizon 5',
    categoria: 'Carreras',
    precio: 29990,
    descripcion: 'Conduce cientos de autos por los paisajes de México en un festival de mundo abierto.',
    imagen: `${STEAM_CDN}/1551360/library_600x900.jpg`,
  },
  {
    id: 6,
    nombre: 'Civilization VI',
    categoria: 'Estrategia',
    precio: 19990,
    descripcion: 'Lleva a tu civilización desde la edad de piedra hasta la era de la información.',
    imagen: `${STEAM_CDN}/289070/library_600x900.jpg`,
  },
  {
    id: 7,
    nombre: 'Baldur’s Gate 3',
    categoria: 'RPG',
    precio: 49990,
    descripcion: 'Rol por turnos basado en Dungeons & Dragons, con decisiones que cambian la historia.',
    imagen: `${STEAM_CDN}/1086940/library_600x900.jpg`,
  },
  {
    id: 8,
    nombre: 'Marvel\u2019s Spider-Man 2',
    categoria: 'Acción',
    precio: 59990,
    descripcion: 'Peter Parker y Miles Morales protegen Nueva York de nuevas amenazas.',
    imagen: `${STEAM_CDN}/2651280/library_600x900.jpg`,
  },
  {
    id: 9,
    nombre: 'Need for Speed Unbound',
    categoria: 'Carreras',
    precio: 34990,
    descripcion: 'Carreras callejeras con estilo urbano, tuning de autos y persecuciones policiales.',
    imagen: `${STEAM_CDN}/1846380/library_600x900.jpg`,
  },
  {
    id: 10,
    nombre: 'NBA 2K25',
    categoria: 'Deportes',
    precio: 42990,
    descripcion: 'Baloncesto con modo MyCAREER, MyTEAM y las plantillas actualizadas de la temporada.',
    imagen: `${STEAM_CDN}/2878980/library_600x900.jpg`,
  },
  {
    id: 11,
    nombre: 'Hollow Knight',
    categoria: 'Aventura',
    precio: 9990,
    descripcion: 'Metroidvania dibujado a mano en un reino subterráneo de insectos.',
    imagen: `${STEAM_CDN}/367520/library_600x900.jpg`,
  },
  {
    id: 12,
    nombre: 'Age of Empires IV',
    categoria: 'Estrategia',
    precio: 24990,
    descripcion: 'Estrategia en tiempo real a través de batallas históricas de la Edad Media.',
    imagen: `${STEAM_CDN}/1466860/library_600x900.jpg`,
  },
];

/** Lista de categorías únicas, ordenadas alfabéticamente. */
export const obtenerCategorias = (lista) =>
  [...new Set(lista.map((juego) => juego.categoria))].sort((a, b) => a.localeCompare(b, 'es'));

export default videojuegos;
