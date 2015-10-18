var apiKey = "vkxyfy6zmd4ddfg5ve6asw6a";
searchMart = function(item){
  var search = $.getJSON("http://api.walmartlabs.com/v1/search?apiKey=" + apiKey + "&query=" + item);
  return(search.items);
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
