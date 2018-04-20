const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'ticketing'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

exports.register = function (req, res) {
    //console.log("res", req.body);
    const today = new Date();
    const users = {
        "email": req.body.email,
        "password": req.body.password,
        "created": today,
        "modified": today
    };
    connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            console.log("error occurred", error);
            res.send({
                "code": 400,
                "failed": "error occurred"
            })
        } else {
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "user registered successfully"
            });
        }
    });
};

exports.login = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            // console.log("error occurred",error);
            res.send({
                "code":400,
                "failed":"error occurred"
        })
    } else {
            //console.log('The solution is: ', results);
            if (results.length > 0) {
                debugger;
                if ([0].password == password) {
                    res.send({
                        "code": 200,
                        "success": "login successful"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and password doesn't match"
                    });
                }
            } else {
                res.send({
                    "code": 204,
                    "success": "Email doesn't exist"
                });
            }
        }
    });
};