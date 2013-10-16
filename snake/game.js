(function(root) {
  root.SnakeGame = root.SnakeGame || {}
  
  var Game = SnakeGame.Game = function(options){
    var height = options.height;
    var width  = options.width; 
    var el = options.el;

    this.board = new SnakeGame.Board(height, width);
    this.snake1 = new SnakeGame.Snake(this.board);
    this.snake2 = new SnakeGame.Snake(this.board);
    this.snakeCoords = this.snake1.segments.slice(0);
    options.snakeCoords = this.snakeCoords;
    this.view = new SnakeGame.View(options);
    this.intervalId = null;    
    this.player1 = [];
    this.player2 = [];
    this.score = 0; //move to player class
    // this.level = 1; //moved to board
    this.appleTimer = width;
  };

  Game.KEYS = {
    //player 1
    38: "N", // up arrow
    40: "S", // down arrow
    39: "E", // right arrow
    37: "W", // left arrow

    //player 2
    87: "U", // w
    83: "D", // s
    65: "L", // a 
    68: "R", // d key, r for Right

    //game controls
    32: "pause",  //space bar to pause
    82: "reload", //r to restart (or n for newgame)
  };

  Game.prototype.gameOver = function() {
    window.clearInterval(this.intervalId);
    $(window).unbind('keydown'); //will prevent R to restart
  };

  Game.prototype.handleKeyEvent = function(event) {
    var input = Game.KEYS[event.keyCode]

    switch (input) {
      
      case "pause":
        this.pause();
        break;
      
      case "reload":
        window.location.reload();
        break;

      default:
        this.splitInput(input);
        // this.updateUserInput.bind(this, input)();
    }
  };

  Game.prototype.play = function(){
    $(window).unbind('keydown');
    $(window).keydown(this.handleKeyEvent.bind(this));

    this.intervalId = window.setInterval(
      this.turn.bind(this),
      100
    );
  }

  Game.prototype.pause = function() {
    if ( this.intervalId ){
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    } else {
      this.play();
    }
  }

  Game.prototype.restart = function() {
  }

  Game.prototype.turn = function() {
    // update snake

    var newDir1 = this.player1.shift();
    if (newDir1) {
      this.snake1.turn(newDir1);
    }
    this.snake1.move();

    //check if snake still alive
    if ( this.snake1.dead ) {
      this.gameOver();
    }

    // TODO: this is duplicated in init code, but easier to pass here
    var snakeCoords = this.snake1.segments.slice(0)
    
    //update score and level
    this.score = snakeCoords.length * 10

    // TODO: refactor this
    var appleCoords = this.board.update(snakeCoords); 

    //update view
    this.view.displayStats(this.score, this.board.level);
    this.view.render(appleCoords, "apple");
    this.view.renderSnake(snakeCoords);
  };

  Game.prototype.splitInput = function(input) {
    directionKeys = ["U", "D", "L", "R", "N", "S", "W", "E"]
    var index = directionKeys.indexOf(input);

    var directions  = ["N", "S", "W", "E"]

    if ( index > 3 ) {

      this.updateUserInput( directions[ index % 4 ], this.player1 );

    } else if ( index > -1 ) {

      this.updateUserInput( directions[ index % 4 ], this.player2 );

    } else {
    }

  };

  //Assumes input is a direction character (N,S,E,W)
  Game.prototype.updateUserInput = function(input, queue) {
    var lastInput = queue.pop();

    // dont queue up input while the game is paused 
    if ( !this.intervalId ) return;
    
    if ( input && lastInput ) {
      // two keys pressed in a single turn
      if ( input === lastInput ) {
        //ignore repeated keystrokes
      } else {
        queue.push(lastInput, input);
      }
    } else {
      // only one value is truthy
      queue.push( lastInput || input )
    }
  };

  Game.prototype.makeApples =function() {
    if ( this.appleTimer === 0 ) {
      this.level += 1;
      this.board.makeApples( this.level );
    }

    this.appleTimer -= 1;
  }

})(this);

$(function() {

  function scale(num) {
    return Math.floor( num / 20 ) - 10;
  }

  var options = {
    height: scale(document.body.clientHeight),
    width:  scale(document.body.clientWidth),
    el: $('#snake-game')
  }

  sg = new SnakeGame.Game(options);
  sg.play();
});