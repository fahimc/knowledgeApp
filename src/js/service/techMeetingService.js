const TechMeetingService = {
  URL: 'https://docs.google.com/spreadsheets/d/13mgAF_sMiY5EZb52fdR8nZgVaH-kXV70oWb7pgZjSBA/pubhtml',
  callback: null,
  rawData: null,
  data: null,
  timer: null,
  pollDuration: 10000,
  isSpeaking:false,
  get(callback) {
    this.callback = callback;
    Tabletop.init({
      key: this.URL,
      callback: this.onData.bind(this),
      simpleSheet: true
    });
  },
  onData(data, tabletop) {
    console.log(data);
    this.rawData = data;
    this.parseData();
    if (this.callback) this.callback();
    
  },
  parseData() {
    this.data = {};
    this.rawData.forEach((item)=>{
      item.TYPE = item.TYPE.toUpperCase();
      if(!this.data[item.TYPE])this.data[item.TYPE] = [];
      this.data[item.TYPE].push(item);
    });
    console.log(this.data);
  },
  
};

export default TechMeetingService;
