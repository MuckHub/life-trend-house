const mongoose = require('mongoose');


const portfolioSchema = new mongoose.Schema({
  image: String,
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
