let audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
console.log(audioContext);
let audioBuffer;
// // Type safety for creating a source from an HTML element.
const audioElement = document.querySelector("audio") as HTMLAudioElement;
// createMediaElementSource is type-checked
const track = audioContext.createMediaElementSource(audioElement);
// Connecting nodes in a type-safe manner
track.connect(audioContext.destination);

const playButton = document.getElementById("playButton");

// Get the inputs element and assert theyre type
const inputElement = document.getElementById("playback-rate-control") as HTMLInputElement;
const outputElement = document.getElementById("playback-rate-value") as HTMLInputElement;


const pendulum = document.getElementById("pendulum-full") as HTMLInputElement;
document.getElementById("bpm")?.addEventListener("input", (event) => {
  const value = (event.target as HTMLInputElement).value;
  console.log(value);
});

const bpmString = 120.0;
const bpm = Number(bpmString);
// Seconds per beat (e.g., at 120 BPM, 60 / 120 = 0.5 seconds per beat)
// Use the unary plus (+) to convert the string to a number 
const secondsPerBeat = 60.0 / +bpm;


// Time signature: e.g., 3/4, 4/4, 6/8 time
const BEATS_PER_MEASURE: number = 3;
const NOTE_VALUE_PER_BEAT: number = 4; // 4 means a quarter note is one beat

// Duration of a full measure in seconds
const measureDuration: number = secondsPerBeat * BEATS_PER_MEASURE;

// Example: Duration of a 16th note (a quarter note is 4, a 16th note is 16)
const sixteenthNoteTime: number = secondsPerBeat / (NOTE_VALUE_PER_BEAT / 4);

// Keep track of the time for the next scheduled beat
let nextBeatTime = audioContext.currentTime;
// The time the next note is due
let nextNoteTime: number = 0.0;
let currentBeatInMeasure: number = 1;


// Function to load and play audio (example using a buffer)
async function scheduleBeat(time: number, timeSignatureBeat: number): Promise<void> {
  // Check if context is suspended and resume if needed
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
    console.log('AudioContext resumed successfully');
  }

  // 2. Load audio file (using fetch and decodeAudioData)
  try {
    const response = await fetch('metronome-85688.mp3');
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // 3. Create a source node, connect it, and start playback
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination); // Connect to speakers
    source.loop = true;
    source.playbackRate.value = +inputElement.value;
    source.start(0); // Play immediately
    source.stop(time + 0.05); 

    inputElement.oninput = () => {
    source.playbackRate.value = +inputElement.value;
    outputElement.textContent = inputElement.value;
};

  // Change pitch or volume based on whether it's the first beat of the measure
  if (timeSignatureBeat === 1) {
    source.playbackRate.setValueAtTime(880, time); // Creates a higher pitch for downbeat
  } else {
    source.playbackRate.setValueAtTime(440, time);
  }
  } catch (error) {
    console.error('Error loading or playing audio:', error);
  }
}


function scheduler(): void {
    // Schedule events for a small window into the future (e.g., 100ms)
    while (nextBeatTime < audioContext.currentTime + 0.1) {
        // Call a function to play a sound or trigger an event at 'nextBeatTime'
        scheduleBeat(nextBeatTime, currentBeatInMeasure);

        // Advance the next beat time by the calculated duration
        nextBeatTime += secondsPerBeat;
        currentBeatInMeasure++;

            // Reset the beat counter for a new measure
    if (currentBeatInMeasure > BEATS_PER_MEASURE) {
      currentBeatInMeasure = 1;
    }
  }
    // Use a timer (like setTimeout or setInterval) to repeatedly call the scheduler
    //the while loop compensates by scheduling slightly ahead of the DOM clock time.
    window.setTimeout(scheduler, 25); 
  }

// Start the sequence after user interaction (required by most browsers)
if (playButton) {
playButton.onclick = () => {
  if (audioContext.state === "running") {
    audioContext.suspend().then(() => {
      playButton.textContent = "Resume context";
      pendulum.classList.remove('is-swinging');
    });
  } else if (audioContext.state === "suspended") {
    audioContext.resume().then(() => {
      playButton.textContent = "Suspend context";
      pendulum.classList.add('is-swinging');
    });
  }
   scheduler();
}, { once: true };
}