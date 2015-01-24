var THREE = require('../vendor/three');



module.exports = function () {
  var group = new THREE.Object3D();
  group.add(buildCube());
  group.add(buildLight());
  return group;
};


function buildCube () {
  var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
  var material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
  var cube = new THREE.Mesh( geometry, material );
  return cube;
}


function buildLight () {
  var light = new THREE.PointLight( 0xff0000, 0.5, 100 );
  light.position.set( 0, 0, 0 );
  return light;
}

