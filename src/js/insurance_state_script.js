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
  insurancesS:[], // I use an array to store the insurances.
};

// I use objects to store the factorsS : typeofstate, year, department.
// This factorsS are used to calculate the final price of the insurance.
const factorsS = {
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

const departmentSelectS = document.getElementById('sInsuranceDepartment');
const citySelectS = document.getElementById('sInsuranceCity');

/**
 * @description This function makes that cities are added when the department is selected.
 * @returns {void}
 */
departmentSelectS.addEventListener('change', () => {
  const selectedDepartment = departmentSelectS.value;
  const cities = departments[selectedDepartment];
  citySelectS.innerHTML = '';
  if (cities.length > 0) {
    citySelectS.innerHTML = cities
      .map(city => `<option>${city}</option>`)
      .join('');
    citySelectS.value = cities[0];
  }
});

/**
 * @description This function calculates the insurance quote.
 * @returns {number} The final price. It is the sum of the base price and the factorsS.
 */
const calculateQuoteS = () => {
  const basePrice = 10; // base price for all states
  user.state.year = parseInt(user.state.year, 10); //using parseInt with a radix of 10 to ensure these values are correctly parsed as integers
  let typeofstateFactor = factorsS.typeofstate[user.state.typeofstate] || 0.4;
  let yearFactor = factorsS.year[user.state.year <= 2018 ? "1950-2018" : "2019+"];
  let departmentFactor = factorsS.department[user.state.department] || 0.5;
  return basePrice * (typeofstateFactor + yearFactor + departmentFactor);
};

const submitButtonS = document.querySelector("#submitButtonS"); 
const sInsuranceForm = document.querySelector("#sInsurance"); 
let selCityS = document.querySelector("#sInsuranceCity");

let selDepartmentS = document.querySelector("#sInsuranceDepartment");
let selYearS = document.querySelector("#sInsuranceYear");
let selTypeOfState = document.querySelector("#sInsurancetypeofstate");

// Store the quote result as a variable instead of recalculating it every time.
let quoteResultS;

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
  selCityS.value = storedUserS.city;

  selDepartmentS.value = storedUserS.state.department;
  selYearS.value = storedUserS.state.year;
  selTypeOfState.value = storedUserS.state.typeofstate;
}

/**
 * @description check if form mandatory fields are filled, if so, calculate the quote and show the modal and store the user object in local storage.
 * @param {object} user The user object.
 */
submitButtonS.addEventListener("click", (e) => {
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
      Swal.fire({
        title: "Error",
        text: "Por favor, complete todos los campos del formulario.",
        icon: "error",
      });
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
  user.city = selCityS.options[selCityS.selectedIndex].text;

  user.state.year = sInsuranceForm.elements.year.value;
  user.state.typeofstate =
    selTypeOfState.options[selTypeOfState.selectedIndex].text;
  user.state.department =
    selDepartmentS.options[selDepartmentS.selectedIndex].text;

  // Store the user object in local storage
  localStorage.setItem(
    "userStorageS",
    JSON.stringify({
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
  insurancesS:[],
})
  );

// Show loading animation for 2 seconds
Swal.fire({
  title: "Cotizando",
  html: "Estamos procesando tu cotización...",
  allowOutsideClick: false,
  allowEscapeKey: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
  },
}).then(() => {
  // the function call to calculateQuoteS only once, instead of being recalculated every time the modal is shown
  if (!quoteResultS) {
    let finalPrice = Math.round(calculateQuoteS());
    quoteResultS = `${user.name} ${user.surname}, el precio final para el seguro de su ${user.state.typeofstate} construido en ${user.state.year} en ${user.state.department}, Uruguay, es de ${finalPrice} dólares, al año.`;
  }
  // Show SweetAlert with the quote result
  Swal.fire({
    icon: "success",
    title: "Cotización generada",
    html: `<p>${quoteResultS}</p>`,
  });
});
});

//############ COMMON SCRIPT FOR ALL PAGES ############

//subscribe button
const subscribeBtn = document.querySelector('#susBtn');
subscribeBtn.addEventListener('click', () => {
  const email = document.querySelector('#newsletter1').value;

  // Check if the mail field is empty or not a valid mail with regular expressions (regex)
  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Correo inválido',
      text: 'Por favor ingresa una dirección de correo electrónico válida.',
    });
    return;
  }

  Swal.fire({
    title: 'Enviando solicitud...',
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    }
  });

  // Simulate a request to the server
  setTimeout(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Gracias por suscribirte!',
      text: 'Recibirás un correo electrónico a la brevedad.',
    });
  }, 1000);
});

//search button
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');

searchBtn.addEventListener('click', () => {
  // Get the value of the lookup field
  const searchTerm = searchInput.value;

  // Validate that a search term has been entered
  if (searchTerm.trim() === '') {
    Swal.fire({
      icon: 'error',
      title: '¡Oops!',
      text: 'Por favor ingrese un término de búsqueda',
    });
    return;
  }

  // Show SweetAlert of search in progress
  Swal.fire({
    title: 'Buscando...',
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  // Simulate a search on the server (for this example setTimeout is used to simulate a delay in the search)
  setTimeout(() => {
    console.log(`Realizando búsqueda con el término: ${searchTerm}`);
    // Show SweetAlert of search completed
    Swal.fire({
      icon: 'error',
      title: 'No hay Resultados',
      text: 'Estamos con problemas técnicos, intente su búsqueda en unos minutos.',
    });
  }, 1000);
});
