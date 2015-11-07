var lastMessageSeqNo;
var lastMessageReceived;

$(document).ready(function() {
	lastMessageSeqNo = 0;
	lastMessageReceived = "";
	receiveMessages();
	setInterval(function(){ receiveMessages(); }, 2000);
});

function receiveMessages() {
	//console.log("Polling server...");
	getFromServer(messageUrl +"/" + lastMessageSeqNo, function(messages) {
		//console.log("Message received", messages.meldinger);
		$.each(messages.meldinger.reverse(), function(index, msg) {
			//console.log("Message received: ", msg);
			lastMessageSeqNo = msg.sekvens;
			addMessageToLog(true, getRealName(msg.deltaker) +": " +msg.melding);
			lastMessageReceived = msg.tidspunktUtc;
			$('#lastMsgTimestamp').html(lastMessageReceived);
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

	$("#message").val("");
	//addMessageToLog(false, message);
	event.preventDefault();
});
