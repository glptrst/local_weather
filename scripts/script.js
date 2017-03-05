function makeButtonToggle(button, text1, text2) {
    button.firstChild.addEventListener("click", function(){
        if (button.firstChild.firstChild === text1)
        button.firstChild.replaceChild(text2, text1);
        else {
        button.firstChild.replaceChild(text1, text2);
        }
    });
}

function displayWeather () {
    var weatherObj = JSON.parse(this.responseText);
    var temperatureC = weatherObj.current_observation.temp_c;
    var temperatureF = weatherObj.current_observation.temp_f;
    var weather = weatherObj.current_observation.weather;
    var icon = weatherObj.current_observation.icon;
    var user_location = weatherObj.current_observation.display_location.full;

    //display icon
    var iconNode = document.getElementsByTagName("i")[0];
    iconNode.setAttribute("class", "wu wu-black wu-128 wu-" + icon); 

    //display weather
    var weatherDiv = document.getElementById("weather");
    var weatherText = document.createTextNode(weather);
    weatherDiv.appendChild(weatherText);
    //display temperature
    var tempDiv = document.getElementById("temperature");
    var tempTextC = document.createTextNode(temperatureC + " C");
    var tempTextF = document.createTextNode(temperatureF + " F");
    tempDiv.firstChild.appendChild(tempTextC);
    //display location
    var locationDiv = document.getElementById("location");
    var locationText = document.createTextNode(user_location);
    locationDiv.appendChild(locationText);

    //make temperature button toggle if clicked
    makeButtonToggle(tempDiv, tempTextC, tempTextF);
}

// Send XMLHttprequest to weather undergrond to get local weather
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
