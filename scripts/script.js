function displayWeather () {
    var weatherObj = JSON.parse(this.responseText);
    var temperatureC = weatherObj.current_observation.temp_c;
    var temperatureF = weatherObj.current_observation.temp_f;
    var weather = weatherObj.current_observation.weather;
    var icon = weatherObj.current_observation.icon_url;
    var location = weatherObj.current_observation.display_location.full;
}
// Send XMLHttprequest to openweathermap.org to get local weather
function getWeather(urlReq) {
    var req = new XMLHttpRequest();
    req.addEventListener("load", displayWeather);
    req.open("GET", urlReq);
    req.send();
}
// Create url for weather request to openweathermap.org
function createUrl(lat , lon) {
    var weatherUrlReq = "https://api.wunderground.com/api/3a44c04655b86c91/conditions/q/" + lat + "," + lon + ".json";
    getWeather(weatherUrlReq);
}
// Get latitude and longitude from location object received from freegeoip 
function parseLocation () {
    var latitude = (JSON.parse(this.responseText).latitude);
    var longitude = (JSON.parse(this.responseText).longitude);
    createUrl(latitude, longitude);
}
// Send XMLHttprequest to freegeoip.net for user location
function getLocation() {
    var req = new XMLHttpRequest();
    req.addEventListener("load", parseLocation);
    req.open("GET", "https://freegeoip.net/json/");
    req.send();
}

getLocation();
