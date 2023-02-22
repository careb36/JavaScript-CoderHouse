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
  quotes:[], // I use an array to store the quotes.
};

// I use objects to store the factorsM : age, brand, year, model. 
// This factorsM are used to calculate the final price of the insurance.
const factorsM = {
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

const departmentSelectM = document.getElementById('mInsuranceDepartment');
const citySelectM = document.getElementById('mInsuranceCity');

/**
 * @description This function makes that cities are added when the department is selected.
 * @returns {void}
 */
departmentSelectM.addEventListener('change', () => {
  const selectedDepartment = departmentSelectM.value;
  const cities = departments[selectedDepartment];
  citySelectM
.innerHTML = '';
  if (cities.length > 0) {
    citySelectM
  .innerHTML = cities
      .map(city => `<option>${city}</option>`)
      .join('');
    citySelectM
  .value = cities[0];
  }
});

/**
 * @description This function calculates the insurance quote. 
 * @returns {number} The final price. It is the sum of the base price and the factorsM.
 */
const calculateQuoteM = () => {
  const basePriceM = 50; // base price for all motorcycles
  user.age = parseInt(user.age, 10); //using parseInt with a radix of 10 to ensure these values are correctly parsed as integers
  user.motorcycle.year = parseInt(user.motorcycle.year, 10); //using parseInt with a radix of 10 to ensure these values are correctly parsed as integers
  let ageFactor = factorsM.age[user.age < 22 ? "18-21" : "22+"];
  let brandFactorM = factorsM.brand[user.motorcycle.brand] || 0.4;
  let yearFactorM =
    factorsM.year[user.motorcycle.year <= 2018 ? "1950-2018" : "2019+"];
  let modelFactorM = factorsM.model[user.motorcycle.model] || 0.1;
  return basePriceM + ageFactor + brandFactorM + yearFactorM + modelFactorM;
};

const submitButtonM = document.querySelector("#submitButtonM"); // Get the specific submit button element using its id
const mInsuranceForm = document.querySelector("#mInsurance"); // Get the form elements using its id
let selDepartmentM = document.querySelector("#mInsuranceDepartment");
let selCityM = document.querySelector("#mInsuranceCity");
let selBrandM = document.querySelector("#mInsuranceBrand"); // Get the select element using its id
let selModelM = document.querySelector("#mInsuranceModel"); // Get the select element using its id

// Store the quote result as a variable instead of recalculating it every time.
let quoteResultM;

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
  selDepartmentM.value = storedUserM.department;
  selCityM.value = storedUserM.city;
  mInsuranceForm.elements.zip.value = storedUserM.zip;
  selBrandM.value = storedUserM.motorcycle.brand;
  selModelM.value = storedUserM.motorcycle.model;
  mInsuranceForm.elements.year.value = storedUserM.motorcycle.year;
}

/**
 * @description check if form mandatory fields are filled, if so, calculate the quote and show the modal and store the user object in local storage.
 * @param {object} user The user object.
 */
submitButtonM.addEventListener("click", (e) => {
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
    Swal.fire({
      title: "Error",
      text: "Por favor, complete todos los campos del formulario.",
      icon: "error",
    });
    return;
  }

  // Retrieve the user object from local storage
  user.name = mInsuranceForm.elements.name.value;
  user.surname = mInsuranceForm.elements.surname.value;
  user.age = mInsuranceForm.elements.age.value;
  user.tel = mInsuranceForm.elements.tel.value;
  user.address = mInsuranceForm.elements.address.value;
  user.department = selDepartmentM.options[selDepartmentM.selectedIndex].text;
  user.city = selCityM.options[selCityM.selectedIndex].text;
  user.zip = mInsuranceForm.elements.zip.value;
  user.motorcycle.year = mInsuranceForm.elements.year.value;
  user.motorcycle.brand = selBrandM.options[selBrandM.selectedIndex].text;
  user.motorcycle.model = selModelM.options[selModelM.selectedIndex].text;

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
    // the function call to calculateQuoteM only once, instead of being recalculated every time the modal is shown
    if (!quoteResultM) {
      let finalPrice = Math.round(calculateQuoteM());
      quoteResultM = `${user.name} ${user.surname} el precio final para el seguro de su ${user.motorcycle.brand} ${user.motorcycle.model} del año ${user.motorcycle.year} es de ${finalPrice} dólares, al año.`;
    }

    // Show SweetAlert with the quote result
    Swal.fire({
      icon: "success",
      title: "Cotización generada",
      html: `<p>${quoteResultM}</p>`,
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