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
const mongoose = require('mongoose')
const path = require('path')
const ShortUrl = require('./models/urlModel')
const databaseUrl = process.env.DATABASE;
//Initialize the app
const app = express()


//Set the public folder as static folder
app.use(express.static(path.join(__dirname, 'public')))

//Parse the incoming requests body .
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Connect mongoDB local instance 
mongoose
  .connect(databaseUrl, {
    dbName: 'url-shortner',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB Successfully💾'))
  .catch((error) => console.log('Error connecting DB..'))

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
 * POST lONG url and convert to shortURL.
 */
 app.post('/', async (req, res, next) => {
  try {
    const { url } = req.body
    if (!url) {
      throw createHttpError.BadRequest('Provide a valid url')
    }
    const urlExists = await ShortUrl.findOne({ url })
    if (urlExists) {
      res.render('index', {
        short_url: `${req.headers.host}/${urlExists.shortId}`,
      })
      return
    }
    const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() })
    const result = await shortUrl.save()
    res.render('index', {
      short_url: `${req.headers.host}/${result.shortId}`,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * GET short URL web page
 */
app.get('/:shortId', async (req, res, next) => {
  try {
    const { shortId } = req.params
    const result = await ShortUrl.findOne({ shortId })
    if (!result) {
      throw createHttpError.NotFound('Short url does not exist')
    }
    console.log("URL is "+result.url)
    res.redirect(result.url)
  } catch (error) {
    next(error)
  }
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
app.listen(3000, () => console.log('Server listening on port 3000...'))