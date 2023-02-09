/* 
This script is for an insurance quote calculator for states. 
It has an object "user" to store the user's data, including their state information. 
The factors used to calculate the insurance quote are also stored in an object "factors". 
The "calculateQuote" function uses the information in the user object and factors object 
to determine the final insurance quote. The code also uses local storage to store the user's information, 
so that if they revisit the page, their information will still be there. 
The code also uses DOM manipulation to display the quote result in a modal.
*/

// I use an object to store the user data. The user object includes the state.
let user = {
  name: "",
  surname: "",
  tel: "",
  email: "",
  age: 18,
  address: "",
  city: "",
  zip: "",
  state: {
    typeofstate: "",
    year: 1900,
    department: "",
  },
};

// I use objects to store the factors : typeofstate, year, department.
// This factors are used to calculate the final price of the insurance.
const factors = {
  typeofstate: {
    Edificio: 5,
    Casa: 3,
    Apartamento: 2,
    Terreno: 1,
  },
  year: {
    "1900-1950": 2.5,
    "1950-2018": 1.5,
    "2019+": 0.9,
  },
  department: {
    Canelones: 0.9,
    Montevideo: 1.8,
    Artigas: 0.6,
    CerroLargo: 0.6,
    Colonia: 1.2,
    Durazno: 1.2,
    Flores: 0.4,
    Florida: 0.3,
    Lavalleja: 0.2,
    Maldonado: 2.1,
    Paysandú: 0.9,
    RíoNegro: 0.8,
    Rivera: 0.7,
    Rocha: 1.6,
    Salto: 0.5,
    SanJosé: 1.4,
    Soriano: 1.3,
    Tacuarembó: 1.2,
    TreintayTres: 0.8,
  },
};

// departments object to store the departments and cities.
const departments = {
  Artigas: ['Artigas'],
  Canelones: ['Canelones'],
  CerroLargo: ['Melo'],
  Colonia: ['Colonia'],
  Durazno: ['Durazno'],
  Flores: ['Trinidad'],
  Florida: ['Florida'],
  Lavalleja: ['Minas'],
  Maldonado: ['Maldonado'],
  Montevideo: ['Montevideo'],
  Paysandú: ['Paysandú'],
  RíoNegro: ['FrayBentos'],
  Rivera: ['Rivera'],
  Rocha: ['Rocha'],
  Salto: ['Salto'],
  SanJosé: ['SanJosé'],
  Soriano: ['Mercedes'],
  Tacuarembó: ['Tacuarembó'],
  TreintayTres: ['TreintayTres'],
};

const departmentSelect = document.getElementById('sInsuranceDepartment');
const citySelect = document.getElementById('sInsuranceCity');

/**
 * @description This function makes that cities are added when the department is selected.
 * @returns {void}
 */
departmentSelect.addEventListener('change', () => {
  const selectedDepartment = departmentSelect.value;
  const cities = departments[selectedDepartment];
  citySelect.innerHTML = '';
  if (cities.length > 0) {
    citySelect.innerHTML = cities
      .map(city => `<option>${city}</option>`)
      .join('');
    citySelect.value = cities[0];
  }
});

/**
 * @description This function calculates the insurance quote.
 * @returns {number} The final price. It is the sum of the base price and the factors.
 */
const calculateQuote = () => {
  const basePrice = 10; // base price for all states
  user.state.year = parseInt(user.state.year, 10); //using parseInt with a radix of 10 to ensure these values are correctly parsed as integers
  let typeofstateFactor = factors.typeofstate[user.state.typeofstate] || 0.4;
  let yearFactor = factors.year[user.state.year <= 2018 ? "1950-2018" : "2019+"];
  let departmentFactor = factors.department[user.state.department] || 0.5;
  return basePrice * (typeofstateFactor + yearFactor + departmentFactor);
};

const submitButton = document.querySelector("#submitButtonS"); 
const sInsuranceForm = document.querySelector("#sInsurance"); 
let selCity = document.querySelector("#sInsuranceCity");

let selDepartment = document.querySelector("#sInsuranceDepartment");
let selYear = document.querySelector("#sInsuranceYear");
let selTypeOfState = document.querySelector("#sInsurancetypeofstate");

const modal = document.querySelector(".modal"); 
const modalBody = document.querySelector(".modal-body"); 

// Store the quote result as a variable instead of recalculating it every time.
let quoteResult;

// in the variable storedUserS stores the items from user object in local storage and convert it to JSON string using JSON.stringify method.
let storedUserS = JSON.parse(localStorage.getItem("userStorageS"));

// If the user object is not found in local storage, create a new one and store it in local storage
// Otherwise, use the stored user object
if (storedUserS) {
  sInsuranceForm.elements.name.value = storedUserS.name;
  sInsuranceForm.elements.surname.value = storedUserS.surname;
  sInsuranceForm.elements.age.value = storedUserS.age;
  sInsuranceForm.elements.tel.value = storedUserS.tel;
  sInsuranceForm.elements.email.value = storedUserS.email;
  sInsuranceForm.elements.address.value = storedUserS.address;
  sInsuranceForm.elements.zip.value = storedUserS.zip;
  selCity.value = storedUserS.city;

  selDepartment.value = storedUserS.state.department;
  selYear.value = storedUserS.state.year;
  selTypeOfState.value = storedUserS.state.typeofstate;
}

/**
 * @description check if form mandatory fields are filled, if so, calculate the quote and show the modal and store the user object in local storage.
 * @param {object} user The user object.
 */
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  // Check if all form fields are filled
  if (
    !sInsuranceForm.elements.name.value ||
    !sInsuranceForm.elements.surname.value ||
    !sInsuranceForm.elements.age.value ||
    !sInsuranceForm.elements.tel.value ||
    !sInsuranceForm.elements.address.value ||
    !sInsuranceForm.elements.department.value ||
    !sInsuranceForm.elements.city.value ||
    !sInsuranceForm.elements.zip.value ||
    !sInsuranceForm.elements.typeofstate.value ||
    !sInsuranceForm.elements.year.value
  ) {
    alert("Por favor, complete todos los campos del formulario.");
    return;
  }
  // Retrieve the user object from local storage
  user.name = sInsuranceForm.elements.name.value;
  user.surname = sInsuranceForm.elements.surname.value;
  user.age = sInsuranceForm.elements.age.value;
  user.tel = sInsuranceForm.elements.tel.value;
  user.address = sInsuranceForm.elements.address.value;
  user.zip = sInsuranceForm.elements.zip.value;
  user.email = sInsuranceForm.elements.email.value;
  user.city = selCity.options[selCity.selectedIndex].text;

  user.state.year = sInsuranceForm.elements.year.value;
  user.state.typeofstate =
    selTypeOfState.options[selTypeOfState.selectedIndex].text;
  user.state.department =
    selDepartment.options[selDepartment.selectedIndex].text;

  // Store the user object in local storage
  localStorage.setItem(
    "userStorageS",
    JSON.stringify({
      name: user.name,
      surname: user.surname,
      age: user.age,
      tel: user.tel,
      email: user.email,
      address: user.address,
      city: user.city,
      zip: user.zip,
      state: {
        typeofstate: user.state.typeofstate,
        department: user.state.department,
        year: user.state.year,
      },
    })
  );

  /**
   * @description check if quoteResult is defined, if so, show the modal with the quote result, otherwise, calculate the quote and show the modal.
   * @param {object} user The user object.
   */
  if (!quoteResult) {
    let finalPrice = Math.round(calculateQuote());
    quoteResult = `${user.name} ${user.surname}, el precio final para el seguro de su ${user.state.typeofstate} construido en ${user.state.year} en ${user.state.department}, Uruguay, es de ${finalPrice} dólares, al año.`;
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

