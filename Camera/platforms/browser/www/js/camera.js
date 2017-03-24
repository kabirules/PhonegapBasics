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
		buttonAction.addEventListener('click', this.takePic);
		
		var filterButtons = document.querySelectorAll('.button-filter');
		filterButtons[0].addEventListener('click', function(){
		  app.applyFilter('gray');
		});
		filterButtons[1].addEventListener('click', function(){
		  app.applyFilter('negative');
		});
		filterButtons[2].addEventListener('click', function(){
		  app.applyFilter('sepia');
		});
		
		var buttonGallery = document.querySelector('#button-gallery');
		buttonGallery.addEventListener('click', function(){
		  app.takePic(Camera.PictureSourceType.PHOTOLIBRARY);
		});		
	},
	
	
	
	takePic: function(pictureSourceType){
		var options = {
		  quality: 90,
		  sourceType: pictureSourceType,
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
	},
	
  applyFilter: function(filterName) {
    var canvas = document.querySelector('#foto');
    var context = canvas.getContext('2d');
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    effects[filterName](imageData.data);

    context.putImageData(imageData, 0, 0);
  }	
	
	
};
	
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function () {
		app.init();
	}, false);
};
