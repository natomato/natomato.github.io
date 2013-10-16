(function(root){
  root.SnakeGame = root.SnakeGame || {};

  var Board = SnakeGame.Board = function(height, width) {
    this.grid = Board.makeGrid(height, width);
    this.height = height;
    this.width = width;
    this.apples = 0;
    this.maxApples = 1;
    this.level = 0;
    this.snakeCoords = [];
    // this.appleTimer = width + this.snakeCoords.length;

  }

  Board.makeGrid = function(height, width){
    return _.times(height, function() {
      return _.times(width, function() {
        return ".";
      });
    });
  }

  Board.prototype.print = function() {
    var str = "";

    this.grid.forEach( function(row) {
      row.forEach( function(cell) {
        str += cell;
      })
      str += "\n"
    })

    return str;
  }

  Board.prototype.center = function(){
    var height = Math.floor(this.height/2)
    var width  = Math.floor(this.width/2)
    return new SnakeGame.Coord(height, width);
  }

  Board.prototype.setTile = function(coord, value){
    this.grid[coord.height][coord.width] = value;
  }

  Board.prototype.getTile = function(coord) {
    if ( this.outOfBounds(coord) ) {
      return "out of bounds"
    }
    return this.grid[coord.height][coord.width]
  }

  Board.prototype.isEmpty = function(coord) {
    return this.getTile(coord) === "."
  } 

  Board.prototype.outOfBounds = function(coord) {
    return (coord.height < 0 || 
            coord.width  < 0 ||
            coord.height >= this.height ||
            coord.width >= this.width )
  }

  Board.prototype.wrap = function(coord) {
    coord.height = this.reIndex(coord.height, "height");
    coord.width  = this.reIndex(coord.width,  "width");
    return coord;
  }

  Board.prototype.reIndex = function(value, dimension) {
    var max = this[dimension];
    if (value >= max) { value -= max };
    if (value <  0  ) { value += max };
    return value;
  }

  Board.prototype.randomEmptyTile = function() {
    var tile;
    do {
      tile = this.randomTile();
      console.log(this.getTile(tile));
    } while( !this.isEmpty( tile ) )

    return tile
  }

  Board.prototype.randomTile = function() {
    var randomHeight = _.random(this.height);
    var randomWidth = _.random(this.width);
    return new SnakeGame.Coord( randomHeight, randomWidth );
  }

  //TODO: clean up the snakes past location
  Board.prototype.renderSnake = function(snake) {
    var _this = this;

    // remove snake from prior position
    this.snakeCoords.forEach( function(coord) {
      _this.setTile(coord, ".")
    });

    // add snake at new position
    snake.forEach( function(coord) {
      _this.setTile(coord, "snake");
    });

    // allow snake to occupy a spot that will
    // become free on the next turn by marking
    // that spot as the tail
    var tail = snake[snake.length - 1]
    this.setTile(tail, "tail")

    this.snakeCoords = snake;
  }

  Board.prototype.makeApples = function(num){
    var _this = this;
    var apples = [];
    _(num).times(function(){
      var tile = _this.randomEmptyTile();
      _this.setTile(tile, "apple");
      apples.push(tile);
    });
    this.apples += num;
    return apples;
  };

  Board.prototype.update = function(snake) {
    this.renderSnake(snake);
    var apples = this.rewardSchedule();
    return apples
  }

  Board.prototype.rewardSchedule = function() {
    var newApples = [];
    // this.appleTimer -= 1;

    // if ( this.appleTimer === 0 ) {
    //   newApples = newApples.concat( this.makeApples(1) );
    //   this.appleTimer = this.level * this.width;
    // }
    
    if ( this.apples === 0 ) {
      this.level += 1;
      this.maxApples += 2;
      newApples = newApples.concat(this.makeApples( this.maxApples ));
    }

    return newApples;
  }

})(this);