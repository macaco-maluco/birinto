var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


require('./lose-screen.scss');


module.exports = React.createClass({
  mixins: [Router.State],
  render: function () {
    var points = this.getQuery().points;

    return <div className="lose-screen">
      <h1>You Lose</h1>
      <p className="points">{points}</p>
      <Link to="game" className="try-again">Try again</Link>
    </div>;
  }
});
