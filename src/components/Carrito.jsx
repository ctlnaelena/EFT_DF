import { useEffect, useRef, useState } from 'react';
import { calcularTotal, contarUnidades } from '../utils/carrito.js';
import { formatearPrecio } from '../utils/catalogo.js';

/**
 * Carrito de compras como panel lateral derecho (offcanvas de Bootstrap 5).
 * La visibilidad la controla el estado de React (prop `abierto`), sin el JS de Bootstrap.
 * Se cierra con la X, haciendo clic fuera del panel o con la tecla Escape.
 *
 * @param {{
 *   abierto: boolean,
 *   items: {id:number, nombre:string, precio:number, imagen:string, cantidad:number}[],
 *   onCerrar: () => void,
 *   onAumentar: (item: object) => void,
 *   onDisminuir: (id: number) => void,
 *   onEliminar: (id: number) => void,
 *   onVaciar: () => void
 * }} props
 */
function Carrito({ abierto, items, onCerrar, onAumentar, onDisminuir, onEliminar, onVaciar }) {
  const [mensaje, setMensaje] = useState('');
  const botonCerrarRef = useRef(null);
  const unidades = contarUnidades(items);
  const total = calcularTotal(items);

  useEffect(() => {
    if (!abierto) return undefined;

    // Guarda el elemento que tenía el foco para devolverlo al cerrar
    const focoAnterior = document.activeElement;
    botonCerrarRef.current?.focus();
    document.body.style.overflow = 'hidden'; // evita que la página se desplace detrás del panel

    const alPresionarTecla = (evento) => {
      if (evento.key === 'Escape') onCerrar();
    };
    document.addEventListener('keydown', alPresionarTecla);

    return () => {
      document.removeEventListener('keydown', alPresionarTecla);
      document.body.style.overflow = '';
      focoAnterior?.focus?.();
    };
  }, [abierto, onCerrar]);

  // El mensaje de compra se limpia al agregar algo nuevo
  useEffect(() => {
    if (items.length > 0) setMensaje('');
  }, [items.length]);

  const finalizarCompra = () => {
    setMensaje(`¡Compra realizada! Total pagado: ${formatearPrecio(total)}.`);
    onVaciar();
  };

  return (
    <>
      <aside
        className={`offcanvas offcanvas-end pv-carrito${abierto ? ' show' : ''}`}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-carrito"
        aria-hidden={!abierto}
      >
        <div className="offcanvas-header">
          <h2 id="titulo-carrito" className="offcanvas-title h5 d-flex align-items-center gap-2 mb-0">
            <i className="bi bi-cart3" aria-hidden="true" />
            Mi carrito
            <span className="badge rounded-pill pv-badge-accent">{unidades}</span>
          </h2>
          <button
            ref={botonCerrarRef}
            type="button"
            className="btn-close btn-close-white"
            aria-label="Cerrar carrito"
            onClick={onCerrar}
          />
        </div>

        <div className="offcanvas-body d-flex flex-column">
          {mensaje && (
            <div className="alert alert-pv-success py-2" role="status">
              <i className="bi bi-check-circle me-2" aria-hidden="true" />
              {mensaje}
            </div>
          )}

          {items.length === 0 ? (
            <div className="text-center text-secondary my-auto py-5">
              <i className="bi bi-cart-x fs-1 d-block mb-2" aria-hidden="true" />
              <p className="mb-3">Tu carrito está vacío.</p>
              <button type="button" className="btn btn-outline-light btn-sm" onClick={onCerrar}>
                Seguir comprando
              </button>
            </div>
          ) : (
            <>
              <ul className="list-unstyled pv-cart-list mb-3">
                {items.map((item) => (
                  <li key={item.id} className="pv-cart-item">
                    <img
                      src={item.imagen}
                      alt=""
                      width="56"
                      height="84"
                      loading="lazy"
                      onError={(e) => {
                        if (!e.currentTarget.src.endsWith('placeholder.svg')) e.currentTarget.src = './img/placeholder.svg';
                      }}
                    />
                    <div className="flex-grow-1 min-w-0">
                      <p className="mb-1 fw-semibold text-white text-truncate">{item.nombre}</p>
                      <p className="mb-2 small text-secondary">
                        {formatearPrecio(item.precio)} c/u
                      </p>
                      <div className="d-flex align-items-center justify-content-between gap-2">
                        <div className="pv-cantidad" role="group" aria-label={`Cantidad de ${item.nombre}`}>
                          <button
                            type="button"
                            className="btn btn-sm"
                            onClick={() => onDisminuir(item.id)}
                            aria-label={`Quitar una unidad de ${item.nombre}`}
                          >
                            <i className="bi bi-dash" aria-hidden="true" />
                          </button>
                          <span aria-live="polite">{item.cantidad}</span>
                          <button
                            type="button"
                            className="btn btn-sm"
                            onClick={() => onAumentar(item)}
                            aria-label={`Agregar una unidad de ${item.nombre}`}
                          >
                            <i className="bi bi-plus" aria-hidden="true" />
                          </button>
                        </div>
                        <strong className="text-white">{formatearPrecio(item.precio * item.cantidad)}</strong>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-light align-self-start"
                      onClick={() => onEliminar(item.id)}
                      aria-label={`Eliminar ${item.nombre} del carrito`}
                    >
                      <i className="bi bi-trash3" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-auto border-top pt-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span>Total ({unidades} {unidades === 1 ? 'producto' : 'productos'})</span>
                  <strong className="pv-price">{formatearPrecio(total)}</strong>
                </div>
                <div className="d-grid gap-2">
                  <button type="button" className="btn btn-accent" onClick={finalizarCompra}>
                    Finalizar compra
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-light" onClick={onVaciar}>
                    Vaciar carrito
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Fondo oscuro detrás del panel: al hacer clic, se cierra */}
      {abierto && <div className="offcanvas-backdrop fade show" onClick={onCerrar} aria-hidden="true" />}
    </>
  );
}

export default Carrito;
