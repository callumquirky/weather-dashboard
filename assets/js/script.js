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


$('#search-button').on("click", function(event){
    event.preventDefault();
    $('#today').html("")
    day1Section.html("")
    day2Section.html("")
    day3Section.html("")
    day4Section.html("")
    day5Section.html("")
    getCity($("#search-input").val())
    addCityHistory();
})

function getCity(givenCity){
    cityName = givenCity
    let queryURL = "https://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=10&appid="+apiKey
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
        let index12PM = response.list.findIndex(item => item.dt_txt.substring(8) === (`${moment().add(1, 'days').format("DD")} 12:00:00`))
        day1Date = response.list[index12PM].dt
        day1Icon = response.list[index12PM].weather[0].icon
        day1Temperature = response.list[index12PM].main.temp
        day1Humidity = response.list[index12PM].main.humidity
        day2Date = response.list[index12PM+8].dt
        day2Icon = response.list[index12PM+8].weather[0].icon
        day2Temperature = response.list[index12PM+8].main.temp
        day2Humidity = response.list[index12PM+8].main.humidity
        day3Date = response.list[index12PM+16].dt
        day3Icon = response.list[index12PM+16].weather[0].icon
        day3Temperature = response.list[index12PM+16].main.temp
        day3Humidity = response.list[index12PM+16].main.humidity
        day4Date = response.list[index12PM+24].dt
        day4Icon = response.list[index12PM+24].weather[0].icon
        day4Temperature = response.list[index12PM+24].main.temp
        day4Humidity = response.list[index12PM+24].main.humidity
        day5Date = response.list[index12PM+32].dt
        day5Icon = response.list[index12PM+32].weather[0].icon
        day5Temperature = response.list[index12PM+32].main.temp
        day5Humidity = response.list[index12PM+32].main.humidity
        print5DayForecast();
    }
    )
}

function printTodayWeather(){
    let todayDate = $('<h2>').text(`${cityName}: ${currentDate.format("DD/MM/YYYY")}`);
    let todayIcon = $('<img>').attr("src", "https://openweathermap.org/img/w/"+currentIcon+".png");
    let todayTemp =$('<p>').text(`The current temperature is ${(currentTemperature-273.15).toFixed(2)}°C`);
    let todayHudmidity = $('<p>').text(`The current humidity is: ${currentHumidity}%`);
    let todayWind = $('<p>').text(`The current wind speed is: ${(currentWind*2.237).toFixed(2)}mph`);
    todaySection.append(todayDate)
    todaySection.append(todayIcon)
    todaySection.append(todayTemp)
    todaySection.append(todayHudmidity)
    todaySection.append(todayWind)
}

function print5DayForecast(){
    let day1DateEl = $('<h4>').text(`${moment.unix(day1Date).format("DD/MM/YYYY")} 12PM`);
    let day1IconEl = $('<img>').attr("src", "https://openweathermap.org/img/w/"+day1Icon+".png");
    let day1TemperatureEl = $('<p>').text(`${(day1Temperature-273.15).toFixed(2)}°C`);
    let day1HumidityEl = $('<p>').text(`${day1Humidity}% humidity`);
    day1Section.append(day1DateEl)
    day1Section.append(day1IconEl)
    day1Section.append(day1TemperatureEl)
    day1Section.append(day1HumidityEl)
    let day2DateEl = $('<h4>').text(`${moment.unix(day2Date).format("DD/MM/YYYY")} 12PM`);
    let day2IconEl = $('<img>').attr("src", "https://openweathermap.org/img/w/"+day2Icon+".png");
    let day2TemperatureEl = $('<p>').text(`${(day2Temperature-273.15).toFixed(2)}°C`);
    let day2HumidityEl = $('<p>').text(`${day2Humidity}% humidity`);
    day2Section.append(day2DateEl)
    day2Section.append(day2IconEl)
    day2Section.append(day2TemperatureEl)
    day2Section.append(day2HumidityEl)
    let day3DateEl = $('<h4>').text(`${moment.unix(day3Date).format("DD/MM/YYYY")} 12PM`);
    let day3IconEl = $('<img>').attr("src", "https://openweathermap.org/img/w/"+day3Icon+".png");
    let day3TemperatureEl = $('<p>').text(`${(day3Temperature-273.15).toFixed(2)}°C`);
    let day3HumidityEl = $('<p>').text(`${day3Humidity}% humidity`);
    day3Section.append(day3DateEl)
    day3Section.append(day3IconEl)
    day3Section.append(day3TemperatureEl)
    day3Section.append(day3HumidityEl)
    let day4DateEl = $('<h4>').text(`${moment.unix(day4Date).format("DD/MM/YYYY")} 12PM`);
    let day4IconEl = $('<img>').attr("src", "https://openweathermap.org/img/w/"+day4Icon+".png");
    let day4TemperatureEl = $('<p>').text(`${(day4Temperature-273.15).toFixed(2)}°C`);
    let day4HumidityEl = $('<p>').text(`${day4Humidity}% humidity`);
    day4Section.append(day4DateEl)
    day4Section.append(day4IconEl)
    day4Section.append(day4TemperatureEl)
    day4Section.append(day4HumidityEl)
    let day5DateEl = $('<h4>').text(`${moment.unix(day5Date).format("DD/MM/YYYY")} 12PM`);
    let day5IconEl = $('<img>').attr("src", "https://openweathermap.org/img/w/"+day5Icon+".png");
    let day5TemperatureEl = $('<p>').text(`${(day5Temperature-273.15).toFixed(2)}°C`);
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
            savedCityButt.text(`${savedCity}`).attr("class", "city-button");
            $('#history').append(savedCityButt)
        }
    }
function addCityHistory() {
    $('#history').html("")
    cityName = $("#search-input").val();
    for (let index = 0; index < savedCities.length; index++) {
        if (cityName === savedCities[index]){
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


$(document).on("click", ".city-button", function(event){
    event.preventDefault();
    $('#today').html("")
    day1Section.html("")
    day2Section.html("")
    day3Section.html("")
    day4Section.html("")
    day5Section.html("")
    getCity($(this).text())
})

$('#clear-history').on("click", function(){
    localStorage.clear()
     $('#history').html("")
})