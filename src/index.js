function formatDay(index) {     
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return days[index];
}

function formatMonth(index) {
  let months = [
    "Jan",
    "Fab",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  return months[index];
}

function formatTime(time) {
  if (time < 10) {
    time = "0" + time;
  }
  return time;
}

function showDate() {
  let now = new Date();
  let currentDay = formatDay(now.getDay());
  let currentDate = now.getDate();
  let currentMonth = formatMonth(now.getMonth());
  let currentYear = now.getFullYear();
  let currentHours = formatTime(now.getHours());
  let currentMinutes = formatTime(now.getMinutes());

  let sentence = `${currentDay} ${currentHours}:${currentMinutes}, ${currentDate} ${currentMonth} ${currentYear}`;
  document.querySelector("#current-date").innerHTML = sentence;
}

function activateCelsiusDegrees() {
  document.querySelector("#temp-c").style["font-size"] = "large";
  document.querySelector("#temp-c").style["font-weight"] = "bold";
  document.querySelector("#temp-f").style["font-size"] = "small";
  document.querySelector("#temp-f").style["font-weight"] = "normal";
}

function activateFahrenhateDegrees() {
  document.querySelector("#temp-f").style["font-size"] = "large";
  document.querySelector("#temp-f").style["font-weight"] = "bold";
  document.querySelector("#temp-c").style["font-size"] = "small";
  document.querySelector("#temp-c").style["font-weight"] = "normal";
}

function showWeather(response) {
  // console.log(response.data);
  currentTemperature.celsius = Math.round(response.data.main.temp);
  currentTemperature.fahrenheit = Math.round(currentTemperature.celsius * 1.8 + 32);

  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = currentTemperature.celsius;
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = `humidity - ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `wind - ${response.data.wind.speed} m/s`;
  document.querySelector("#current-icon").innerHTML = getIcon(response.data.weather[0].main);
  
  activateCelsiusDegrees();
}

function createPositionApiUrl(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
  showDate();
}

function getWeather(apiUrl) {
    axios.get(apiUrl).then(showWeather);
}

function weatherByPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(createPositionApiUrl);
}

function weatherByCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#new-city");
  let city = newCity.value.trim();
  if (city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    getWeather(apiUrl);
  } else {
    alert("Enter a city!");
  }
  newCity.value = "";
  showDate();
}

function showTempF(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML = currentTemperature.fahrenheit;
  activateFahrenhateDegrees();
}

function showTempC(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML = currentTemperature.celsius;
  activateCelsiusDegrees();
}

function getIcon(weatherDescription) {
    let weatherIcons = {
        Drizzle: '<i class="fa-solid fa-cloud-rain"></i>',
        Rain: '<i class="fa-solid fa-cloud-showers-heavy"></i>',
        Snow: '<i class="fa-solid fa-snowflake"></i>',
        Clear: '<i class="fa-solid fa-sun"></i>',
        Clouds: '<i class="fa-solid fa-cloud-sun"></i>',

        Smoke: '<i class="fa-solid fa-smog"></i>',
        Haze: '<i class="fa-solid fa-smog"></i>',
        Dust: '<i class="fa-solid fa-smog"></i>',
        Fog: '<i class="fa-solid fa-smog"></i>',
        Sand: '<i class="fa-solid fa-smog"></i>',
        Ash: '<i class="fa-solid fa-smog"></i>',

        Squall: '<i class="fa-solid fa-wind"></i>',
        Tornado: '<i class="fa-solid fa-tornado"></i>'   
    }
    if (weatherDescription in weatherIcons) {
        return weatherIcons[weatherDescription];
    }
    else return "";
}

// °C - °F

let currentTemperature = {
  celsius: 0,
  fahrenheit: 0
};

let apiKey = "f7d5a287feccc9d05c7badbf5cac779d";
let defaultCity = "New York";
let units = "metric";
let defaultApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=${units}&appid=${apiKey}`;

showDate();
getWeather(defaultApiUrl);
// navigator.geolocation.getCurrentPosition(weatherByPosition);
document.querySelector("#search-button").addEventListener("click", weatherByCity);
document.querySelector("#current-button").addEventListener("click", weatherByPosition);

document.querySelector("#temp-f").addEventListener("click", showTempF);
document.querySelector("#temp-c").addEventListener("click", showTempC);

