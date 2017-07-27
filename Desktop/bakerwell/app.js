var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var preOrder = require('./routes/preOrder');
var newPreOrder = require('./routes/newPreOrder');
var kitchenOrder = require('./routes/kitchenOrder');
var dailyStock = require('./routes/dailyStock');
var rawMaterial = require('./routes/rawMaterial');

var users = require('./routes/users');
var createsql = require('./lib/createmysql');
var mysql = require('mysql');

/*
var mysql = require('mysql');
var pool =  mysql.createPool({
host : 'localhost',
user : 'root',
password: '',
database: 'bakerwell'
});
 
var createTable = "CREATE TABLE IF NOT EXISTS employee(id int(11) NOT NULL AUTO_INCREMENT,"+
    "name varchar(20) DEFAULT NULL,"+
    "salary float(11) DEFAULT NULL,"+
    "PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1";
 
var insertRecord = 'INSERT INTO employee(name,salary) VALUE(?,?)';
 
var readTable = 'SELECT * FROM employee';
 
var updateRecord = 'UPDATE employee SET salary = ? WHERE name=?';
 
var deleteRecord = 'DELETE FROM employee WHERE name=?';
 
var dropTable = 'DROP table employee';
 
pool.getConnection(function(err, connection){    
  //Create a table called employee
  connection.query(createTable,  function(err){
    if(err) throw err;
    else {
        console.log('Table created!');
    }
  });
 
  //Incsert a record.
  connection.query(insertRecord,['Joe',50000], function(err,res){
    if(err) throw err;
    else {
        console.log('A new employee has been added.');
    }
  });
 
  //Read table.
  connection.query(readTable, function(err, rows){
    if(err) throw err;
    else {
        console.log(rows);
    }
  });
 
  //Update a record.
  connection.query(updateRecord,[60000,'Joe'], function(err, res){
    if(err) throw err;
    else {
        console.log('Increased the salary for Joe.');
    }
  });
 
  //Read table.
  connection.query(readTable, function(err, rows){
    if(err) throw err;
    else {
        console.log(rows);
    }
  });
 
  //Delete a record.
  connection.query(deleteRecord,['Joe'], function(err, res){
    if(err) throw err;
    else {
        console.log('An employee is removed.');
    }
  });
 
  //Drop a table.
  connection.query(dropTable, function(err, res){
    if(err) throw err;
    else {
        console.log('The employee table is removed.');
    }
  });
 
  connection.release();//release the connection
});
*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/preOrder' , preOrder);
app.use('/newPreOrder' , newPreOrder);
app.use('/kitchenOrder' , kitchenOrder);
app.use('/dailyStock' , dailyStock);
app.use('/rawMaterial' , rawMaterial);

createsql.createTablesIfNotExist();

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
