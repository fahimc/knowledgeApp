import POSITIVE_WORDS from './positive-words';
import NEGATIVE_WORDS from './negative-words';

const ConversationComponent = {
  STATES: {
    NAME: 'NAME',
    MOOD: 'MOOD',
    DOING: 'DOING'
  },
  currentPerson: {
    name: '',
  },
  types: {
    NAME: {
      responses: [
        'my name is Knowledge'
      ],
      keywords: [
        ['your', 'name']
      ]
    },
    MOOD: {
      responses: [
        'how are you?',
        'how are you feeling?'
      ],
      keywords: [
        ['how', 'are', 'you'],
        ['how', 'you', 'feeling']
      ]
    },
    DOING: {
      responses: [
        'how are you?',
        'how are you feeling?'
      ],
      keywords: [
        ['how', 'are', 'you'],
        ['how', 'you', 'feeling']
      ]
    }
  },
  state: 'NAME',
  run(question, obj, card) {
    Speech.component = ConversationComponent;

    Speech.speak('okay great! Who am I speaking to?');
    /*
     1. find out who you are speaking to
     2. have you spoken to them before? if so 
     3. ask them how you are

    */
  },
  execute(response) {
    console.log(response);
    switch (this.state) {
      case this.STATES.NAME:
        this.currentPerson.name = response;
        Speech.speak('hey, ' + response);
        this.askMood();
        break;
      case this.STATES.MOOD:
        let isPositive = this.isPositive(response);
        if(isPositive){
          Speech.speak('thats good to hear ' + this.currentPerson.name + '! i also feel good today. what have you been upto?');
        }else{
          Speech.speak(this.currentPerson.name + ' i\'m sure you\'ll have a positive day! i\'m feeling positive about today. what have you been upto?');
        }
        this.state = this.STATES.DOING;
        break;
        case this.STATES.DOING:
        Speech.speak('Sounds good. I\'ve been reading the news and watching Youtube');
        break
    }
  },
  isPositive(sentense) {
    sentense = sentense.toLowerCase();
    let words = sentense.split(' ');
    let count = 0;
    words.forEach((sentenseWord,index) => {
      if(words[index-1] && words[index-1] == 'not')count--;
      POSITIVE_WORDS.forEach((word) => {
        if (sentenseWord == word) count++;
      });
      NEGATIVE_WORDS.forEach((word) => {
        if (sentenseWord == word) count--;
      });
    });

    return count;
  },
  askMood() {
    this.state = this.STATES.MOOD;
    let response = this.types.MOOD.responses[0];
    Speech.speak(response);
  },
  respond() {

  }
};
window.ConversationComponent = ConversationComponent;
