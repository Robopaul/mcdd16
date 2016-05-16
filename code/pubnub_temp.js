var five = require('johnny-five');
var pubnub = require('pubnub')({
  publish_key: 'pub-c-788fbf88-25a7-4438-9e93-aa552524a68d',
  subscribe_key: 'sub-c-d9cd0cde-0ee0-11e6-a8fd-02ee2ddab7fe'
});
var temp = 0;
var channel = 'temperature-ds18b20';

five.Board().on('ready', function() {
  var temperature = new five.Thermometer({
    controller: 'DS18B20',
    pin: 2
  });
 
  temperature.on('data', function() {
    temp = this.celsius;
    console.log(temp + '°C');
  });
});

setInterval(publish, 3000);

function publish() {
  var data = {
    'temperature': temp,
  };
  pubnub.publish({
    channel: channel,
    message: data,
  });
}


