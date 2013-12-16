(function(root) {
  root.SnakeGame = root.SnakeGame || {}
  
  var Game = SnakeGame.Game = function(options){
    
    var el = options.el

    var convert_pixels_to_cells = function(length){
      return Math.round(length / 20)
    }

    var height = convert_pixels_to_cells(options.height) - 5;
    var width = convert_pixels_to_cells(options.width) - 5;
    options.height = height;
    options.width = width; 
    this.board = new SnakeGame.Board(height, width);
    this.snake = new SnakeGame.Snake(this.board);
    this.snakeCoords = this.snake.segments.slice(0);
    options.snakeCoords = this.snakeCoords;
    this.view = new SnakeGame.View(options);
    this.intervalId = null;    
    this.userInput = [];
    this.paused = false;
    this.score = 0;
    this.appleTimer = width;
  };

  Game.KEYS = {
    38: "N", // up arrow
    39: "E",
    40: "S",
    37: "W",
    32: "P", //space bar to pause
    82: "R", //r to restart (or n for newgame)
  };

  Game.prototype.gameOver = function() {
    window.clearInterval(this.intervalId);
    $(window).unbind('keydown'); //will prevent R to restart
    console.log("game over man");
  };

  Game.prototype.handleKeyEvent = function(event) {
    var input = Game.KEYS[event.keyCode]

    switch (input) {
      
      case "P":
        this.pause();
        break;
      
      case "R":
        console.log("restart")
        break;

      default:
        this.updateUserInput.bind(this, input)();
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
    if ( this.paused ) {
      this.paused = false;
      this.play();
      console.log("resume")
    } else {
      this.paused = true;
      window.clearInterval(this.intervalId);
      console.log("pause");
    }
  }

  Game.prototype.restart = function() {
    console.log('restart');
  }

  Game.prototype.turn = function() {
    // if ( this.paused ) return;
    // update snake
    var newDir = this.userInput.shift();
    if (newDir) {
      this.snake.turn(newDir);
    }
    this.snake.move();

    //check if snake still alive
    if ( this.snake.dead ) {
      this.gameOver();
    }

    // TODO: this is duplicated in init code, but easier to pass here
    var snakeCoords = this.snake.segments.slice(0)
    
    //update score and level
    this.score = snakeCoords.length * 10

    // TODO: refactor this
    var appleCoords = this.board.update(snakeCoords); 

    //update view
    this.view.displayStats(this.score, this.board.level);
    this.view.render(appleCoords, "apple");
    this.view.renderSnake(snakeCoords);
  };

  //Assumes input is undefined or a direction
  Game.prototype.updateUserInput = function(input) {
    var lastInput = this.userInput.pop();
    if ( this.paused ) return;
    if ( input && lastInput ) {
      if ( input === lastInput ) {
        //ignore repeated keystrokes and when both are undefined
      } else {
        this.userInput.push(lastInput, input);
      }
    } else {
      // only one value is truthy, so add it to userInput
      this.userInput.push( lastInput || input )
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
  var options = {
    height: window.innerHeight,
    width: window.innerWidth,
    el: $('#snake-game')
  }

  sg = new SnakeGame.Game(options);
  sg.play();
});