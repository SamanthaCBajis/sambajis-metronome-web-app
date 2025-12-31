//instance of the audio context
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
const audioElement = document.querySelector("audio") as HTMLAudioElement;
const track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination);
let audioBuffer;
// Keep track of the time for the next scheduled beat
let nextBeatTime = audioContext.currentTime;
let nextNoteTime: number = 0.0;
let currentBeatInMeasure: number = 1;
// Get the inputs elements and assert their type
const playbackRateElement = document.getElementById("playback-rate-control") as HTMLSelectElement;
const playbackRateValelement = document.getElementById("playback-rate-value") as HTMLSpanElement;
const playButton = document.getElementById("playButton") as HTMLButtonElement;
const pendulum = document.getElementById("full-pendulum") as HTMLInputElement;

// Function to load and play audio
async function scheduleBeat(time: number, timeSignatureBeat: number): Promise<void> {
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
    //Load audio file using fetch and decodeAudioData
    const response = await fetch('metronome-tick.mp3');
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    //Create a source node, connect it, and start playback
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.loop = true;
    source.playbackRate.value = +playbackRateElement.value;
    source.start(0);
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
  const bpm = +bpmInput.value
  const secondsPerBeat = (60.0 / bpm) / +playbackRateElement.value;
  const beatsPerMeasure = +beatsPerMeasureInput.value
  // While loop schedules slightly ahead of time. play sound at 'nextBeatTime'
  while (nextBeatTime < audioContext.currentTime + 0.1) {
    scheduleBeat(nextBeatTime, currentBeatInMeasure);
      // Advance the next beat time by the calculated duration
      nextBeatTime += secondsPerBeat;
      currentBeatInMeasure++;
      // Reset the beat counter for a new measure
      if (currentBeatInMeasure > beatsPerMeasure) {
            currentBeatInMeasure = 1;
      }
  }
  // Use timer to repeatedly call the scheduler
  window.setTimeout(scheduler, 25); 
}

// Start the sequence after user interaction
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