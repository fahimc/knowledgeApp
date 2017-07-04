import WeatherComponent from './weather/weather';

class Card {
  constructor() {
    this.element = document.querySelector('[card-component]');
    this.title = this.element.querySelector('.card-title');
    this.desc = this.element.querySelector('.card-desc');
    this.link = this.element.querySelector('.card-link');
    this.image = this.element.querySelector('.image-tag');
  }
  update(question, response) {
    if (question.indexOf('?') < 0) question += '?';
    this.title.textContent = question;
    this.desc.innerHTML = response.text;
    if (response.image) {
      this.image.src = response.image;
    } else {
      this.image.src = 'resource/image/card.jpg';
    }
    if (response.link) {
      this.link.href = response.link.src;
      this.link.textContent = response.link.text;
    }else{
      this.link.href = '#';
      this.link.textContent = '';
    }
    var msg = new SpeechSynthesisUtterance(response.text);
    msg.lang = 'en-GB';
    window.speechSynthesis.speak(msg);
    if(response.component && window[response.component])
    {
      window[response.component].run(question,response);
    }
    this.show();
  }
  hide() {
    this.element.classList.add('hide');
  }
  show() {
    this.element.classList.remove('hide');
  }
  stop(){
    speechSynthesis.cancel();
  }
}

export default Card;
