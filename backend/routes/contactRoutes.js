const express = require('express');
const router = express.Router();
const { submitContactMessage, getContactMessages } = require('../controllers/contactController');

router.post('/contact', submitContactMessage);
router.get('/contacts', getContactMessages);

module.exports = router;
