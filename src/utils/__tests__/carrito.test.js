import { describe, expect, it } from 'vitest';
import { agregarAlCarrito, calcularTotal, contarUnidades, disminuirCantidad, eliminarDelCarrito } from '../carrito.js';

const eldenRing = { id: 1, nombre: 'Elden Ring', categoria: 'RPG', precio: 39990, descripcion: '…', imagen: 'a.jpg' };
const hollow = { id: 11, nombre: 'Hollow Knight', categoria: 'Aventura', precio: 9990, descripcion: '…', imagen: 'b.jpg' };

describe('carrito', () => {
  it('agrega un videojuego nuevo con cantidad 1', () => {
    const items = agregarAlCarrito([], eldenRing);
    expect(items).toEqual([{ id: 1, nombre: 'Elden Ring', precio: 39990, imagen: 'a.jpg', cantidad: 1 }]);
  });

  it('suma la cantidad si el juego ya estaba en el carrito', () => {
    const items = agregarAlCarrito(agregarAlCarrito([], eldenRing), eldenRing);
    expect(items).toHaveLength(1);
    expect(items[0].cantidad).toBe(2);
  });

  it('no modifica el arreglo original (inmutabilidad para React)', () => {
    const original = agregarAlCarrito([], eldenRing);
    const copia = structuredClone(original);
    agregarAlCarrito(original, eldenRing);
    expect(original).toEqual(copia);
  });

  it('elimina un videojuego del carrito', () => {
    const items = agregarAlCarrito(agregarAlCarrito([], eldenRing), hollow);
    expect(eliminarDelCarrito(items, 1).map((i) => i.id)).toEqual([11]);
  });

  it('cuenta unidades y calcula el total', () => {
    let items = agregarAlCarrito([], eldenRing);
    items = agregarAlCarrito(items, eldenRing);
    items = agregarAlCarrito(items, hollow);
    expect(contarUnidades(items)).toBe(3);
    expect(calcularTotal(items)).toBe(39990 * 2 + 9990);
    expect(calcularTotal([])).toBe(0);
  });
});

describe('disminuirCantidad', () => {
  it('resta una unidad y elimina el juego al llegar a 0', () => {
    let items = agregarAlCarrito(agregarAlCarrito([], eldenRing), eldenRing);
    items = disminuirCantidad(items, 1);
    expect(items[0].cantidad).toBe(1);
    expect(disminuirCantidad(items, 1)).toEqual([]);
  });
});
