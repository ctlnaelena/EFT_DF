/** Agrega un videojuego; si ya está en el carrito, suma 1 a su cantidad. */
export function agregarAlCarrito(items, juego) {
  const existe = items.some((item) => item.id === juego.id);
  if (existe) {
    return items.map((item) => (item.id === juego.id ? { ...item, cantidad: item.cantidad + 1 } : item));
  }
  const { id, nombre, precio, imagen } = juego;
  return [...items, { id, nombre, precio, imagen, cantidad: 1 }];
}

/** Resta 1 a la cantidad; si llega a 0, el videojuego sale del carrito. */
export const disminuirCantidad = (items, id) =>
  items
    .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
    .filter((item) => item.cantidad > 0);

/** Elimina por completo un videojuego del carrito. */
export const eliminarDelCarrito = (items, id) => items.filter((item) => item.id !== id);

/** Total de unidades (para el contador de la barra de navegación). */
export const contarUnidades = (items) => items.reduce((total, item) => total + item.cantidad, 0);

/** Total a pagar en pesos. */
export const calcularTotal = (items) => items.reduce((total, item) => total + item.precio * item.cantidad, 0);
