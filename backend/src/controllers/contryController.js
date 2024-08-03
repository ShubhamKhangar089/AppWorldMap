const axios = require('axios');
const Favorite = require('../models/Favorite');
const SearchHistory = require('../models/SearchHistory');

exports.getCountryDetails = async (req, res) => {
  const { currencyCode } = req.params;
//   console.log(currencyCode);
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/currency/${currencyCode}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.addFavorite = async (req, res) => {
  const { countryCode } = req.body;

  try {
    let favorite = await Favorite.findOne({ userId: req.user.id, countryCode });
    if (favorite) {
      return res.status(400).json({ msg: 'Favorite already exists' });
    }

    favorite = new Favorite({ userId: req.user.id, countryCode });
    await favorite.save();
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find({ userId: req.user.id }).limit(5).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
