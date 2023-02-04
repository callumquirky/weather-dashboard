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


$('#search-button').on("click", function(){
    event.preventDefault();
    getCity()
})

function getCity(){
    let cityName = $("#search-input").val()
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
        day1Date = response.list[1].moment(dt).format("D/M/YYYY")
        day1Icon = response.list[1].weather.icon
        day1Temperature = response.list[1].main.temp
        day1Hudmity = response.list[1].main.humidity
        day2Date = response.list[2].moment(dt).format("D/M/YYYY")
        day2Icon = response.list[2].weather.icon
        day2Temperature = response.list[2].main.temp
        day2Hudmity = response.list[2].main.humidity
        day3Date = response.list[3].moment(dt).format("D/M/YYYY")
        day3Icon = response.list[3].weather.icon
        day3Temperature = response.list[3].main.temp
        day3Hudmity = response.list[3].main.humidity
        day4Date = response.list[4].moment(dt).format("D/M/YYYY")
        day4Icon = response.list[4].weather.icon
        day4Temperature = response.list[4].main.temp
        day4Hudmity = response.list[4].main.humidity
        day5Date = response.list[5].moment(dt).format("D/M/YYYY")
        day5Icon = response.list[5].weather.icon
        day5Temperature = response.list[5].main.temp
        day5Hudmity = response.list[5].main.humidity
    }
    )
}

