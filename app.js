var express = require('express'),
    path = require('path'),
    app = express(), // Web framework to handle routing requests
    cons = require('consolidate'), // Templating library adapter for Express
    MongoClient = require('mongodb').MongoClient, // Driver for connecting to MongoDB
    routes = require('./routes'); // Routes for our application

MongoClient.connect('mongodb://localhost:27017/blog-pal', function(err, db) {
    "use strict";
    if(err) throw err;

    // Register our templating engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views'); 

    // Express middleware to populate 'req.cookies' so we can access cookies
    app.use(express.cookieParser());

    // Express middleware to populate 'req.body' so we can access POST variables
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));

    // Application routes
    routes(app, db);

    app.listen(3000);
    console.log('Express server listening on port 3000');
});
