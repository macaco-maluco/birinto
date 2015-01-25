var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;


var Application = require('./application.jsx');
var SplashScreen = require('./splash-screen.jsx');
var GameScreen = require('./game-screen.jsx');


module.exports = <Route name="main" path="/" handler={Application}>
  <Route name="game" handler={GameScreen}/>
  <DefaultRoute handler={SplashScreen}/>
</Route>;
