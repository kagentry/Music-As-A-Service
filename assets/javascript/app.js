/////////GLOBAL VARIABLES
var artist = "";

////////FUNCTIONS

// grabs user input and populates APIs
function initiateSearch(name){

}

$(document).ready(function(){

	// get the artist name from input field
	$("#search").keypress(function(event){
		if (event.which == 13){
			artist = $("#search").val().trim();
		}
	});
	console.log("here: " + artist);

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