import { useEffect, useState } from 'react';

/**
 * Barra de navegación (componente navbar de Bootstrap 5).
 * El colapso móvil se controla con estado de React, sin depender del JS de Bootstrap.
 * Resalta automáticamente la sección visible con IntersectionObserver.
 *
 * @param {{ enlaces: {id: string, texto: string}[], marca: string, cantidadCarrito: number, onAbrirCarrito: () => void }} props
 */
function Navbar({ enlaces, marca, cantidadCarrito = 0, onAbrirCarrito }) {
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState(enlaces[0]?.id);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setActivo(entrada.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    enlaces.forEach(({ id }) => {
      const seccion = document.getElementById(id);
      if (seccion) observador.observe(seccion);
    });
    return () => observador.disconnect();
  }, [enlaces]);

  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top pv-navbar" aria-label="Navegación principal">
        <div className="container">
          <a className="navbar-brand" href={`#${enlaces[0]?.id}`} onClick={() => setAbierto(false)}>
            <img src="./img/marca/asta-logo.webp" alt={marca} className="pv-logo-texto" width="600" height="193" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="menu-principal"
            aria-expanded={abierto}
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setAbierto((valor) => !valor)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`collapse navbar-collapse${abierto ? ' show' : ''}`} id="menu-principal">
            <ul className="navbar-nav ms-auto gap-lg-1">
              {enlaces.map(({ id, texto }) => (
                <li className="nav-item" key={id}>
                  <a
                    className={`nav-link${activo === id ? ' active' : ''}`}
                    aria-current={activo === id ? 'page' : undefined}
                    href={`#${id}`}
                    onClick={() => setAbierto(false)}
                  >
                    {texto}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn-sm btn-outline-light ms-lg-3 mt-2 mt-lg-0"
              onClick={() => {
                setAbierto(false);
                onAbrirCarrito();
              }}
              aria-label={`Abrir carrito, ${cantidadCarrito} productos`}
            >
              <i className="bi bi-cart3 me-1" aria-hidden="true" />
              Carrito
              <span className="badge rounded-pill pv-badge-accent ms-2">{cantidadCarrito}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
