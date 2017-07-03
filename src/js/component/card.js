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
        this.desc.textContent = response.text;
        if (response.image) {
            this.image.src = response.image;
        } else {
            this.image.src = 'resource/image/card.jpg';
        }
        if (response.link) {
            this.link.href = response.link.src;
            this.link.textContent = response.link.text
        }
        var msg = new SpeechSynthesisUtterance(response.text);
        window.speechSynthesis.speak(msg);
        this.show();
    }
    hide() {
        this.element.classList.add('hide');
    }
    show() {
        this.element.classList.remove('hide');
    }
}

export default Card;
