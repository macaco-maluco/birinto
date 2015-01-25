var React = require("react");


require("./macaco-maluco.scss");
var Sounds = require('./sounds');
var GameLogic = require('./game-logic');
var ProgressBar = require('./progress-bar.jsx');


module.exports = React.createClass({
  componentWillMount: function () {
    var that = this;

    this._sounds = new Sounds();

    var gameLogic = new GameLogic(Math.floor(window.innerWidth / 50) , Math.floor(window.innerHeight / 50));

    gameLogic.onChange = function (state) {
      that.setState(state);
    };

    gameLogic.onGoal = function () {
      gameLogic.restart();
    };

    gameLogic.onGameOver = function () {
      gameLogic.restart();
    };

    that._gameLogic = gameLogic;
    that.setState(gameLogic.state);
  },

  componentDidMount: function () {
    var sounds = this._sounds;
    var gameLogic = this._gameLogic;

    var move = function (e) {
      e.preventDefault();

      var touch = e.targetTouches[0] || {};

      var x = Math.floor(touch.clientX / (window.innerWidth / gameLogic.state.width));
      var y = Math.floor(touch.clientY / (window.innerHeight / gameLogic.state.height));

      if (gameLogic.moveTo(x, y)) { sounds.hover(); }
    };

    var render = function () {
      gameLogic.update();
      window.requestAnimationFrame(render);
    };

    window.addEventListener('touchstart', move);
    window.addEventListener('touchmove', move);

    render();
  },

  render: function() {
    var map = this.state.map;
    return <div className="macaco-maluco">
      <ProgressBar value={ (this.state.now - this.state.startedAt) / this.state.timeout }></ProgressBar>
      <table>
        {
          map.map(function (row, x) {
            return <tr key={'row-' + x}>
              {
                row.map(function (node, y) {
                  return <td key={'node-' + x + '-' + y}
                             style={{
                               'border-top-style': node.walls[0] ? 'solid' : 'inherit',
                               'border-right-style': node.walls[1] ? 'solid' : 'inherit',
                               'border-bottom-style': node.walls[2] ? 'solid' : 'inherit',
                               'border-left-style': node.walls[3] ? 'solid' : 'inherit' }}
                             className={'node-type-' + node.type}
                             data-position-x={x}
                             data-position-y={y} ></td>;
                })
              }
            </tr>;
          })
        }
      </table>
    </div>;
  }
});
