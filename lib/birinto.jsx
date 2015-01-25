var React = require('react');


var GameScreen = require('./game-screen.jsx');


module.exports = React.createClass({
  render: function () {
    return <div className="birinto">
      <GameScreen/>
    </div>;
  }
});
