require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();
const indexRouter = require('./src/routes/index');
const houseRouter = require('./src/routes/house');
const methodOverride = require('method-override')
const dbConnect = require('./src/config/dbConnect');


dbConnect();
const PORT = process.env.PORT || 3000

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

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/house', houseRouter);




app.listen(PORT, () => {
  console.log('server started on PORT: ', PORT);
});

