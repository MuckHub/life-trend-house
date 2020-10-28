require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');
const multer = require('multer');
const app = express();
const indexRouter = require('./src/routes/index');
const houseRouter = require('./src/routes/house');
const portfolioRouter = require('./src/routes/portfolio');
const dbConnect = require('./src/config/dbConnect');

dbConnect();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/houses', houseRouter);
app.use('/portfolio', portfolioRouter);

app.listen(PORT, () => {
  console.log('server started on PORT: ', PORT);
});
