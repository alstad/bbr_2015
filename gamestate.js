$(document).ready(function() {
	console.log("Starting polling base server...");

	receiveGameState()
	setInterval(function(){ receiveGameState(); }, 5000);
});

var poster;
function receiveGameState() {
	getFromServer(serverUrl + gameStateUrl, function(messages) {
		console.log(messages);
		lagNavn = messages.lagNavn;
		poster = messages.poster;
		score = messages.score;
		vaapen = messages.vaapen;
		ranking = messages.ranking;
		lagFarge = messages.lagFarge;
		lagIkon = messages.lagIkon;
		lagId = messages.lagId;
		achievements = messages.achievements;

		showPosts();
		//setInterval(function(){ showPosts(); }, 5000);
	});
}

function getPosts() {
	return poster;
}
