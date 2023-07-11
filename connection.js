const mysql = require('mysql2');
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud_operation_db'
});

 mysqlConnection.connect((err) => {
    if(err) {
        console.log('DB connection is failed: ' + JSON.stringify(err,undefined,2));
    } else {
        console.log('DB connected successfully ');
    }
});

module.exports = mysqlConnection;
