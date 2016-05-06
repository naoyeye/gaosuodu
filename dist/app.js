var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.disable('x-powered-by');
app.disable('etag');

console.log(app.get('env'))

if (app.get('env') !== 'development') {
  app.use(logger('dev'));
} else {
  // app.use(logger('tiny'));
}

// Registry Raven
// var raven = require('raven');
// if (app.get('env') !== 'development') {
//   app.use(raven.middleware.express.requestHandler('https://047890161f7a415eaef901fead0bcf4e:0f08b43938bd4cc982ee1a90db620d5f@app.getsentry.com/76821'));
// }

// app.use('/favicon.ico', function (req, res, next) {
//   res.redirect('//www.gaosuodu.com/favicon.ico');
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

console.log(1)

// Registry Modules
if (app.get('env') !== 'development') {
    app.set('views', 'views');
    app.use(express.static('public'));
} else {
    app.set('views','app/views');
    app.use(express.static('.tmp'));
}

console.log(2)

var mustacheExpress = require('mustache-express');
app.engine('html', mustacheExpress());
app.set('view engine', 'html');

console.log(3)

app.use('/', require('./routes/routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

console.log(4)

// error handlers
// if (app.get('env') !== 'development') {
//   app.use(raven.middleware.express.errorHandler('https://047890161f7a415eaef901fead0bcf4e:0f08b43938bd4cc982ee1a90db620d5f@app.getsentry.com/76821'));
// }

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    res.json({
      message: err.message,
      error: err.stack
    });
  });
}

console.log(5)

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  res.json({
    message: err.message,
    error: {}
  });
});

console.log(6)

module.exports = app;
