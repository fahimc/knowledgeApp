const HelpComponent = {
    run(question, obj, card, DataService) {
        console.log(obj, DataService.data);
        let response = obj.text;
        let desc = obj.text + '<br><ul>';
        DataService.data.forEach((item) => {
            if (item.description) desc += '<li>' + item.description + '</li>';
        });
        desc += '</ul>'
        card.updateCard(question, desc,obj.image);
        card.show();
        card.speak(obj.text);
    }
};
window.HelpComponent = HelpComponent;
