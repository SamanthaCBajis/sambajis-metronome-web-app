// TypeScript automatically recognizes AudioContext and other Web Audio API interfaces
let audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
let audioBuffer;

// // Type safety for creating a source from an HTML element
const audioElement = document.querySelector("audio") as HTMLAudioElement; // Cast to specific type
const track = audioContext.createMediaElementSource(audioElement); // createMediaElementSource is type-checked
// Connecting nodes in a type-safe manner
track.connect(audioContext.destination);

const playButton = document.getElementById("playButton");


// Get the input element and assert its type
const inputElement = document.getElementById("bpmSlider") as HTMLInputElement;
const outputElement = document.getElementById("bpmValue") as HTMLInputElement;
const bpmString = 120;
var bpm = Number(bpmString);
// Use the unary plus (+) to convert the string to a number 
const secondsPerBeat = 60 / +bpm;


// Keep track of the time for the next scheduled beat
let nextBeatTime = audioContext.currentTime;


// Function to load and play audio (example using a buffer)
async function scheduleBeat(time: number) {
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
    source.start(0); // Play immediately
    source.stop(time + 0.05); 
  } catch (error) {
    console.error('Error loading or playing audio:', error);
  }
}


function scheduler() {
    // Schedule events for a small window into the future (e.g., 100ms)
    while (nextBeatTime < audioContext.currentTime + 0.1) {
        // Call a function to play a sound or trigger an event at 'nextBeatTime'
        scheduleBeat(nextBeatTime);

        // Advance the next beat time by the calculated duration
        nextBeatTime += secondsPerBeat;
    }
    
    // Use a timer (like setTimeout or setInterval) to repeatedly call the scheduler
    // Note: setTimeout/setInterval is less precise than the audio clock, 
    // but the while loop compensates by scheduling slightly ahead of the DOM clock time.
    window.setTimeout(scheduler, 25); 
}


  console.log(audioContext);

// Start the sequence after user interaction (required by most browsers)
if (playButton) {
playButton.onclick = () => {
  if (audioContext.state === "running") {
    audioContext.suspend().then(() => {
      playButton.textContent = "Resume context";
    });
  } else if (audioContext.state === "suspended") {
    audioContext.resume().then(() => {
      playButton.textContent = "Suspend context";
    });
  }
   scheduler();
}, { once: true };
}
























// function bpmToSeconds(bpm: number): number {
//   // A minute has 60 seconds. At 120 BPM, a beat is 0.5 seconds long.
//   return 60.0 / bpm;
// }

// function getNextBeatTime(
//   audioContext: AudioContext,
//   bpm: number,
//   currentBeatTime: number
// ): number {
//   const secondsPerBeat = bpmToSeconds(bpm);
//   let nextNoteTime = currentBeatTime;

//   // Advance the time until it is in the future relative to the audio context's current time
//   while (nextNoteTime < audioContext.currentTime) {
//     nextNoteTime += secondsPerBeat;
//   }
//   return nextNoteTime;
// }

// const LOOKAHEAD_TIME = 0.1; // seconds
// const SCHEDULE_INTERVAL = 25; // milliseconds

// let bpm = 120;
// let nextNoteTime = 0.0;
// let intervalId: number | null = null;

// function scheduleNote(context: AudioContext, time: number) {
//   // Example: create a simple oscillator beep
//   const oscillator = context.createOscillator();
//   oscillator.type = "sine";
//   oscillator.frequency.setValueAtTime(800, time); // Set frequency at the precise time

//   const gainNode = context.createGain();
//   gainNode.gain.setValueAtTime(1, time);
//   gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.1); // Quick fade out

//   oscillator.connect(gainNode);
//   gainNode.connect(context.destination);
//   oscillator.start(time);
//   oscillator.stop(time + 0.1);
// }

// function scheduler() {
//   const context = getAudioContext();

//   // Schedule all notes that fall within our lookahead window
//   while (nextNoteTime < context.currentTime + LOOKAHEAD_TIME) {
//     scheduleNote(context, nextNoteTime);
//     // Advance the next note time by one beat duration
//     nextNoteTime += bpmToSeconds(bpm);
//   }

//   // Call this function again after a short interval
//   if (intervalId !== null) {
//     intervalId = setTimeout(scheduler, 1000, SCHEDULE_INTERVAL);
//   }
// }

// function startSequencer() {
//   const context = getAudioContext();
//   if (intervalId !== null) return; // Already running

//   nextNoteTime = context.currentTime; // Start scheduling from 'now'
//   intervalId = setTimeout(scheduler, 1000, SCHEDULE_INTERVAL);
//   console.log("Sequencer started with BPM:", bpm);
// }

// function stopSequencer() {
//   if (intervalId !== null) {
//     clearTimeout(intervalId);
//     intervalId = null;
//     console.log("Sequencer stopped");
//   }
// }




// if (playButton) {
//       playButton.addEventListener("click", () => {
//         // Check if context is in suspended state (autoplay policy)
//         // Resume context if suspended (common for initial user interaction)
//         if (audioContext.state === "suspended") {
//           audioContext.resume().then(() => {
//             console.log("AudioContext successfully resumed");
//           });
//         }

//         // Play or pause track depending on state
//         if (playButton.dataset.playing === "false") {
//           audioElement.play().then(() => {
//             console.log("AudioContext successfully started");
//           });
//           playButton.dataset.playing = "true";
//         } else if (playButton.dataset.playing === "true") {
//           audioElement.pause();
//           playButton.dataset.playing = "false";
//         }
//       });

//       audioElement.addEventListener("ended", () => {
//         playButton.dataset.playing = "false";
//       });
//     }