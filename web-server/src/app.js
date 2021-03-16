const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

/*console.log(__dirname)
console.log(path.join(__dirname, '../public'))*/

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('home',{
        title:'Weather',
        name:'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name:'Andreu Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        message:'call for help',
        title: 'Help',
        name: 'Deni'
    })
})

/*app.get('', (req, res)=>{
    res.send('Hello express')
})*/

/*app.get('/help', (req,res)=>{
    res.send([
            {name:'Andrew'},
            {age:27}
        ])
})

app.get('/about', (req,res)=>{
    res.send('<h1>About Page</h1>')
})*/

app.get('/weather', (req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {

        if (error){
            return res.send({
                error
            })
        }

        forecast(latitude,longitude, (error, forecastData) => {

            if (error){
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
    /*if (!req.query.address){
        return res.send({
            error:'you must provide a address'
        })
    }

    res.send({
        forecast: 'rainny',
        location: 'santos',
        address: req.query.address
    })*/
})

app.get('/products', (req, res) => {

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404',{
        errorMsg:'Help article not found',
        name:'Deni',
        title:'404'
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404',{
        errorMsg:'Page not found',
        name:'Deni',
        title:'404'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})

