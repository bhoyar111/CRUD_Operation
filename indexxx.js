const connection = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.listen(4000, () => console.log('express server running on port 4000'));

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, row) => {
        if(err) {
            console.log(err);
        } else {
            res.send(row)
        }
    })
})

app.post('/user-add', (req, res) => {
    var userAdd = req.body;
    var add = [userAdd.name, userAdd.address, userAdd.mobile]
    connection.query('INSERT INTO users (name, address, mobile) VALUES(?)', [add], (err, row) => {
        if(err) {
            console.log(err);
        } else {
            res.send(row)
        }
    })
})

app.get('/user/:id', (req, res) => {
    connection.query('SELECT * FROM users WHERE id=?', [req.params.id], (err, row) => {
        if(err) {
            console.log(err);
        } else {
            res.send(row)
        }
    })
})

app.put('/user-update', (req, res) => {
    var userAdd = req.body;
    connection.query('UPDATE users SET ? WHERE id='+userAdd.id, [userAdd], (err, row) => {
        if(err) {
            console.log(err);
        } else {
            if(row.affectedRows === 0) {
                var add = [userAdd.name, userAdd.address, userAdd.mobile];
                connection.query('INSERT INTO users (name, address, mobile) VALUES(?)', [add], (err, row) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.send(row)
                    }
                }) 
            } else {
                res.send(row)
            }
        }
    })
})

app.delete('/user-delete/:id', (req, res) => {
    connection.query('DELETE FROM users WHERE id=?', [req.params.id], (err, row) => {
        if(err) {
            console.log(err);
        } else {
            res.send(row)
        }
    })
}) 