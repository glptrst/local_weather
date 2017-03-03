//TODO
//find some better icons!!!

function displayWeather () {
    var weatherObj = JSON.parse(this.responseText);
    var temperatureC = weatherObj.current_observation.temp_c;
    var temperatureF = weatherObj.current_observation.temp_f;
    var weather = weatherObj.current_observation.weather;
    var icon = weatherObj.current_observation.icon_url;
    var location = weatherObj.current_observation.display_location.full;

    //show icon
    var iconImgTag = document.getElementById("weatherImg");
    iconImgTag.setAttribute("src", icon);
    //show weather
    var weatherDiv = document.getElementById("weather");
    var weatherText = document.createTextNode(weather);
    weatherDiv.appendChild(weatherText);
    //show temperature
    var tempDiv = document.getElementById("temperature");
    var tempTextC = document.createTextNode(temperatureC + " C");
    var tempTextF = document.createTextNode(temperatureF + " F");
    tempDiv.firstChild.appendChild(tempTextC);
    //show location
    var locationDiv = document.getElementById("location");
    var locationText = document.createTextNode(location);
    locationDiv.appendChild(locationText);

    //toggle temperature if clicked
    tempDiv.firstChild.addEventListener("click", function(){
        if (tempDiv.firstChild.firstChild === tempTextC)
        tempDiv.firstChild.replaceChild(tempTextF, tempTextC);
        else {
        tempDiv.firstChild.replaceChild(tempTextC, tempTextF);
        }
    });
}

// Send XMLHttprequest to openweathermap.org to get local weather
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
