var app = {
	init: function() {
		this.initFastClick();
	},
	
	initFastClick: function () {
		FastClick.attach(document.body);
	},
	
	devReady: function() {
		navigator.geolocation.getCurrentPosition(app.renderCoords, app.errorOnGeoReq);
	},
	
	renderCoords: function(position){
		var coordsDiv = document.querySelector('#coords');
		coordsDiv.innerHTML = 'Lat: ' + position.coords.latitude + '<br/> Long: ' + position.coords.longitude;
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