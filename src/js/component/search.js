import Knowledge from '../config/knowledge';
import Card from './card';

class Search {
    constructor() {
        this.element = document.querySelector('[search-component]');
        this.card = new Card();
        this.addListeners();
    }
    addListeners() {
        this.element.addEventListener('keyup', this.onKeyUp.bind(this));
        this.element.addEventListener('keydown', this.onFocus.bind(this));
        //this.element.addEventListener('focus', this.onFocus.bind(this));
    }
    onFocus(event) {
        this.card.hide();
        this.element.focus();
    }
    onKeyUp(event) {
        if (event.keyCode === 13) {
            this.card.hide();
            let response = this.findMatch(this.element.value.toLowerCase());
            this.card.update(this.element.value, response);
        }
    }
    findMatch(value) {
        let response = {
            text: 'I didn\'t find the anwser to your question',
            link: ''
        };
        Knowledge.forEach((obj) => {
            let found = 0;
            let length = obj.keywords.length;
            obj.keywords.forEach((keyword) => {
                if (value.indexOf(keyword.toLowerCase()) >= 0) found++;
            });
            let percentage = found / length;
            if (percentage > 0.7) {
                response = {
                    text: obj.response,
                    link: obj.link,
                    image:obj.image
                };
            }

        });

        return response;
    }
}

export default Search;
