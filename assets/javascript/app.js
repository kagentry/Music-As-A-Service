/////////GLOBAL VARIABLES
var artist;

////////FUNCTIONS

// grabs user input and populates APIs
function initiateSearch(name){
	/////////// Bing images API
	var bingImageQueryURL = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + name + "&count=4";

	$.ajax({
		url: bingImageQueryURL,
		beforeSend: function(xhrObj) {
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "166b02c8a4104e9e81408caa48f34292");
		},
		type: "GET"
	})
	.done(function(response) {

		// print response to console
		console.log(response);
	})
	.fail(function(){
		alert("images error");
	});

	///////////// Spotify api
	var spotifyQueryURL = "https://api.spotify.com/v1/search?q=" + name + "&type=artist";
    $.ajax({
    	url: spotifyQueryURL,
    	method: "GET"
    }).done(function(response) {
    	// Printing the entire object to console
    	console.log(response);
    	// Printing the artist id from the Spotify object to console
  		var artistID = response.artists.items[0].id;

  		var player = "<iframe src='https://embed.spotify.com/?uri=spotify:artist:" + artistID + "' " + "width='300' height='380' frameborder='0' allowtransparency='true'></iframe>";

  		$("#spotify").html(player);
  	})
  	.fail(function(){
  		alert("spotify error");
  	});


	//////////////// youtube api
	var youtubeQueryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + name + "&order=viewCount&type=video&videoEmbeddable=true&maxResults=1&key=AIzaSyChG65wiTrhL58tBUZ3TwXsbPO4gDN8ppA";

	$.ajax({
		url: youtubeQueryURL,
		method: "GET"
	})
	.done(function(response){
		console.log(response);
	})
	.fail(function(){
		alert("youtube error");
	});

	///////////////// wiki api
	var wikiQueryURL = "https://en.wikipedia.org/w/api.php?action=query&&format=json"

	////////////// bing news api
	var bingNewsQueryURL = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=" + name + "&count=4";

	$.ajax({
		url: bingNewsQueryURL,
		beforeSend: function(xhrObj) {
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "166b02c8a4104e9e81408caa48f34292");
		},
		type: "GET"
	})
	.done(function(response){
		console.log(response);
	})
	.fail(function(){
		alert("news error");
	});

	// last fm api

	///////////// twitter api (check marvin messages)
	//<a class="twitter-timeline" href="https://twitter.com/BobMcGovernJr">Tweets by BobMcGovernJr</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

	// stubhub api

	// eventful api
}

$(document).ready(function(){

	// get the artist name from input field
	$("#search").keypress(function(event){
		if (event.which == 13){
			artist = $("#search").val().trim();

			initiateSearch(artist);
		}
	});
	

	$('.carousel').carousel();
	// Next slide
	$('.carousel').carousel('next');
	$('.carousel').carousel('next', 3); // Move next n times.
	// Previous slide
	$('.carousel').carousel('prev');
	$('.carousel').carousel('prev', 4); // Move prev n times.
	// Set to nth slide
	$('.carousel').carousel('set', 4);
});