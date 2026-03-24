const express = require('express');
const router = express.Router();
const { submitApplication, getApplications } = require('../controllers/applicationController');

router
  .route('/')
  .post(submitApplication)
  .get(getApplications);

module.exports = router;
