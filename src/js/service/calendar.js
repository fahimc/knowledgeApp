const Calendar = {
  http:null,
  init() {
   // this.load('https://calendar.google.com/calendar/ical/vccpdeveloperslondon%40gmail.com/private-99a1befba446ee7631a87379159a6aaa/basic.ics');

  },
  load(file) {
    this.http = new XMLHttpRequest();
    this.http.open("GET", file, false);
    this.http.onreadystatechange = this.onLoad.bind(this);
    this.http.send(null);
  },
  onLoad(){
     if (this.http.readyState === 4) {
        if (this.http.status === 200 || this.http.status == 0) {
          var allText = this.http.responseText;
          console.log(allText);
        }
      }
  }
}
window.Calendar = Calendar;
export default Calendar;
