import { formatearPrecio } from '../utils/catalogo.js';

const PLACEHOLDER = './img/placeholder.svg';

/**
 * Tarjeta de un videojuego (componente card de Bootstrap 5).
 * El botón cambia según el estado del carrito (renderizado condicional):
 * - "Agregar al carrito" (Slate Blue) si el juego no está en el carrito
 * - "¡En tu carrito!" (Celadon) si ya fue agregado; al hacer clic abre el carrito
 *
 * @param {{
 *   juego: {id:number, nombre:string, categoria:string, precio:number, descripcion:string, imagen:string},
 *   enCarrito: boolean,
 *   onAgregar: (juego: object) => void,
 *   onVerCarrito: () => void
 * }} props
 */
function TarjetaVideojuego({ juego, enCarrito = false, onAgregar, onVerCarrito }) {
  const { nombre, categoria, precio, descripcion, imagen } = juego;

  const manejarError = (evento) => {
    // Si la carátula no carga, muestra la imagen de respaldo (una sola vez)
    if (!evento.currentTarget.src.endsWith('placeholder.svg')) evento.currentTarget.src = PLACEHOLDER;
  };

  return (
    <article className="card pv-card">
      <div className="pv-card__media">
        <img
          src={imagen || PLACEHOLDER}
          alt={`Carátula de ${nombre}`}
          loading="lazy"
          width="600"
          height="900"
          onError={manejarError}
        />
        <span className="badge pv-card__badge">{categoria}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title h5 mb-0">{nombre}</h3>
        <p className="card-text mb-0">{descripcion}</p>
        <p className="pv-price mb-0">{formatearPrecio(precio)}</p>
        {enCarrito ? (
          <button type="button" className="btn btn-accent w-100" onClick={onVerCarrito} aria-label={`${nombre} está en tu carrito. Ver carrito`}>
            <i className="bi bi-cart-check-fill me-2" aria-hidden="true" />
            ¡En tu carrito!
          </button>
        ) : (
          <button type="button" className="btn btn-primary w-100" onClick={() => onAgregar(juego)}>
            <i className="bi bi-cart-plus me-2" aria-hidden="true" />
            Agregar al carrito
          </button>
        )}
      </div>
    </article>
  );
}

export default TarjetaVideojuego;
