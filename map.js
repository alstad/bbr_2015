var map;
var marker;
var currentPosition;

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(initMap, error);
	navigator.geolocation.watchPosition(watchPosition, error, { enableHighAccuracy: true,timeout : 5000});
} else {
	error('not supported');
}

var icon = {
		url: 'markers/image.png',
		size: new google.maps.Size(32, 32),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(16, 7)
};
var shape = {
		coords: [18,0,18,1,18,2,18,3,18,4,18,5,19,8,19,9,19,10,19,11,19,12,19,13,19,14,19,15,19,16,19,17,17,18,17,19,24,20,26,21,28,22,29,23,29,24,29,25,29,26,29,27,29,28,28,29,26,30,24,31,7,31,5,30,3,29,2,28,2,27,2,26,2,25,2,24,2,23,3,22,5,21,7,20,14,19,14,18,12,17,12,16,12,15,12,14,12,13,12,12,12,11,12,10,12,9,12,8,13,5,13,4,13,3,13,2,13,1,13,0],
		type: 'poly'
};

$(document).ready(function() {
	receiveParticipantsPositions();
	setInterval(function(){ receiveParticipantsPositions(); }, 5000);
});

var participantsArray = [];
function receiveParticipantsPositions() {
	getFromServer(positionUrl, function(participants) {
		marker.setMap(null);
		for (var i = 0; i < participantsArray.length; i++ ) {
    		participantsArray[i].setMap(null);
  		}
  		participantsArray.length = 0;

		$.each(participants, function(id, participant) {
			var marker = new MarkerWithLabel({
			   position: {lat: participant.latitude, lng: participant.longitude},
		       map: map,
		       draggable: false,
       		   raiseOnDrag: false,
		       labelContent: getRealName(participant.deltakerId),
		       labelAnchor: new google.maps.Point(22, 0),
		       labelClass: "labels",
		       labelStyle: {'color': 'orange'}, // 'opacity': '1.0',
				icon: icon,
				shape: shape
		    });
			participantsArray.push(marker);
		});
	});
}

var markersArray = [];
function showPosts(posts) {
	//console.log(posts);
	if (posts && map) {
		for (var i = 0; i < markersArray.length; i++ ) {
    		markersArray[i].setMap(null);
  		}
  		markersArray.length = 0;

		$.each(posts, function(id, post) {
		 	var color = post.harRegistert == true ? "green" : "red";
		 	//var color = "red";
			var marker = new MarkerWithLabel({
			   position: {lat: post.latitude, lng: post.longitude},
		       map: map,
		       draggable: false,
       		   raiseOnDrag: false,
		       labelContent: post.poengVerdi,
		       labelAnchor: new google.maps.Point(22, 10),
		       labelClass: "labels",
		       labelStyle: {'color': color} // 'opacity': '1.0',
		    });
		  	markersArray.push(marker);
		});
	}
}

function watchPosition(position) {
	currentPosition = position;
	//var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	//marker.setPosition(latlng);

	var positionString = "position: " + position.coords.latitude + ", " + position.coords.longitude;
	debug(positionString);
	var json = getCurrentPositionAsJson(currentPosition);
	postToServer(positionUrl, json);
}

function getCurrentPositionAsJson(position) {
	if (typeof position != 'undefined') {
		currentPosition = position;
	}
	return {"latitude": currentPosition.coords.latitude, "longitude": currentPosition.coords.longitude};
}

//  Source: https://gist.github.com/anderser/332187
function StatkartMapType(name, layer) {
    this.layer = layer;
    this.name = name;
    this.alt = name;
    this.tileSize = new google.maps.Size(256,256);
    this.maxZoom = 19;
    this.getTile = function(coord, zoom, ownerDocument) {
        var div = ownerDocument.createElement('DIV');
        div.style.width = this.tileSize.width + 'px';
        div.style.height = this.tileSize.height + 'px';
        div.style.backgroundImage = "url(http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=" + this.layer + "&zoom=" + zoom + "&x=" + coord.x + "&y=" + coord.y + ")";
        return div;
    };
}

var STATKART_MAP_TYPE_ID = "topo2";

function initMap(position) {
	var s = document.querySelector('#status');

	if (s.className == 'success') {
		// not sure why we're hitting this twice in FF, I think it's to do with a cached result coming back
		return;
	}

	s.innerHTML = "found you!";
	s.className = 'success';

	var mapcanvas = document.createElement('div');
	mapcanvas.id = 'mapcanvas';
	mapcanvas.style.height = '400px';
	mapcanvas.style.width = '100%';
	mapcanvas.style.margin = '0 0 20px 0';

	document.querySelector('article').appendChild(mapcanvas);

	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var myOptions = {
		zoom: 15,
		center: latlng,
		mapTypeControl: false,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
	};
	map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
	map.mapTypes.set(STATKART_MAP_TYPE_ID, new StatkartMapType("Topografisk", STATKART_MAP_TYPE_ID));
	map.setMapTypeId(STATKART_MAP_TYPE_ID);

	marker = new google.maps.Marker({
			position: latlng,
			map: map,
			icon: icon,
			shape: shape,
			title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
	});
}
