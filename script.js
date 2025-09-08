
    const apiKey = "72e4451b862ca94d366bb7db748994eb";

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
  const cityName = cityInput.value || "Lahore"; // Default Lahore
  fetchWeather(cityName);
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        weatherResult.innerHTML = `<p>City not found. Try again.</p>`;
      }
    })
    .catch(err => {
      weatherResult.innerHTML = `<p>Error fetching data. Try later.</p>`;
      console.error(err);
    });
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <img src="${iconUrl}" alt="${weather[0].description}" />
    <p>Temperature: ${main.temp}°C</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Condition: ${weather[0].description}</p>
  `;
}


function displayWeather(data) {
  const { name, main, weather } = data;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  weatherResult.style.opacity = 0; // fade out
  setTimeout(() => {
    weatherResult.innerHTML = `
      <h2>${name}</h2>
      <img src="${iconUrl}" alt="${weather[0].description}" />
      <p>Temperature: ${main.temp}°C</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>Condition: ${weather[0].description}</p>
    `;
    weatherResult.style.opacity = 1; // fade in
  }, 200);

  const mainWeather = weather[0].main.toLowerCase();
  if (mainWeather.includes("cloud")) {
    weatherContainer.className = "weather-container cloudy";
  } else if (mainWeather.includes("rain") || mainWeather.includes("drizzle")) {
    weatherContainer.className = "weather-container rainy";
  } else if (mainWeather.includes("clear") || mainWeather.includes("sun")) {
    weatherContainer.className = "weather-container sunny";
  } else {
    weatherContainer.className = "weather-container";
  }
}

const animationLayer = document.getElementById("animationLayer");

