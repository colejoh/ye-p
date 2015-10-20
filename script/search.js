var coordinates;
function search(cb) {
  service = new google.maps.places.PlacesService(document.getElementById('result_wrapper'));
  getLonLat();
  console.log(coordinates);
  var query = readGet();
  //console.log(query);
  var resultIDArray = {};

  service.nearbySearch({
    location: coordinates,
    radius: 5000,
    name: query
  }, callback1);

  function callback1(place, status) {
    console.log(place);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      //console.log(place[0].place_id);
      for (i = 0; i < place.length; i++) {
        resultIDArray[i] = place[i].place_id;
        //if(i >= 10) break label;
      }
    }
  cb(resultIDArray);
  // return resultIDArray;
}

function readGet() {
  var url = window.location.search.substring(1);
  var n = url.substring(2, url.indexOf("&type"));
  for(i = 0; i < n.length; i++) {
    if(n.charAt(i) == '+') {
      n = n.substring(0,i) + " " + n.substring(i+1, n.length);
    }
  }
  return n;
}

function getLonLat() {
  $.ajax({
    dataType: 'jsonp',
    url:"http://www.telize.com/geoip?callback=?"
  }).done(function(json) {
    var latitude = Number(json.latitude);
    var longitude = Number(json.longitude);
    coordinates = {lat: latitude, lng: longitude};
    console.log(coordinates);
  });
};
}
