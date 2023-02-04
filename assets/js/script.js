let cityLat = ""
let cityLon = ""

$('#search-button').on("click", function(){
    event.preventDefault();
    getCity()
})

function getCity(){
    let cityName = $("#search-input").val()
    console.log(cityName)
    let apiKey ="81181bda96c8c7fd7c78e47ac25b3020"
    let queryURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=10&appid="+apiKey
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response) {
        cityLat = response[0].lat
        cityLon = response[0].lon
    }
    )
}
