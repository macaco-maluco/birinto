var THREE = require('../vendor/three');


var Game = module.exports = function () {

};


Game.prototype.start = function () {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  scene.add( buildCube({ z: -5 }, 0x00ff00) );
  scene.add( buildCube({ z: 5 }, 0xff0000) );

  var gameState = {
    x: 0,
    y: 0,
    z: 0,
    alpha: 0,
    beta: 0,
    gamma: 0
  };

  var render = function () {
    requestAnimationFrame( render );
    camera.rotation.y = gameState.alpha * Math.PI / 180;
    renderer.render(scene, camera);
  };

  render();
  setupMontionSensor(gameState);
};


function buildCube (position, color) {
  var geometry = new THREE.BoxGeometry( 1, 2, 1 );
  var material = new THREE.MeshBasicMaterial( { color: color } );
  var cube = new THREE.Mesh( geometry, material );
  cube.position.z = position.z;
  return cube;
}


function setupMontionSensor (gameState) {

  function motion(event){
    gameState.x = event.accelerationIncludingGravity.x;
    gameState.y = event.accelerationIncludingGravity.y;
    gameState.z = event.accelerationIncludingGravity.z;
  }

  function orientation(event){
    gameState.alpha = event.alpha;
    gameState.beta = event.beta;
    gameState.gamma = event.gamma;
  }

  if(window.DeviceMotionEvent){
    window.addEventListener("devicemotion", motion, false);
  }

  if(window.DeviceOrientationEvent){
    window.addEventListener("deviceorientation", orientation, false);
  }
}
