const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=67f28b2ee8f2cc5fcd4504378eeaea77&query='+longitude+','+latitude

    request({url,json:true}, (error, {body} = {}) =>{
        if (error){
            callback('Unable to conect to location services',undefined)
        } else if(body.error){
            callback('unable to find location. try another search',undefined)
        } else {
            //console.log(response.body.current.weather_descriptions[0] + '. está ' +  response.body.current.temperature + ' graus, com sensação termica de ' + response.body.current.feelslike + ' graus')
            //callback(undefined, response.body.current.weather_descriptions[0] + '. está ' +  response.body.current.temperature + ' graus, com sensação termica de ' + response.body.current.feelslike + ' graus')
            //console.log(response.body.current)

            callback(undefined, body.current.weather_descriptions[0] + '. está ' +  body.current.temperature + ' graus, com sensação termica de ' + body.current.feelslike + ' graus e umidade em ' + body.current.humidity+'%')
        }
    })
}

module.exports = forecast