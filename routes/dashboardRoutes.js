const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/dashboardController');

router
  .route('/stats')
  .get(getStats);

module.exports = router;
