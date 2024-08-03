const express = require('express');
const { getCountryDetails, getFavorites, addFavorite, getSearchHistory } = require('../controllers/contryController');
const { authenticateUser } = require('../middleware/userMiddleware');
const countryRouter = express.Router();

countryRouter.get('/details/:currencyCode', getCountryDetails);
countryRouter.get('/favorites', authenticateUser, getFavorites);
countryRouter.post('/favorites', authenticateUser, addFavorite);
countryRouter.get('/history', authenticateUser, getSearchHistory);

module.exports = countryRouter;
