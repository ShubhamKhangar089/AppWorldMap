const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  countryCode: { type: String, required: true },
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
