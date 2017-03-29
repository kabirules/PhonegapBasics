var app={
  inicio: function(){
    BALL_SIZE = 50;
    gameMode = 0;
    speedX = 0;
    speedY = 0;
    score = 0;
    
    height  = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;
    
    app.watchSensors();
    app.startGame();
  },

  startGame: function(){

    function preload() {
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.stage.backgroundColor = '#f27d0c';
      game.load.image('ball', 'assets/ball.png');
      game.load.image('target', 'assets/target.png');
    }

    function create() {
      scoreText = game.add.text(16, 16, score, { fontSize: '100px', fill: '#757676' });
      
      target = game.add.sprite(app.startX(), app.startY(), 'target');
      ball = game.add.sprite(app.startX(), app.startY(), 'ball');
      
      game.physics.arcade.enable(ball);
      game.physics.arcade.enable(target);

      ball.body.collideWorldBounds = true;
      ball.body.onWorldBounds = new Phaser.Signal();
      ball.body.onWorldBounds.add(app.scoreSubs, this);
    }

    function update(){
      var factorDificultad = (300 + (gameMode * 100));
      ball.body.velocity.y = (speedY * factorDificultad);
      ball.body.velocity.x = (speedX * (-1 * factorDificultad));
      
      game.physics.arcade.overlap(ball, target, app.scoreAdd, null, this);
    }

    var states = { preload: preload, create: create, update: update };
    var game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser',states);
  },

  scoreSubs: function(){
    score = score-1;
    scoreText.text = score;
  },

  scoreAdd: function(){
    score = score+1;
    scoreText.text = score;

    target.body.x = app.startX();
    target.body.y = app.startY();

    if (score > 0){
      gameMode = gameMode + 1;
    }
  },

  startX: function(){
    return app.randomNumberLimit(width - BALL_SIZE );
  },

  startY: function(){
    return app.randomNumberLimit(height - BALL_SIZE );
  },

  randomNumberLimit: function(limit){
    return Math.floor(Math.random() * limit);
  },

  watchSensors: function(){
    
    function onError() {
        console.log('onError!');
    }

    function onSuccess(accData){
      app.shakeDetect(accData);
      app.directionRegister(accData);
    }

    navigator.accelerometer.watchAcceleration(onSuccess, onError,{ frequency: 10 });
  },

  shakeDetect: function(accData){
    var shakeX = accData.x > 10;
    var shakeY = accData.y > 10;

    if (shakeX || shakeY){
      setTimeout(app.restart, 1000);
    }
  },

  restart: function(){
    document.location.reload(true);
  },

  directionRegister: function(accData){
    speedX = accData.x ;
    speedY = accData.y ;
  }

};

if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
        app.inicio();
    }, false);
}