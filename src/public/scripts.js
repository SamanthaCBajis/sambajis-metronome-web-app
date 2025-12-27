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
var _a;
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
console.log(audioContext);
var audioBuffer;
// // Type safety for creating a source from an HTML element.
var audioElement = document.querySelector("audio");
// createMediaElementSource is type-checked
var track = audioContext.createMediaElementSource(audioElement);
// Connecting nodes in a type-safe manner
track.connect(audioContext.destination);
var playButton = document.getElementById("playButton");
// Get the inputs element and assert theyre type
var inputElement = document.getElementById("playback-rate-control");
var outputElement = document.getElementById("playback-rate-value");
var pendulum = document.getElementById("pendulum-full");
(_a = document.getElementById("bpm")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", function (event) {
    var value = event.target.value;
    console.log(value);
});
var bpmString = 400.0;
var bpm = Number(bpmString);
// Seconds per beat (e.g., at 120 BPM, 60 / 120 = 0.5 seconds per beat)
// Use the unary plus (+) to convert the string to a number 
var secondsPerBeat = 60.0 / +bpm;
// Time signature: e.g., 3/4, 4/4, 6/8 time
var BEATS_PER_MEASURE = 3;
var NOTE_VALUE_PER_BEAT = 4; // 4 means a quarter note is one beat
// Duration of a full measure in seconds
var measureDuration = secondsPerBeat * BEATS_PER_MEASURE;
// Example: Duration of a 16th note (a quarter note is 4, a 16th note is 16)
var sixteenthNoteTime = secondsPerBeat / (NOTE_VALUE_PER_BEAT / 4);
// Keep track of the time for the next scheduled beat
var nextBeatTime = audioContext.currentTime;
// The time the next note is due
var nextNoteTime = 0.0;
var currentBeatInMeasure = 1;
// Function to load and play audio (example using a buffer)
function scheduleBeat(time, timeSignatureBeat) {
    return __awaiter(this, void 0, void 0, function () {
        var response, arrayBuffer, audioBuffer_1, source_1, error_1;
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
                    source_1 = audioContext.createBufferSource();
                    source_1.buffer = audioBuffer_1;
                    source_1.connect(audioContext.destination); // Connect to speakers
                    source_1.loop = true;
                    source_1.playbackRate.value = +inputElement.value;
                    source_1.start(0); // Play immediately
                    source_1.stop(time + 0.05);
                    inputElement.oninput = function () {
                        source_1.playbackRate.value = +inputElement.value;
                        outputElement.textContent = inputElement.value;
                    };
                    // Change pitch or volume based on whether it's the first beat of the measure
                    if (timeSignatureBeat === 1) {
                        source_1.playbackRate.setValueAtTime(880, time); // Creates a higher pitch for downbeat
                    }
                    else {
                        source_1.playbackRate.setValueAtTime(440, time);
                    }
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
    playButton.onclick = function () {
        if (audioContext.state === "running") {
            audioContext.suspend().then(function () {
                playButton.textContent = "Resume context";
                pendulum.classList.remove('is-swinging');
            });
        }
        else if (audioContext.state === "suspended") {
            audioContext.resume().then(function () {
                playButton.textContent = "Suspend context";
                pendulum.classList.add('is-swinging');
            });
        }
        scheduler();
    }, { once: true };
}
