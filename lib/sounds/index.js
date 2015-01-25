var Howl = require('howler').Howl;
var hover = require('./hover-effect.mp3');
var soundtrack = require('./soundtrack.mp3');


var Sounds = module.exports = function () {
  this._hover = new Howl({
    urls: [hover]
  });

  this._soundtrack = new Howl({
    loop: true,
    urls: [soundtrack]
  });
};


Sounds.prototype.soundtrack = function () {
  this._soundtrack.play();
};


Sounds.prototype.hover = function () {
  this._hover.play();
};
