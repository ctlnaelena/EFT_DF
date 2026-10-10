/**
 * Campo de formulario reutilizable (input, textarea o select) con
 * label, mensaje de error de Bootstrap y atributos de accesibilidad.
 * Se usa en los tres campos del formulario de contacto.
 *
 * @param {{
 *   id: string, etiqueta: string, nombre: string, valor: string|number,
 *   onChange: Function, onBlur?: Function, error?: string, tocado?: boolean,
 *   tipo?: string, como?: 'input'|'textarea'|'select', opciones?: string[],
 *   ayuda?: string, [x: string]: any
 * }} props
 */
function CampoFormulario({
  id,
  etiqueta,
  nombre,
  valor,
  onChange,
  onBlur,
  error,
  tocado = false,
  tipo = 'text',
  como = 'input',
  opciones = [],
  ayuda,
  ...resto
}) {
  const mostrarError = tocado && Boolean(error);
  const esValido = tocado && !error;
  const clase = `${como === 'select' ? 'form-select' : 'form-control'}${mostrarError ? ' is-invalid' : ''}${esValido ? ' is-valid' : ''}`;
  const idError = `${id}-error`;
  const idAyuda = `${id}-ayuda`;
  const describedBy = [ayuda && idAyuda, mostrarError && idError].filter(Boolean).join(' ') || undefined;

  const comunes = {
    id,
    name: nombre,
    className: clase,
    value: valor,
    onChange,
    onBlur,
    'aria-invalid': mostrarError,
    'aria-describedby': describedBy,
    ...resto,
  };

  let control;
  if (como === 'textarea') {
    control = <textarea {...comunes} />;
  } else if (como === 'select') {
    control = (
      <select {...comunes}>
        <option value="">Selecciona…</option>
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    );
  } else {
    control = <input type={tipo} {...comunes} />;
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {etiqueta}
      </label>
      {control}
      {ayuda && (
        <div id={idAyuda} className="form-text">
          {ayuda}
        </div>
      )}
      {mostrarError && (
        <div id={idError} className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
}

export default CampoFormulario;
