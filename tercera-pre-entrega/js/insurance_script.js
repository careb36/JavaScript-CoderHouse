/*
This script prompts the user for their name, surname, age, vehicle brand, model, and year.
It uses arrow functions to handle each prompt and check for valid input and uses objects to store factors: 
ageFactors, brandFactors, yearFactors, and modelFactors.
The script uses the Object.keys() method to create an array of vehicle brands and models to select from.
A function takes all the user input and calculates a vehicle insurance quote.
*/

// I use an object to store the user data. The user object includes the vehicle.
let user = {
  name: "",
  surname: "",
  age: 0,
  email: "",
  vehicle: {
    brand: "",
    model: "",
    year: 0,
  },
};

//I use objects to store the factors: age, brand, year, model
const factors = {
  age: {
    "18-21": 120,
    "22+": 80,
  },
  brand: {
    Ferrari: 0.9,
    MercedezBenz: 0.8,
    BMW: 0.8,
    Audi: 0.8,
    Toyota: 0.7,
    Nissan: 0.7,
    Renault: 0.6,
    Citroen: 0.6,
    Ford: 0.6,
    Volkswagen: 0.6,
    Fiat: 0.5,
    Chevrolet: 0.5,
    Otra: 0.4,
  },
  year: {
    "1950-2018": 0.8,
    "2019+": 0.9,
  },
  model: {
    Coupe: 0.2,
    SUV: 0.25,
    Truck: 0.3,
    Otro: 0.1,
  },
};

/**
 * @description This function calculates the insurance quote
 * @returns {number} The final price
 */
const calculateQuote = () => {
  const basePrice = 50; // base price for all vehicles
  user.age = parseInt(user.age, 10); //using parseInt with a radix of 10 to ensure these values are correctly parsed as integers
  user.vehicle.year = parseInt(user.vehicle.year, 10); //using parseInt with a radix of 10 to ensure these values are correctly parsed as integers
  let ageFactor = factors.age[user.age < 22 ? "18-21" : "22+"];
  let brandFactor = factors.brand[user.vehicle.brand] || 0.4;
  let yearFactor =
    factors.year[user.vehicle.year <= 2018 ? "1950-2018" : "2019+"];
  let modelFactor = factors.model[user.vehicle.model] || 0.1;
  return basePrice + ageFactor + brandFactor + yearFactor + modelFactor;
};

const submitButton = document.querySelector("#submitButtonV"); // Get the specific submit button element using its id
const vInsuranceForm = document.querySelector("#vInsurance"); // Get the form elements using its id
let selBrand = document.querySelector("#vInsuranceBrand"); // Get the select element using its id
let selModel = document.querySelector("#vInsuranceModel"); // Get the select element using its id
const modal = document.querySelector(".modal"); // Get the modal element using its class
const modalBody = document.querySelector(".modal-body"); // Get the modal body element using its class

// Store the quote result as a variable instead of recalculating it every time
let quoteResult;

let storedUser = JSON.parse(localStorage.getItem("userStorage"));

// If the user object is not found in local storage, use the default object
if (storedUser) {
  //llenar cada campo del formulario con los datos del usuario
  vInsuranceForm.elements.name.value = storedUser.name;
  vInsuranceForm.elements.surname.value = storedUser.surname;
  vInsuranceForm.elements.age.value = storedUser.age;
  vInsuranceForm.elements.year.value = storedUser.vehicle.year;
  selBrand.value = storedUser.vehicle.brand;
  selModel.value = storedUser.vehicle.model;
  console.log("storedUser found");
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  // Check if all form fields are filled
  if (
    !vInsuranceForm.elements.name.value ||
    !vInsuranceForm.elements.surname.value ||
    !vInsuranceForm.elements.age.value ||
    !vInsuranceForm.elements.year.value
  ) {
    alert("Por favor, complete todos los campos del formulario.");
    return;
  }
  // Retrieve the user object from local storage
  user.name = vInsuranceForm.elements.name.value;
  user.surname = vInsuranceForm.elements.surname.value;
  user.age = vInsuranceForm.elements.age.value;
  user.vehicle.year = vInsuranceForm.elements.year.value;
  user.vehicle.brand = selBrand.options[selBrand.selectedIndex].text;
  user.vehicle.model = selModel.options[selModel.selectedIndex].text;
  console.log("storedUser not found");

  // Store the user object in local storage
  localStorage.setItem(
    "userStorage",
    JSON.stringify({
      name: user.name,
      surname: user.surname,
      age: user.age,
      email: user.email,
      vehicle: {
        brand: user.vehicle.brand,
        model: user.vehicle.model,
        year: user.vehicle.year,
      },
    })
  );

  // the function call to calculateQuote only once, instead of being recalculated every time the modal is shown
  if (!quoteResult) {
    let finalPrice = Math.round(calculateQuote());
    quoteResult = `${user.name} ${user.surname} el precio final para el seguro de su ${user.vehicle.brand} ${user.vehicle.model} del año ${user.vehicle.year} es de ${finalPrice} dólares.`;
  }

  modalBody.innerHTML = quoteResult;
  modal.classList.add("show");
  modal.setAttribute("aria-modal", "true");
  modal.style.display = "block";
  document.body.classList.add("modal-open");
});

const btnClose = document.querySelector(".btn-close");
btnClose.addEventListener("click", function () {
  modal.classList.remove("show");
  modal.removeAttribute("aria-modal");
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
});
