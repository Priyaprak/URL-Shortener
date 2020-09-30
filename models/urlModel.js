// **************************************************************************************//
//  Author @Shanthi Priya Mohan
//  Created @September 2020
//  File name:urlModel.js
//  Environment @Neuda Assignment
//  This file is used to create the schema for MongoDB database in
//  URL shortener Webapplication.The schema consists of longURL and its shortid.
//  This schema is exported as amodel which can be retrieved in the controllers and views.
//**************************************************************************************//

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShortUrlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
  },
})

const ShortUrl = mongoose.model('shortUrl', ShortUrlSchema)

module.exports = ShortUrl