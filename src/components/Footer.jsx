const PALETA = ['#6666ff', '#b8baff', '#c9e8ff', '#0c0c16', '#b9f0d7'];

/**
 * Pie de página.
 * @param {{ marca: string }} props
 */
function Footer({ marca }) {
  return (
    <footer className="pv-footer">
      <div className="container pv-footer__inner">
        <p className="mb-0 small">
          © {new Date().getFullYear()} {marca} · Proyecto académico de desarrollo Front-End
        </p>
        <nav aria-label="Enlaces del pie de página" className="d-flex gap-3 small">
          <a href="#inicio">Inicio</a>
          <a href="#contacto">Contacto</a>
          <a href="./vanilla/">Versión JavaScript</a>
        </nav>
        <div className="pv-footer__palette" aria-hidden="true">
          {PALETA.map((color) => (
            <span key={color} style={{ backgroundColor: color }} title={color} />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
