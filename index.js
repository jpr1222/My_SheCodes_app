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
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  celsiusTemp = response.data.temperature.current;
}

function search(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let searchInput = document.querySelector("#city-input");
  let currentCity = document.querySelector(".city");
  let city = searchInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureAndLocation);
}

function showTemperatureAndLocation(response) {
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  celsiusTemp = response.data.temperature.current;
  let city = document.querySelector(".city");
  city.innerHTML = response.data.city;
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
let apiKey = "c4a2d9bo8e1d3060da83ae339f9cb9t7";
let city = document.querySelector(".city").innerHTML;
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
let form = document.querySelector("#search-city-form");

////////////////////////////////////////////////////////////////////////

date();
axios.get(apiUrl).then(showTemperature);
form.addEventListener("submit", search);
currentLocButton.addEventListener("click", getPosition);
fahrenheitLink.addEventListener("click", changeToFahrenheit);
celsiusLink.addEventListener("click", changeToCelsius);
