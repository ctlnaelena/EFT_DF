export const TODAS = 'Todas';

const formateador = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

/** Formatea un número como precio en pesos chilenos: 39990 -> "$39.990" */
export const formatearPrecio = (valor) => formateador.format(valor);

/** Devuelve solo los videojuegos de la categoría indicada (o todos). */
export const filtrarPorCategoria = (juegos, categoria) =>
  categoria === TODAS ? juegos : juegos.filter((juego) => juego.categoria === categoria);

/** Cuenta cuántos videojuegos hay por categoría, incluyendo el total en "Todas". */
export const contarPorCategoria = (juegos) =>
  juegos.reduce(
    (acc, juego) => ({ ...acc, [juego.categoria]: (acc[juego.categoria] ?? 0) + 1 }),
    { [TODAS]: juegos.length },
  );

