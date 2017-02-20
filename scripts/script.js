function getLocation() {
    var req = new XMLHttpRequest();
    req.addEventListener("load", function(){
	console.log(JSON.parse(req.responseText));
    });
    req.open("GET", "https://freegeoip.net/json/");
    req.send();
}

getLocation();
