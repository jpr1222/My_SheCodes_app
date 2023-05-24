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
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  celsiusTemp = response.data.temperature.current;
  let emoji = response.data.condition.icon;
  let emojiLink = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${emoji}.png`;
  img.setAttribute("src", emojiLink);
  img.setAttribute("alt", emoji);
  img.setAttribute("title", response.data.condition.description);
  windSpeedMetric = response.data.wind.speed;
  windSpeed.innerHTML = Math.round(windSpeedMetric) + " km/h";
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
  celsiusTemp = response.data.temperature.current;
  currentTemperature.innerHTML = Math.round(celsiusTemp);
  city = response.data.city;
  let emoji = response.data.condition.icon;
  let emojiLink = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${emoji}.png`;
  img.setAttribute("src", emojiLink);
  img.setAttribute("alt", emoji);
  img.setAttribute("title", response.data.condition.description);
  windSpeedMetric = response.data.wind.speed;
  windSpeed.innerHTML = Math.round(windSpeedMetric) + " km/h";
}

function changeToFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  currentTemperature.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  windSpeed.innerHTML = Math.round(windSpeedMetric / 6) + " mph";
}

function changeToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  currentTemperature.innerHTML = Math.round(celsiusTemp);
  windSpeed.innerHTML = Math.round(windSpeedMetric) + " km/h";
}

///////////////////////////////////////////////////////////////
let currentTemperature = document.querySelector(".current-temp");
let currentLocButton = document.querySelector("button");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusTemp = null;
let img = document.querySelector("img");
let windSpeed = document.querySelector(".wind-speed");
let windSpeedMetric = null;
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
