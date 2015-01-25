var MapNode = require('./map-node');

var GameMap = module.exports = function () {
  this.nodes = buildMap();
  this.width = this.nodes[0].length;
  this.height = this.nodes.length;
};


GameMap.prototype.moveableAdjacentPositions = function () {

};


GameMap.prototype.onChange = function (cb) {
  this._onChangeCb = cb;
};


GameMap.prototype.onGoal = function (cb) {
  this._onGoalCb = cb;
};


GameMap.prototype.moveTo = function (x, y) {
  if (!isFree(this.nodes, x, y)) { return false; }
  if (!hasAdjacentPlayerNode(this.nodes, x, y)) { return false; }

  var previousValue = this.nodes[y][x];
  this.nodes[y][x] = MapNode.PLAYER_MOVE;

  if (previousValue === MapNode.GOAL) {
    this._onGoalCb();
  }

  if (previousValue !== MapNode.PLAYER_MOVE) {
    this._onChangeCb();
    return true;
  }
};


function isFree (nodes, x, y) {
  var row = nodes[y];
  if (!row) { return false; }
  return row[x] === MapNode.FREE || row[x] === MapNode.GOAL;
}


function hasAdjacentPlayerNode (nodes, x, y) {
  for(var i=y-1; i<=y+1; i++) {
    var row = nodes[i];
    if (!row) { continue; }

    for (var j=x-1; j<=x; j++) {
      var node = row[j];
      if (!node) { continue; }

      if (node === MapNode.PLAYER_MOVE) { return true; }
    }
  }

  return false;
}


function buildMap () {
  var X = MapNode.WALL,
      P = MapNode.PLAYER_MOVE,
      _ = MapNode.FREE,
      G = MapNode.GOAL;

  return [
    [_, _, _, _, _, _, G, G, G, G],
    [_, _, X, _, _, _, _, _, _, _],
    [X, X, X, _, X, _, _, _, _, _],
    [_, _, _, _, X, X, X, X, X, X],
    [_, X, X, _, X, _, _, _, _, _],
    [_, X, _, _, X, X, _, _, _, _],
    [_, X, _, _, _, _, _, _, _, _],
    [_, X, _, _, _, _, _, _, _, _],
    [_, X, _, _, _, _, _, _, _, _],
    [_, X, _, _, _, _, _, _, _, _],
    [_, X, _, _, _, _, _, _, _, _],
    [_, X, _, _, _, _, _, _, _, _],
    [_, X, _, _, _, _, _, _, _, _],
    [P, X, _, _, _, _, _, _, _, _]
  ];
}
