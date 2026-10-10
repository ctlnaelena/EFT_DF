/**
 * Reglas de validación del formulario de contacto.
 * Son funciones puras: reciben los datos y devuelven un objeto
 * { campo: 'mensaje de error' } solo con los campos inválidos.
 */

export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/;

export const LIMITES = {
  nombreMin: 3,
  mensajeMin: 10,
  mensajeMax: 500,
};

export function validarContacto({ nombre = '', email = '', mensaje = '' }) {
  const errores = {};
  const n = nombre.trim();
  const e = email.trim();
  const m = mensaje.trim();

  if (!n) errores.nombre = 'El nombre es obligatorio.';
  else if (n.length < LIMITES.nombreMin) errores.nombre = `El nombre debe tener al menos ${LIMITES.nombreMin} caracteres.`;
  else if (!REGEX_NOMBRE.test(n)) errores.nombre = 'El nombre solo puede contener letras y espacios.';

  if (!e) errores.email = 'El email es obligatorio.';
  else if (!REGEX_EMAIL.test(e)) errores.email = 'Ingresa un email válido (ej: nombre@correo.cl).';

  if (!m) errores.mensaje = 'El mensaje es obligatorio.';
  else if (m.length < LIMITES.mensajeMin) errores.mensaje = `El mensaje debe tener al menos ${LIMITES.mensajeMin} caracteres (llevas ${m.length}).`;
  else if (m.length > LIMITES.mensajeMax) errores.mensaje = `El mensaje no puede superar los ${LIMITES.mensajeMax} caracteres.`;

  return errores;
}

export const esValido = (errores) => Object.keys(errores).length === 0;
