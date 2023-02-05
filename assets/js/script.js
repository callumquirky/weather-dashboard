let cityLat = ""
let cityLon = ""
let apiKey ="81181bda96c8c7fd7c78e47ac25b3020"
let currentDate = ""
let currentIcon = ""
let currentTemperature = ""
let currentHumdity = ""
let currentWind =""
let day1Date = ""
let day1Icon = ""
let day1Temperature = ""
let day1Hudmity = ""
let day2Date = ""
let day2Icon = ""
let day2Temperature = ""
let day2Hudmity = ""
let day3Date = ""
let day3Icon = ""
let day3Temperature = ""
let day3Hudmity = ""
let day4Date = ""
let day4Icon = ""
let day4Temperature = ""
let day4Hudmity = ""
let day5Date = ""
let day5Icon = ""
let day5Temperature = ""
let day5Hudmity = ""
let todaySection = $('#today')
let cityName =""


$('#search-button').on("click", function(){
    event.preventDefault();
    getCity()
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
        currentHumdity = response.main.humidity
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
        day1Icon = response.list[4].weather.icon
        day1Temperature = response.list[4].main.temp
        day1Hudmity = response.list[4].main.humidity
        day2Date = response.list[12].dt
        day2Icon = response.list[12].weather.icon
        day2Temperature = response.list[12].main.temp
        day2Hudmity = response.list[12].main.humidity
        day3Date = response.list[20].dt
        day3Icon = response.list[20].weather.icon
        day3Temperature = response.list[20].main.temp
        day3Hudmity = response.list[20].main.humidity
        day4Date = response.list[28].dt
        day4Icon = response.list[28].weather.icon
        day4Temperature = response.list[28].main.temp
        day4Hudmity = response.list[28].main.humidity
        day5Date = response.list[36].dt
        day5Icon = response.list[36].weather.icon
        day5Temperature = response.list[36].main.temp
        day5Hudmity = response.list[36].main.humidity
    }
    )
}

function printTodayWeather(){
    let todayDate = $('<h2>').text(`${cityName}: ${currentDate.format("DD/MM/YYYY")}`);
    let todayIcon = $('<img>').attr("src", "http://openweathermap.org/img/w/"+currentIcon+".png");
    let todayTemp =$('<p>').text(`The current temperature is ${(currentTemperature-273.15).toFixed(2)} degrees celsius`);
    let todayHudmidity = $('<p>').text(`The current humidity is: ${currentHumdity}%`);
    let todayWind = $('<p>').text(`The current wind speed is: ${currentWind}mph`);
    todaySection.append(todayDate)
    todaySection.append(todayIcon)
    todaySection.append(todayTemp)
    todaySection.append(todayHudmidity)
    todaySection.append(todayWind)
}
