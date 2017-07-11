import Language from '../lib/language/language'
let DataService;
let Search;

const Speech = {
  trigger: 'knowledge',
  recognition: null,
  isListening: false,
  lastTranscript:'',
  listenTimer:null,
  ring: null,
  component:null,
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
    this.recognition.onspeechstart = this.onSpeechStart.bind(this);
    this.recognition.onspeechend = this.onAudioEnd.bind(this);
    this.recognition.onend = this.onEnd.bind(this);
    this.recognition.onerror = this.onError.bind(this);
    this.recognition.start();

  },
  onError(event) {
    //console.log('error',event);
  },
  onSpeechStart() {
    console.log('start speech');
     
     //this.ring.classList.remove('noactive');
  },
  onAudioEnd() {
    this.ring.classList.add('noactive');
  },
  onAudioStart() {
   this.ring.classList.remove('noactive');
  },
  onEnd() {
     
     this.ring.classList.add('noactive');
    this.recognition.start();

  },
  onResult(event) {
    let result = event.results[event.results.length - 1];
    let resultBefore = event.results[event.results.length - 2];
    let saidKnowledgeBefore = this.lastTranscript && this.lastTranscript == this.trigger;
    if (result && result[0] && result[0].transcript) {
      if(result[0].transcript === 'exit')
      {
        this.component = null;
        return;
      }else if(this.component)
      {
        this.component.execute(result[0].transcript);
        return;
      }
      //console.log(Language.distance(result[0].transcript, this.trigger));
      this.lastTranscript = result[0].transcript.trim();
     
      if(this.lastTranscript == this.trigger) {
        this.ring.classList.add('active');   
      }
       this.listenTimer = setTimeout(this.onListenEnd.bind(this),10000);
        console.log('transcript',result[0].transcript);
      if (this.listenTimer && !this.isListening && result[0].transcript !== this.trigger && result[0].transcript.indexOf(this.trigger) >= 0 ||this.listenTimer && !this.isListening && saidKnowledgeBefore && result[0].transcript !== this.trigger) {

        this.onListenEnd();
        DataService.processRequest(result[0].transcript, Search.card);
        //this.triggered();
      
      }
    }
    
  },
  onListenEnd(){
    clearTimeout(this.listenTimer);
     this.ring.classList.remove('active');
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
