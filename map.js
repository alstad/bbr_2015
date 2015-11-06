var marker;
var currentPosition;


if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(getCurrentPosition, error);
	navigator.geolocation.watchPosition(watchPosition, error);
} else {
	error('not supported');
}

function watchPosition(position) {
	currentPosition = position;
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	marker.setPosition(latlng);

	var positionString = "position: " + position.coords.latitude + ", " + position.coords.longitude;
	debug(positionString);
	var json = {"Posisjon": getCurrentPositionAsJson(currentPosition), "LagId": teamId};
	//FB var json = {sender: 'mobile', type: 'coordinates', value: position.coords.latitude + ", " + position.coords.longitude};
	//postToServer(positionUrl, json);
}

function getCurrentPositionAsJson(position) {
	if (typeof position != 'undefined') {
		currentPosition = position;
	}
	return {"Longitude": currentPosition.coords.longitude, "Latitude": currentPosition.coords.latitude, "X": 0, "Y": 0};
}

function getCurrentPosition(position) {
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
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

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

	marker = new google.maps.Marker({
			position: latlng,
			map: map,
			icon: icon,
			shape: shape,
			title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
	});
}
