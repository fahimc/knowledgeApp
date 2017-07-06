const ClockComponent = {
    run(question, obj, card,endCallback) {
        let d = new Date();
        let hours = d.getHours(); // => 9
        let minutes = this.checkTime(d.getMinutes()); // =>  30
        let secs = this.checkTime(d.getSeconds()); // => 51
        let component = `<div class="clock-component"><h1>${hours}:${minutes}:${secs}</h1></div>`;
        let desc = `Currently time is ${hours}:${minutes}`;
        card.updateCard(question, desc, 'resource/image/card.jpg');
        card.addCustomComponent(component);
        card.show();
        card.endCallback = endCallback;
        card.speak(desc);
    },
    checkTime(i) {
        if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
        return i;
    }
};
window.ClockComponent = ClockComponent;
