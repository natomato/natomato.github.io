(function (root) {
  root.SnakeGame = root.SnakeGame || {};
  
  //upgrade coords to tile objects: color, contents=apple or snake
  var Coord = SnakeGame.Coord = function(height, width, color) {
    this.height = height;
    this.width = width;
    this.color = color || "red";
    this.contents = null;
  }

  // var Tile = SnakeGame.Tile = function() {
  //   this.color = this.randomColor();
  //   this.contents = null;
  //   this.coord = "this is dumb"
  // }

  Coord.COLORS = [
    "red",
    "royalblue",
    "violet",
    "turquoise",
    "magenta",
    "snow",
    "fuschia"
  ]

  Coord.prototype.plus = function(coord2) {
    return new Coord(this.height + coord2.height, this.width + coord2.width, this.color)
  }

  Coord.prototype.randomColor = function() {
    return Coord.COLORS[ _.random(Coord.COLORS.length) ]
  }

  var Snake = SnakeGame.Snake = function(board) {
    this.board = board;
    this.direction = "E"
    this.color = "royalblue";
    this.dead = false;
    this.segments = startingSegments(2, this.color); 

    function startingSegments(num, color) {
      return _(num).times(function(i) {
        
        // start snake as single point
        // return new SnakeGame.Coord(board.center().width, board.center().height, color);
        
        // start with the whole snake on screen
        return new SnakeGame.Coord(0, -i, color).plus(board.center());
      });
    }
  }

  Snake.prototype.turn = function(newDir) {

    // Prevent the snake from going backwards
    switch (this.direction) {
      case "N":
        if (newDir != "S") { this.direction = newDir };
        break; 
      case "S":
        if (newDir != "N") { this.direction = newDir };
        break; 
      case "E":
        if (newDir != "W") { this.direction = newDir };
        break; 
      case "W":
        if (newDir != "E") { this.direction = newDir };
        break; 
    }
  }

  Snake.NEXTPOS = {
    "N": new SnakeGame.Coord(-1, 0, this.color),
    "E": new SnakeGame.Coord( 0, 1, this.color),
    "S": new SnakeGame.Coord( 1, 0, this.color),
    "W": new SnakeGame.Coord( 0, -1, this.color)
  }

  Snake.prototype.move = function() {
    var coord = this.head().plus(Snake.NEXTPOS[this.direction]);
    var tile = this.board.getTile(coord)

    // allow the snake to wrap around the edge of the board
    if (tile === "out of bounds") {
      coord = this.board.wrap(coord);
      tile = this.board.getTile(coord)
    }

    switch (tile) {
      case "apple":
        this.grow(coord);
        break;

      case "snake":
        this.dead = true;
        break;

      default:
        this.slide(coord);
    }
  }


  Snake.prototype.grow = function(coord) {
    this.segments.unshift(coord);
    this.board.apples -= 1;
  }

  Snake.prototype.slide = function(coord) {
    this.segments.unshift(coord);
    this.segments.pop();
  }

  Snake.prototype.head = function() {
    return this.segments[0]
  }

})(this);