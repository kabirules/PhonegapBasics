var app={
	start: function() {
		var lightButton = document.querySelector('#light');
		var darkButton = document.querySelector('#dark');
		
		lightButton.addEventListener('click', this.makeItLight, false);
		darkButton.addEventListener('click', this.makeItDark, false);
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
		FastClick.attach(document.body);
		app.start();
	}, false);
}
