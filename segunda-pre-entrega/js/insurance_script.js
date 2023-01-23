/*
This script prompts the user for their name, surname, age, vehicle brand, model, and year.
It uses arrow functions to handle each prompt and check for valid input and uses objects to store factors: ageFactors, brandFactors, yearFactors, and modelFactors.
The script uses the Object.keys() method to create an array of vehicle brands and models to select from.
A function takes all the user input and calculates a vehicle insurance quote.
*/

const basePrice = 200; // base price for all vehicles

/*
The Object class represents one of JavaScript's data types.
It is used to store various keyed collections and more complex entities.
Objects can be created using the Object() constructor or the object initializer / literal syntax
 */

// I use an object to store the user data
const user = {
    name: '',
    surname: '',
    age: '',
    vehicle: {
        brand: '',
        model: '',
        year: ''
    }
};

//I use objects to store the factors: age, brand, year, model

const minAge = 18;
const ageFactors = {
    [minAge + 1]: 120,
    [minAge]: 80
};

const brandFactors = {
    Fiat: 0.15,
    Renault: 0.18,
    Chevrolet: 0.12,
    Ford: 0.22,
    Otra: 0.1
};

const yearFactors = {
    '1900-2018': 0.8,
    '2019+': 0.9
};

const modelFactors = {
    Coupe: 0.2,
    SUV: 0.25,
    Truck: 0.3,
    Otro: 0.1
};

/*
Constants that store an array of valid vehicle brands and models respectively.
These arrays are used later in the checkBrand and checkModel functions,
to check if the brand or model entered by the user is included in the validBrands or validModels array, respectively.
If the brand or model entered by the user is not included in the validBrands or validModels array, the function will return an error message.
 */
const validBrands = Object.keys(brandFactors);
const validModels = Object.keys(modelFactors);


// Arrow function to request the user for their name
const checkName = () => {
    user.name = prompt("Ingrese su nombre por favor");
};

// Arrow function to request the user for their surname.
const checkSurname = () => {
    user.surname = prompt("Ingrese su apellido por favor");
};

/*
Arrow function to request the user for their age and checks if the age is a valid number
and if the user is 18 or older. If either of these conditions is not met,
it returns an error message. If both conditions are met, it returns the age.
*/
const checkAge = () => {
    user.age = parseInt(prompt("Ingrese su edad por favor"));
    if (!isNaN(user.age) && user.age >= minAge) {
        return user.age;
    } else {
        return prompt("Su edad no es válida.");
    }
};

// Arrow function to request to the user for their vehicle brand and returns it.
const checkBrand = () => {
    user.vehicle.brand = prompt("Ingrese una marca de las siguientes opciones: " + validBrands.join(', '));
    if (!validBrands.includes(user.vehicle.brand)) {
        return prompt("La marca seleccionada no es válida.");
    }
};

// Arrow function to request the user for their vehicle model and returns it.
const checkModel = () => {
    user.vehicle.model = prompt("Ingrese un modelo de las siguientes opciones: " + validModels.join(', '));
    if (!validModels.includes(user.vehicle.model)) {
        return prompt("El modelo seleccionado no es válida.");
    }
};

// Arrow function to request to the user for their vehicle year and checks if the year is a valid number and if it is 1900 or later.
// If either of these conditions is not met, it returns an error message.
// If both conditions are met, it returns the year.

const checkYear = () => {
    user.vehicle.year = parseInt(prompt("Ingrese el año de su vehículo por favor."));
    if (!isNaN(user.vehicle.year) && user.vehicle.year >= 1900) {
        return user.vehicle.year;
    } else {
        return prompt("El año es inválido. Si es inferior al año 1900, deberá contactarse telefónicamente al 23050055.");
    }
};

// Arrow function to take the user's age, brand,vehicle year, model and calculate the vehicle insurance quote
const calculateQuote = () => {
    let ageFactor = ageFactors[user.age < 22 ? '18-21' : '22+'];
    let brandFactor = brandFactors[user.vehicle.brand];
    let yearFactor = yearFactors[user.vehicle.year <= 2018 ? '1900-2018' : '2019+'];
    let modelFactor = modelFactors[user.vehicle.model];
    return basePrice + ageFactor + brandFactor + yearFactor + modelFactor;
}

// call the functions
checkName();
checkSurname();
checkAge();
checkBrand();
checkModel();
checkYear();

// insurance calculate
const finalPrice = calculateQuote();

// user message
alert(`${user.name} ${user.surname}, el precio final para el seguro de su ${user.vehicle.brand} ${user.vehicle.model} del año ${user.vehicle.year} es de ${finalPrice} dólares americanos. Usted puede financiarlo hasta en 12 pagos mensuales.`);


