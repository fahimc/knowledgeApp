import Language from '../lib/language/language'
const Speech = {
  trigger:'knowledge',
  recognition:null,
  isListening:false,
  init() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.onresult = this.onResult.bind(this);
    this.recognition.onend = this.onEnd.bind(this);
    this.recognition.start();

  },
  onEnd(){
     this.recognition.start();
  },
  onResult(event) {
    let result = event.results[0];
    if (result && result[0] && result[0].transcript) {
      console.log(result[0].transcript);
      console.log(Language.distance(result[0].transcript, this.trigger));
      if(!this.isListening && result[0].transcript == this.trigger)this.triggered();

    }
  },
  triggered(){
    this.speak('how can i help?');
  },
  speak(text) {
    var msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-GB';
    window.speechSynthesis.speak(msg);
  }
}

export default Speech;
