const express = require("express");
const { signup, signin } = require('../controllers/auth');
const validator = require('../validator');

const router = express.Router();

router.post('/signup', signup );

module.exports = router;

