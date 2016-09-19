// var icons = {
//   "clear": "",
//   ""
// }


var measurement = "celsius";

// Change the temperature measurement.
function changeMeasurement() {
  var id = event.target.id;

  if (id != measurement) {
    document.getElementById(measurement).classList.add('fade');
    document.getElementById(id).classList.remove('fade');
    measurement = id;
    console.log(measurement);

  //!!!!! Need to update the value of temp when measurmennt change button is clicked !!!!!
    // if (id == "celsius") {
    //
    // } else {
    //   temp.innerHTML =
    // }

  }



}

// function updateBackground(lat, lon, temp) {
//
//   var latLng = new google.maps.LatLng(lat, lon);
//
//   var mapOptions = {
//     zoom: 16,
//     streetViewControl: false,
//     scaleControl, false,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   }
//
// }


function geoFindMe() {
  var city = document.getElementById('city');
  var temp = document.getElementById('temp');

  if (!navigator.geolocation) {
    output.innerHTML = "<span>Geolocation is not suported by your browser</span>";
  }

  function success(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    // output.innerHTML = "<span>Latitude: " + latitude + "<br>Longitude: " + longitude + "</span>";

    var xhr = new XMLHttpRequest();
    // add ap id key
    xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + lat +"&lon=" + lon + "&appid=60f313ed8c7e359e0d54e58439156474", true);
    xhr.onload = function() {
      var jsonData = JSON.parse(xhr.response);
      city.innerHTML = jsonData.name;
      if (measurement == "celsius") {
        temp.innerHTML = Math.floor(jsonData.main.temp - 273.15) + "&#176;C";
      } else {
        temp.innerHTML = Math.floor(jsonData.main.temp * (9 / 5) - 459.67) + "&#176;C";
      }

      // updateBackground(lat, lon, jsonData.main.temp);

    }
    xhr.send();



  };

  function error() {
    output.innerHTML = "Unable to locate";
  }

  navigator.geolocation.getCurrentPosition(success, error);

}
