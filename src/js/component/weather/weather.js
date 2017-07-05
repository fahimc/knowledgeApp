const WeatherComponent = {
    run(question, obj, card) {
        $.simpleWeather({
            location: 'England, UK',
            woeid: '',
            unit: 'c',
            success: function(weather) {
                // html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
                // html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
                // html += '<li class="currently">'+weather.currently+'</li>';
                // html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';

                // $("#weather").html(html);
                let desc = `Currently the weather is ${weather.currently}`;
                card.updateCard(question, desc,'resource/image/weather.jpg');
                card.show();
                card.speak(desc);
                console.log(weather);
            },
            error: function(error) {
                $("#weather").html('<p>' + error + '</p>');
            }
        });
    }
};
window.WeatherComponent = WeatherComponent;
