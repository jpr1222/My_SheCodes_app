function date() {
  let date = new Date();
  let dateAndTime = document.querySelector(".date");
  dateAndTime.innerHTML = date.toLocaleString("en-US", {
    weekday: "long", // long, short, narrow
    day: "numeric", // numeric, 2-digit
    year: "numeric", // numeric, 2-digit
    month: "short", // numeric, 2-digit, long, short, narrow
    hour: "numeric", // numeric, 2-digit
    minute: "numeric", // numeric, 2-digit
  });
}

function showTemperature(response) {
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  celsiusTemp = response.data.main.temp;
}

function search(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let searchInput = document.querySelector("#city-input");
  let currentCity = document.querySelector(".city");
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  if (searchInput.value) {
    currentCity.innerHTML = searchInput.value;
    currentCity.innerHTML =
      currentCity.innerHTML.charAt(0).toUpperCase() +
      currentCity.innerHTML.slice(1);
    searchInput.value = null;
  }
  axios.get(apiUrl).then(showTemperatureAndLocation);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureAndLocation);
}

function showTemperatureAndLocation(response) {
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  celsiusTemp = response.data.main.temp;
  let city = document.querySelector(".city");
  city.innerHTML = response.data.name;
}

function changeToFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let currentTemperature = document.querySelector(".current-temp");
  currentTemperature.innerHTML = Math.round((celsiusTemp * 5) / 9 + 32);
}

function changeToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let currentTemperature = document.querySelector(".current-temp");
  currentTemperature.innerHTML = Math.round(celsiusTemp);
}

///////////////////////////////////////////////////////////////

let currentLocButton = document.querySelector("button");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusTemp = null;
let celsiusLink = document.querySelector("#celsius-link");
let apiKey = "4740d8db992b43b0c7a9e5f8488b5195";
let city = document.querySelector(".city").innerHTML;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
let form = document.querySelector("#search-city-form");

////////////////////////////////////////////////////////////////////////

date();
axios.get(apiUrl).then(showTemperature);
form.addEventListener("submit", search);
currentLocButton.addEventListener("click", getPosition);
fahrenheitLink.addEventListener("click", changeToFahrenheit);
celsiusLink.addEventListener("click", changeToCelsius);
