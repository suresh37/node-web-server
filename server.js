const express = require('express')
const fs = require('fs')
const hbs = require('hbs')
var app = express()
var port = process.env.PORT || 7000 // for deployment to heroku

hbs.registerPartials(__dirname + '/views/partials/')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now} : ${req.method} - ${req.url}`
    console.log(log)

    fs.appendFile('server.log', log, (err) => {
        if (err) {
            console.log('Unabble to write to Server log file.')
        }
    })
    next()

})
/* app.use((req,res,next) => {
    res.render('maintenance.hbs')
}) */
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (data) => {
    return data.toUpperCase()
})

var tempEng = {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Web Page',
    currentYear: new Date().getFullYear()
}
app.get('/', (req, res) => {
    tempEng.pageTitle = 'Home Page'
    res.render('home', tempEng)
})
app.get('/about', (req, res) => {
    //res.send('About Page!!')
    tempEng.pageTitle = 'About Page'
    res.render('about.hbs', tempEng)
})
app.get('/projects', (req, res) => {
    tempEng.pageTitle = 'Projects Page'
    res.render('projects', tempEng)
})
app.get('/bad', (req, res) => {
    res.send({
        "errorMessage": "Unable to Handle Request - Error Hanadling Request"
    })
})
app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})