const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";
//[question bg_js_01] how can i get API KEY for weather app?
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const weather = document.querySelector(".js-weather .weather__text");
//[question bg_js_02] what happend i use querySelector with 2 selectors?
function getWeather(coords) {
  fetch(
    //[question bg_js_03] what is the fetch?
    `${WEATHER_API}lat=${coords.lat}&lon=${coords.lng}&appid=${API_KEY}&units=metric`
    //[question bg_js_04] what is the units=metric?
  )
    .then(response => response.json())
    //[question bg_js_05] what is the .then?
    //[question bg_js_06] what is the =>?
    .then(json => {
      const name = json.name;
      const temperature = json.main.temp;
      weather.innerHTML = `${Math.floor(temperature)}° @ ${name}`;
    });
}

function handleGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const coords = {
    lat,
    lng
  };
  localStorage.setItem("coords", JSON.stringify(coords));
  //[question bg_js_08] what is the JSON.stringify()?
  getWeather(coords);
}

function handleGeoFailure() {
  console.log("no location");
}

function loadWeather() {
  const currentCoords = localStorage.getItem("coords");
  if (currentCoords !== null) {
    const parsedCoords = JSON.parse(currentCoords);
    //[question bg_js_07] what is the JSON.parse()?
    getWeather(parsedCoords);
    return;
  } else {
    navigator.geolocation.getCurrentPosition(
    //[question bg_js_08] what is the navigator.geolocation.getCurrentPosition?
      handleGeoSuccess,
      handleGeoFailure
    );
  }
}

function init() {
  loadWeather();
}

init();
