var oldMessages;

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


	oldMessages = new Array();
	receiveMessage();
	setInterval(function(){ receiveMessage(); }, 5000);
});

/*FB function receiveMessage(snapshot) {
	var message = snapshot.val();
	if (message.sender == 'basestation') {
		console.log("message", message);
		addMessageToLog(true, message.value);
	}
}*/
function receiveMessage() {
	//console.log("Polling server...");
	/*getFromServer(messagesUrl + "/" + teamId, function(messages) {
		//console.log("Message received...");
		//console.log("messages", messages);
		$.each(messages, function(index, message) {
			if ($.inArray(message.tid, oldMessages) < 0) {
				console.log("New message received!");
				console.log("message", message);
				// 'Ingen' or 'Fritekst' or 'Lengde' or 'Himmelretning' or 'Stopp'
				switch (message.type) {
					case 'Lengde':
					case 2:
						addMessageToLog(true, "Lengde: " + message.tekst);
						break;
					case 'Himmelretning':
					case 3:
						addMessageToLog(true, "Himmelretning: " + message.tekst);
						break;
					case 'Stopp':
					case 4:
						addMessageToLog(true, "Stopp! " + message.tekst);
						break;
					case 'Ingen':
					case 'Fritekst':
					case 0:
					case 1:
					default:
						addMessageToLog(true, message.tekst);
						break;
				}
				oldMessages[oldMessages.length] = message.tid;
			//} else {
			//	console.log("No new message received");
			}
		});
	});*/
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
	var post = $("#post").val();
	var code = $("#code").val();
	debug(post + ": " + code);
	var json = {"Kode": code, "Postnummer": post, "LagId": teamId, "Koordinat": getCurrentPositionAsJson()};
	postToServer(codeUrl, json);

	$("#messagetext").val("");
	addMessageToLog(false, post + ": " + code);
	event.preventDefault();
});
