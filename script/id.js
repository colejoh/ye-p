var nameAddressArray;
var html;
function returnNameAddress(passedPlaceID){
  nameAddressArray = [];
	var request = {
	  placeId: passedPlaceID,
	};
	service = new google.maps.places.PlacesService(document.getElementById('main_wrapper'));
	service.getDetails(request, callback);

	function callback(place, status) {
	  if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(place.formatted_address);
      nameAddressArray[0] = place.name;
      console.log(place.name);
      nameAddressArray[1] = place.formatted_address;
      console.log(nameAddressArray);
<<<<<<< HEAD
      html = html + "<div class='container'><div class='row'><div class='name'>" + nameAddressArray[0] + "</div><div class='address'>" + nameAddressArray[1] + "</div></div></div><hr class='breaks'/>";
=======
      html = html + "<a href='../info/index.html?q=" + passedPlaceID + "'><div id='result'><div class='name'>" + nameAddressArray[0] + "</div><div class='address'>" + nameAddressArray[1] + "</div></div></a>";
>>>>>>> 0ed60e364dd720b8371d01ec76f09e36c7bcbe6f
      $("#main_wrapper").html(html.substring(9));
	  }
	}
}

function formattedHTML(array) {
  var name = array[0];
  var address = array[1];
  var html = "<div class='container'><div class='row'><div class='name'>" + name + "</div><div class='address'>" + address + "</div></div></div><hr class='break'/>";
  return html;
}

function getHtml(){
  console.log(html);
  return(html);
}