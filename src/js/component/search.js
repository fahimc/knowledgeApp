import Knowledge from '../config/knowledge';
import Language from '../lib/language/language';
import Card from './card';
let DataService;

class Search {
  constructor(dataService) {
    DataService = dataService;
    this.element = document.querySelector('[search-component]');
    this.card = new Card(DataService);
    this.addListeners();
    this.element.focus();
  }
  addListeners() {
    this.element.addEventListener('keyup', this.onKeyUp.bind(this));
    //this.element.addEventListener('keydown', this.onFocus.bind(this));
    this.element.addEventListener('focus', this.onFocus.bind(this));
  }
  onFocus(event) {
    this.element.focus();
    this.element.value = '';
  }
  hide() {
    this.card.hide();
    this.element.focus();
    this.card.stop();
  }
  onKeyUp(event) {
      if (event.keyCode === 13) {
        DataService.processRequest(this.element.value,this.card);
      } else {
        this.hide();
      }
    }
}

export default Search;
