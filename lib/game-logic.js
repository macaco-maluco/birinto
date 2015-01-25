var nodeType = require('./game-map/node-type'),
    buildMap = require('./game-map/build-map');


var GameLogic = module.exports = function (width, height) {
  this.state = {
    width: width,
    height: height,
    timeout: 4000
  };
  this.restart();
};


GameLogic.prototype.restart = function () {
  this.state.map = buildMap(this.state.width, this.state.height);
  this.state.startedAt = Date.now();
  this.state.now = Date.now();
};


GameLogic.prototype.update = function () {
  this.state.now = Date.now();

  if (this.state.now > (this.state.startedAt + this.state.timeout)) {
    this.onGameOver(this.state);
  } else {
    this.onChange(this.state);
  }
};


GameLogic.prototype.moveTo = function (x, y) {
  var map = this.state.map;
  var node = map[y][x];

  if (node.type === nodeType.PLAYER_MOVE) { return false; }

  var previousType = node.type;

  if (!node.walls[0] && map[y-1][x].type === nodeType.PLAYER_MOVE ||
      !node.walls[1] && map[y][x+1].type === nodeType.PLAYER_MOVE ||
      !node.walls[2] && map[y+1][x].type === nodeType.PLAYER_MOVE ||
      !node.walls[3] && map[y][x-1].type === nodeType.PLAYER_MOVE) {

    node.type = nodeType.PLAYER_MOVE;

    if (previousType === nodeType.GOAL) {
      this.onGoal(this.state);
      return true;
    }

    if (previousType !== nodeType.PLAYER_MOVE) {
      this.onChange(this.state);
      return true;
    }
  }
};
