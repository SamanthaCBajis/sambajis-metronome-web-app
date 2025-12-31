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
//instance of the audio context
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var audioElement = document.querySelector("audio");
var track = audioContext.createMediaElementSource(audioElement);
track.connect(audioContext.destination);
var audioBuffer;
// Keep track of the time for the next scheduled beat
var nextBeatTime = audioContext.currentTime;
var nextNoteTime = 0.0;
var currentBeatInMeasure = 1;
// Get the inputs elements and assert their type
var playbackRateElement = document.getElementById("playback-rate-control");
var playbackRateValelement = document.getElementById("playback-rate-value");
var playButton = document.getElementById("playButton");
var pendulum = document.getElementById("full-pendulum");
// Function to load and play audio
function scheduleBeat(time, timeSignatureBeat) {
    return __awaiter(this, void 0, void 0, function () {
        var response, arrayBuffer, audioBuffer, source;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(audioContext.state === 'suspended')) return [3 /*break*/, 2];
                    return [4 /*yield*/, audioContext.resume()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [4 /*yield*/, fetch('metronome-tick.mp3')];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.arrayBuffer()];
                case 4:
                    arrayBuffer = _a.sent();
                    return [4 /*yield*/, audioContext.decodeAudioData(arrayBuffer)];
                case 5:
                    audioBuffer = _a.sent();
                    source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(audioContext.destination);
                    source.loop = true;
                    source.playbackRate.value = +playbackRateElement.value;
                    source.start(0);
                    source.stop(time + 0.05);
                    playbackRateElement.oninput = function () {
                        source.playbackRate.value = +playbackRateElement.value;
                        playbackRateValelement.textContent = playbackRateElement.value;
                    };
                    // Change pitch or volume based on whether it's the first beat of the measure
                    if (timeSignatureBeat === 1) {
                        // Creates a pitch for downbeat
                        source.playbackRate.setValueAtTime(1.0, 0);
                    }
                    else {
                        source.playbackRate.setValueAtTime(2, 0);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//Get Beats Per Minute and Beats Per Measure From User Input
var bpmInput = document.getElementById("bpm");
if (bpmInput) {
    var updateBPMValue = function (event) {
        event.target;
    };
    bpmInput.addEventListener('change', updateBPMValue);
}
var beatsPerMeasureInput = document.getElementById("bpmPerMeasure");
if (beatsPerMeasureInput) {
    var updateBeatsPerMeasure = function (event) {
        event.target;
    };
    beatsPerMeasureInput.addEventListener('change', updateBeatsPerMeasure);
}
function scheduler() {
    var bpm = +bpmInput.value;
    var secondsPerBeat = (60.0 / bpm) / +playbackRateElement.value;
    var beatsPerMeasure = +beatsPerMeasureInput.value;
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
    playButton.onclick = function () {
        if (audioContext.state === "running") {
            audioContext.suspend().then(function () {
                playButton.textContent = "Play";
                pendulum.classList.remove('is-swinging');
            });
        }
        else if (audioContext.state === "suspended") {
            audioContext.resume().then(function () {
                playButton.textContent = "Pause";
                pendulum.classList.add('is-swinging');
            });
        }
        scheduler();
    }, { once: true };
}
