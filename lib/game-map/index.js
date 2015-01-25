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


GameMap.prototype.moveTo = function (x, y) {
  if (this.nodes[y][x] !== MapNode.FREE) { return false; }

  var previousValue = this.nodes[y][x];
  this.nodes[y][x] = MapNode.PLAYER_MOVE;
  if (previousValue !== MapNode.PLAYER_MOVE) {
    this._onChangeCb();
    return true;
  }
};


function buildMap () {
  var X = MapNode.WALL,
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
    [_, X, _, _, _, _, _, _, _, _]
  ];
}
