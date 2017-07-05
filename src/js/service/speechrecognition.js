import Language from '../lib/language/language'
let DataService;
let Search;

const Speech = {
  trigger: 'knowledge',
  recognition: null,
  isListening: false,
  init(dataService, search) {
    DataService = dataService;
    Search = search;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.lang = 'en-GB';
    this.recognition.interimResults = false;
    this.recognition.onresult = this.onResult.bind(this);
    this.recognition.onend = this.onEnd.bind(this);
    this.recognition.start();

  },
  onEnd() {
    this.recognition.start();
  },
  onResult(event) {
    let result = event.results[event.results.length - 1];
    if (result && result[0] && result[0].transcript) {
      console.log(result[0].transcript);
      console.log(Language.distance(result[0].transcript, this.trigger));
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

export default Speech;
