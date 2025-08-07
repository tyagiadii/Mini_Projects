// Wait until the full HTML document has been loaded
document.addEventListener('DOMContentLoaded', () => {
  
  // Get references to DOM elements
  const cityInput = document.getElementById('city-input');
  const getWeatherBtn = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const cityNameDisplay = document.getElementById('city-name');
  const temperatureDisplay = document.getElementById('temperature');
  const descriptionDisplay = document.getElementById('description');
  const errorMessage = document.getElementById('error-message');

  // Your OpenWeatherMap API key
  const API_KEY = "4371db0eb30c8a6c24346d0aca083f3e";

  // Event listener for the "Get Weather" button
  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim(); // Get user input and trim whitespace

    if (!city) return; // If input is empty, exit

    try {
      // Try to fetch weather data from the API
      const weatherData = await fetchWeatherData(city);
      // If successful, display it on the page
      displayWeatherData(weatherData);
    } catch (error) {
      // If there's an error (e.g. city not found), show an error message
      showError();
    }
  });

  // Function to fetch weather data from OpenWeatherMap API
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    console.log("Raw response:", response);

    if (!response.ok) {
      // If API request failed (e.g. 404), throw error
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json(); // Parse response to JSON
    console.log("Fetched data:", data);
    return data;
  }

  // Function to display fetched weather data in the UI
  function displayWeatherData(data) {
    const { name, main, weather } = data;

    cityNameDisplay.textContent = name; // Display city name
    temperatureDisplay.textContent = `Temperature: ${main.temp} °C`; // Display temperature
    descriptionDisplay.textContent = `Description: ${weather[0].description}`; // Display weather description

    weatherInfo.classList.remove('hidden'); // Show weather info
    errorMessage.classList.add('hidden'); // Hide error message
  }

  // Function to show an error message when API call fails
  function showError() {
    weatherInfo.classList.add('hidden'); // Hide weather info
    errorMessage.classList.remove('hidden'); // Show error message
  }
});
