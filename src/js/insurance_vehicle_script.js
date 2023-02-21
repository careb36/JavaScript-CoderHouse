// I use an object to store the user data. The user object includes the vehicle.
let user = {
  name: "",
  surname: "",
  age: 0,
  tel: "",
  email: "",
  address: "",
  department: "",
  city: "",
  vehicle: { brand: "", model: "", year: 0 },
  insurancesV: [],
};

// I use objects to store the factorsV : age, brand, year, model.
// This factorsV are used to calculate the final price of the insurance.
const factorsV = {
  age: { "18-21": 120, "22+": 80 },
  brand: {
    Ferrari: 0.9,
    Lamborghini: 0.9,
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
  year: { "1950-2018": 0.8, "2019+": 0.9 },
  model: { Coupe: 0.2, SUV: 0.25, Truck: 0.3, Otro: 0.1 },
};

// departments object to store the departments and cities.
const departments = {
  Artigas: ["Artigas"],
  Canelones: ["Canelones"],
  CerroLargo: ["Melo"],
  Colonia: ["Colonia"],
  Durazno: ["Durazno"],
  Flores: ["Trinidad"],
  Florida: ["Florida"],
  Lavalleja: ["Minas"],
  Maldonado: ["Maldonado"],
  Montevideo: ["Montevideo"],
  Paysandú: ["Paysandú"],
  RíoNegro: ["FrayBentos"],
  Rivera: ["Rivera"],
  Rocha: ["Rocha"],
  Salto: ["Salto"],
  SanJosé: ["SanJosé"],
  Soriano: ["Mercedes"],
  Tacuarembó: ["Tacuarembó"],
  TreintayTres: ["TreintayTres"],
};

const departmentSelectV = document.getElementById("vInsuranceDepartment");
const citySelectV = document.getElementById("vInsuranceCity");

/**
 * @description This function makes that cities are added when the department is selected.
 * @returns {void}
 */
departmentSelectV.addEventListener("change", () => {
  citySelectV.innerHTML = departments[departmentSelectV.value]
    .map((city) => `<option>${city}</option>`)
    .join("");
  citySelectV.value = citySelectV.children[0].value;
});

/**
 * @description This function calculates the insurance quote.
 * @returns {number} The final price. It is the sum of the base price and the factorsV.
 */
const calculateQuoteV = () => {
  user.age = parseInt(user.age, 10);
  user.vehicle.year = parseInt(user.vehicle.year, 10);
  let ageFactor = factorsV.age[user.age < 22 ? "18-21" : "22+"];
  let brandFactor = factorsV.brand[user.vehicle.brand] || 0.4;
  let yearFactor =
    factorsV.year[user.vehicle.year <= 2018 ? "1950-2018" : "2019+"];
  let modelFactor = factorsV.model[user.vehicle.model] || 0.1;
  const finalPriceV = 5 * (ageFactor + brandFactor + yearFactor + modelFactor);
  const now = new Date();
  let quote = {
    name: user.name,
    price: finalPriceV,
    date: now.toLocaleString(),
  };
  localStorage.setItem(
    "userStorageV",
    JSON.stringify({ ...user, insurancesV: user.insurancesV.push([quote]) })
  );
  return finalPriceV;
};

const submitButtonV = document.querySelector("#submitButtonV"); // Get the specific submit button element using its id
const vInsuranceForm = document.querySelector("#vInsurance"); // Get the form elements using its id
let selDepartmentV = document.querySelector("#vInsuranceDepartment");
let selCityV = document.querySelector("#vInsuranceCity");
let selBrandV = document.querySelector("#vInsuranceBrand"); // Get the select element using its id
let selModelV = document.querySelector("#vInsuranceModel"); // Get the select element using its id

// Store the quote result as a variable instead of recalculating it every time.
let quoteResultV;

// in the variable storedUserV stores the items from user object in local storage and convert it to JSON string using JSON.stringify method.
let storedUserV = JSON.parse(localStorage.getItem("userStorageV"));

// If the user object is not found in local storage, create a new one and store it in local storage
// Otherwise, use the stored user object
if (storedUserV) {
  vInsuranceForm.elements.name.value = storedUserV.name;
  vInsuranceForm.elements.surname.value = storedUserV.surname;
  vInsuranceForm.elements.age.value = storedUserV.age;
  vInsuranceForm.elements.tel.value = storedUserV.tel;
  vInsuranceForm.elements.email.value = storedUserV.email;
  vInsuranceForm.elements.address.value = storedUserV.address;
  selDepartmentV.value = storedUserV.department;
  selCityV.value = storedUserV.city;
  vInsuranceForm.elements.zip.value = storedUserV.zip;
  selBrandV.value = storedUserV.vehicle.brand;
  selModelV.value = storedUserV.vehicle.model;
  vInsuranceForm.elements.year.value = storedUserV.vehicle.year;
}else {
  localStorage.setItem("userStorageV", JSON.stringify(user));
}

/**
 * @description check if form mandatory fields are filled, if so, calculate the quote and show the modal and store the user object in local storage.
 * @param {object} user The user object.
 */
submitButtonV.addEventListener("click", (e) => {
  e.preventDefault();
  // Check if all form fields are filled
  if (
    !vInsuranceForm.elements.name.value ||
    !vInsuranceForm.elements.surname.value ||
    !vInsuranceForm.elements.age.value ||
    !vInsuranceForm.elements.tel.value ||
    !vInsuranceForm.elements.address.value ||
    !vInsuranceForm.elements.department.value ||
    !vInsuranceForm.elements.city.value ||
    !vInsuranceForm.elements.zip.value ||
    !vInsuranceForm.elements.brand.value ||
    !vInsuranceForm.elements.model.value ||
    !vInsuranceForm.elements.year.value
  ) {
    Swal.fire({
      title: "Error",
      text: "Por favor, complete todos los campos del formulario.",
      icon: "error",
    });
    return;
  }
  // Retrieve the user object from local storage
  user.name = vInsuranceForm.elements.name.value;
  user.surname = vInsuranceForm.elements.surname.value;
  user.age = vInsuranceForm.elements.age.value;
  user.tel = vInsuranceForm.elements.tel.value;
  user.address = vInsuranceForm.elements.address.value;
  user.department = selDepartmentV.options[selDepartmentV.selectedIndex].text;
  user.city = selCityV.options[selCityV.selectedIndex].text;
  user.zip = vInsuranceForm.elements.zip.value;
  user.vehicle.year = vInsuranceForm.elements.year.value;
  user.vehicle.brand = selBrandV.options[selBrandV.selectedIndex].text;
  user.vehicle.model = selModelV.options[selModelV.selectedIndex].text;

  // Store the user object in local storage
  localStorage.setItem(
    "userStorageV",
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
      vehicle: {
        brand: user.vehicle.brand,
        model: user.vehicle.model,
        year: user.vehicle.year,
      },
      insurancesM: [],
  insurancesV: [],
  insurancesS: []
    })
  );

// Function to show the loading animation and calculate the quote
function showLoadingAndCalculateQuote() {
  return new Promise((resolve, reject) => {
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
      // Calculate the quote only once, instead of being recalculated every time the modal is shown
      if (!quoteResultV) {
        let finalPriceV = Math.round(calculateQuoteV());
        quoteResultV = `${user.name} ${user.surname} el precio final para el seguro de su ${user.vehicle.brand} ${user.vehicle.model} del año ${user.vehicle.year} es de ${finalPriceV} dólares, al año.`;
      }
      // Show SweetAlert with the quote result
      Swal.fire({
        icon: "success",
        title: "Cotización generada",
        html: `<p>${quoteResultV}</p>`,
      }).then(() => {
        // Resolve the promise when the SweetAlert is closed
        resolve();
      });
    });
  });
}
// Call the function and reload the page when it is resolved
showLoadingAndCalculateQuote().then(() => {
    location.reload();
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