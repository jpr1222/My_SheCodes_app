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

function Day(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecastCelsius(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `</br><div class="row">`;

  lowTempElement.innerHTML =
    Math.round(response.data.daily[0].temperature.minimum) + "°C";
  highTempElement.innerHTML =
    Math.round(response.data.daily[0].temperature.maximum) + "°C";

  forecast.forEach(function (forecastDay, index) {
    if ((index < 7) & (index > 0)) {
      forecastHTML =
        forecastHTML +
        `<div class="col-4">
        <div class="weather-forecast-day">${Day(forecastDay.time)} <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                  alt="${forecastDay.condition.icon}"
                  width="40"
                />
        </div>
        <div class="weather-forecast-temp-max"> ${Math.round(
          forecastDay.temperature.maximum
        )} °C</div>
        <div class="weather-forecast-temp-min"> ${Math.round(
          forecastDay.temperature.minimum
        )} °C</div> </br>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function showForecastFahrenheit(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `</br><div class="row">`;

  lowTempElement.innerHTML =
    Math.round(response.data.daily[0].temperature.minimum) + "°F";
  highTempElement.innerHTML =
    Math.round(response.data.daily[0].temperature.maximum) + "°F";

  forecast.forEach(function (forecastDay, index) {
    if ((index < 7) & (index > 0)) {
      forecastHTML =
        forecastHTML +
        `<div class="col-4">
        <div class="weather-forecast-day">${Day(forecastDay.time)} <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                  alt="${forecastDay.condition.icon}"
                  width="40"
                />
        </div>
        <div class="weather-forecast-temp-max"> ${Math.round(
          forecastDay.temperature.maximum
        )} °F</div>
        <div class="weather-forecast-temp-min"> ${Math.round(
          forecastDay.temperature.minimum
        )} °F</div> </br>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  apiUrlForecastImperial = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  if (searchInput.value) {
    currentCity.innerHTML = searchInput.value;
    currentCity.innerHTML =
      currentCity.innerHTML.charAt(0).toUpperCase() +
      currentCity.innerHTML.slice(1);
    searchInput.value = null;
  }
  axios.get(apiUrl).then(showTemperatureAndLocation);
  axios.get(apiUrlForecast).then(showForecastCelsius);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
  apiUrlForecastImperial = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperatureAndLocation);
  axios.get(apiUrlForecast).then(showForecastCelsius);
}

function showTemperatureAndLocation(response) {
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  celsiusTemp = response.data.temperature.current;
  currentTemperature.innerHTML = Math.round(celsiusTemp);
  document.querySelector(".city").innerHTML = response.data.city;
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
  windSpeed.innerHTML = Math.round(windSpeedMetric / 1.609) + " mph";
  axios.get(apiUrlForecastImperial).then(showForecastFahrenheit);
}

function changeToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  currentTemperature.innerHTML = Math.round(celsiusTemp);
  windSpeed.innerHTML = Math.round(windSpeedMetric) + " km/h";
  axios.get(apiUrlForecast).then(showForecastCelsius);
}

function getTemp() {
  let city = document.querySelector(".city").innerHTML;
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  apiUrlForecastImperial = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrlForecast).then(showForecastCelsius);
}
///////////////////////////////////////////////////////////////
let apiKey = "c4a2d9bo8e1d3060da83ae339f9cb9t7";
let currentTemperature = document.querySelector(".current-temp");
let currentLocButton = document.querySelector("button");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let img = document.querySelector(".main-emoji");
let windSpeed = document.querySelector(".wind-speed");
let celsiusLink = document.querySelector("#celsius-link");
let form = document.querySelector("#search-city-form");
let submitButton = document.querySelector(".submit");
let lowTempElement = document.querySelector(".low-temp");
let highTempElement = document.querySelector(".high-temp");

let celsiusTemp = null;
let windSpeedMetric = null;
let apiUrl = null;
let apiUrlForecast = null;
let apiUrlForecastImperial = null;
////////////////////////////////////////////////////////////////////////

date();
getTemp();
form.addEventListener("submit", search);
submitButton.addEventListener("click", search);
currentLocButton.addEventListener("click", getPosition);
fahrenheitLink.addEventListener("click", changeToFahrenheit);
celsiusLink.addEventListener("click", changeToCelsius);
