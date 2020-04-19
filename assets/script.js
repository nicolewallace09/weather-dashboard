// API key
var key = "1b2c2d3d7a616e00185ed07b2d85689e";

// DOM elements to display on page 

// current city DOM
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-input");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");


var currentWeather = document.querySelector("#current-weather");
var lastSearchEl = document.querySelector("#city-search-list");

// 5 day DOM
var fiveDayEl = document.querySelector("#forecast-cards");

var currentCity = "";
var cityArray = [];

// requesting Current Weather API
var getCityWeather = function(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;


    // if response was successful 
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayCityWeather(data, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    // if network error 
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })
};

// search city form submission 
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getCityWeather(cityName);
        cityInputEl.value = "";
     } else {
        alert("Please enter a City name");
    }
};

// Displaying current weather data 
var displayCityWeather = function(city, searchTerm) {
    // clear old content 
    cityContainerEl.textContent = '';
    citySearchTerm.textContent = searchTerm;

    var displayCurrentDate = document.querySelector("#city-current-date");
    var currentDate = moment();
    displayCurrentDate.textContent = currentDate.format("(MMMM Do YYYY)");

    // // weather icon 
    // var currentIcon = document.querySelector("#city-current-icon");

    // temperature 
    var displayTemp = document.querySelector("#temp-input");
    var currentTemp = city.main.temp + " °F";
    displayTemp.textContent = currentTemp; 

    // humidity
    var displayHumidity = document.querySelector("#humidity-input");
    var currentHumidity = city.main.humidity + "%";
    displayHumidity.textContent = currentHumidity; 

    // wind speed 
    var displayWind = document.querySelector("#wind-input");
    var currentWind = city.wind.speed + " MPH";
    displayWind.textContent = currentWind;

    // uv index 
    lon = city.coord.lon; 
    lat = city.coord.lat; 

    var displayUv = document.querySelector("uv-input"); 
    var currentUv = getUvIndex();
    displayUv.textContent = currentUv; 

};

// 5 day forecast API 
var getForecast = function(city) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + key;

    // if response was successful 
    fetch(forecastURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayCityWeather(data, city);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    // if network error 
    .catch(function(error) {
        alert("Unable to connect to Open Weather");
    })
};

// Displaying 5 day forecast   
// displayForcast = function () { 
//     fiveDayEl.textContent = ''; 
    
//     for (var i=1; i<=5; i++) {

//     }
// }; 

// // Displaying search history 
// var historyArray = function () {
//     cityArray = json.parse(localStorage.getItem("previousCity"));
//     displayHistory();
// };

// var displayHistory = function () {
//     lastSearchEl.innerHTML = "";

//     for (var i=0; i < cityArray.length; i++) {
//         var cityList = document.createElement("li");
//         cityList.classList = "list-group-item";
//         cityList.textContent = cityArray[i].cityName; 
//     }
// }; 

// var historyClick = function (event) {
//     event.preventDefault();


// };

// click on previously search city 
// lastSearchEl. addEventListener("click", historyClick);

// search button 
userFormEl.addEventListener("submit", formSubmitHandler);
