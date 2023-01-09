/*
Primera preentrega Curso de JavaScript de CoderHouse.
Se solicita:
  3- Armar un simulador interactivo, la estructura final del proyecto integrador.
*/

let msg, name, surname, age, vehicleBrand, vehicleYear, vehicleModel;
let basePrice = 1000; // precio base para todos los vehículos
let ageFactor = 100; // factor de edad
let brandFactor = 100; // factor de marca
let yearFactor = 100; // factor de año
let modelFactor = 100; // factor de modelo
let finalPrice = 0;


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

function checkAge() {
    age = parseInt(prompt("Ingrese su edad por favor"));
    if (!isNaN(age) && age >= 18) {
        return "Gracias."
    } else {
        return prompt("Su edad no es válida.");
    }
}
checkAge();

function checkBrand() {
    do {
        vehicleBrand = prompt(
            "Ingrese la marca de su vehículo por favor");
    } while (vehicleBrand == '');
}
checkBrand();

function checkModel() {
    do {
        vehicleModel = prompt(
            "Ingrese el modelo de su vehículo por favor");
    } while (vehicleModel == '');
}
checkModel();

function checkYear() {
    vehicleYear = parseInt(prompt("Ingrese el año de su vehículo por favor."));
    if (!isNaN(vehicleYear) && vehicleYear >= 1900) {
        return "Gracias."
    } else {
        return prompt("El año es inválido. Si es inferior al año 1900, deberá contactarse con nosotros.");
    }
}
checkYear();

function quoteAge(age) {
    if (age >= 18 && age <= 21) {
        ageFactor = 120;
    } else {
        ageFactor = 80;
    }
}
alert(ageFactor);
quoteAge();

function quoteBrand(vehicleBrand) {
    if (vehicleBrand === "Fiat") {
        brandFactor = 150;
    } else if (vehicleBrand === "Renault") {
        brandFactor = 180;
    } else if (vehicleBrand === "Chevrolet") {
        brandFactor = 120;
    } else if (vehicleBrand === "Ford") {
        brandFactor = 220;
    } else if (vehicleBrand === "Otra") {
        brandFactor = 100;
    }
}
alert(brandFactor);
quoteBrand();

function quoteYear(vehicleYear) {
    if (vehicleYear <= 2018) {
        yearFactor = 80;
    } else if (vehicleYear > 2019) {
        yearFactor = 130;
    }
}
alert(yearFactor);
quoteYear();

function quoteModel(vehicleModel) {
    if (vehicleModel === "Coupe") {
        modelFactor = 120;
    } else if (vehicleModel === "SUV") {
        modelFactor = 140;
    } else if (vehicleModel === "Truck") {
        modelFactor = 160;
    } else if (vehicleModel === "Otro") {
        modelFactor = 100;
    }
}
alert(modelFactor);
quoteModel();

    function quoteInsurance(basePrice, ageFactor, brandFactor, yearFactor, modelFactor) {
    // cálculo del precio final del seguro
    finalPrice = (basePrice * ageFactor * brandFactor * yearFactor * modelFactor)/100;
    return finalPrice;
}
alert(finalPrice);
quoteInsurance();

msg = (name+ " " + surname + " " + "según los datos proporcionados, usted posee un vehículo marca: " + vehicleBrand + ", modelo: " + vehicleModel + ", año: " + vehicleYear + "." + " La cotización de su seguro asciende a U$S: "+ finalPrice + " por un año.");
alert(msg);

