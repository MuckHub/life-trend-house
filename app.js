require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');
const multer = require('multer');
const app = express();
const indexRouter = require('./src/routes/index');
const houseRouter = require('./src/routes/house');
const methodOverride = require('method-override')
const portfolioRouter = require('./src/routes/portfolio');
const dbConnect = require('./src/config/dbConnect');

dbConnect();
const PORT = process.env.PORT || 3000;

// Allows you to use PUT, DELETE with forms.!!!!!
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

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
