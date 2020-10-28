const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  tel: {
    required: true,
    type: String,
  },
});


module.exports = mongoose.model('User', userSchema);
