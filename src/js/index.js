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

//############ INDEX.HTML SCRIPT ############

//Currency exchange
const currencies = {
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  INR: "Indian Rupee",
  JPN: "Japanese Yen",
  USD: "United States Dollar",
  ZAR: "South African Rand",
};

const primaryCurrency = document.getElementById("primary");
const secondaryCurrency = document.getElementById("secondary");
primaryCurrency.innerHTML = getOptions(currencies);
secondaryCurrency.innerHTML = getOptions(currencies);

function getOptions(data) {
  return Object.entries(data)
    .map(
      ([country, currency]) =>
        `<option value="${country}">${country} | ${currency}</option>`
    )
    .join("");
}

document
  .getElementById("btn-convert")
  .addEventListener("click", fetchCurrencies);
function fetchCurrencies() {
  const primary = primaryCurrency.value;
  const secondary = secondaryCurrency.value;
  const amount = document.getElementById("amount").value;
  fetch(
    "https://v6.exchangerate-api.com/v6/d14eeee6a4f935aab34c335e/latest/" +
      primary
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      console.log(data);
      displayCurrency(data, primary, secondary, amount);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}

function displayCurrency(data, primary, secondary, amount) {
  const calculated = (amount * data.conversion_rates[secondary]).toFixed(2);
  document.getElementById("result").setAttribute("style", "display:block");
  document.getElementById("txt-primary").innerText =
    amount + " " + primary + " = ";
  document.getElementById("txt-secondary").innerText =
    calculated + " " + secondary;
}

//############ INSURANCE.HTML SCRIPT ############

