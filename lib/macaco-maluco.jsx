var React = require("react");


require("./macaco-maluco.scss");
var Sounds = require('./sounds');


module.exports = React.createClass({
  componentWillMount: function () {
    this._sounds = new Sounds();
  },

  render: function() {
    var sounds = this._sounds;
    sounds.hover();

    var move = function (e) {
      var touch = e.targetTouches[0] || {};
      sounds.hover();
      var el = document.elementFromPoint(touch.clientX, touch.clientY);
      el.className = 'selected';
      e.preventDefault();
    };

    window.addEventListener('touchstart', move);
    window.addEventListener('touchmove', move);

    return <div className="macaco-maluco">
      <table>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
        <tr>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
          <td>2</td>
        </tr>
        <tr>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
        </tr>
        <tr>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
        </tr>
        <tr>
          <td>5</td>
          <td>5</td>
          <td>5</td>
          <td>5</td>
          <td>5</td>
          <td>5</td>
          <td>5</td>
          <td>5</td>
          <td>5</td>
        </tr>
        <tr>
          <td>6</td>
          <td>6</td>
          <td>6</td>
          <td>6</td>
          <td>6</td>
          <td>6</td>
          <td>6</td>
          <td>6</td>
          <td>6</td>
        </tr>
        <tr>
          <td>7</td>
          <td>7</td>
          <td>7</td>
          <td>7</td>
          <td>7</td>
          <td>7</td>
          <td>7</td>
          <td>7</td>
          <td>7</td>
        </tr>
        <tr>
          <td>8</td>
          <td>8</td>
          <td>8</td>
          <td>8</td>
          <td>8</td>
          <td>8</td>
          <td>8</td>
          <td>8</td>
          <td>8</td>
        </tr>
        <tr>
          <td>9</td>
          <td>9</td>
          <td>9</td>
          <td>9</td>
          <td>9</td>
          <td>9</td>
          <td>9</td>
          <td>9</td>
          <td>9</td>
        </tr>
      </table>
    </div>;
  }
});
