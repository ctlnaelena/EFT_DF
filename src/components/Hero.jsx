/**
 * Portada de la página principal. Recibe por props los totales del catálogo,
 * así se actualiza sola cuando se agregan o eliminan videojuegos.
 *
 * @param {{ totalJuegos: number, totalCategorias: number, precioDesde: string }} props
 */
function Hero({ totalJuegos, totalCategorias, precioDesde }) {
  return (
    <section id="inicio" className="pv-hero" aria-labelledby="titulo-hero">
      <div className="container pv-hero__inner">
        <div className="pv-hero__text">
          <p className="pv-eyebrow mb-2">Tienda online de videojuegos</p>
          <h1 id="titulo-hero" className="pv-hero__title">
            Tu próxima partida <span>empieza aquí</span>
          </h1>
          <p className="lead mt-3 mb-4">
            Explora el catálogo, filtra por tu género favorito y encuentra el juego que te falta.
          </p>
          <div className="d-flex flex-wrap gap-2 mb-4">
            <a href="#catalogo" className="btn btn-accent btn-lg">
              Ver catálogo
            </a>
            <a href="#contacto" className="btn btn-outline-light btn-lg">
              Contáctanos
            </a>
          </div>
          <dl className="d-flex flex-wrap gap-4 mb-0">
            <div className="pv-stat">
              <dt className="small fw-normal">Videojuegos</dt>
              <dd className="mb-0"><strong>{totalJuegos}</strong></dd>
            </div>
            <div className="pv-stat">
              <dt className="small fw-normal">Categorías</dt>
              <dd className="mb-0"><strong>{totalCategorias}</strong></dd>
            </div>
            <div className="pv-stat">
              <dt className="small fw-normal">Desde</dt>
              <dd className="mb-0"><strong>{precioDesde}</strong></dd>
            </div>
          </dl>
        </div>
        <figure className="pv-hero__ilustracion mb-0">
          <img
            src="./img/marca/rana-heroe.webp"
            alt="Ilustración de Asta: una rana con espada volando sobre un ganso"
            width="900"
            height="828"
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  );
}

export default Hero;
