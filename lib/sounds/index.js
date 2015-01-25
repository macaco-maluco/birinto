var Howl = require('howler').Howl;
var hover = require('./hover-effect.mp3');
var soundtrack = require('./soundtrack.mp3');


var hover = new Howl({
  urls: [hover]
});


var soundtrack = new Howl({
  loop: true,
  urls: [soundtrack]
});


module.exports = {
  playSoundTrack: function () {
    soundtrack.play();
  },
  stopSoundTrack: function () {
    soundtrack.stop();
  },
  playHover: function () {
    hover.play();
  }
};
