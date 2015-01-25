var React = require('react');
var Link = require('react-router').Link;


require('./lose-screen.scss');


module.exports = React.createClass({
  render: function () {
    return <div className="lose-screen">
      <h1>You Lose</h1>
      <Link to="game" className="start-game">Try again</Link>
    </div>;
  }
});
