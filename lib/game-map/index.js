var MapNode = require('./map-node');


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

  if (node.type === MapNode.PLAYER_MOVE) { return false; }

  var previousType = node.type;

  if (!node.walls[0] && this.nodes[y-1][x].type === MapNode.PLAYER_MOVE ||
      !node.walls[1] && this.nodes[y][x+1].type === MapNode.PLAYER_MOVE ||
      !node.walls[2] && this.nodes[y+1][x].type === MapNode.PLAYER_MOVE ||
      !node.walls[3] && this.nodes[y][x-1].type === MapNode.PLAYER_MOVE) {

    node.type = MapNode.PLAYER_MOVE;

    if (previousType === MapNode.GOAL) {
      this._onGoalCb();
      return true;
    }

    if (previousType !== MapNode.PLAYER_MOVE) {
      this._onChangeCb();
      return true;
    }
  }
};


function buildMap (width, height) {
  var map = [];
  var x, y, row;
  var FREE = MapNode.FREE;

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


  walk(map[height-1][0]);

  map[0][width-1].type = MapNode.GOAL;
  map[height-1][0].type = MapNode.PLAYER_MOVE;

  return map;
}
