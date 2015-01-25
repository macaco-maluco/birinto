var nodeType = require('./node-type'),
    buildMap = require('./build-map');


var GameMap = module.exports = function (width, height) {
  this.width = width;
  this.height = height;
  this.build();
};


GameMap.prototype.build = function () {
  this.nodes = buildMap(this.width, this.height);
};


GameMap.prototype.onChange = function (cb) {
  this._onChangeCb = cb;
};


GameMap.prototype.onGoal = function (cb) {
  this._onGoalCb = cb;
};


GameMap.prototype.moveTo = function (x, y) {
  var node = this.nodes[y][x];

  if (node.type === nodeType.PLAYER_MOVE) { return false; }

  var previousType = node.type;

  if (!node.walls[0] && this.nodes[y-1][x].type === nodeType.PLAYER_MOVE ||
      !node.walls[1] && this.nodes[y][x+1].type === nodeType.PLAYER_MOVE ||
      !node.walls[2] && this.nodes[y+1][x].type === nodeType.PLAYER_MOVE ||
      !node.walls[3] && this.nodes[y][x-1].type === nodeType.PLAYER_MOVE) {

    node.type = nodeType.PLAYER_MOVE;

    if (previousType === nodeType.GOAL) {
      this._onGoalCb();
      return true;
    }

    if (previousType !== nodeType.PLAYER_MOVE) {
      this._onChangeCb();
      return true;
    }
  }
};
