var lastMessageSeqNo;
var lastMessageReceived;

$(document).ready(function() {
	console.log("Starting polling base server...");

	lastMessageSeqNo = 0;
	lastMessageReceived = "";
	receiveMessages();
	setInterval(function(){ receiveMessages(); }, 2000);
});

function receiveMessages() {
	console.log("Polling server...");
	getFromServer(messageUrl +"/" + lastMessageSeqNo, function(messages) {
		console.log("Message received", messages.meldinger);
		$.each(messages.meldinger.reverse(), function(index, msg) {
			console.log("Message received: ", msg);
			lastMessageSeqNo = msg.sekvens;
			addMessageToLog(true, getRealName(msg.deltaker) +": " +msg.melding);
			lastMessageReceived = msg.tidspunktUtc;
			$('#lastMsgTimestamp').html(lastMessageReceived);
		});
	});
}

function getRealName(deltakerId) {
	switch (deltakerId) {
		case "JAVA_3-1":
			return "Aina";
		case "JAVA_3-2":
			return "Scott";
		case "JAVA_3-3":
			return "Anders";
		case "JAVA_3-4":
			return "Atle";
		default:
			return deltakerId;
	}
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

	$("#message").val("");
	//addMessageToLog(false, message);
	event.preventDefault();
});
