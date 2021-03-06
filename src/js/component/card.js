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
    this.endCallback;
  }
  update(question, response,endCallback) {
    console.log('update');
     this.endCallback = endCallback;
    if (response.component && window[response.component]) {
      window[response.component].run(question, response, this,endCallback);
      return;
    }
    this.custom.innerHTML = '';
    if (question.indexOf('?') < 0) question += '?';
    this.title.textContent = question;
    this.desc.setAttribute('style', 'white-space: pre;');
    this.desc.textContent = response.text;
    if (response.image) {
      this.image.style.backgroundImage = 'url(' + response.image + ')';
      this.image.onerror = () => {
        this.image.style.backgroundImage = 'url(../resource/image/card.jpg)';
      };
    } else {
      this.image.style.backgroundImage = 'url(../resource/image/card.jpg)';
    }
    this.image.style.display = "block";
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
  reset() {
    this.image.style.backgroundImage = '';
    this.custom.innerHTML = '';
    this.title.textContent = '';
    this.desc.textContent = '';
    this.link.href = '#';
    this.link.textContent = '';
  }
  speak(text) {
    console.log('speak()');
    var msg = new SpeechSynthesisUtterance(this.strip(text));
    msg.onend = this.onSpeekEnd.bind(this);
    msg.lang = 'en-GB';
    window.speechSynthesis.speak(msg);
  }
  onSpeekEnd(){
    console.log('speak end card');
    if(this.endCallback)this.endCallback();
    this.endCallback = undefined;
  }
  hide() {
    this.element.classList.add('hide');
    this.reset();
  }
  show() {
    this.element.classList.remove('hide');
  }
  stop() {
    speechSynthesis.cancel();
    if(this.endCallback)this.endCallback();
  }
  updateCard(title, desc, image) {
    this.title.textContent = title;
    this.desc.innerHTML = desc;
    this.image.style.backgroundImage = 'url(' + image + ')';
  }
  strip(html) {
    // var tmp = document.createElement("DIV");
    // tmp.innerHTML = html;
    // return tmp.textContent || tmp.innerText || "";
    return html.replace(/<br\s*[\/]?>/gi, "\n");
  }
  addCustomComponent(content, hideImage) {
    if (hideImage) this.image.style.display = "none";
    this.custom.innerHTML = content;
  }
}

export default Card;
