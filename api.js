//FB var messageServer;

// http://bouvet-code-camp.azurewebsites.net/swagger/ui/index.html#!/PifGame
//var teamId = "90d44d2a-44ef-4cbf-8f49-6e6a829e87d0";
var teamId = "175";
var serverUrl = "https://bbr2015.azurewebsites.net/api/";
var gameStateUrl = "GameStateFeed";
var codeUrl = serverUrl + "/api/game/pif/sendpostkode";
var positionUrl = serverUrl + "/api/game/pif/sendpifposisjon";
var messagesUrl = serverUrl + "/api/game/pif/hentmeldinger";

	// TESTING cross server
	getFromServer(serverUrl + gameStateUrl, function(messages) {
		//console.log("Message received...");
		//console.log("messages", messages);
		$.each(messages, function(index, message) {
			debug(message);
		});
	});

function postToServer(url, json) {
	//console.log("url", url);
	//console.log("json", json);
	//FB messageServer.push(json);
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(json),
		contentType: "application/json; charset=utf-8",
		crossDomain: true,
    	dataType: 'json',
      	/*error: function (request, status, error) {
      		console.log("post-request", request);
      		console.log("post-responseText", request.responseText);
      		console.log("post-status", status);
      		console.log("post-error", error);
      	}*/
	});
}
function getFromServer(url, success) {
	//console.log("url", url);
	$.ajax({
		type: "GET",
		url: url,
		beforeSend: function(xhr){xhr.setRequestHeader('LagKode', 'duppene_dupper_i_takt');xhr.setRequestHeader('DeltakerKode', '92017563');},
		crossDomain: true,
    	dataType: 'json',
    	//async: false,
    	success: success,
      	error: function (request, status, error) {
      		console.log("get-request", request);
      		console.log("get-responseText", request.responseText);
      		console.log("get-status", status);
      		console.log("get-error", error);
      	}
	});
}
function debug(message) {
	var oldDebug = $('#debug-messages').html();
	$('#debug-messages').html(message + "<br>" + oldDebug);
}


function error(error) {
	var element = document.querySelector('#status');
	element.innerHTML = typeof error == 'string' ? error : "failed";
	element.className = 'fail';

	switch(error.code) {
		case error.PERMISSION_DENIED:
				element.innerHTML = "User denied the request for Geolocation."
				break;
		case error.POSITION_UNAVAILABLE:
				element.innerHTML = "Location information is unavailable."
				break;
		case error.TIMEOUT:
				element.innerHTML = "The request to get user location timed out."
				break;
		case error.UNKNOWN_ERROR:
				element.innerHTML = "An unknown error occurred."
				break;
		}
}
