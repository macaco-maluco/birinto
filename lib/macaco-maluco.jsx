var React = require("react");


require("./macaco-maluco.scss");
var Sounds = require('./sounds');
var GameMap = require('./game-map');


module.exports = React.createClass({
  componentWillMount: function () {
    this._sounds = new Sounds();
    this._map = new GameMap();
    this._map.onChange(function () {
      this.forceUpdate();
    }.bind(this));
  },

  componentDidMount: function () {
    var sounds = this._sounds;
    var map = this._map;

    var move = function (e) {
      e.preventDefault();

      var touch = e.targetTouches[0] || {};

      var x = Math.floor(touch.clientX / (window.innerWidth / map.width));
      var y = Math.floor(touch.clientY / (window.innerHeight / map.height));

      if (!map.moveTo(x, y)) { return; }

      sounds.hover();
    };

    window.addEventListener('touchstart', move);
    window.addEventListener('touchmove', move);
  },

  render: function() {
    var map = this._map;

    return <div className="macaco-maluco">
      <table>
        {
          map.nodes.map(function (row, x) {
            return <tr key={'row-' + x}>
              {
                row.map(function (node, y) {
                  return <td key={'node-' + x + '-' + y} className={'node-type-' + node} data-position-x={x} data-position-y={y} ></td>;
                })
              }
            </tr>;
          })
        }
      </table>
    </div>;
  }
});
