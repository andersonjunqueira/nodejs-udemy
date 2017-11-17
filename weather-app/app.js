const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address)
  .then((location) => {
    console.log(location.address);

    weather.getWeather(location.latitude, location.longitude)
      .then((weatherData) => {
        console.log(`It is ${weatherData.temperature}, but looks like ${weatherData.apparentTemperature}`);
      });

  }).catch((error) => {
      console.log(error);
  });