import { describe, expect, it } from 'vitest';
import { esValido, validarContacto } from '../validaciones.js';

describe('validarContacto', () => {
  it('acepta datos correctos', () => {
    const errores = validarContacto({ nombre: 'Deny', email: 'deny@correo.cl', mensaje: '¿Tienen stock de Elden Ring?' });
    expect(esValido(errores)).toBe(true);
  });

  it('marca todos los campos vacíos como obligatorios', () => {
    const errores = validarContacto({ nombre: '  ', email: '', mensaje: '' });
    expect(Object.keys(errores)).toEqual(['nombre', 'email', 'mensaje']);
  });

  it.each(['correo', 'correo@', 'a@b', 'a b@c.cl'])('rechaza el email inválido "%s"', (email) => {
    expect(validarContacto({ nombre: 'Ana', email, mensaje: 'Mensaje de prueba válido' }).email).toBeDefined();
  });

  it('exige mínimo de caracteres en nombre y mensaje', () => {
    const errores = validarContacto({ nombre: 'Al', email: 'a@b.cl', mensaje: 'Hola' });
    expect(errores.nombre).toMatch(/al menos 3/);
    expect(errores.mensaje).toMatch(/al menos 10/);
  });

  it('rechaza números en el nombre', () => {
    expect(validarContacto({ nombre: 'Ana123', email: 'a@b.cl', mensaje: 'Mensaje de prueba válido' }).nombre).toBeDefined();
  });
});
