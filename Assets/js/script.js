let apiKey="94f3ff240cd672264bf3637b8efe4a6d";

// Function that clears both cards 
clear = () => {
    $("#current-weather").empty();
    $("#five-day-forecast").empty();
}

const displayHeader = () => {
    $("#forecast-header").removeClass("hidden")
};

const getCurrentWeather = () => {
    let cityName=$("#user-input").val().trim();

    // Create queryURL
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    console.log(queryURL);
    
    // Call to get the data for UV
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        // Save var for lat and lon for AJAX call
        const lat= (res.coord.lat);
        const lon= (res.coord.lon);
        // Get the data for UV Index
        const uvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
         $.ajax({
             url: uvURL,
             method: "GET"
             // Create the card
            }).then(function(uvRes){

                const currentWeatherCard = 
                `<div class="card mt-2 mr-2">
                    <div class="card-body">
                        <h3 class="card-title-container">
                        <span class="card-text name">${res.name}</span>
                        <span class="card-text date">${new Date().toLocaleDateString()}</span>
                        <span><img src="https://openweathermap.org/img/w/${res.weather[0].icon}.png"/></span>
                        </h3>
                        <p class="card-text temp">Temp: ${res.main.temp} F&#176</p>
                        <p class="card-text wind">Wind Speed: ${res.wind.speed} mph</p>
                        <p class="card-text humid">Humidity: ${res.main.humidity}%</p>
                        <p class="card-text uv">UV Index: ${uvRes.value}</p>
                    </div>
                </div>`;
                // Append card to page
                $("#current-weather").html(currentWeatherCard);
            });
        });   
};

const getForecast = () => {
    let cityName=$("#user-input").val().trim();

    // Create queryURL
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
    // Get the data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        // Create the forecast card
        let forecastCard = "";

        for (let i = 0; i < res.list.length; i++) {
            if (res.list[i].dt_txt.indexOf("15:00:00") > -1) {
                forecastCard += 
                `<div class="card bg-primary text-white mr-2 w-20">
                    <div class="card-body">
                        <div class="date">${new Date().toLocaleDateString()}</div>
                        <img src="https://openweathermap.org/img/w/${res.list[i].weather[0].icon}.png"/>
                        <p class="card-text temp">Temp: ${res.list[i].main.temp} F&#176</p>
                        <p class="card-text wind">Wind Speed: ${res.list[i].wind.speed} mph</p>
                        <p class="card-text humid">Humidity: ${res.list[i].main.humidity}%</p>
                    </div>
                </div>`;
            }
        } 
        // Render the card
        $("#five-day-forecast").html(forecastCard);
    });
};

// var array = [];
//     if (localStorage.getItem("user-input")) {
//         JSON.parse(localStorage.getItem("user-input")).map(item => array.push(item));
//         array.push(city);
//         localStorage.setItem("user-input", JSON.stringify(array));
//     } else {
//         array.push(city);
//         console.log(array);
//         localStorage.setItem("user-input", JSON.stringify(array));
//     }
//     console.log(localStorage.getItem("user-input"));

// // Adding buttons from local storage
// if(localStorage.getItem("user-input")) {
//     var savedCities = JSON.parse(localStorage.getItem("user-input"));
//     console.log(savedCities);
//     for (var i = 0; i < savedCities.length; i++) {
//         var citiesDiv = $("#user-input");
//         var newCityDiv = $("<button>");
//         newCityDiv.text(savedCities[i]);
//         newCityDiv.addClass("city py-3 pl-3 border-bottom");
//         citiesDiv.append("#searchHistory");
//     }
// }

// Creating the click event on the search button to run the functions 
$("#search-btn").on("click", function (event) {
    event.preventDefault();
    clear();
    displayHeader();
    getCurrentWeather();
    getForecast();
});