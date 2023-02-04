let cityLat = ""
let cityLon = ""
let apiKey ="81181bda96c8c7fd7c78e47ac25b3020"
let currentDate = ""
let currentIcon = ""
let currentTemperature = ""
let currentHumdity = ""
let currentWind =""

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
        cityLat= response[0].lat;
        cityLon= response[0].lon;
        currentWeather();
    }
    )
}

function currentWeather(){
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?lat="+cityLat+"&lon="+cityLon+"&appid="+apiKey
    console.log(cityLat)
    console.log(cityLon)
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response) {
        console.log(response)
        currentDate = moment()
        currentIcon = response.weather[0].icon
        currentTemperature = response.main.temp
        currentHumdity = response.main.humidity
        currentWind = response.wind.speed
    }
    )
}