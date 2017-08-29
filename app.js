const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


const app = express();
require('dotenv').config();

const NOT_FOUND = 404;

const PORT = process.env.PORT || 3000;

app.use(logger('dev'));


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());



app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.render('index');
});

const todoRoutes = require('./routes/todo-routes');
app.use('/todo', todoRoutes);

const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

app.post('/todo', function(req, res) {
  res.send(req.body.optradio);
});

app.get('*', (req, res) => {
    res.status(NOT_FOUND).send('file is not found!');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
