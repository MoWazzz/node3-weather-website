const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2F6bzEyMyIsImEiOiJjbWg4eDFucDAxNDhnMmlzNXgwejN3ODB4In0.FmA6V12fAk5HndbTJe0y8A&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            return callback('Unable to connect to location services!', undefined)
        }

        if (!body) {
            return callback('Invalid response from location services', undefined)
        }

        if (body.message) {
            return callback('API Error: ' + body.message, undefined)
        }

        if (!body.features || body.features.length === 0) {
            return callback('Unable to find location. Server response: ' + JSON.stringify(body), undefined)
        }

        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    })

}

module.exports = geocode