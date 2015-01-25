var MapNode = require('./map-node');

var GameMap = module.exports = function () {
  this._map = buildMap();
};


GameMap.prototype.moveableAdjacentPositions = function () {

};


GameMap.prototype.onChange = function (cb) {
  this._onChangeCb = cb;
};


GameMap.prototype.moveTo = function (x, y) {
  if (this._map[y][x] !== MapNode.FREE) { return false; }

  var previousValue = this._map[y][x];
  this._map[y][x] = MapNode.PLAYER_MOVE;
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
    [_, _, _, _, _, _, G, G, G],
    [_, _, X, _, _, _, _, _, _],
    [X, X, X, _, X, _, _, _, _],
    [_, _, _, _, X, X, X, X, X],
    [_, X, X, _, X, _, _, _, _],
    [_, X, _, _, X, X, _, _, _],
    [_, X, _, _, _, _, _, _, _],
    [_, X, _, _, _, _, _, _, _],
    [_, X, _, _, _, _, _, _, _],
    [_, X, _, _, _, _, _, _, _],
    [_, X, _, _, _, _, _, _, _],
    [_, X, _, _, _, _, _, _, _]
  ];
}
