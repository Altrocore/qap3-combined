const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const userRouter = require('./src/routes/users');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use('/users', userRouter);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000, 'localhost', () => {
  console.log('Server is running on port http://localhost:3000');
});

module.exports = app;