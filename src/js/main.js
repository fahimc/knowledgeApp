import Search from "./component/search";
import DataService from "./service/dataService";
import Speechrecognition from "./service/speechrecognition";

let Main =
{
  init()
  {
    document.addEventListener('DOMContentLoaded', this.onLoaded.bind(this));
  },
  onLoaded()
  {
    Speechrecognition.init();
    DataService.get(this.onDataComplete.bind(this));
  },
  onDataComplete(){
    let search = new Search(DataService);
  }
};

Main.init();




