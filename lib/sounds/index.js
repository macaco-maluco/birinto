var Howl = require('howler').Howl;
var hover = require('./hover-effect.mp3');
var soundtrack = require('./soundtrack.mp3');


var hover = new Howl({
  urls: [hover],
  volume: 0.75
});


var soundtrack = new Howl({
  loop: true,
  urls: [soundtrack],
  volume: 0.3
});


module.exports = {
  playSoundTrack: function () {
    soundtrack.play();
  },
  stopSoundTrack: function () {
    soundtrack.fade(0.3, 0.001, 1500, function () {
      soundtrack.stop();
    });
  },
  playHover: function () {
    hover.play();
  }
};
