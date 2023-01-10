/*
Primera preentrega Curso de JavaScript de CoderHouse.
Se solicita:
  3- Armar un simulador interactivo, la estructura final del proyecto integrador.
*/

let basePrice = 200; // precio base para todos los vehículos
let ageFactor = 1; // factor de edad
let brandFactor = 1; // factor de marca
let yearFactor = 1; // factor de año
let modelFactor = 1; // factor de modelo
let finalPrice = 300;

function checkName() {
    let name = prompt("Ingrese su nombre por favor");
    return name;
}

function checkSurname() {
    let surname = prompt("Ingrese su apellido por favor");
    return surname;
}

function checkAge() {
    let age = parseInt(prompt("Ingrese su edad por favor"));
    if (!isNaN(age) && age >= 18) {
        return age;
    } else {
        return prompt("Su edad no es válida.");
    }
}

function checkBrand() {
    let vehicleBrand = prompt("Ingrese una marca de las siguientes opciones: Fiat o Renault o Chevrolet o Ford u Otra");
    return vehicleBrand;
}

function checkModel() {
    let vehicleModel = prompt("Ingrese un modelo de las siguientes opciones: Coupe o SUV o Truck u Otro");
    return vehicleModel;
}

function checkYear() {
    let vehicleYear = parseInt(prompt("Ingrese el año de su vehículo por favor."));
    if (!isNaN(vehicleYear) && vehicleYear >= 1900) {
        return vehicleYear;
    } else {
        return prompt("El año es inválido. Si es inferior al año 1900, deberá contactarse telefónicamente al 23050055.");
    }
}

function quoteAge(age) {
    if (age >= 18 && age <= 21) {
        ageFactor = 120;
    } else {
        ageFactor = 80;
    }
}

function quoteBrand(vehicleBrand) {
    if (vehicleBrand === "Fiat") {
        brandFactor = 0.15;
    } else if (vehicleBrand === "Renault") {
        brandFactor = 0.18;
    } else if (vehicleBrand === "Chevrolet") {
        brandFactor = 0.12;
    } else if (vehicleBrand === "Ford") {
        brandFactor = 0.22;
    } else if (vehicleBrand === "Otra") {
        brandFactor = 0.1;
    }
}

function quoteYear(vehicleYear) {
    if (vehicleYear <= 2018) {
        yearFactor = 0.8;
    } else if (vehicleYear > 2019) {
        yearFactor = 0.3;
    }
}

function quoteModel(vehicleModel) {
    if (vehicleModel === "Coupe") {
        modelFactor = 0.12;
    } else if (vehicleModel === "SUV") {
        modelFactor = 0.14;
    } else if (vehicleModel === "Truck") {
        modelFactor = 0.16;
    } else if (vehicleModel === "Otro") {
        modelFactor = 0.1;
    }
}

function quoteInsurance(basePrice, ageFactor, brandFactor, yearFactor, modelFactor) {
    finalPrice = (basePrice * ageFactor * brandFactor * yearFactor * modelFactor);
    return finalPrice;
}

let name = checkName();
let surname = checkSurname();
let age = checkAge();
let vehicleBrand = checkBrand();
let vehicleModel = checkModel();
let vehicleYear = checkYear();

quoteAge(age);
quoteBrand(vehicleBrand);
quoteYear(vehicleYear);
quoteModel(vehicleModel);
finalPrice = quoteInsurance(basePrice, ageFactor, brandFactor, yearFactor, modelFactor);

let msg = `${name} ${surname}, según los datos proporcionados, usted posee un vehículo marca: ${vehicleBrand}, modelo: ${vehicleModel}, año: ${vehicleYear}. La cotización de su seguro asciende a U$S: ${finalPrice}.`;

alert(msg);

