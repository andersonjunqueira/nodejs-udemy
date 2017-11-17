const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    
    if(response.data.status = 'ZERO_RESULTS') {
        throw new Error('Unable to find address');
    }

    const forecastApiKey = '211b2255bdb831176892d1b5f9be4c7b';
    const lat = response.data.results[0].geometry.location.latitude;
    const lng = response.data.results[0].geometry.location.longitude;
    var weatherUrl = `https://api.darksky.net/forecast/${forecastApiKey}/${lat},${lng}`;

    axios.get(weatherUrl).then((response) => {

        let temperature = response.data.currently.temperature;
        let apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It is ${temperature}, but looks like ${apparentTemperature}`);

    });

}).catch((error) => {
    if(error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API server');
    } else {
        console.log(error.message);
    }
});