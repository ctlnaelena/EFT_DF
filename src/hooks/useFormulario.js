import { useState } from 'react';
import { esValido } from '../utils/validaciones.js';

/**
 * Hook genérico para formularios controlados con validación.
 * Reutilizado por el formulario de contacto y el de nuevo videojuego.
 *
 * @param {object} valoresIniciales
 * @param {(valores: object) => Record<string,string>} validar
 */
export function useFormulario(valoresIniciales, validar) {
  const [valores, setValores] = useState(valoresIniciales);
  const [tocados, setTocados] = useState({});

  const errores = validar(valores);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setValores((actuales) => ({ ...actuales, [name]: value }));
  };

  const manejarBlur = (evento) => {
    const { name } = evento.target;
    setTocados((actuales) => ({ ...actuales, [name]: true }));
  };

  /** Marca todos los campos como tocados y devuelve si el formulario es válido. */
  const validarTodo = () => {
    setTocados(Object.fromEntries(Object.keys(valoresIniciales).map((campo) => [campo, true])));
    return esValido(errores);
  };

  const reiniciar = () => {
    setValores(valoresIniciales);
    setTocados({});
  };

  /** Props comunes para CampoFormulario. */
  const propsCampo = (nombre) => ({
    nombre,
    valor: valores[nombre],
    onChange: manejarCambio,
    onBlur: manejarBlur,
    error: errores[nombre],
    tocado: Boolean(tocados[nombre]),
  });

  return { valores, errores, validarTodo, reiniciar, propsCampo };
}
