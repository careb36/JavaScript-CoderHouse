//variables
let msg, msgWelcome, msgName, msgCongrats, msgAge, name;

//msg variable that contains a string that will later be used to extract fragments with the slice method.
msg =
    "Hola, le damos la bienvenida a Mattress Bank. Ingrese su nombre por favor: Ingrese su edad por favor: felicitaciones usted ha ingresado correctamente.";

// variables that will be used to give messages to the user, its content uses the slice method to extract the appropriate content from the msg variable.
msgWelcome = msg.slice(0, 45);
msgName = msg.slice(46, 74);
msgAge = msg.slice(75, 101);
msgCongrats = msg.slice(102, msg.length);

alert(msgWelcome)

/*
Function to request the age of the user and verify that he is of legal age.
Checks whether the user is old enough to perform operations on the site.
The function then is called and the result is displayed to the user.
*/

function checkAge() {
    let age = parseInt(prompt(msgAge));
    if (isNaN(age) || age < 18) {
        return "Usted es menor de edad, no podrá realizar operaciones en este sitio.";
    } else {
        return "Usted es mayor de edad, podrá realizar operaciones en este sitio.";
    }
}

let result = checkAge();
alert(result);

name = 'Nombre';

// Function that prompts the user for their name and keeps prompting until a non-empty name is entered.
function checkName() {
    do {
        name = prompt(msgName);
    } while (name == '');
}

checkName();

// The user's name is displayed to the user with a congrats message.
alert(name + ', ' + msgCongrats);
