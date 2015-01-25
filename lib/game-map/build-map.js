var nodeType = require('./node-type');


module.exports = function (width, height) {
  var map = [];
  var x, y, row;
  var FREE = nodeType.FREE;

  for(y=0; y<height; y++) {
    row = [];
    map.push(row);

    for (x=0; x<width; x++) {
      row.push({
        x: x,
        y: y,
        type: null,
        walls: [true, true, true, true]
      });
    }
  }

  function getRandomUnvisitedNeighbour (node) {
    var x = node.x,
        y = node.y;

    var neighbours = [
      y > 0 && map[y-1][x],
      map[y][x+1],
      (y+1) < height && map[y+1][x],
      map[y][x-1]
    ];

    var position, neighbour;
    var i = 0;

    do {
      i = i + 1;
      position = Math.floor(Math.random() * 4);
      neighbour = neighbours[position] && neighbours[position].type === null && neighbours[position];
    } while(!neighbour && i < 30);

    if (neighbour) {
      node.walls[position] = false;
      neighbour.walls[(position + 2) % 4] = false;
    }

    return neighbour;
  }

  function walk (node) {
    node.type = FREE;
    var neighbour = getRandomUnvisitedNeighbour(node);

    while(neighbour) {
      walk(neighbour);
      neighbour = getRandomUnvisitedNeighbour(node);
    }
  }

  var start = map[height-1][0];
  var finish = map[0][Math.floor(width / 2)];

  walk(start);

  finish.type = nodeType.GOAL;
  start.type = nodeType.PLAYER_MOVE;

  return map;
};
