/* 
Primera preentrega Curso de JavaScript de CoderHouse.
Se solicita:
  1- Crear un algoritmo con 1 condicional.
  2- Crear un algoritmo utilizando un ciclo.
  3- Armar un simulador interactivo, la estructura final del proyecto integrador.
*/

// 1- Crear un algoritmo con 1 condicional.

let msj, msjBienvenida, msjNombre, msjFelicitaciones;

msj =
  "Hola, le damos la bienvenida al Colchon Bank. ingrese su nombre por favor: ingrese su edad por favor: felicitaciones usted ha ingresado correctamente.";

msjBienvenida = msj.slice(0, 45);
msjNombre = msj.slice(46, 74);
msjEdad = msj.slice(75, 101);
msjFelicitaciones = msj.slice(102, msj.length);

alert(msjBienvenida);

let edad = 0;
edad = prompt(msjEdad);

if (edad >= 18) {
  alert("Usted es mayor de edad, puede continuar en el sitio.");
} else {
  alert("Usted es menor de edad, salga de este sitio.");
}

// 2- Crear un algoritmo utilizando un ciclo.

let nombre = '';

do {
  nombre = prompt(
    "Tomamos una imagen de su rostro y estamos buscándolo en nuestra base de datos. Mientras tanto," +
      " " +
      msjNombre);
} while (nombre == '');

alert(nombre +', '+ msjFelicitaciones);
