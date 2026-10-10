import { useEffect, useState } from 'react';
import catalogoLocal from '../data/videojuegos.js';

const URL_DATOS = `${import.meta.env.BASE_URL}data/videojuegos.json`;

/**
 * Carga el catálogo en el estado de React:
 * - Lee public/data/videojuegos.json con fetch()
 * - Si el archivo no se puede cargar, usa el objeto local como respaldo
 */
export function useVideojuegos() {
  const [videojuegos, setVideojuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [aviso, setAviso] = useState('');

  useEffect(() => {
    const controlador = new AbortController();

    const cargar = async () => {
      try {
        const respuesta = await fetch(URL_DATOS, { signal: controlador.signal });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        setVideojuegos(await respuesta.json());
      } catch (error) {
        if (error.name === 'AbortError') return;
        setVideojuegos(catalogoLocal);
        setAviso('No se pudo cargar el archivo de datos; se muestra el catálogo local.');
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    };

    cargar();
    return () => controlador.abort();
  }, []);

  return { videojuegos, cargando, aviso };
}
