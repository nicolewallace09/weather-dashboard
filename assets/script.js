// API key
var key = "1b2c2d3d7a616e00185ed07b2d85689e";

// DOM elements to display on page 
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-input");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var currentWeather = document.querySelector("#current-weather");
var previousCityEl = document.querySelector("#city-search-list");
var fiveDayEl = document.querySelector("#forecast-cards");

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

    // lon = city.coord.lon; 
    // lat = city.coord.lat; 
    // var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon; 

    // fetch(uvUrl).then(function(response) {
    //     if (response.ok) {
    //     response.json().then(function(data) {
    // });
};

// search city form submission 
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getCityWeather(cityName);
        getForecast(cityName);
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
    displayCurrentDate.textContent = currentDate.format("(L)");

    // weather icon 
    var displayIcon = document.querySelector("#city-current-icon");
    var currentIcon = "http://openweathermap.org/img/wn/" + city.weather[0].icon + "@2x.png"
    displayIcon.setAttribute ("src", currentIcon);

    // temperature 
    var displayTemp = document.querySelector("#temp-input");
    var currentTemp = Math.round(city.main.temp) + " °F";
    displayTemp.textContent = currentTemp; 

    // humidity
    var displayHumidity = document.querySelector("#humidity-input");
    var currentHumidity = city.main.humidity + "%";
    displayHumidity.textContent = currentHumidity; 

    // wind speed 
    var displayWind = document.querySelector("#wind-input");
    var currentWind = city.wind.speed + " MPH";
    displayWind.textContent = currentWind;

    // // uv index 
    // var displayUv = document.querySelector("uv-input"); 
    // var currentUv = city.
    // displayUv.textContent = currentUv; 

};

   
// 5 day forecast API 
var getForecast = function(city) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=5&appid=" + key;

    // if response was successful 
    fetch(forecastURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayForecast(data.list);
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
var displayForecast = function (list) { 
    console.log(list);

        for (var i = 0; i <= 4; i++) {

        //date
        var displayDate = document.querySelector(`#date-${i}`);
        var forecastDate = list[i].dt;
        displayDate.textContent = forecastDate;

        // temp
        var displayTemp = document.querySelector(`#temp-${i}`);
        var forecastTemp = list[i].main.temp + " °F";
        displayTemp.textContent = forecastTemp; 

        //humidity
        var displayHumidity = document.querySelector(`#humidity-${i}`);
        var forecastHumidity = list[i].main.humidity + "%";
        displayHumidity.textContent = forecastHumidity;
        
        // weather icons 
        var displayIcon1 = document.querySelector("#city-icon-1");
        var currentIcon1 = "http://openweathermap.org/img/wn/" + list[0].weather[0].icon + "@2x.png"
        displayIcon1.setAttribute ("src", currentIcon1);

        var displayIcon2 = document.querySelector("#city-icon-2");
        var currentIcon2 = "http://openweathermap.org/img/wn/" + list[1].weather[0].icon  + "@2x.png"
        displayIcon2.setAttribute ("src", currentIcon2);

        var displayIcon3 = document.querySelector("#city-icon-3");
        var currentIcon3 = "http://openweathermap.org/img/wn/" + list[2].weather[0].icon  + "@2x.png"
        displayIcon3.setAttribute ("src", currentIcon3);

        var displayIcon4 = document.querySelector("#city-icon-4");
        var currentIcon4 = "http://openweathermap.org/img/wn/" + list[3].weather[0].icon  + "@2x.png"
        displayIcon4.setAttribute ("src", currentIcon4);

        var displayIcon5 = document.querySelector("#city-icon-5");
        var currentIcon5 = "http://openweathermap.org/img/wn/" + list[4].weather[0].icon  + "@2x.png"
        displayIcon5.setAttribute ("src", currentIcon5);

        }
}; 

// // Displaying search history 
// var previousCity = function () {
//     cityArray = json.parse(localStorage.getItem("previousCity"));
//     displayHistory();
// };

// var displayHistory = function () {
//     previousCityEl.innerHTML = "";

//     for (var i=0; i < cityArray.length; i++) {
//         var cityList = document.createElement("li");
//         cityList.classList = "list-group-item";
//         cityList.textContent = cityArray[i].cityName; 
//     }
// }; 

// var historyHandler = function (event) {
//     event.preventDefault();


// };

// set local storage 
// var cityName = JSON.parse(localStorage.getItem("city"))

// // get local storage 
// $("#9am-row .description").val(localStorage.getItem("9am-row" /* localStorage KEY also the row id */));

// click on previously search city 
// previousCityEl.addEventListener("click", historyHandler);

// search button 
userFormEl.addEventListener("submit", formSubmitHandler);
