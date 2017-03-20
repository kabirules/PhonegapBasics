var app={
	start: function() {
		this.initButtons();
		this.initFastClick();
		this.initHammer();
	},
	
	initFastClick: function () {
		FastClick.attach(document.body);
	},
	
	initButtons: function(){
		var lightButton = document.querySelector('#light');
		var darkButton = document.querySelector('#dark');
		
		lightButton.addEventListener('click', this.makeItLight, false);
		darkButton.addEventListener('click', this.makeItDark, false);		
	},
	
	initHammer: function() {
		var zone = document.getElementById('gestures-div');
		var hammertime = new Hammer(zone);
		
		hammertime.get('pinch').set({enable:true});
		hammertime.get('rotate').set({enable:true});
		
		zone.addEventListener('webkitAnimationEnd', function(e){
			zone.className='';
		});
		
		hammertime.on('doubletap', function(ev) {
			zone.className='doubletap';
		});
		
		hammertime.on('press', function(ev) {
			zone.className='press';
		});
		
		hammertime.on('swipe', function(ev) {
			var swipeClass = undefined;
			direction=ev.direction;
			
			if (direction==4) swipeClass='swipe-right';
			if (direction==2) swipeClass='swipe-left';
			
			zone.className = swipeClass;
		});
		
		hammertime.on('rotate', function(ev) {
			var threshold=25;
			if (ev.distance > threshold) zone.className = 'rotate';
		});		
	},
	
	makeItLight: function() {
		document.body.className = 'light';
	},
	
	makeItDark: function() {
		document.body.className = 'dark';
	}
};

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		app.start();
	}, false);
}
