var router = require('react-router');
var React = require('react');
var routes = require('./routes.jsx');


module.exports = {
  start: function (el) {
    React.initializeTouchEvents(true);
    router.run(routes, function (Handler) {
      React.render(React.createElement(Handler, null), el);
    });
  }
};
