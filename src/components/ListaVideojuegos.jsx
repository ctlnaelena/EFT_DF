import TarjetaVideojuego from './TarjetaVideojuego.jsx';

/**
 * Lista del catálogo (CSS Grid). Muestra un spinner mientras carga
 * y un mensaje si el filtro no tiene resultados. Reutiliza
 * TarjetaVideojuego para cada elemento.
 *
 * @param {{
 *   juegos: object[], cargando: boolean, categoria: string,
 *   idsEnCarrito: Set<number>, onAgregar: (juego: object) => void, onVerCarrito: () => void
 * }} props
 */
function ListaVideojuegos({ juegos, cargando, categoria, idsEnCarrito, onAgregar, onVerCarrito }) {
  if (cargando) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Cargando videojuegos…</span>
        </div>
      </div>
    );
  }

  if (juegos.length === 0) {
    return (
      <p className="pv-empty">
        <i className="bi bi-controller fs-2 d-block mb-2" aria-hidden="true" />
        No hay videojuegos en la categoría <strong>{categoria}</strong>.
      </p>
    );
  }

  return (
    <div className="pv-grid">
      {juegos.map((juego) => (
        <TarjetaVideojuego
          key={juego.id}
          juego={juego}
          enCarrito={idsEnCarrito.has(juego.id)}
          onAgregar={onAgregar}
          onVerCarrito={onVerCarrito}
        />
      ))}
    </div>
  );
}

export default ListaVideojuegos;
