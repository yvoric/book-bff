var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

configurator.export('yvonnes-book-bff').then(function(result) {
 console.log(result);
 });
