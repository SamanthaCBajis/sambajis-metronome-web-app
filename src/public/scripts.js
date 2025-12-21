// TypeScript automatically recognizes AudioContext and other Web Audio API interfaces
var audioContext = new AudioContext();
// Ensure user interaction to resume the context for autoplay policies
// audioContext.state is type-checked
if (audioContext.state === "suspended") {
    // audioContext.resume() is type-checked
    audioContext.resume();
}
// Type safety for creating a source from an HTML element
var audioElement = document.querySelector("audio"); // Cast to specific type
var track = audioContext.createMediaElementSource(audioElement); // createMediaElementSource is type-checked
// Connecting nodes in a type-safe manner
track.connect(audioContext.destination);
// Select our play button
var playButton = document.getElementById("playButton");
if (playButton) {
    playButton.addEventListener("click", function () {
        // Check if context is in suspended state (autoplay policy)
        if (audioContext.state === "suspended") {
            audioContext.resume();
        }
        // Play or pause track depending on state
        if (playButton.dataset.playing === "false") {
            audioElement.play();
            playButton.dataset.playing = "true";
        }
        else if (playButton.dataset.playing === "true") {
            audioElement.pause();
            playButton.dataset.playing = "false";
        }
    });
    audioElement.addEventListener("ended", function () {
        playButton.dataset.playing = "false";
    });
}
