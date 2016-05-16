var five = require('johnny-five');
 
five.Board().on('ready', function() {
  var temperature = new five.Thermometer({
    controller: 'DS18B20',
    pin: 2
  });
 
  temperature.on('data', function() {
    console.log(this.celsius + '°C', this.fahrenheit + '°F');
  });
});
