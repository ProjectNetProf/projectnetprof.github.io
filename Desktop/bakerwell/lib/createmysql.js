var mysql = require('mysql');

var exports = module.exports = {};

exports.createTablesIfNotExist = function() {
    var pool =  mysql.createPool({
        host : 'localhost',
        user : 'root',
        password: '',
        database: 'bakerwell'
    });

    var createTable = "CREATE TABLE IF NOT EXISTS employee(id int(11) NOT NULL AUTO_INCREMENT,"+
                              "name varchar(20) DEFAULT NULL,"+
                              "salary float(11) DEFAULT NULL,"+
                              "PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=latin1;";

    var tableexist = "SELECT * FROM employee";

    pool.getConnection(function(err, connection){    
    //Create a table called employee

    connection.query(tableexist,  function(err){
        if(err){
            console.log('Table does not exist!');
            connection.query(createTable,  function(err){
                if(err) throw err;
                else {
                    console.log('Table created!');
                }
            });
        }
        else {
            console.log('Table exist!');
        }
    });

        connection.release();//release the connection
    });
};
