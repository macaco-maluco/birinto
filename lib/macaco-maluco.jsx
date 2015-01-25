var React = require("react");


require("./macaco-maluco.scss");
var Sounds = require('./sounds');
var GameMap = require('./game-map');


module.exports = React.createClass({
  componentWillMount: function () {
    this._sounds = new Sounds();
    this._map = new GameMap();
  },

  render: function() {
    var sounds = this._sounds;
    sounds.hover();

    var move = function (e) {
      var touch = e.targetTouches[0] || {};
      sounds.hover();
      var el = document.elementFromPoint(touch.clientX, touch.clientY);
      el.className = 'node-type-2';
      e.preventDefault();
    };

    window.addEventListener('touchstart', move);
    window.addEventListener('touchmove', move);

    return <div className="macaco-maluco">
      <table>
        {
          this._map._map.map(function (row) {
            return <tr>
              {
                row.map(function (node) {
                  return <td className={'node-type-' + node}></td>;
                })
              }
            </tr>;
          })
        }
      </table>
    </div>;
  }
});
