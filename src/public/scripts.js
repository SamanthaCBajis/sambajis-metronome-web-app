var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// TypeScript automatically recognizes AudioContext and other Web Audio API interfaces
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var audioBuffer;
// // Type safety for creating a source from an HTML element
var audioElement = document.querySelector("audio"); // Cast to specific type
var track = audioContext.createMediaElementSource(audioElement); // createMediaElementSource is type-checked
// Connecting nodes in a type-safe manner
track.connect(audioContext.destination);
var playButton = document.getElementById("playButton");
// Get the input element and assert its type
var inputElement = document.getElementById("bpmSlider");
var outputElement = document.getElementById("bpmValue");
var bpmString = 120;
var bpm = Number(bpmString);
// Use the unary plus (+) to convert the string to a number 
var secondsPerBeat = 60 / +bpm;
// Keep track of the time for the next scheduled beat
var nextBeatTime = audioContext.currentTime;
// Function to load and play audio (example using a buffer)
function scheduleBeat(time) {
    return __awaiter(this, void 0, void 0, function () {
        var response, arrayBuffer, audioBuffer_1, source, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(audioContext.state === 'suspended')) return [3 /*break*/, 2];
                    return [4 /*yield*/, audioContext.resume()];
                case 1:
                    _a.sent();
                    console.log('AudioContext resumed successfully');
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 7]);
                    return [4 /*yield*/, fetch('metronome-85688.mp3')];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.arrayBuffer()];
                case 4:
                    arrayBuffer = _a.sent();
                    return [4 /*yield*/, audioContext.decodeAudioData(arrayBuffer)];
                case 5:
                    audioBuffer_1 = _a.sent();
                    source = audioContext.createBufferSource();
                    source.buffer = audioBuffer_1;
                    source.connect(audioContext.destination); // Connect to speakers
                    source.start(0); // Play immediately
                    source.stop(time + 0.05);
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error loading or playing audio:', error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
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
    playButton.onclick = function () {
        if (audioContext.state === "running") {
            audioContext.suspend().then(function () {
                playButton.textContent = "Resume context";
            });
        }
        else if (audioContext.state === "suspended") {
            audioContext.resume().then(function () {
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
