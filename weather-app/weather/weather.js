const request = require('request');

var getWeather = (lat, lng, callback) => {
  const forecastApiKey = '211b2255bdb831176892d1b5f9be4c7b';
  
  request({
    url: `https://api.darksky.net/forecast/${forecastApiKey}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, { 
        temperature: body.currently.temperature ,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else if (response.statusCode !== 200) {
      callback('Unable to fetch weather data.');
    }
  });
};

module.exports.getWeather = getWeather;
