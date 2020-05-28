const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  authenticated: { type: Boolean, required: true },
  rights: { type: Boolean, required: true },
  email: { type: String, required: true },
},
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);