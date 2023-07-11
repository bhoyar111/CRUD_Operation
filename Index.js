import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2';

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(4000, () => console.log('server running on port 4000'));

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_operation_db'
})

mysqlConnection.connect((err) => {
    if(err) {
        console.log('database connection failed: ' + JSON.stringify(err, undefined, 2));
    } else {
        console.log('database connected successfully');
    }
})

app.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            res.send(rows)
        }
    })
});

app.post('/user-add', (req, res) => {
    var userAdd = req.body;
    var add = [userAdd.name, userAdd.address, userAdd.mobile]
    mysqlConnection.query('INSERT INTO users (name, address, mobile) VALUES(?)', [add], (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            res.send(rows)
        }
    })
})