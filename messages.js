var oldMessages;

$(document).ready(function() {
	console.log("Starting polling base server...");

	oldMessages = new Array();
	receiveMessage();
	setInterval(function(){ receiveMessage(); }, 5000);
});

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
