import TechMeetingService from '../../service/techMeetingService';

const TechMeetingComponent = {
  MOVE_ON: ['move', 'on'],
  topicIndex: 0,
  itemIndex: 0,
  currentTopic: '',
  isStarted: true,
  run(question, obj, card) {
    Speech.component = TechMeetingComponent;
    TechMeetingService.get(this.onMeetingNotes.bind(this));
    Speech.speak('okay. hello everyone, welcome to the tech meeting. I\'m going to get the meeting notes so please give me a second');
  },
  execute(response) {
    if (this.findMatch(response) && this.isStarted) {
      this.next();
    }
  },
  next() {
    this.itemIndex++;
    if (this.itemIndex >= TechMeetingService.data[this.currentTopic].length) {
      this.itemIndex = 0;
      this.topicIndex++;
      if(this.getTopic())Speech.speak('let\'s move to ' + this.getTopic() + ' topics');
    }
    if (this.topicIndex >= Object.keys(TechMeetingService.data).length) {
      Speech.speak('that concludes this tech meeting. thank you.');
      Speech.component = null;
    } else {
      this.currentTopic = this.getTopic();
      let item = TechMeetingService.data[this.currentTopic][this.itemIndex];
      this.say(this.currentTopic, item);
    }
  },
  onMeetingNotes() {
    Speech.speak('let\'s start with the news.');
    this.currentTopic = this.getTopic();
    let item = TechMeetingService.data[this.currentTopic][this.itemIndex];
    setTimeout(()=>{
       this.isStarted=true;
    },5000);
    this.say(this.currentTopic, item);

  },
  say(topic, item) {
    Speech.speak(topic.toLowerCase() + 'topic point ' + (this.itemIndex + 1) + '. ' + item.TITLE + '. ' + item.SPEAKER + ' can you tell us about this?');
  },
  getTopic() {
    switch (this.topicIndex) {
      case 0:
        return 'NEWS';
        break;
      case 1:
        return 'FUTURE';
        break;
      case 2:
        return 'ISSUE';
        break;
    }
  },
  findMatch(value) {
    let count = 0;
    this.MOVE_ON.forEach((keyword) => {
      keyword = keyword.trim();
      keyword = keyword.replace(/\W/g, '');
      var rx = new RegExp(`\\b${keyword}\\b`, 'gim');
      var matches = value.match(rx);
      if (keyword && matches) count++;
    });
    if (count >= this.MOVE_ON.length) {
      return true;
    }
  }
};
window.TechMeetingComponent = TechMeetingComponent;
