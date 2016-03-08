var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

/*configurator.export('yvonnes-book-inventory-service').then(function(result) {
 console.log(result);
 });*/

var prod = {
    name: 'book-bf',
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars: {
        //MONGOLAB_URI: 'mongodb://heroku_ngjsb33p:2b9jgi3tcadr458f5cook4lsvs@ds019488.mlab.com:19488/heroku_ngjsb33p'
         },
    //addons: {mongolab: {plan: 'mongolab:sandbox'}},
    collaborators: ['tonje.sundby@schibsted.no', 'yvonne.richa@schibsted.no'],
    features: {
        'runtime-dyno-metadata': {enabled: false},
        'log-runtime-metrics': {enabled: false},
        'http-session-affinity': {enabled: false},
        preboot: {enabled: false},
        'http-shard-header': {enabled: false},
        'http-end-to-end-continue': {enabled: false}
    },
    formation: [{process: 'web', quantity: 1, size: 'Free'}],
    log_drains: [],
    domains: ['yvonnes-book-bff.herokuapp.com']
}
var test = {
    name: 'yvonnes-book-bff-test',
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars: {
        //MONGOLAB_URI: 'mongodb://heroku_ngjsb33p:2b9jgi3tcadr458f5cook4lsvs@ds019488.mlab.com:19488/heroku_ngjsb33p'
    },
    addons: {
        //mongolab: {plan: 'mongolab:sandbox'}
    },
    collaborators: ['tonje.sundby@schibsted.no', 'yvonne.richa@schibsted.no'],
    features: {
        'runtime-dyno-metadata': {enabled: false},
        'log-runtime-metrics': {enabled: false},
        'http-session-affinity': {enabled: false},
         preboot: {enabled: false},
        'http-shard-header': {enabled: false},
        'http-end-to-end-continue': {enabled: false}
    },
    formation: [{process: 'web', quantity: 1, size: 'Free'}],
    log_drains: []
    //,domains: ['yvonnes-book-inventory-service.herokuapp.com']
}

configurator(prod);