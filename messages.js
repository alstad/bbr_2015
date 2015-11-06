var lastMessageSeqNo;
var lastMessageReceived;

$(document).ready(function() {
	//FB console.log("Starting polling Firebase");
	//FB messageServer = new Firebase('https://popping-inferno-8097.firebaseio.com/');
	//FB messageServer.set('sending data');
	//FB messageServer.push({name: 'aina', text: 'sending something'});
	//FB messageServer.push({name: name, text: text});
	//FB messageServer.push({name: 'aina', text: 'sending something more...'});

	// added, changed, removed, moved
	//FB messageServer.limit(10).on('child_added', receiveMessage);
	console.log("Starting polling base server...");


	lastMessageSeqNo = 0;
	lastMessageReceived = "";
	receiveMessages();
	setInterval(function(){ receiveMessages(); }, 3000);
});

/*FB function receiveMessage(snapshot) {
 var message = snapshot.val();
 if (message.sender == 'basestation') {
 console.log("message", message);
 addMessageToLog(true, message.value);
 }
 }*/
function receiveMessages() {
	console.log("Polling server...");
	getFromServer(messageUrl +"/" + lastMessageSeqNo, function(messages) {
		console.log("Message received", messages.meldinger);
		$.each(messages.meldinger.reverse(), function(index, msg) {
			console.log("Message received: ", msg);
			lastMessageSeqNo = msg.sekvens;
			addMessageToLog(true, msg.deltaker +": " +msg.melding);
			lastMessageReceived = msg.tidspunktUtc;
		});
	});
}

function addMessageToLog(incoming, message) {
	var append;
	if (incoming) {
		$('.last-message').removeClass('last-message');
		append = "<div class='last-message'>&gt; " + message + "</div>";
	} else {
		append = "<div>&lt; " + message + "</div>";
	}
	var messageLog = $('#message-log').html();
	$('#message-log').html(append + messageLog);
}
$("#messageform").submit(function(event) {
	var message = $("#message").val();
	debug(message + ": " + message);
	var json = {"tekst":message};
	postToServer(messageUrl, json);

	$("#messagetext").val("");
	addMessageToLog(false, message);
	event.preventDefault();
});
