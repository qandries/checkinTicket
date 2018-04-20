const express = require("express");
const login = require('./routes/loginroutes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('/node_modules', {root: "./"}));
app.get('/', (req, res) => {
    res.sendFile('/index.html', {root: "../front/checkingticket/public/"});
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});
const router = express.Router();

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    })
});

//test route

router.get('/', (req, res) => {
    res.json({ message: 'welcome '})
});



//route to handle user registration
router.post('/register', login.register);
router.post('/login', login.login);

app.use('/api', router);
app.listen(4000);
