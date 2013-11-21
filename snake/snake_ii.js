(function (root) {
  root.SnakeGame = root.SnakeGame || {};
  
  //upgrade coords to tile objects: color, contents=apple or snake
  var Coord = SnakeGame.Coord = function(height, width) {
    this.height = height;
    this.width = width;
    this.color = null;
    this.contents = null;
  }

  Coord.prototype.plus = function(coord2) {
    return new Coord(this.height + coord2.height, this.width + coord2.width)
  } 

  var Snake = SnakeGame.Snake = function(board) {
    this.board = board;
    this.direction = "E"
    this.segments = startingSegments(2); 
    // this.oldSegments = []
    this.dead = false;

    function startingSegments(num) {
      return _(num).times(function(i) {
        return board.center(); //start as single point
        //return board.center().plus(new SnakeGame.Coord(0, -i));
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
      default:
        console.log("direction " + newDir + " was ignored")
    }
    //TODO: refactor so tests use === somehow
    //if (newDir === "S") { newDir = "N" }
  }

  Snake.NEXTPOS = {
    "N": new SnakeGame.Coord(-1, 0),
    "E": new SnakeGame.Coord( 0, 1),
    "S": new SnakeGame.Coord( 1, 0),
    "W": new SnakeGame.Coord( 0, -1)
  }

  Snake.prototype.move = function() {
    var coord = this.head().plus(Snake.NEXTPOS[this.direction]);
    // need to check move against a future board state
    // for example a snake following its own tail
    var tile = this.board.getTile(coord)

    switch (tile) {

      // TODO: refactor maybe checkMove, performMove
      // does not belong here, need to recheck the grid if wrapping
      case "out of bounds":
        this.wrap(coord);
        //this.dead = true;
        console.log('out of bounds')
        break;

      case "apple":
        this.grow(coord);
        break;

      case "snake":
        this.dead = true;
        console.log('you bit yourself')
        break;

      default:
        this.slide(coord);
    }
  }

  Snake.prototype.grow = function(coord) {
    console.log("yummy apple");
    this.segments.unshift(coord);
    this.board.apples -= 1;
  }

  Snake.prototype.slide = function(coord) {
    this.segments.unshift(coord);
    this.segments.pop();
  }

  Snake.prototype.wrap = function(coord) {
    this.slide( this.board.wrap(coord) );
  }

  Snake.prototype.head = function() {
    return this.segments[0]
  }

})(this);