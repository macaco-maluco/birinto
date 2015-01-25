var React = require('react');
var router = require('react-router');
var RouteHandler = router.RouteHandler;
var Link = router.Link;


// require('../node_modules/normalize.css/normalize.css');
require('./application.scss');


module.exports = React.createClass({
  render: function () {
    return (
      <div className="application">
        <header>
          <Link className="back-button" to="/">Back</Link>
        </header>
        <RouteHandler/>
      </div>
    );
  }
});
