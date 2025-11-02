const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=350c4c5d9c4f2ae8465ccf85e83e05ca&query=' + latitude + ',' + longitude + '&units=f'
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const current = body.current
            callback(undefined, 
                body.current.weather_descriptions[0] + 
                '. It is currently ' + body.current.temperature + 
                ' degrees out. It feels like ' + body.current.feelslike + 
                ' degrees out. The humidity is ' + body.current.humidity + ' %.' +
                ' wind direction.' + body.current.wind_dir
            )
        }
    })
}

module.exports = forecast