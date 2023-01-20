/*
This script request the user for their name, surname, age, vehicle brand, model, and year.
It then calculates an insurance quote for the user based on the information provided.
*/


// Constant and variables that will be used as incident factors in the price of vehicle insurance.
const basePrice = 200; // base price for all vehicles

// I use an object to store user data
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

//I use objects to store the factors

const ageFactors = {
    '18-21': 120,
    '22+': 80
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

const validBrands = Object.keys(brandFactors);
const validModels = Object.keys(modelFactors);


// Function to request the user for their name and returns it.
const checkName = () => {
    user.name = prompt("Ingrese su nombre por favor");
};

// Function to request the user for their surname and returns it.
const checkSurname = () => {
    user.surname = prompt("Ingrese su apellido por favor");
};

/*
Function to request the user for their age and checks if the age is a valid number
and if the user is 18 or older. If either of these conditions is not met,
it returns an error message. If both conditions are met, it returns the age.
*/
const checkAge = () => {
    user.age = parseInt(prompt("Ingrese su edad por favor"));
    if (!isNaN(user.age) && user.age >= 18) {
        return user.age;
    } else {
        return prompt("Su edad no es válida.");
    }
};

// Function to request to the user for their vehicle brand and returns it.
const checkBrand = () => {
    user.vehicle.brand = prompt("Ingrese una marca de las siguientes opciones: " + validBrands.join(', '));
    if (!validBrands.includes(user.vehicle.brand)) {
        return prompt("La marca seleccionada no es válida.");
    }
};

// Function to request the user for their vehicle model and returns it.
const checkModel = () => {
    user.vehicle.model = prompt("Ingrese un modelo de las siguientes opciones: " + validModels.join(', '));
    if (!validModels.includes(user.vehicle.model)) {
        return prompt("El modelo seleccionado no es válida.");
    }
};

// Function to request to the user for their vehicle year and checks if the year is a valid number and if it is 1900 or later.
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

// Function to take the user's age and sets the ageFactor variable based on the age.
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

// sure calculate
const finalPrice = calculateQuote();

// user message
alert(`${user.name} ${user.surname}, el precio final para el seguro de su ${user.vehicle.brand} ${user.vehicle.model} del año ${user.vehicle.year} es de ${finalPrice} dólares americanos. Usted puede financiarlo hasta en 12 pagos mensuales.`);


