import { useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import FiltroCategorias from './components/FiltroCategorias.jsx';
import ListaVideojuegos from './components/ListaVideojuegos.jsx';
import Carrito from './components/Carrito.jsx';
import FormularioContacto from './components/FormularioContacto.jsx';
import Footer from './components/Footer.jsx';
import { useVideojuegos } from './hooks/useVideojuegos.js';
import { useCarrito } from './hooks/useCarrito.js';
import { obtenerCategorias } from './data/videojuegos.js';
import { contarUnidades } from './utils/carrito.js';
import { TODAS, contarPorCategoria, filtrarPorCategoria, formatearPrecio } from './utils/catalogo.js';

const MARCA = 'Asta';
const ENLACES = [
  { id: 'inicio', texto: 'Inicio' },
  { id: 'catalogo', texto: 'Catálogo' },
  { id: 'contacto', texto: 'Contacto' },
];

/**
 * Componente raíz: es dueño del estado compartido (catálogo, categoría activa
 * y carrito) y lo distribuye a los hijos por props. Los hijos devuelven los
 * cambios con callbacks (onCambiar, onAgregar, onDisminuir, onEliminar, onVaciar…),
 * siguiendo el flujo de datos unidireccional de React.
 */
function App() {
  const { videojuegos, cargando, aviso } = useVideojuegos();
  const carrito = useCarrito();
  const [categoriaActiva, setCategoriaActiva] = useState(TODAS);

  // Valores derivados: se recalculan solo cuando cambia su información de origen
  const categorias = useMemo(() => [TODAS, ...obtenerCategorias(videojuegos)], [videojuegos]);
  const conteo = useMemo(() => contarPorCategoria(videojuegos), [videojuegos]);
  const juegosFiltrados = useMemo(
    () => filtrarPorCategoria(videojuegos, categoriaActiva),
    [videojuegos, categoriaActiva],
  );
  const idsEnCarrito = useMemo(() => new Set(carrito.items.map((item) => item.id)), [carrito.items]);
  const precioDesde = videojuegos.length
    ? formatearPrecio(Math.min(...videojuegos.map((juego) => juego.precio)))
    : '—';

  return (
    <>
      <a className="visually-hidden-focusable" href="#catalogo">
        Saltar al catálogo
      </a>
      <Navbar
        enlaces={ENLACES}
        marca={MARCA}
        cantidadCarrito={contarUnidades(carrito.items)}
        onAbrirCarrito={carrito.abrir}
      />

      <main>
        <Hero totalJuegos={videojuegos.length} totalCategorias={categorias.length - 1} precioDesde={precioDesde} />

        <section id="catalogo" className="pv-section" aria-labelledby="titulo-catalogo">
          <div className="container">
            <header className="mb-4">
              <p className="pv-eyebrow mb-1">Catálogo</p>
              <h2 id="titulo-catalogo" className="mb-0">Videojuegos disponibles</h2>
            </header>

            {aviso && (
              <div className="alert alert-pv-error" role="status">
                {aviso}
              </div>
            )}

            <FiltroCategorias categorias={categorias} activa={categoriaActiva} conteo={conteo} onCambiar={setCategoriaActiva} />

            <p className="text-secondary small mb-3" aria-live="polite">
              Mostrando {juegosFiltrados.length} de {videojuegos.length} videojuegos
              {categoriaActiva !== TODAS && <> en <strong>{categoriaActiva}</strong></>}
            </p>

            <ListaVideojuegos
              juegos={juegosFiltrados}
              cargando={cargando}
              categoria={categoriaActiva}
              idsEnCarrito={idsEnCarrito}
              onAgregar={carrito.agregar}
              onVerCarrito={carrito.abrir}
            />
          </div>
        </section>

        <section id="contacto" className="pv-section pv-section--alt" aria-labelledby="titulo-contacto">
          <div className="container">
            <div className="row g-4 align-items-start">
              <div className="col-lg-5">
                <p className="pv-eyebrow mb-1">Contacto</p>
                <h2 id="titulo-contacto">¿Tienes dudas? Escríbenos</h2>
                <p className="text-secondary mb-4">
                  Consultas sobre stock, reservas o pedidos: el administrador responde dentro de 24 horas hábiles.
                </p>
                <ul className="pv-contact-info">
                  <li>
                    <i className="bi bi-envelope" aria-hidden="true" />
                    <div><strong className="d-block text-white">Email</strong>contacto@asta.cl</div>
                  </li>
                  <li>
                    <i className="bi bi-clock" aria-hidden="true" />
                    <div><strong className="d-block text-white">Horario</strong>Lunes a viernes, 10:00 a 19:00</div>
                  </li>
                </ul>
              </div>
              <div className="col-lg-7">
                <FormularioContacto />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer marca={MARCA} />

      <Carrito
        abierto={carrito.abierto}
        items={carrito.items}
        onCerrar={carrito.cerrar}
        onAumentar={carrito.agregar}
        onDisminuir={carrito.disminuir}
        onEliminar={carrito.eliminar}
        onVaciar={carrito.vaciar}
      />
    </>
  );
}

export default App;
