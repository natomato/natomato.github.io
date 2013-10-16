(function(root) {
  root.SnakeGame = root.SnakeGame || {};

  root.SnakeGame.View = View = function(options) {
    this.$el = $(options.el);
    this.grid = this.makeGrid(options.height, options.width);
    this.snakeCoords = options.snakeCoords
  };

  View.prototype.displayStats = function(score, level) {
    // var stats = document.createElement("div");
    // var score = document.createTextNode(score);
    // stats.addClassName("row stats");

    // this.$el.prepend(score)
    $('.score').text("SCORE: " + score);
    $('.level').text("LEVEL: " + level);
  }

  View.prototype.getEl = function(tile) {
    return document.getElementById(tile.height + "-" + tile.width)
    // speedy DOM retrieval using browsers native code,
    // if you need the best of both worlds, can wrap it in jQ
    // $( document.getElementById("some_id") ).jQueryCall();
  }

  View.prototype.makeGrid = function makeGrid(height, width) {
    var $rootEl = this.$el;
    var rows = height;
    var cols = width;
    
    _(rows).times(function (height) {
      var $rowEl = $('<div class="row" data-row="'+ height +'"></div>');
      _(cols).times(function (width) {
        $rowEl.append('<div class="tile" id="'+ height + '-' + width + '"></div>');
        $rootEl.append($rowEl);
      });
    });
  };

  View.prototype.render = function(tiles, type) {
    var _this = this;
    if (tiles.length == 0) { return };
    type = "tile " + ( type || "" ); // type cannot be falsy

    // DOM reflows - how many happening here?    
    tiles.forEach( function(tile) {
      el = _this.getEl(tile)
      el.className = type;
      el.style.backgroundColor = tile.color;
    })
  };

  View.prototype.erase = function(tiles) {
    var _this = this;

    tiles.forEach( function(tile) {
      el = _this.getEl(tile)
      el.className = "tile";
      el.style.backgroundColor = "";
    });
  }

  View.prototype.renderSnake = function(newSnake) {
    this.erase(this.snakeCoords); //resets class to just tile
    this.render(newSnake, "snake");
    this.snakeCoords = newSnake;
  };

})(this);









