/*
console.log('Starting')

setTimeout(() => {
    console.log('2 Second Timer')
}, 2000)

setTimeout(() => {
    console.log('0 second Timer')
}, 0)

console.log('Stopping')*/

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const address = process.argv[2]

if (!address){
    console.log('please provide address')
} else {
    geocode(address, (error, {latitude, longitude, location} = {}) => {

        if (error){
            return console.log('Error', error)
        }

        //const {latitude, longitude, location} = data

        //console.log('data',data)

        forecast(latitude, longitude, (error, forecastData) => {

            if (error){
                return console.log('Error', error)
            }

            console.log(location)
            console.log(forecastData)

            //console.log('Data', data)
        })
    })
}



