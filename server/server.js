'use strict'

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_EVN || 'dev'

const mongooseCfg = require('./config/mongoose')
const expressCfg = require('./config/express')
const passportCfg = require('./config/passport')

// Create a new Mongoose connection instance
let db = mongooseCfg()

// Create a new Express application instance
let app = expressCfg()

// Configure the Passport middleware
let passport = passportCfg()

// Use the Express application instance to listen to the port
const port = 8000
app.listen(port);

// Log the server status to the console
console.log(`Server running at http://localhost:${port}/`);

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;
