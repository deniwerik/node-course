const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=67f28b2ee8f2cc5fcd4504378eeaea77&query=45,-75'

const request = http.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) =>{
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('an error', error)
})

request.end()