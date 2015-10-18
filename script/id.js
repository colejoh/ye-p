function returnNameAddress(){

var id = 0;
var service = new google.maps.places.PlacesService(document.getElementById('result'));
var url = window.location.search.substring(1);

service.getDetails({
  placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
}, callback1);
function callback1(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({ position: place.geometry.location});
    }
  };
}


  console.log(status);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    id = place[0].place_id;
  }
  var request = {placeId: id};
  service = new google.maps.places.PlacesService(document.getElementById('poop'));
  service.getDetails(request, callback2);
  function callback2(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

    }
  }
}
