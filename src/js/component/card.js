import WeatherComponent from './weather/weather';
import ClockComponent from './clock/clock';

class Card {
    constructor() {
        this.element = document.querySelector('[card-component]');
        this.title = this.element.querySelector('.card-title');
        this.desc = this.element.querySelector('.card-desc');
        this.link = this.element.querySelector('.card-link');
        this.image = this.element.querySelector('.image-tag');
        this.custom = this.element.querySelector('[custom-component]');
    }
    update(question, response) {
        if (response.component && window[response.component]) {
            window[response.component].run(question, response, this);
            return;
        }
        this.custom.innerHTML = '';
        if (question.indexOf('?') < 0) question += '?';
        this.title.textContent = question;
        this.desc.innerHTML = response.text;
        if (response.image) {
            this.image.src = response.image;
            this.image.onerror = ()=>{
                this.image.src = 'resource/image/card.jpg';
            };
        } else {
            this.image.src = 'resource/image/card.jpg';
        }
        this.image.style.display="block";
        if (response.link) {
            this.link.href = response.link.src;
            this.link.textContent = response.link.text;
        } else {
            this.link.href = '#';
            this.link.textContent = '';
        }

        this.speak(response.text);
        this.show();
    }
    speak(text) {
        var msg = new SpeechSynthesisUtterance(this.strip(text));
        msg.lang = 'en-GB';
        window.speechSynthesis.speak(msg);
    }
    hide() {
        this.element.classList.add('hide');
    }
    show() {
        this.element.classList.remove('hide');
    }
    stop() {
        speechSynthesis.cancel();
    }
    updateCard(title, desc, image) {
        this.title.textContent = title;
        this.desc.innerHTML = desc;
        this.image.src = image;
    }
    strip(html) {
        // var tmp = document.createElement("DIV");
        // tmp.innerHTML = html;
        // return tmp.textContent || tmp.innerText || "";
        return html.replace(/<br\s*[\/]?>/gi, "\n");
    }
    addCustomComponent(content,hideImage) {
        if(hideImage)this.image.style.display="none";
        this.custom.innerHTML = content;
    }
}

export default Card;
