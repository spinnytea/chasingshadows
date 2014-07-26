window.AudioContext = window.AudioContext || window.webkitAudioContext;

var bgmusic = new Audio();
bgmusic.controls = false;
bgmusic.autoplay = true;
bgmusic.src = "assets/audio/PCA Background Track - Noisier.wav";
bgmusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

module.exports = {
    sounds: new AudioContext(),
    bgmusic: bgmusic,
};
