#!/usr/bin/env node
const ip = require('ip');
const fs = require('fs');
const path = require('path');

function replace_string_in_file(filename, to_replace, replace_with) {
    const data = fs.readFileSync(filename, 'utf8');
 
    const result = data.replace(new RegExp(to_replace, "g"), replace_with);
    fs.writeFileSync(filename, result, 'utf8');
}

module.exports = function(context) {
    environment = 'development'
    if(process.env.NODE_ENV) {
        environment = process.env.NODE_ENV;
    }
    
    let finalString = `<content src="http://${ip.address()}:8080/index.html"`;
    
    if(environment === 'production') {
        finalString = `<content src="index.html"`;
    }
    const regex = /<content\ssrc=\"(.*)\"/g;    
    console.log(finalString);
    const configFilePath = path.resolve(context.opts.projectRoot, 'config.xml');
    replace_string_in_file(configFilePath, regex, finalString);
}