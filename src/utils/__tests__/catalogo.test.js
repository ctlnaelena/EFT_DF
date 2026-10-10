import { describe, expect, it } from 'vitest';
import videojuegos, { obtenerCategorias } from '../../data/videojuegos.js';
import { TODAS, contarPorCategoria, filtrarPorCategoria, formatearPrecio } from '../catalogo.js';

describe('catálogo', () => {
  it('cada videojuego tiene todos los campos requeridos', () => {
    for (const juego of videojuegos) {
      expect(juego).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          nombre: expect.any(String),
          categoria: expect.any(String),
          precio: expect.any(Number),
          descripcion: expect.any(String),
          imagen: expect.any(String),
        }),
      );
    }
  });

  it('los ids son únicos', () => {
    expect(new Set(videojuegos.map((j) => j.id)).size).toBe(videojuegos.length);
  });

  it('obtiene categorías únicas ordenadas', () => {
    expect(obtenerCategorias(videojuegos)).toEqual(['Acción', 'Aventura', 'Carreras', 'Deportes', 'Estrategia', 'RPG']);
  });

  it('filtra por categoría y "Todas" devuelve el catálogo completo', () => {
    expect(filtrarPorCategoria(videojuegos, TODAS)).toHaveLength(videojuegos.length);
    const rpg = filtrarPorCategoria(videojuegos, 'RPG');
    expect(rpg.length).toBeGreaterThan(0);
    expect(rpg.every((j) => j.categoria === 'RPG')).toBe(true);
  });

  it('cuenta juegos por categoría', () => {
    const conteo = contarPorCategoria(videojuegos);
    expect(conteo[TODAS]).toBe(videojuegos.length);
    expect(conteo.RPG).toBe(2);
  });

  it('formatea precios en CLP', () => {
    expect(formatearPrecio(39990)).toMatch(/39\.990/);
  });
});
