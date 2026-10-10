import { useRef, useState } from 'react';
import CampoFormulario from './CampoFormulario.jsx';
import { useFormulario } from '../hooks/useFormulario.js';
import { LIMITES, validarContacto } from '../utils/validaciones.js';

const INICIAL = { nombre: '', email: '', mensaje: '' };

/**
 * Formulario de contacto (nombre, email y mensaje).
 * Valida antes de enviar y muestra errores por campo y un resumen.
 *
 * @param {{ onEnviar?: (datos: {nombre:string,email:string,mensaje:string}) => void }} props
 */
function FormularioContacto({ onEnviar }) {
  const { valores, errores, validarTodo, reiniciar, propsCampo } = useFormulario(INICIAL, validarContacto);
  const [estado, setEstado] = useState(null); // { tipo: 'ok' | 'error', texto }
  const formRef = useRef(null);

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (!validarTodo()) {
      setEstado({ tipo: 'error', texto: 'Revisa los campos marcados antes de enviar.' });
      // Lleva el foco al primer campo con error
      const primero = Object.keys(INICIAL).find((campo) => errores[campo]);
      formRef.current?.elements[primero]?.focus();
      return;
    }

    const datos = {
      nombre: valores.nombre.trim(),
      email: valores.email.trim(),
      mensaje: valores.mensaje.trim(),
    };
    onEnviar?.(datos);
    setEstado({ tipo: 'ok', texto: `¡Gracias, ${datos.nombre}! Tu mensaje fue enviado correctamente.` });
    reiniciar();
  };

  return (
    <form ref={formRef} className="pv-panel" onSubmit={manejarEnvio} noValidate aria-labelledby="titulo-contacto">
      {estado && (
        <div className={`alert ${estado.tipo === 'ok' ? 'alert-pv-success' : 'alert-pv-error'}`} role="alert">
          <i className={`bi ${estado.tipo === 'ok' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`} aria-hidden="true" />
          {estado.texto}
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <CampoFormulario id="contacto-nombre" etiqueta="Nombre" autoComplete="name" placeholder="Tu nombre" {...propsCampo('nombre')} />
        </div>
        <div className="col-md-6">
          <CampoFormulario id="contacto-email" etiqueta="Email" tipo="email" autoComplete="email" placeholder="tu@correo.cl" {...propsCampo('email')} />
        </div>
      </div>

      <CampoFormulario
        id="contacto-mensaje"
        etiqueta="Mensaje"
        como="textarea"
        rows={5}
        maxLength={LIMITES.mensajeMax}
        placeholder="Cuéntanos en qué te podemos ayudar"
        ayuda={`${valores.mensaje.trim().length}/${LIMITES.mensajeMax} caracteres (mínimo ${LIMITES.mensajeMin}).`}
        {...propsCampo('mensaje')}
      />

      <button type="submit" className="btn btn-primary w-100">
        <i className="bi bi-send me-2" aria-hidden="true" />
        Enviar mensaje
      </button>
    </form>
  );
}

export default FormularioContacto;
