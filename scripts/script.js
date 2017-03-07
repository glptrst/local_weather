function displayWeather () {
    var weatherObj = JSON.parse(this.responseText);
    var temperatureC = weatherObj.current_observation.temp_c;
    var temperatureF = weatherObj.current_observation.temp_f;
    var weather = weatherObj.current_observation.weather;
    var icon = weatherObj.current_observation.icon;
    var user_location = weatherObj.current_observation.display_location.full;

    //display icon
    //https://github.com/manifestinteractive/weather-underground-icons
    var iconNode = document.getElementsByTagName("i")[0];
    iconNode.setAttribute("class", "wu wu-white wu-256 wu-" + icon); 

    //display weather
    var weatherDiv = document.getElementById("weather");
    var weatherText = document.createTextNode(weather);
    weatherDiv.appendChild(weatherText);
    //display temperature
    var celsius = document.createElement("span");
    celsius.innerHTML = temperatureC.toString() + "&#x2103;"; 
    var fahrenheit = document.createElement("span");
    fahrenheit.innerHTML = temperatureF.toString() + "&#x2109;"; 
    var temp_text = document.getElementById("temp_text");
    temp_text.appendChild(celsius);
    //make temperature toggle between celsius and fahrenheit
    celsius.addEventListener("click", function(){
        temp_text.replaceChild(fahrenheit, celsius);
    });
    fahrenheit.addEventListener("click", function(){
        temp_text.replaceChild(celsius, fahrenheit);
    });

    //display location
    var locationDiv = document.getElementById("location");
    var locationText = document.createTextNode(user_location);
    locationDiv.appendChild(locationText);
}

// Send XMLHttprequest to weather underground to get local weather
function getWeather() {
    var lat = (JSON.parse(this.responseText).latitude);
    var lon = (JSON.parse(this.responseText).longitude);
    var weatherUrlReq = "https://api.wunderground.com/api/3a44c04655b86c91/conditions/q/" + lat + "," + lon + ".json";

    var req = new XMLHttpRequest();
    req.addEventListener("load", displayWeather);
    req.open("GET", weatherUrlReq);
    req.send();
}

// Send XMLHttprequest to freegeoip.net for user location
function getLocation() {
    var req = new XMLHttpRequest();
    req.addEventListener("load", getWeather);
    req.open("GET", "https://freegeoip.net/json/");
    req.send();
}

getLocation();
