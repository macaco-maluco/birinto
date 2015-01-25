var React = require('react');
var Link = require('react-router').Link;


require('./splash-screen.scss');
var sounds = require('./sounds');

module.exports = React.createClass({
  componentWillMount: function () {
    sounds.playSoundTrack();
  },

  componentWillUnmount: function () {
    sounds.stopSoundTrack();
  },

  render: function () {
    return <div className="splash-screen">
      <p>
        The ultimate racing puzzle action game.
      </p>
      <Link to="game" className="start-game">Start game</Link>
    </div>;
  }
});
