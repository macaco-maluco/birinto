var React = require("react");
var router = require('react-router');


require("./game-screen.scss");
var sounds = require('./sounds');
var GameLogic = require('./game-logic');
var ProgressBar = require('./progress-bar.jsx');


module.exports = React.createClass({
  mixins: [ router.Navigation ],

  componentWillMount: function () {
    var that = this;

    var gameLogic = new GameLogic(Math.floor(window.innerWidth / 50) , Math.floor((window.innerHeight-50) / 50));

    gameLogic.onChange = function (state) {
      that.setState(state);
    };

    gameLogic.onGoal = function () {
      gameLogic.restart();
    };

    gameLogic.onGameOver = function () {
      that.transitionTo('main');
    };

    that._gameLogic = gameLogic;
    that.setState(gameLogic.state);
  },

  componentWillUnmount: function () {
    this.running = false;
  },

  componentDidMount: function () {
    var that = this;
    var gameLogic = this._gameLogic;
    this.running = true;

    var render = function () {
      gameLogic.update();
      if (that.running) { window.requestAnimationFrame(render); }
    };

    render();
  },

  handleTouch: function (e) {
    var gameLogic = this._gameLogic;

    e.preventDefault();

    var touch = e.targetTouches[0] || {};

    var x = Math.floor(touch.clientX / (window.innerWidth / gameLogic.state.width));
    var y = Math.floor((touch.clientY - 50) / ((window.innerHeight - 50) / gameLogic.state.height));

    if (gameLogic.moveTo(x, y)) { sounds.playHover(); }
  },

  render: function() {
    var map = this.state.map;
    return <div className="game-screen" onTouchStart={this.handleTouch} onTouchMove={this.handleTouch}>
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
