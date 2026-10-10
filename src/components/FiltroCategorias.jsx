/**
 * Filtro por categoría: botones (pantallas medianas y grandes)
 * y menú desplegable (móvil). Ambos controlan el mismo estado,
 * que vive en el componente padre (App) y llega por props.
 *
 * @param {{
 *   categorias: string[],
 *   activa: string,
 *   conteo: Record<string, number>,
 *   onCambiar: (categoria: string) => void
 * }} props
 */
function FiltroCategorias({ categorias, activa, conteo, onCambiar }) {
  return (
    <>
      <div className="pv-filters d-none d-md-flex mb-4" role="group" aria-label="Filtrar por categoría">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            className={`pv-filter-btn${categoria === activa ? ' active' : ''}`}
            aria-pressed={categoria === activa}
            onClick={() => onCambiar(categoria)}
          >
            {categoria}{' '}
            <span className="badge rounded-pill">{conteo[categoria] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="d-md-none mb-4">
        <label htmlFor="filtro-categoria" className="form-label small">
          Filtrar por categoría
        </label>
        <select
          id="filtro-categoria"
          className="form-select"
          value={activa}
          onChange={(evento) => onCambiar(evento.target.value)}
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria} ({conteo[categoria] ?? 0})
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default FiltroCategorias;
