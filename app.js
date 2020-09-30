// **************************************************************************************//
//  Author @Shanthi Priya Mohan
//  Created @September 2020
//  File name:app.js
//  Environment @Neuda Assignment
//  This file is the server configuration file used for routing and mapping the views 
//  and the controller logic in URL shortener Webapplication.It initializes the 
//  express app,'url_shortener' mongoDB collection ,setting up the handlebar view engine,
//  mapping the routes to create the shortID and also configure error handlers too.
//**************************************************************************************//
require('dotenv').config()
const express = require('express')
const shortId = require('shortid')
const createHttpError = require('http-errors')
var exphbs = require('express-handlebars');
const path = require('path')

const databaseUrl = process.env.DATABASE;
const port = process.env.PORT;

//Initialize the app
const app = express()


//Set the public folder as static folder
app.use(express.static(path.join(__dirname, 'public')))

//Parse the incoming requests body .
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Set view engine
const hbs = exphbs.create({
    extname: ".hbs",
    defaultLayout: 'main',
  });
  app.engine("hbs", hbs.engine);
  app.set("view engine", "hbs");

/**
 * GET index page.
 */
app.get('/', async (req, res, next) => {
  res.render('index')
})

/**
 * Error handler-Route for 404 error
 */
app.use((req, res, next) => {
  next(createHttpError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('index', { error: err.message })
})

/**
 * Listen to Server
 */
app.listen(port, () => console.log('Server listening on port 3000...'))