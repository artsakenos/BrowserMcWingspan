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
                onInputCallback(text); // Richiama la callback con il testo ascoltato
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
