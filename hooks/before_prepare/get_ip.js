#!/usr/bin/env node
const ip = require('ip')
module.exports = function(context) {    
    console.log("Please copy this in the config.xml <content src=\"http:\/\/"+ ip.address() + ":8080/index.html\" />");
}