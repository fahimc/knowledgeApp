const WeatherComponent = {
  run() {
    Weather.APIKEY = '15dc609387661550dd0221e70d5bb93a';
    Weather.getCurrent("Kansas City", function(current) {
      console.log(
        ["currently:", current.temperature(), "and", current.conditions()].join(" ")
      );
    });
  }
};
window.WeatherComponent = WeatherComponent;
