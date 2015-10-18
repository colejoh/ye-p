function returnNameAddress(passedPlaceID){
  var nameAddressArray = {};
	var request = {
	  placeId: passedPlaceID,
	};
	service = new google.maps.places.PlacesService(document.getElementById('main_wrapper'));
	service.getDetails(request, callback);

	function callback(place, status) {
	  if (status == google.maps.places.PlacesServiceStatus.OK) {
      nameAddressArray[0] = place.name;
      nameAddressArray[1] = place.formatted_address;
	  }
	}
  return nameAddressArray;
}

function formattedHTML(array) {
  var name = array[0];
  var address = array[1];

  var html = "<div id='result'><div class='name'>" + name + "</div><div class='address'>" + address + "</div></div>";

  return html;
}

function getResults() {
  var nameAndAddress = returnNameAddress(resultIDs[i]);
  var html = formattedHTML(nameAndAddress);
  var allResults = allResults + html;
  console.log(allResults);
}
