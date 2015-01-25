var MapNode = require('./map-node');

var GameMap = module.exports = function () {
  this._map = buildMap();
};


GameMap.prototype.moveableAdjacentPositions = function () {

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
