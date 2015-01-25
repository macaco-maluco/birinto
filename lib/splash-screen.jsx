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
      <h1 className="logo">Birinto</h1>
      <p>
        Works offline! Add it to your home screen.
      </p>
      <Link to="game" className="start-game">Start game</Link>
    </div>;
  }
});
