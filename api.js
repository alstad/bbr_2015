var teamId = "duppene_dupper_i_takt";
var serverUrl = "https://bbr2015.azurewebsites.net/api/";
var gameStateUrl = "GameStateFeed";
var messageUrl = serverUrl + "Meldinger";
var registerPostUrl = serverUrl + "GameService/RegistrerNyPost"
var positionUrl = serverUrl + "/api/game/pif/sendpifposisjon";

function postToServer(url, json) {
	//console.log("url", url);
	//console.log("json", json);
	$.ajax({
		type: "POST",
		url: url,
		beforeSend: function(xhr){xhr.setRequestHeader('LagKode', teamId);xhr.setRequestHeader('DeltakerKode', currentUser());},
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
		beforeSend: function(xhr){xhr.setRequestHeader('LagKode', teamId);xhr.setRequestHeader('DeltakerKode', currentUser());},
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

function currentUser()
{
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
	{
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == "tlf")
		{
			return sParameterName[1];
		}
	}
}

function debug(message) {
	var oldDebug = $('#debug-messages').html();
	$('#debug-messages').html(message + "<br>" + oldDebug);
	console.log(message);
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


