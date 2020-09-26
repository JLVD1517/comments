const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/index')
const config = require(`${__dirname}/configs/config.json`)

// for parsing json
app.use(
    bodyParser.json({
      limit: '2mb'
    })
)
app.use('/', routes)

// Setup express server port from config
app.listen(config.NODE_PORT, () => { 
    console.log(`Listening on port number ${config.NODE_PORT}`)
})