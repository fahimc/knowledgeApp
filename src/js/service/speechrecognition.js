import Language from '../lib/language/language'
let DataService;
let Search;

const Speech = {
    trigger: 'knowledge',
    recognition: null,
    isListening: false,
    ring: null,
    init(dataService, search) {
        DataService = dataService;
        Search = search;
        this.ring = document.querySelector('.ring');
        this.recognition = new webkitSpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.lang = 'en-GB';
        this.recognition.interimResults = false;
        this.recognition.onresult = this.onResult.bind(this);
        this.recognition.onaudiostart = this.onAudioStart.bind(this);
        this.recognition.onaudioend = this.onAudioEnd.bind(this);
        this.recognition.onend = this.onEnd.bind(this);
        this.recognition.start();

    },
    onAudioEnd() {
        this.ring.classList.add('active');
    },
    onAudioStart() {
        console.log('Audio capturing started');
        this.ring.classList.remove('noactive');
    },
    onEnd() {
        this.ring.classList.remove('active');
        this.ring.classList.add('noactive');
        this.recognition.start();
    },
    onResult(event) {
        let result = event.results[event.results.length - 1];
        if (result && result[0] && result[0].transcript) {
            console.log(result[0].transcript);
            //console.log(Language.distance(result[0].transcript, this.trigger));
            if (!this.isListening && result[0].transcript.indexOf(this.trigger) >= 0) {
                console.log('found');
                DataService.processRequest(result[0].transcript, Search.card);
                //this.triggered();
            }
        }
    },
    triggered() {
        setTimeout(() => {
            this.speak('how can i help?');
        }, 500);
    },
    speak(text) {
        var msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'en-GB';
        window.speechSynthesis.speak(msg);
    }
}
window.Speech = Speech;
export default Speech;
