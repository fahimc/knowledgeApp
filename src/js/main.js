import Search from "./component/search";

let Main =
{
  init()
  {
    document.addEventListener('DOMContentLoaded', this.onLoaded.bind(this));
  },
  onLoaded()
  {
    let search = new Search();
  }
};

Main.init();




