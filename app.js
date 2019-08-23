var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');

var app = express();

// the current grid info
app.pattern = init();
// the sockets info
app.users = {};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function init() {
  let cells = [];
  for (var i = 0; i < 90; i++) {
    cells[i] = [];
    for (var j = 0; j < 60; j++) {
      cells[i][j] = 0;
    }
  }

  // patttern 1
  // Prefilled cells
  [
    // Gosper glider gun
    [1, 5], [1, 6], [2, 5], [2, 6], [11, 5], [11, 6], [11, 7], [12, 4], [12, 8], [13, 3], [13, 9], [14, 3], [14, 9], [15, 6], [16, 4], [16, 8], [17, 5], [17, 6], [17, 7], [18, 6], [21, 3], [21, 4], [21, 5], [22, 3], [22, 4], [22, 5], [23, 2], [23, 6], [25, 1], [25, 2], [25, 6], [25, 7], [35, 3], [35, 4], [36, 3], [36, 4],

    // Random cells
    // If you wait enough time these will eventually take part
    // in destroying the glider gun, and the simulation will be in a "static" state.
    [60, 47], [61, 47], [62, 47],
    [60, 48], [61, 48], [62, 48],
    [60, 49], [61, 49], [62, 49],
    [60, 51], [61, 51], [62, 51],
  ]
    .forEach(function (point) {
      cells[point[0]][point[1]] = 1;
    });

  return cells;
}

module.exports = app;
