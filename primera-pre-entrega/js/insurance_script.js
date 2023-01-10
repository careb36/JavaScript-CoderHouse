/*
This script request the user for their name, surname, age, vehicle brand, model, and year.
It then calculates an insurance quote for the user based on the information provided.
*/


// Constant and variables that will be used as incident factors in the price of vehicle insurance.
const basePrice = 200; // precio base para todos los vehículos
let ageFactor = 1; // factor de edad
let brandFactor = 1; // factor de marca
let yearFactor = 1; // factor de año
let modelFactor = 1; // factor de modelo
let finalPrice = 300;


/*
Function to request the age of the user and verify that he is of legal age.
Checks whether the user is old enough to perform operations on the site.
The function then is called and the result is displayed to the user.
*/

// Function to request the user for their name and returns it.
function checkName() {
    let name = prompt("Ingrese su nombre por favor");
    return name;
}

// Function to request the user for their surname and returns it.
function checkSurname() {
    let surname = prompt("Ingrese su apellido por favor");
    return surname;
}


/*
Function to request the user for their age and checks if the age is a valid number
and if the user is 18 or older. If either of these conditions is not met,
it returns an error message. If both conditions are met, it returns the age.
*/
function checkAge() {
    let age = parseInt(prompt("Ingrese su edad por favor"));
    if (!isNaN(age) && age >= 18) {
        return age;
    } else {
        return prompt("Su edad no es válida.");
    }
}

// Function to request to the user for their vehicle brand and returns it.
function checkBrand() {
    let vehicleBrand = prompt("Ingrese una marca de las siguientes opciones: Fiat o Renault o Chevrolet o Ford u Otra");
    return vehicleBrand;
}

// Function to request the user to the user for their vehicle model and returns it.
function checkModel() {
    let vehicleModel = prompt("Ingrese un modelo de las siguientes opciones: Coupe o SUV o Truck u Otro");
    return vehicleModel;
}

// Function to request to the user for their vehicle year and checks if the year is a valid number and if it is 1900 or later.
// If either of these conditions is not met, it returns an error message.
// If both conditions are met, it returns the year.

function checkYear() {
    let vehicleYear = parseInt(prompt("Ingrese el año de su vehículo por favor."));
    if (!isNaN(vehicleYear) && vehicleYear >= 1900) {
        return vehicleYear;
    } else {
        return prompt("El año es inválido. Si es inferior al año 1900, deberá contactarse telefónicamente al 23050055.");
    }
}

// Function to take the user's age and sets the ageFactor variable based on the age.
function quoteAge(age) {
    if (age >= 18 && age <= 21) {
        ageFactor = 120;
    } else {
        ageFactor = 80;
    }
}

// Function to take the user's vehicle brand and sets the brandFactor variable based on the brand.
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

// Function to take in the user's vehicle year and sets the yearFactor variable based on the year.
function quoteYear(vehicleYear) {
    if (vehicleYear <= 2018) {
        yearFactor = 0.8;
    } else if (vehicleYear > 2019) {
        yearFactor = 0.3;
    }
}

// Function to take the user's vehicle model and sets the modelFactor variable based on the model.
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

// This function takes in the base price and the four factors and calculates the final price
// of the insurance quote by multiplying all of the factors together. It then returns the final price.
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

//Calls the quoteInsurance() function and passes in the basePrice and the four factors as arguments,
// and assigns the returned value to the finalPrice variable.
finalPrice = Math.round(quoteInsurance(basePrice, ageFactor, brandFactor, yearFactor, modelFactor));

// Message using the user's name, surname, vehicle brand, model, and year, and
// the final price of the insurance quote and displays to the user.
let msg = `${name} ${surname}, según los datos proporcionados, usted posee un vehículo marca: ${vehicleBrand}, modelo: ${vehicleModel}, año: ${vehicleYear}. La cotización de su seguro asciende a U$S: ${finalPrice}. en una cuota anual`;

alert(msg);

