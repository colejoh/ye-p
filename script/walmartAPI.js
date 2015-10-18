var apiKey = "vkxyfy6zmd4ddfg5ve6asw6a";
searchMart = function(item){
//var data = $.getJSON("http://api.walmartlabs.com/v1/search?apiKey=" + apiKey + "&query=" + item);
$.ajax({
  url:"http://api.walmartlabs.com/v1/search?apiKey=" + apiKey + "&query=" + item
}).done(function(response){
  // Anything within this function will be called AFTER the ajax call comes back
  console.log(getItems(response));
});
//console.log($.getJSON("http://api.walmartlabs.com/v1/search?apiKey=" + apiKey + "&query=" + item).responseJSON.start);
}
getIds = function(items){
  var IDs = [];
  for(i=0; i<items.length;i++) {
    results[i] = items[i].itemId;
  }
  return IDs;
}
getReviews = function(ID) {
  return($.getJSON("http://api.walmartlabs.com/v1/reviews/" + ID + "?apiKey=" + apiKey).reviews);
}
getReviewScores = function(Reviews) {
  var scores = [];
  for(i = 0; i<reviews.length;i++) {
    scores[i] = reviews[i].overallRating.rating;
  }
}
getReviewDates = function(Reviews) {
  var dates = [];
  for(i = 0; i<reviews.length;i++) {
    dates[i] = reviews[i].submissionTime;
  }
}

getItems = function(data){
  return(data.items);
}
