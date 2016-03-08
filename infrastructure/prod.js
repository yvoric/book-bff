var _ = require('lodash');
var heroin = require('heroin-js');

var prod = {
    name: 'yvonnes-book-bff',
    //addons: {mongolab: {plan: 'mongolab:sandbox'}},
    log_drains: [],
    domains: ['yvonnes-book-bff.herokuapp.com']
}


var config = _.merge({}, require('./base'), prod);

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});
configurator(config);