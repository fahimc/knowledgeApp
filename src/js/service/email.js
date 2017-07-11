const Email = {
  init() {
    emailjs.init("user_4LDEvPZEzylz3QdJoYb5W");
  },
  send(to,from,subject,message){
    emailjs.send("default_service","generic",{to_email: to, from_name: from, subject: subject,message:message});
  }
}
window.Email = Email;
export default Email;
