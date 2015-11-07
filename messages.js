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
			if (msg.deltaker.slice(0, "JAVA_3".length) == "JAVA_3") {
				var server = false;
			} else {
				var server = true;
			}
			addMessageToLog(true, getRealName(msg.deltaker) +": " +msg.melding, msg.deltaker, server);
			lastMessageReceived = msg.tidspunktUtc;
			$('#lastMsgTimestamp').html(lastMessageReceived);
		});
	});
}

function addMessageToLog(incoming, message, className, server) {
	var append;
	if (incoming) {
		$('.last-message').removeClass('last-message');
		append = "<div class='last-message " + className + "'>&gt; " + message + "</div>";
	} else {
		append = "<div class='" + className + "'>&lt; " + message + "</div>";
	}

	if (!server) {
		var log = '#message-log';
	} else {
		var log = '#server-log';
	}
	var messageLog = $(log).html();
	$(log).html(append + messageLog);
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
