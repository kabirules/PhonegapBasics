var app = {
	init: function () {
		this.initFastClick();
		this.initButton();
	},
	
	initFastClick: function () {
		FastClick.attach(document.body);
	},
	
	initButton: function() {
		var buttonAction = document.querySelector('#button-action');
		buttonAction.addEventListener('click', this.takePic)
	},
	
	takePic: function() {
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,
			targetWidth: 300,
			targetHeight: 300,
			correctOrientation: true
		};
		navigator.camera.getPicture(app.picTaken, app.takingPicError, options);
	},
	
	picTaken: function(imageURI) {
		var image = document.querySelector('#foto');
		image.src = imageURI;
	},
	
	takingPicError: function(message) {
		console.log('Error: ' + message);
	}
};
	
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function () {
		app.init();
	}, false);
};
