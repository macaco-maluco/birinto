var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;


var Application = require('./application.jsx');
var SplashScreen = require('./splash-screen.jsx');
var GameScreen = require('./game-screen.jsx');
var LoseScreen = require('./lose-screen.jsx');


module.exports = <Route name="main" path="/" handler={Application}>
  <Route name="game" handler={GameScreen}/>
  <Route name="lose" handler={LoseScreen}/>
  <DefaultRoute handler={SplashScreen}/>
</Route>;
