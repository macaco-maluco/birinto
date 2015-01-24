var THREE = require('../vendor/three');


require('./game.scss');


var Game = module.exports = function () {

};


Game.prototype.start = function () {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  scene.add( buildCube({ z: -10 }, 0x00ff00) );
  scene.add( buildCube({ z: 10 }, 0xff0000) );

  var floor;
  scene.add( floor = buildFloor() );


  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( 0, 30, 0 );
  spotLight.castShadow = true;
  spotLight.shadowMapWidth = 1024;
  spotLight.shadowMapHeight = 1024;
  spotLight.shadowCameraNear = 500;
  spotLight.shadowCameraFar = 4000;
  spotLight.shadowCameraFov = 30;
  scene.add( spotLight );


  var gameState = {
    x: 0,
    y: 0,
    z: 0,
    alpha: 0,
    beta: 0,
    gamma: 90
  };

  var render = function () {
    // floor.rotation.x += 0.1;

    requestAnimationFrame( render );
    camera.rotation.y = gameState.alpha * Math.PI / 180;
    camera.rotation.x = (gameState.gamma - 90) * Math.PI / 180;
    renderer.render(scene, camera);
  };

  render();
  setupMontionSensor(gameState);
};


function buildFloor () {
  var geometry = new THREE.PlaneGeometry( 500, 500, 200, 200 );
  var material = new THREE.MeshLambertMaterial( {color: 0x95a5a6, side: THREE.DoubleSide } );
  var plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = 90 * Math.PI / 180;
  plane.position.y = -5;
  plane.position.z = -30;
  // plane.position.
  return plane;
}


function buildCube (position, color) {
  var geometry = new THREE.BoxGeometry( 1, 2, 1 );
  var material = new THREE.MeshLambertMaterial( { color: color } );
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
