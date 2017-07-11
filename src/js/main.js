import Search from "./component/search";
import DataService from "./service/dataService";
import Email from "./service/email";
import Speechrecognition from "./service/speechrecognition";
import Calendar from "./service/calendar";

let Main = {
    init() {
        document.addEventListener('DOMContentLoaded', this.onLoaded.bind(this));
    },
    onLoaded() {
        Email.init();
        DataService.get(this.onDataComplete.bind(this));
    },
    onDataComplete() {
        let search = new Search(DataService);
        Speechrecognition.init(DataService, search);
        Calendar.init();
    }
};

Main.init();
