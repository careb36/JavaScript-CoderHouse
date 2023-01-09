/*
Primera preentrega Curso de JavaScript de CoderHouse.
Se solicita:
  3- Armar un simulador interactivo, la estructura final del proyecto integrador.
*/

let msg, name, surname, age, vehicleBrand, vehicleYear, vehicleModel;

function checkName() {
    do {
        name = prompt(
            "Ingrese su nombre por favor");
    } while (name == '');
}
checkName();

function checkSurname() {
    do {
        surname = prompt(
            "Ingrese su apellido por favor");
    } while (surname == '');
}
checkSurname();

function checkBrand() {
    do {
        vehicleBrand = prompt(
            "Ingrese la marca de su vehículo por favor");
    } while (vehicleBrand == '');
}
checkBrand();

function checkAge() {
    age = parseInt(prompt("Ingrese su edad por favor"));
    if (!isNaN(age) && age >= 1) {
        return "Gracias."
    } else {
        return prompt("Su edad no es válida.");
    }
}
checkAge();

function checkAdult() {
    if (age >= 18) {
        return alert("Usted es mayor de edad, podrá cotizar su seguro.");
    } else {
        return alert("Usted es menor de edad, no podrá cotizar su seguro.");
    }
}
checkAdult();

function checkModel() {
    do {
        vehicleModel = prompt(
            "Ingrese el modelo de su vehículo por favor");
    } while (vehicleModel == '');
}
checkModel();

function checkYear() {
    vehicleYear = parseInt(prompt("Ingrese el año de su vehículo por favor."));
    if (!isNaN(vehicleYear) && vehicleYear >= 1) {
        return "Gracias."
    } else {
        return prompt("El año es inválido.");
    }
}
checkYear();

function quoteInsurance(age, vehicleBrand, vehicleYear, vehicleModel) {
    let basePrice = 20000; // precio base para todos los vehículos
    let ageFactor = age / 25; // factor de edad
    let brandFactor = 1; // factor de marca
    let yearFactor = 1; // factor de año
    let modelFactor = 1; // factor de modelo

    // ajuste del factor de edad
    if (age < 25) {
        ageFactor = 1.2;
    } else if (age > 40) {
        ageFactor = 0.8;
    }

    // ajuste del factor de marca
    if (vehicleBrand === "Fiat") {
        brandFactor = 1.5;
    } else if (vehicleBrand === "Renault") {
        brandFactor = 1.8;
    } else if (vehicleBrand === "Chevrolet") {
        brandFactor = 1.2;
    } else if (vehicleBrand === "Ford") {
        brandFactor = 2.2;
    } else if (vehicleBrand === "Otra") {
        brandFactor = 1;
    }

    // factor año
    if (vehicleYear < 2000) {
        yearFactor = 1.3;
    } else if (vehicleYear > 2019) {
        yearFactor = 0.7;
    }

    // factor de modelo
    if (vehicleModel === "Coupe") {
        modelFactor = 1.2;
    } else if (vehicleModel === "SUV") {
        modelFactor = 1.4;
    } else if (vehicleModel === "Truck") {
        modelFactor = 1.6;
    } else if (vehicleModel === "Otro") {
        modelFactor = 1.0;
    }

    // cálculo del precio final del seguro
    let finalPrice = basePrice * ageFactor * brandFactor * yearFactor * modelFactor;
    return finalPrice;
}
quoteInsurance();

msg = (name+ " " + surname + " " + "según los datos proporcionados, usted posee un vehículo marca: " + vehicleBrand + ", modelo: " + vehicleModel + ", año: " + vehicleYear + "." + " La cotización de su seguro asciende a U$S: "+ finalPrice +" por un año.");
alert(msg);

