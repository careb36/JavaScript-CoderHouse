/* 
This script is for an insurance quote calculator for motorcycles. 
It has an object "user" to store the user's data, including their motorcycle information. 
The factors used to calculate the insurance quote are also stored in an object "factors". 
The "calculateQuote" function uses the information in the user object and factors object 
to determine the final insurance quote. The code also uses local storage to store the user's information, 
so that if they revisit the page, their information will still be there. 
The code also uses DOM manipulation to display the quote result in a modal.
*/

// I use an object to store the user data. The user object includes the motorcycle.
let user = {
  name: "",
  surname: "",
  age: 0,
  tel: "",
  email: "",
  address: "",
  department: "",
  city: "",
  zip: "",
  motorcycle: {
    brand: "",
    model: "",
    year: 0,
  },
};

// I use objects to store the factors : age, brand, year, model. 
// This factors are used to calculate the final price of the insurance.
const factors = {
  age: {
    "18-21": 120,
    "22+": 80,
  },
  brand: {
    HarleyDavidson: 0.9,
    Ducati: 0.9,
    Ecosse: 0.8,
    Dodge: 0.8,
    Suzuki: 0.8,
    Kawasaki: 0.7,
    Yamaha: 0.7,
    Honda: 0.6,
    Triumph: 0.6,
    KTM: 0.6,
    Vespa: 0.6,
    Bajaj: 0.5,
    Otra: 0.4,
  },
  year: {
    "1950-2018": 0.8,
    "2019+": 0.9,
  },
  model: {
    Standar: 0.2,
    Cruiser: 0.25,
    Sports: 0.3,
    Otro: 0.1,
  },
};

/**
 * @description This function calculates the insurance quote. 
 * @returns {number} The final price. It is the sum of the base price and the factors.
 */
const calculateQuote = () => {
  const basePrice = 50; // base price for all motorcycles
  user.age = parseInt(user.age, 10); //using parseInt with a radix of 10 to ensure these values are correctly parsed as integers
  user.motorcycle.year = parseInt(user.motorcycle.year, 10); //using parseInt with a radix of 10 to ensure these values are correctly parsed as integers
  let ageFactor = factors.age[user.age < 22 ? "18-21" : "22+"];
  let brandFactor = factors.brand[user.motorcycle.brand] || 0.4;
  let yearFactor =
    factors.year[user.motorcycle.year <= 2018 ? "1950-2018" : "2019+"];
  let modelFactor = factors.model[user.motorcycle.model] || 0.1;
  return basePrice + ageFactor + brandFactor + yearFactor + modelFactor;
};

const submitButton = document.querySelector("#submitButtonM"); // Get the specific submit button element using its id
const mInsuranceForm = document.querySelector("#mInsurance"); // Get the form elements using its id
let selDepartment = document.querySelector("#mInsuranceDepartment");
let selCity = document.querySelector("#mInsuranceCity");
let selBrand = document.querySelector("#mInsuranceBrand"); // Get the select element using its id
let selModel = document.querySelector("#mInsuranceModel"); // Get the select element using its id
const modal = document.querySelector(".modal"); // Get the modal element using its class
const modalBody = document.querySelector(".modal-body"); // Get the modal body element using its class

// Store the quote result as a variable instead of recalculating it every time.
let quoteResult;

// in the variable storedUserM stores the items from user object in local storage and convert it to JSON string using JSON.stringify method.
let storedUserM = JSON.parse(localStorage.getItem("userStorageM"));

// If the user object is not found in local storage, create a new one and store it in local storage
// Otherwise, use the stored user object
if (storedUserM) {
  mInsuranceForm.elements.name.value = storedUserM.name;
  mInsuranceForm.elements.surname.value = storedUserM.surname;
  mInsuranceForm.elements.age.value = storedUserM.age;
  mInsuranceForm.elements.tel.value = storedUserM.tel;
  mInsuranceForm.elements.email.value = storedUserM.email;
  mInsuranceForm.elements.address.value = storedUserM.address;
  selDepartment.value = storedUserM.department;
  selCity.value = storedUserM.city;
  mInsuranceForm.elements.zip.value = storedUserM.zip;
  selBrand.value = storedUserM.motorcycle.brand;
  selModel.value = storedUserM.motorcycle.model;
  mInsuranceForm.elements.year.value = storedUserM.motorcycle.year;
}

/**
 * @description check if form mandatory fields are filled, if so, calculate the quote and show the modal and store the user object in local storage.
 * @param {object} user The user object.
 */
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  // Check if all form fields are filled
  if (
    !mInsuranceForm.elements.name.value ||
    !mInsuranceForm.elements.surname.value ||
    !mInsuranceForm.elements.age.value ||
    !mInsuranceForm.elements.tel.value ||
    !mInsuranceForm.elements.address.value ||
    !mInsuranceForm.elements.department.value ||
    !mInsuranceForm.elements.city.value ||
    !mInsuranceForm.elements.zip.value ||
    !mInsuranceForm.elements.brand.value ||
    !mInsuranceForm.elements.model.value ||
    !mInsuranceForm.elements.year.value
  ) {
    alert("Por favor, complete todos los campos del formulario.");
    return;
  }
  // Retrieve the user object from local storage
  user.name = mInsuranceForm.elements.name.value;
  user.surname = mInsuranceForm.elements.surname.value;
  user.age = mInsuranceForm.elements.age.value;
  user.tel = mInsuranceForm.elements.tel.value;
  user.address = mInsuranceForm.elements.address.value;
  user.department = selDepartment.options[selDepartment.selectedIndex].text;
  user.city = selCity.options[selCity.selectedIndex].text;
  user.zip = mInsuranceForm.elements.zip.value;
  user.motorcycle.year = mInsuranceForm.elements.year.value;
  user.motorcycle.brand = selBrand.options[selBrand.selectedIndex].text;
  user.motorcycle.model = selModel.options[selModel.selectedIndex].text;

  // Store the user object in local storage
  localStorage.setItem(
    "userStorageM",
    JSON.stringify({
      name: user.name,
      surname: user.surname,
      age: user.age,
      tel: user.tel,
      email: user.email,
      address: user.address,
      department: user.department,
      city: user.city,
      zip: user.zip,
      motorcycle: {
        brand: user.motorcycle.brand,
        model: user.motorcycle.model,
        year: user.motorcycle.year,
      },
    })
  );

  // the function call to calculateQuote only once, instead of being recalculated every time the modal is shown
  if (!quoteResult) {
    let finalPrice = Math.round(calculateQuote());
    quoteResult = `${user.name} ${user.surname} el precio final para el seguro de su ${user.motorcycle.brand} ${user.motorcycle.model} del año ${user.motorcycle.year} es de ${finalPrice} dólares, al año.`;
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

/*
In this script I use the following concepts:
- Objects
- Arrays
- Functions
- DOM manipulation
- Local storage
- Event listeners
- Form validation
- Conditional statements
- Loops
- Math
- JSON
- Arrow functions
- other concepts
*/