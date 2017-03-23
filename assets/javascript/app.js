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
		console.log("bingImages");
		console.log(response);

		for (var i = 0; i < 4; i++){
			var imageURL = response.value[i].contentUrl;
			console.log(imageURL);

			var link = $("<a>");
			link.attr({
				class: "carousel-item",
				href: "#"
			});
			var image = $("<img>");
			image.attr("src", imageURL);

			// append image to link
			link.append(image);

			$("#caro").append(link);

		}
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
    	console.log("spotify");
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
		console.log("Youtube");
		console.log(response);


		// console.log(response.items[0].id.videoId);
		var vidID = response.items[0].id.videoId;
		var video = "<iframe width='350' height='300' src='https://www.youtube.com/embed/" + vidID + "' frameborder='0' allowfullscreen></iframe>";

		$("#youtube").html(video);
	})
	.fail(function(){
		alert("youtube error");
	});

	///////////////// wiki api
	
	var wikiName = name;
	
	for (var i = 0; i < name.length; i++){
		if (name[i] == " "){
			wikiName = name.replace(" ", "%20");

		}
	}

	// var wikiQueryURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&origin=*&exintro=&explaintext=&srsearch=" + wikiName;
	var wikiQueryURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=&list=search&srsearch=" + wikiName;
	// /w/api.php?action=query&format=json&prop=&list=search&srsearch=meaning
	$.ajax({
		url: wikiQueryURL,
		method: "GET"
	})
	.done(function(response){
		console.log("wiki");
		console.log(response);
	})
	.fail(function(){
		alert("wiki error");
	});

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
		console.log("bingNews");
		console.log(response);

		$("#news").empty();

		for (var i = 0; i < 6; i++){
	
			var respUrl = response.value[i].url;
			var title = response.value[i].name;
			var desc = response.value[i].description;

			// create div for each news snippet
			var div = $("<div>").attr("id", "news-snippet");
			var link = $("<a>").attr("src", respUrl);
			var storyTitle = $("<span>").text(title);
			var summary = $("<span>").text(desc);

			// append everything together
			link.append(storyTitle);
			div.append(link);
			div.append(summary);
			$("#news").append(div);	
		}
		

	})
	.fail(function(){
		alert("news error");
	});

	// last fm api
	var lastQueryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + name + "&api_key=d1f31bdf4d87e4f3a91eed9746d1a34f&format=json";

	$.ajax({
		url: lastQueryURL,
		method: "GET"
	})
	.done(function(response){
		console.log("lastFm");
		console.log(response);

		$("#related-artist").empty();

		for (var i = 0; i < 6; i++){
			var artName = response.similarartists.artist[i].name;
			// var artImageArray = response.similarartists.artist[i].image[1];
			// var artPic = artImageArray;

			console.log(artName);
			// console.log(artPic);
			var div = $("<div>");
			var button = $("<button>").text(artName);

			// button.attr("onclick", initiateSearch(artName));

			div.append(button);
			$("#related-artist").append(div);
		}
	})
	.fail(function(){
		alert("last error");
	});

	///////////// twitter api (check marvin messages)
	// Write Twitter widget to the page
    console.log(artist + " Test");
    var twitterWidgetScript = "<a class=\"twitter-timeline\"  href=\"https://twitter.com/search?q=" + artist + " \" data-widget-id=\"843145804529451008\"></a>" +
            "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>"

    $("#twitter").html(twitterWidgetScript);



	// eventful api
    var eventfulQueryBase = "http://api.eventful.com/json/events/search?app_key=dPqxbz5KFccN8qgr&q=";
    var evenfulQueryURL = "";
    var eventfulResponse = "";
    var eventfulResults = "";
    var eventfulArray = [];
    var eventTitle = "";
    var eventVenueName = "";
    var eventTicketURL = "";
    var eventTicketLink = "";

    // Create the eventful query url
    eventfulQueryURL = eventfulQueryBase + artist;
    console.log(eventfulQueryURL);

    // Make eventful API call and pull back results
    $.ajax({
        url: eventfulQueryURL,
        method: "GET",
        dataType: "jsonp"
    })
    // Grab API response
    .done(function(eventfulResponse){
        eventfulResults = eventfulResponse.events.event;
        console.log(eventfulResults[0].title);
        // Cycle through top ten results and write them to the card on the page

        $("#events").empty();

        for (var i = 0; i < eventfulResults.length; i++) {
            eventTitle = eventfulResults[i].title;
            eventVenueName = eventfulResults[i].venue_name;
            eventTicketURL = eventfulResults[i].url;
            eventTicketLink = "<a href="+eventTicketURL+">Event Details</a>";
            $("#events").append(i + 1 +". Event: " + eventTitle + "<br> Venue: " + eventVenueName +"<br>" + eventTicketLink +"<hr><br>");
        }


    })
}


$(document).ready(function(){

	$("#results").hide();
	// get the artist name from input field
	$("#search").keypress(function(event){
		if (event.which == 13){
			artist = $("#search").val().trim();

			initiateSearch(artist);
			$("#welcomeScreen").hide();
			$("#results").show();
		}
	});
	$("#search1").keypress(function(event){
		if (event.which == 13){
			artist = $("#search1").val().trim();

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