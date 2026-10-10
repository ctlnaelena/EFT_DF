import { useCallback, useEffect, useState } from 'react';
import { agregarAlCarrito, disminuirCantidad, eliminarDelCarrito } from '../utils/carrito.js';

const CLAVE_STORAGE = 'asta:carrito';

const leerGuardado = () => {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
};

/**
 * Estado del carrito de compras:
 * - items: videojuegos agregados con su cantidad (se guardan en localStorage)
 * - abierto: si el panel lateral está visible
 */
export function useCarrito() {
  const [items, setItems] = useState(leerGuardado);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
    } catch {
    }
  }, [items]);

  const agregar = useCallback((juego) => {
    setItems((actuales) => agregarAlCarrito(actuales, juego));
    setAbierto(true);
  }, []);
  const disminuir = useCallback((id) => setItems((actuales) => disminuirCantidad(actuales, id)), []);
  const eliminar = useCallback((id) => setItems((actuales) => eliminarDelCarrito(actuales, id)), []);
  const vaciar = useCallback(() => setItems([]), []);
  const abrir = useCallback(() => setAbierto(true), []);
  const cerrar = useCallback(() => setAbierto(false), []);

  return { items, abierto, agregar, disminuir, eliminar, vaciar, abrir, cerrar };
}
