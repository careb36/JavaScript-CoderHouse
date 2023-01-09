/* 
Primera preentrega Curso de JavaScript de CoderHouse.
Se solicita:
  1- Crear un algoritmo con 1 condicional.
  2- Crear un algoritmo utilizando un ciclo.
*/


let msg, msgWelcome, msgName, msgCongrats, msgAge, age, name;

msg =
    "Hola, le damos la bienvenida a Mattress Bank. Ingrese su nombre por favor: Ingrese su edad por favor: felicitaciones usted ha ingresado correctamente.";

msgWelcome = msg.slice(0, 45);
msgName = msg.slice(46, 74);
msgAge = msg.slice(75, 101);
msgCongrats = msg.slice(102, msg.length);

alert(msgWelcome)

// verificar si la edad es un número válido
function checkAge() {
    age = parseInt(prompt(msgAge));
    if (!isNaN(age) && age >= 1) {
        return "Gracias."
    } else {
        // la edad es inválida
        return prompt("La edad es inválida." + " " + msgAge);
    }
}

checkAge();

function checkAdult() {
    if (age >= 18) {
        return alert("Usted es mayor de edad, podrá realizar operaciones en este sitio.");
    } else {
        return alert("Usted es menor de edad, no podrá realizar operaciones en este sitio.");
    }
}

checkAdult();

name = 'Nombre';

function checkName() {
    do {
        name = prompt(msgName);
    } while (name == '');
}

checkName();

alert(name + ', ' + msgCongrats);
