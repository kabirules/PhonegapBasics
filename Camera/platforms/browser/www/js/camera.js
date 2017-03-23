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
		var img = document.createElement('img');
		img.onload = function() {
			app.renderPic(img);
		}
		img.src = imageURI;
	},
	
	renderPic: function(img) {
		var canvas = document.querySelector('#foto');
		var context = canvas.getContext('2d');
		canvas.width = img.width;
		canvas.height = img.height;
		context.drawImage(img, 0, 0, img.width, img.height);
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
