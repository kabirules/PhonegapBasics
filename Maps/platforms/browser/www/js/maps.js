var app = {
	init: function() {
		this.initFastClick();
	},
	
	initFastClick: function () {
		FastClick.attach(document.body);
	},
	
	devReady: function() {
		navigator.geolocation.getCurrentPosition(app.renderCoordsInMap, app.errorOnGeoReq);
	},
	
	renderCoordsInMap: function(position){
		var myMap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ29vdHlmZXIiLCJhIjoiY2l1MGlrb2M3MDAwMDJ6bXAxY3dlOXdkYiJ9.RBfUsuzHfLrofEyMR8IVlA', {
		  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		  maxZoom: 18
		}).addTo(myMap);
		
		app.renderMarker([position.coords.latitude, position.coords.longitude], 'Here I am!', myMap);
		
		myMap.on('click', function(myEvent){
		  var myText = 'Marker in l(' + myEvent.latlng.lat.toFixed(2) + ') and L(' + myEvent.latlng.lng.toFixed(2) + ')';
		  app.renderMarker(myEvent.latlng, myText, myMap);
		});
	},
	
	renderMarker: function(latlng, myText, map){
		var myMarker = L.marker(latlng).addTo(map);
		myMarker.bindPopup(myText).openPopup();
	},

	errorOnGeoReq: function(error) {
		console.log(error.code + ': ' + error.message);
	}
	
};

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		app.init();
	}, false);
	document.addEventListener('deviceready', function() {
		app.devReady();
	}, false);
}