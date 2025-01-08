let recognition = null;
let isRecording = false;
let permissionGranted = false;
let onInputCallback = null;

export function setOnInputCallback(callback) {
    onInputCallback = callback;
}

export async function requestMicrophonePermission() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        permissionGranted = true;
        initSpeechRecognition();
        return true;
    } catch (error) {
        console.error('Errore nei permessi del microfono:', error);
        return false;
    }
}

function initSpeechRecognition() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'it-IT';

        recognition.onstart = () => updateRecordingState(true);
        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            if (onInputCallback) {
                onInputCallback(text);
            }
        };
        recognition.onerror = (event) => {
            console.error('Errore nel riconoscimento vocale:', event.error);
            updateRecordingState(false);
        };
        recognition.onend = () => updateRecordingState(false);
    }
}

export function startRecognition() {
    if (recognition && !isRecording) {
        recognition.start();
    }
}

export function stopRecognition() {
    if (recognition && isRecording) {
        recognition.stop();
    }
}

function updateRecordingState(recording) {
    isRecording = recording;
    const micButton = document.getElementById('mic-button');
    if (recording) {
        micButton.classList.add('recording');
        micButton.textContent = '⏺️';
    } else {
        micButton.classList.remove('recording');
        micButton.textContent = '🎤';
    }
}

export function tts(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'it-IT'; // Imposta la lingua italiana
        utterance.volume = 1; // Volume massimo (range da 0 a 1)
        utterance.rate = 1;   // Velocità normale (range da 0.1 a 10)
        utterance.pitch = 1;  // Tono normale (range da 0 a 2)
        window.speechSynthesis.speak(utterance);

        utterance.onstart = () => {
            console.log('La sintesi vocale è iniziata.');
        };

        utterance.onend = () => {
            console.log('La sintesi vocale è terminata.');
        };

        utterance.onerror = (event) => {
            console.error('Errore durante la sintesi vocale:', event.error);
        };
    } else {
        console.error('Il browser non supporta l\'API SpeechSynthesis.');
    }
}
