const EmailComponent = {
    STATES: {
        0: 'TO_EMAIL',
        1: 'COMFIRM_TO',
        2: 'EMAIL_TILE',
        3: 'COMFIRM_TITLE',
        4: 'SUBJECT'
    },
    state: 0,
    toEmail: '',
    subject: '',
    body: '',
    fromEmail: '',
    run(question, obj, card) {
        console.log('email');
        Speech.component = EmailComponent;
        Speech.speak('who do you want to email? can you spell it for me?');
    },
    execute(response) {
        response = response.toLowerCase();
        switch (this.state) {
            case 0:
                response = response.replace(' at ', '@').replace('dot', '.').replace('.comm', '.com').replace(/\s/g, '');
                this.toEmail = response;
                Speech.speak('okay, so you want to send an email to ' + response + '? yes?');
                this.state++;
                break;
            case 1:
                if (response == 'yes') {
                    this.state++;
                    Speech.speak('whats the title of the email?');
                } else {
                    Speech.speak('who do you want to email? can you spell it for me? or you can say \'exit\' to quit');
                    this.state = 0;
                }
                break;
                // case 2:
                //     response = response.replace(' at ', '@').replace('dot', '.').replace('.comm', '.com').replace(/\s/g, '');
                //     this.fromEmail = response;
                //     Speech.speak('okay, so you want to send an email from ' + response + '? yes?');
                //     this.state++;
                //     break;
            case 2:
                this.subject = response;
                this.state++;
                Speech.speak('so the email title is \'' + response + '\'? yes?');
                break;
            case 3:
                if (response == 'yes') {
                    this.state++;
                    Speech.speak('what do you want to say?');
                } else {
                    //Speech.speak('what is the email address to send from? can you spell it for me?');
                    Speech.speak('what the title of the email?');
                    this.state = 2;
                }
                break;
            case 4:
                this.body = response;
                Speech.speak('so the email says \'' + response + '\'? shall i send this email?');
                this.state++;
                break;
            case 5:
                if (response == 'yes') {
                    Email.send(this.toEmail, this.fromEmail, this.subject,this.body);
                    Speech.speak('email sent');
                    Speech.component = null;
                } else {
                    this.state = 4;
                    Speech.speak('what do you want to say?');
                }
                break;


        }
        console.log('response', response);
    }
};
window.EmailComponent = EmailComponent;
