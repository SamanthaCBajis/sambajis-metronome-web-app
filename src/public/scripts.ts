//instance of the audio context
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
console.log(audioContext);
// get the audio element
const audioElement = document.querySelector("audio") as HTMLAudioElement;
// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);
// Connecting nodes in a type-safe manner/connect your other nodes to BaseAudioContext.destination, which handles the situation for you
track.connect(audioContext.destination);

//instance of audio buffer
let audioBuffer;
// Get the inputs element and assert theyre type
const playbackRateElement = document.getElementById("playback-rate-control") as HTMLSelectElement;
const playbackRateValelement = document.getElementById("playback-rate-value") as HTMLSpanElement;

// Function to load and play audio (example using a buffer)
async function scheduleBeat(time: number, timeSignatureBeat: number): Promise<void> {
  // Check if audio context is suspended and resume if needed
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
    console.log('AudioContext resumed successfully');
  }

  //Load audio file using fetch and decodeAudioData
    const response = await fetch('metronome-tick.mp3');
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  //Create a source node, connect it, and start playback
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination); // Connect to speakers
    source.loop = true;
    source.playbackRate.value = +playbackRateElement.value;
    source.start(0); // Play immediately
    source.stop(time + 0.05); 

    playbackRateElement.oninput = () => {
      source.playbackRate.value = +playbackRateElement.value;
      playbackRateValelement.textContent = playbackRateElement.value;
    };

  // Change pitch or volume based on whether it's the first beat of the measure
  if (timeSignatureBeat === 1) {
  // Creates a pitch for downbeat
    source.playbackRate.setValueAtTime(1.0, 0);
  } else {
    source.playbackRate.setValueAtTime(2, 0);
  }
}

// Keep track of the time for the next scheduled beat
let nextBeatTime = audioContext.currentTime;
// The time the next note is due
let nextNoteTime: number = 0.0;
let currentBeatInMeasure: number = 1;

//Get Beats Per Minute and Beats Per Measure From User Input
let bpmInput = document.getElementById("bpm") as HTMLSelectElement;
  if (bpmInput) {
    const updateBPMValue = (event: Event): void => {
    event.target as HTMLSelectElement;
  }
    bpmInput.addEventListener('change', updateBPMValue);
}

let beatsPerMeasureInput = document.getElementById("bpmPerMeasure") as HTMLSelectElement;
  if (beatsPerMeasureInput) {
    const updateBeatsPerMeasure = (event: Event): void => {
    event.target as HTMLSelectElement;
  }
    beatsPerMeasureInput.addEventListener('change', updateBeatsPerMeasure);
}

function scheduler(): void {
  // Time signature: e.g., 3/4, 4/4, 6/8 time
  const bpm = +bpmInput.value
  // Seconds per beat (e.g., at 120 BPM, 60 / 120 = 0.5 seconds per beat) 
  const secondsPerBeat = (60.0 / bpm) / +playbackRateElement.value;
  // 1 quarter note, 2 eighth note, 4 sixteenth notes
  const beatsPerMeasure = +beatsPerMeasureInput.value
  // Schedule events for a small window into the future (e.g., 100ms)
  while (nextBeatTime < audioContext.currentTime + 0.1) {
    // Call a function to play a sound or trigger an event at 'nextBeatTime'
    scheduleBeat(nextBeatTime, currentBeatInMeasure);
      // Advance the next beat time by the calculated duration
      nextBeatTime += secondsPerBeat;
      currentBeatInMeasure++;
      // Reset the beat counter for a new measure
      if (currentBeatInMeasure > beatsPerMeasure) {
            currentBeatInMeasure = 1;
      }
  }
  // Use a timer (like setTimeout or setInterval) to repeatedly call the scheduler
  //the while loop compensates by scheduling slightly ahead of the DOM clock time.
  window.setTimeout(scheduler, 25); 
}

const playButton = document.getElementById("playButton") as HTMLButtonElement;
const pendulum = document.getElementById("full-pendulum") as HTMLInputElement;
// Start the sequence after user interaction (required by most browsers)
if (playButton) {
playButton.onclick = () => {
  if (audioContext.state === "running") {
    audioContext.suspend().then(() => {
      playButton.textContent = "Play";
      pendulum.classList.remove('is-swinging');
    });
  } else if (audioContext.state === "suspended") {
    audioContext.resume().then(() => {
      playButton.textContent = "Pause";
      pendulum.classList.add('is-swinging');
    });
  }
   scheduler();
}, { once: true };
}