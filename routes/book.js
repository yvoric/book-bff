var express = require('express');
var goodGuy = require('good-guy-http')({
    maxRetries: 3
});
var jp = require('jsonpath');
var router = new express.Router();
var ESI = require('nodesi');
var esi = new ESI({
    onError: (src, error) => `<!-- GET ${src} resulted in ${error} -->`
});

var BOOK_SERVICE_URL = 'https://book-catalog-proxy-5.herokuapp.com/book?isbn=';
var BOOK_COUNT_URL = process.env.BOOK_COUNT_URL || 'http://book-service-gregers.herokuapp.com/stock';

function pickRelevantBookData (data) {
    const volume = jp.value(data, '$..volumeInfo');

    return {
        bookTitle: volume.title,
        subtitle: volume.subtitle,
        bookCover: jp.value(volume, '$..thumbnail')
    };
}

function renderPage (app, pageData) {
    return new Promise((resolve, reject) => {
        app.render('book', pageData, (err, html) => {
            if (err) { return void reject(err); }
            resolve(html);
        });
    });
}

function partial (fn, args) {
    return fn.bind(null, args);
}

router.get('/:isbn', function (req, res, next) {
    const isbn = req.params.isbn;
    const requestId = req.headers['x-request-id'];
    goodGuy(`${BOOK_SERVICE_URL}${isbn}`)
        .then(response => JSON.parse(response.body))
        .then(pickRelevantBookData)
        .then(bookData => Object.assign({ stockCountURL: `${BOOK_COUNT_URL}/${isbn}`, requestId }, bookData))
        .then(partial(renderPage, req.app))
        .then(html => esi.process(html, { headers: { 'Accept': 'text/html', 'x-request-id': requestId } }))
        .then(html => res.send(html))
        .catch(next);
});

module.exports = router;