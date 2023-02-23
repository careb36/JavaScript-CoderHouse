//############ COMMON SCRIPT FOR ALL PAGES ############

//subscribe button
const subscribeBtn = document.querySelector("#susBtn");
subscribeBtn.addEventListener("click", () => {
  const email = document.querySelector("#newsletter1").value;

  // Check if the mail field is empty or not a valid mail with regular expressions (regex)
  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Correo inválido",
      text: "Por favor ingresa una dirección de correo electrónico válida.",
    });
    return;
  }

  Swal.fire({
    title: "Enviando solicitud...",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  // Simulate a request to the server
  setTimeout(() => {
    Swal.fire({
      icon: "success",
      title: "¡Gracias por suscribirte!",
      text: "Recibirás un correo electrónico a la brevedad.",
    });
  }, 1000);
});

//search button
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", () => {
  // Get the value of the lookup field
  const searchTerm = searchInput.value;

  // Validate that a search term has been entered
  if (searchTerm.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "¡Oops!",
      text: "Por favor ingrese un término de búsqueda",
    });
    return;
  }

  // Show SweetAlert of search in progress
  Swal.fire({
    title: "Buscando...",
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
      icon: "error",
      title: "No hay Resultados",
      text: "Estamos con problemas técnicos, intente su búsqueda en unos minutos.",
    });
  }, 1000);
});

//############ INDEX.HTML SCRIPT ############

// This is a JavaScript code that implements a currency converter using exchangerate-api.com to fetch real-time currency exchange rates.

// The first part of the code defines an object 'currencies' that stores the names of different currencies as key-value pairs.
const currencies = {
  USD: "United States Dollar",
  EUR: "Euro",
  UYU: "Uruguayan Peso",
  ARS: "Argentine Peso",
  BRL: "Brazilian Real",
  PYG: "Paraguayan Guarani",
  VES: "Venezuelan Bolivar",
  CLP: "Chilean Peso",
  COP: "Colombian Peso",
  MXN: "Mexican Peso",
  PEN: "Peruvian Sol",
  BOB: "Bolivian Boliviano",
};

const primaryCurrency = document.getElementById("primary");
const secondaryCurrency = document.getElementById("secondary");
primaryCurrency.innerHTML = getOptions(currencies);
secondaryCurrency.innerHTML = getOptions(currencies);

// The 'getOptions' function takes an object 'data' as input and generates a list of dropdown menu options for each key-value pair of the object.
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
// The 'fetchCurrencies' function gets the selected primary and secondary currencies from the dropdown menus, as well as the amount to be converted, and sends a request to the exchangerate-api.com API to fetch the exchange rate data for the selected primary currency.
// The response from the API is parsed as a JSON object and used to calculate the equivalent amount of the selected secondary currency, which is then displayed on the webpage.
function fetchCurrencies() {
  const primary = primaryCurrency.value;
  const secondary = secondaryCurrency.value;
  const amount = document.getElementById("amount").value;
  fetch(
    "https://v6.exchangerate-api.com/v6/d45639a1f701c29a33550c6d/latest/" +
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
// The 'displayCurrency' function takes the calculated currency conversion data and updates the HTML elements on the webpage to show the conversion result.
function displayCurrency(data, primary, secondary, amount) {
  const calculated = (amount * data.conversion_rates[secondary]).toFixed(2);
  document.getElementById("result").setAttribute("style", "display:block");
  document.getElementById("txt-primary").innerText =
    amount + " " + primary + " = ";
  document.getElementById("txt-secondary").innerText =
    calculated + " " + secondary;
}
