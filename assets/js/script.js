let cityLat = ""
let cityLon = ""
let apiKey ="81181bda96c8c7fd7c78e47ac25b3020"
let currentDate = ""
let currentIcon = ""
let currentTemperature = ""
let currentHumidity = ""
let currentWind =""
let day1Date = ""
let day1Icon = ""
let day1Temperature = ""
let day1Humidity = ""
let day2Date = ""
let day2Icon = ""
let day2Temperature = ""
let day2Humidity = ""
let day3Date = ""
let day3Icon = ""
let day3Temperature = ""
let day3Humidity = ""
let day4Date = ""
let day4Icon = ""
let day4Temperature = ""
let day4Humidity = ""
let day5Date = ""
let day5Icon = ""
let day5Temperature = ""
let day5Humidity = ""
let todaySection = $('#today')
let day1Section = $('#day-1-card')
let day2Section = $('#day-2-card')
let day3Section = $('#day-3-card')
let day4Section = $('#day-4-card')
let day5Section = $('#day-5-card')
let cityName =""
let savedCities = JSON.parse(localStorage.getItem('savedCities')) ?? [];


$('#search-button').on("click", function(){
    event.preventDefault();
    $('#today').html("")
    day1Section.html("")
    day2Section.html("")
    day3Section.html("")
    day4Section.html("")
    day5Section.html("")
    getCity()
    addCityHistory();
})

function getCity(){
    cityName = $("#search-input").val()
    console.log(cityName)
    let queryURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=10&appid="+apiKey
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response) {
        cityLat = response[0].lat;
        cityLon = response[0].lon;
        currentForecast();
        fiveDayForecast();
    }
    )
}

function currentForecast(){
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?lat="+cityLat+"&lon="+cityLon+"&appid="+apiKey
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response) {
        currentDate = moment()
        currentIcon = response.weather[0].icon
        currentTemperature = response.main.temp
        currentHumidity = response.main.humidity
        currentWind = response.wind.speed
        printTodayWeather();
    }
    )
}

function fiveDayForecast(){
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+cityLat+"&lon="+cityLon+"&appid="+apiKey
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response) {
        console.log(response)
        day1Date = response.list[4].dt
        day1Icon = response.list[4].weather[0].icon
        day1Temperature = response.list[4].main.temp
        day1Humidity = response.list[4].main.humidity
        day2Date = response.list[12].dt
        day2Icon = response.list[12].weather[0].icon
        day2Temperature = response.list[12].main.temp
        day2Humidity = response.list[12].main.humidity
        day3Date = response.list[20].dt
        day3Icon = response.list[20].weather[0].icon
        day3Temperature = response.list[20].main.temp
        day3Humidity = response.list[20].main.humidity
        day4Date = response.list[28].dt
        day4Icon = response.list[28].weather[0].icon
        day4Temperature = response.list[28].main.temp
        day4Humidity = response.list[28].main.humidity
        day5Date = response.list[36].dt
        day5Icon = response.list[36].weather[0].icon
        day5Temperature = response.list[36].main.temp
        day5Humidity = response.list[36].main.humidity
        console.log(day1Icon)
        print5DayForecast();
    }
    )
}

function printTodayWeather(){
    let todayDate = $('<h2>').text(`${cityName}: ${currentDate.format("DD/MM/YYYY")}`);
    let todayIcon = $('<img>').attr("src", "http://openweathermap.org/img/w/"+currentIcon+".png");
    let todayTemp =$('<p>').text(`The current temperature is ${(currentTemperature-273.15).toFixed(2)} degrees celsius`);
    let todayHudmidity = $('<p>').text(`The current humidity is: ${currentHumidity}%`);
    let todayWind = $('<p>').text(`The current wind speed is: ${currentWind}mph`);
    todaySection.append(todayDate)
    todaySection.append(todayIcon)
    todaySection.append(todayTemp)
    todaySection.append(todayHudmidity)
    todaySection.append(todayWind)
}

function print5DayForecast(){
    let day1DateEl = $('<h2>').text(`${moment.unix(day1Date).format("DD/MM/YYYY")}`);
    let day1IconEl = $('<img>').attr("src", "http://openweathermap.org/img/w/"+day1Icon+".png");
    let day1TemperatureEl = $('<p>').text(`${(day1Temperature-273.15).toFixed(2)} degrees celsius`);
    let day1HumidityEl = $('<p>').text(`${day1Humidity}% humidity`);
    day1Section.append(day1DateEl)
    day1Section.append(day1IconEl)
    day1Section.append(day1TemperatureEl)
    day1Section.append(day1HumidityEl)
    let day2DateEl = $('<h2>').text(`${moment.unix(day2Date).format("DD/MM/YYYY")}`);
    let day2IconEl = $('<img>').attr("src", "http://openweathermap.org/img/w/"+day2Icon+".png");
    let day2TemperatureEl = $('<p>').text(`${(day2Temperature-273.15).toFixed(2)} degrees celsius`);
    let day2HumidityEl = $('<p>').text(`${day2Humidity}% humidity`);
    day2Section.append(day2DateEl)
    day2Section.append(day2IconEl)
    day2Section.append(day2TemperatureEl)
    day2Section.append(day2HumidityEl)
    let day3DateEl = $('<h2>').text(`${moment.unix(day3Date).format("DD/MM/YYYY")}`);
    let day3IconEl = $('<img>').attr("src", "http://openweathermap.org/img/w/"+day3Icon+".png");
    let day3TemperatureEl = $('<p>').text(`${(day3Temperature-273.15).toFixed(2)} degrees celsius`);
    let day3HumidityEl = $('<p>').text(`${day3Humidity}% humidity`);
    day3Section.append(day3DateEl)
    day3Section.append(day3IconEl)
    day3Section.append(day3TemperatureEl)
    day3Section.append(day3HumidityEl)
    let day4DateEl = $('<h2>').text(`${moment.unix(day4Date).format("DD/MM/YYYY")}`);
    let day4IconEl = $('<img>').attr("src", "http://openweathermap.org/img/w/"+day4Icon+".png");
    let day4TemperatureEl = $('<p>').text(`${(day4Temperature-273.15).toFixed(2)} degrees celsius`);
    let day4HumidityEl = $('<p>').text(`${day4Humidity}% humidity`);
    day4Section.append(day4DateEl)
    day4Section.append(day4IconEl)
    day4Section.append(day4TemperatureEl)
    day4Section.append(day4HumidityEl)
    let day5DateEl = $('<h2>').text(`${moment.unix(day5Date).format("DD/MM/YYYY")}`);
    let day5IconEl = $('<img>').attr("src", "http://openweathermap.org/img/w/"+day5Icon+".png");
    let day5TemperatureEl = $('<p>').text(`${(day5Temperature-273.15).toFixed(2)} degrees celsius`);
    let day5HumidityEl = $('<p>').text(`${day5Humidity}% humidity`);
    day5Section.append(day5DateEl)
    day5Section.append(day5IconEl)
    day5Section.append(day5TemperatureEl)
    day5Section.append(day5HumidityEl)

}

function createCityHistory() {
        localStorage.setItem("savedCities", JSON.stringify(savedCities))
        savedCities = JSON.parse(localStorage.getItem('savedCities')) ?? [];
        for (let i=0; i<savedCities.length; i++) {
            let  savedCity = savedCities[i];
            let savedCityButt = $('<button>');
            savedCityButt.text(`${savedCity}`);
            $('#history').append(savedCityButt)
        }
    }
function addCityHistory() {
    $('#history').html("")
    cityName = $("#search-input").val();
    for (let index = 0; index < savedCities.length; index++) {
        if (cityName === savedCities[index]){
            console.log(cityName)
            console.log(savedCities)
            createCityHistory();
            return;
        }
    }
    if (cityName === ""){
        return;
    }
    else {
        savedCities.push(cityName);
        localStorage.setItem("savedCities", JSON.stringify(savedCities))
    }
    createCityHistory()        
    }
    
createCityHistory()




$('#clear-history').on("click", function(){
    localStorage.clear()
     $('#history').html("")
})