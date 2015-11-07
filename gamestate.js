$(document).ready(function() {
	receiveGameState();
	setInterval(function(){ receiveGameState(); }, 3000);
});

var poster;
var score;
function receiveGameState() {
	getFromServer(gameStateUrl, function(messages) {
		//console.log(messages);

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
		showWeapons(vaapen);
		//setInterval(function(){ showPosts(); }, 5000);
		$('#poengsum').html(score);
		$('#ranking').html(ranking.rank);
	});
}

function getPosts() {
	return poster;
}
