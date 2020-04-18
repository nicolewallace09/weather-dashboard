// DOM elements to display on page 
var searchForm = document.querySelector("#user-form");
var cityInputEl = document.querySelector('#city-input');
var fiveDayEl = document.querySelector('#forecast-cards');
var currentWeather = document.querySelector('#current-weather');
var lastSearchEl = document.querySelector('#city-search-list')

var currentCity = "";
var cityArray = [];
var weatherObj = [];


// requesting One Call API
var getCityWeather = function(weather) {
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?q=" + cityName + "lat={lat}&lon={lon}&appid=1b2c2d3d7a616e00185ed07b2d85689e";


    // if response was successful 
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data, weather);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    // if network error 
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })
}

// search city form submission 
var searchCity = function (event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();
    console.log(cityName);

    if (cityName) {
        getCityName(cityName);
        cityInputEl = "";
    } else {
        alert("Please enter a City name")
    }
}

// search button 
searchForm.addEventListener("submit", searchCity)

// Latitude and longitude for each city 
var apiURL = 

// Displaying current weather data 
var displayWeather = 

// 5 day forecast 
