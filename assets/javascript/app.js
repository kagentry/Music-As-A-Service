/////////GLOBAL VARIABLES
var artist;

var searchHist1 = "";
var searchHist2 = "";
var searchHist3 = "";

////////FUNCTIONS

// grabs user input and populates APIs
function initiateSearch(name){
	/////////// Bing images API
	var bingImageQueryURL = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + name + "&count=4";

	$.ajax({
		url: bingImageQueryURL,
		beforeSend: function(xhrObj) {
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "20e91dd376f847f680251814bac91e83");
		},
		type: "GET"
	})
	.done(function(response) {

		// print response to console
		// console.log("bingImages");
		// console.log(response);

		$("#caro").empty();

		for (var i = 0; i < 4; i++){
			var imageURL = response.value[i].contentUrl;

			var img = $("<img>").attr({
				src: imageURL,
				height: "200",
				weight: "200"
			});

			$("#caro").append(img);
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
    	// console.log("spotify");
    	// console.log(response);
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
		// console.log("Youtube");
		// console.log(response);


		// console.log(response.items[0].id.videoId);
		var vidID = response.items[0].id.videoId;
		var video = "<iframe width='350' height='300' src='https://www.youtube.com/embed/" + vidID + "' frameborder='0' allowfullscreen></iframe>";

		$("#youtube").html(video);
	})
	.fail(function(){
		alert("youtube error");
	});

	////////////// bing news api
	var bingNewsQueryURL = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=" + name + "&count=4";

	$.ajax({
		url: bingNewsQueryURL,
		beforeSend: function(xhrObj) {
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "20e91dd376f847f680251814bac91e83");
		},
		type: "GET"
	})
	.done(function(response){
		// console.log("bingNews");
		// console.log(response);

		$("#news").empty();

		for (var i = 0; i < 6; i++){
	
			var respUrl = response.value[i].url;
			var title = response.value[i].name;
			var desc = response.value[i].description;

			// create div for each news snippet
			var div = $("<div>").attr("id", "news-snippet");
			var link = $("<a>").attr("src", respUrl);
			var storyTitle = $("<span>").html(title + "<br>");
			var summary = $("<span>").html(desc + "<hr>");

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

	////////////// last fm api (artist bio)
	var lastQueryURL1 = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + name + "&api_key=d1f31bdf4d87e4f3a91eed9746d1a34f&format=json";

	$.ajax({
		url: lastQueryURL1,
		method: "GET"
	})
	.done(function(response){
		// console.log("lastfm1");
		// console.log(response);

		var summary = response.artist.bio.summary;

		$("#wikipedia").html(summary);

	})

	///////////// last fm api (similar artists)
	var lastQueryURL2 = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + name + "&api_key=d1f31bdf4d87e4f3a91eed9746d1a34f&format=json";

	$.ajax({
		url: lastQueryURL2,
		method: "GET"
	})
	.done(function(response){
		// console.log("lastFm2");
		// console.log(response);

		$("#related-artist").empty();

		for (var i = 0; i < 6; i++){
			var artName = response.similarartists.artist[i].name;
			var artImageArray = response.similarartists.artist[i].image[1];
			var artPic = artImageArray;

			// console.log("object keys");
			// console.log(Object.values(artPic));
			var imageURL = Object.values(artPic);
			var url = imageURL[0];
			// console.log(url);

			 // Object.keys(artPic).forEach(function(pic) {
			 // 	console.log(artPic[pic].#text);
			 // });

			// console.log(artName);
			// console.log(artPic);
			var div = $("<div>");
			var pic = $("<img>").attr("src", url);
			var span = $("<span>").html(artName + "<hr>");

			// button.attr("onclick", initiateSearch(artName));

			div.append(pic);
			div.append(span);
			$("#related-artist").append(div);
		}
	})
	.fail(function(){
		alert("last error");
	});

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
    // console.log(eventfulQueryURL);

    // Make eventful API call and pull back results
    $.ajax({
        url: eventfulQueryURL,
        method: "GET",
        dataType: "jsonp"
    })
    // Grab API response
    .done(function(eventfulResponse){
        eventfulResults = eventfulResponse.events.event;
        // console.log(eventfulResults[0].title);
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

function histButton(num, name) {
	// initiateSearch(name);
	if (num == 2){
		$("#button1").text(searchHist1);
		$("#button1").show();
	}
	else if (num == 3){
		searchHist2 = searchHist1;
		$("#button2").text(searchHist2);
		searchHist1 = name;
		$("#button1").text(searchHist1);
		$("#button2").show();
	}
	else if (num > 3){
		searchHist3 = searchHist2;
		searchHist2 = searchHist1;
		$("#button2").text(searchHist3);
		searchHist1 = name;
		$("#button1").text(searchHist2);
	}

}


// $(document).on("value", )
$(document).ready(function(){

	var searchNum = 0;
	

	$("#results").hide();
	$("#footer").hide();
	$("#button1").hide();
	$("#button2").hide();
	// get the artist name from input field
	$("#search").keypress(function(event){
		if (event.which == 13){
			artist = $("#search").val().trim();

			$("#artist-name").text(artist);
			searchHist1 = artist;

			searchNum++;
			initiateSearch(artist);
			$("#welcomeScreen").hide();
			$("#results").show();
			$("#footer").show();
		}
	});
	$("#search1").keypress(function(event){
		if (event.which == 13){
			artist = $("#search1").val().trim();
			$("#artist-name").text(artist);
			searchNum++;
			
			histButton(searchNum, artist);
			initiateSearch(artist);
		}
	});

	$("#button1").on("click", function(){
		var name = $("#button1").text()
		initiateSearch(name);
	});
});