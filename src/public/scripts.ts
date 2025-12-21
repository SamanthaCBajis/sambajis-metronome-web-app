// TypeScript automatically recognizes AudioContext and other Web Audio API interfaces
const audioContext = new AudioContext();

// Ensure user interaction to resume the context for autoplay policies
// audioContext.state is type-checked
if (audioContext.state === "suspended") {
  // audioContext.resume() is type-checked
  audioContext.resume();
}

// Type safety for creating a source from an HTML element
const audioElement = document.querySelector("audio") as HTMLAudioElement; // Cast to specific type
const track = audioContext.createMediaElementSource(audioElement); // createMediaElementSource is type-checked

// Connecting nodes in a type-safe manner
track.connect(audioContext.destination);


// Select our play button
const playButton = document.getElementById("playButton");

if (playButton) {
playButton.addEventListener("click", () => {
  // Check if context is in suspended state (autoplay policy)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  // Play or pause track depending on state
  if (playButton.dataset.playing === "false") {
    audioElement.play();
    playButton.dataset.playing = "true";
  } else if (playButton.dataset.playing === "true") {
    audioElement.pause();
    playButton.dataset.playing = "false";
  }
});

audioElement.addEventListener("ended", () => {
  playButton.dataset.playing = "false";
});
}