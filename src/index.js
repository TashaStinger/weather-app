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

function celsiusDegrees() {
  document.querySelector("#temp-c").style["font-size"] = "large";
  document.querySelector("#temp-c").style["font-weight"] = "bold";
  document.querySelector("#temp-f").style["font-size"] = "small";
  document.querySelector("#temp-f").style["font-weight"] = "normal";
}

function fahrenhateDegrees() {
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
  document.querySelector("#cur-temp").innerHTML = currentTemperature.celsius;
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `humidity - ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `wind - ${response.data.wind.speed} m/s`;
  celsiusDegrees();
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  // console.log(latitude, longitude);
  let apiKey = "f7d5a287feccc9d05c7badbf5cac779d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
  showDate();
}

function changeCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#new-city");
  let city = newCity.value.trim();
  if (city) {
    let apiKey = "f7d5a287feccc9d05c7badbf5cac779d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  } else {
    alert("Enter a city!");
  }
  newCity.value = "";
  showDate();
}

function showTempF(event) {
  event.preventDefault();
  document.querySelector("#cur-temp").innerHTML = currentTemperature.fahrenheit;
  fahrenhateDegrees();
}

function showTempC(event) {
  event.preventDefault();
  document.querySelector("#cur-temp").innerHTML = currentTemperature.celsius;
  celsiusDegrees();
}

// °C - °F

let currentTemperature = {
  celsius: 0,
  fahrenheit: 0
};

showDate();
navigator.geolocation.getCurrentPosition(setPosition);
document.querySelector("#search-button").addEventListener("click", changeCity);
document.querySelector("#current-button").addEventListener("click", navigator.geolocation.getCurrentPosition(setPosition));

let tempF = document.querySelector("#temp-f");
tempF.addEventListener("click", showTempF);
let tempC = document.querySelector("#temp-c");
tempC.addEventListener("click", showTempC);
