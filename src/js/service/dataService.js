const DataService = {
  URL: 'https://docs.google.com/a/vccp.com/spreadsheets/d/1yCz3ziGuY7pR7lGQoheEDo0Dtc6f76cslS7YYn5fCNA/pubhtml',
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
    this.rawData = data;
    this.parseData();
    if (this.callback) this.callback();
    this.poll();
  },
  parseData() {
    this.data = [];
    this.rawData.forEach((item) => {
      let obj = {
        image: item.IMAGE,
        component: item.COMPONENT,
        link: {
          src: item['LINK SRC'],
          text: item['LINK TEXT'],
        },
        response: item.RESPONSE,
        keywords: this.getKeywords(item.KEYWORDS)
      };
      this.data.push(obj);
    });
  },
  poll() {
    this.timer = setTimeout(() => {
      this.get();
    }, this.pollDuration);
  },
  getKeywords(keywords) {
    let collection = [];
    let arr = keywords.split('|');
    arr.forEach((list) => {
      let keywordList = list.split(',');
      collection.push(keywordList);
    });

    return collection;
  },
  processRequest(value,card) {
    console.log('is speaking',this.isSpeaking);
    if(this.isSpeaking)return;
    this.isSpeaking = true;
    card.hide();
    let response = DataService.findMatch(value.toLowerCase());
    card.update(value, response,this.onSpeakEnd.bind(this));
  },
  onSpeakEnd(){
    console.log('speak ended');
     this.isSpeaking = false;
  },
  findMatch(value) {
    let response = {
      text: 'I didn\'t find the anwser to your question',
      link: ''
    };
    let currentDistance = 0;
    this.data.forEach((obj) => {
      obj.keywords.forEach((keywordsCollection) => {
        let count = 0;
        keywordsCollection.forEach((keyword) => {
          keyword = keyword.trim();
          keyword = keyword.replace(/\W/g, '');
          var rx = new RegExp(`\\b${keyword}\\b`, 'gim');
          var matches = value.match(rx);
          if (keyword && matches) count++;
        });
        //let distance = Language.distance(value, question);
        //console.log(distance);
        // if (distance > 0.55 && distance > currentDistance) {
        if (count >= keywordsCollection.length) {
          //currentDistance = distance;
          response = {
            text: obj.response,
            link: obj.link,
            image: obj.image,
            component: obj.component
          };
        }
      });

    });

    return response;
  }
};

export default DataService;
