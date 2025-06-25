// IMPORTANT: Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key.
// You can get one for free from https://openweathermap.org/api
const API_KEY = '4876c1e28e4cd42bc7ce87447490fbf2'; // !!! API KEY UPDATED !!!
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Get DOM elements
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const weatherInfo = document.getElementById('weatherInfo');
const cityNameElement = document.getElementById('cityName');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');

// Function to display an error message
function displayError(message) {
    weatherDisplay.classList.remove('hidden');
    loadingIndicator.classList.add('hidden');
    weatherInfo.classList.add('hidden');
    errorMessage.textContent = message;
}

// Function to clear messages and show loading indicator
function showLoading() {
    weatherDisplay.classList.remove('hidden');
    loadingIndicator.classList.remove('hidden');
    errorMessage.textContent = '';
    weatherInfo.classList.add('hidden');
}

// Function to display weather data
function displayWeather(data) {
    loadingIndicator.classList.add('hidden');
    errorMessage.textContent = '';
    weatherInfo.classList.remove('hidden');

    cityNameElement.textContent = data.name;
    // Convert temperature from Kelvin to Celsius and round to 1 decimal place
    temperatureElement.textContent = `${(data.main.temp - 273.15).toFixed(1)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    humidityElement.textContent = data.main.humidity;
    windSpeedElement.textContent = data.wind.speed;
}

// Function to fetch weather data from API
async function getWeatherData(city) {
    if (!city) {
        displayError('Please enter a city name.');
        return;
    }
    showLoading();

    try {
        const response = await fetch(`<span class="math-inline">\{BASE\_URL\}?q\=</span>{city}&appid=${API_KEY}`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            displayError(data.message || 'Could not retrieve weather data. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayError('An error occurred while fetching weather data. Please check your internet connection.');
    }
}

// Event listener for the button click
getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    getWeatherData(city);
});

// Event listener for pressing 'Enter' key in the input field
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        getWeatherData(city);
    }
});
