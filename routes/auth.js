const express = require("express");
const { signup, signin, signout } = require('../controllers/auth');
const { userById } = require("../controllers/user");
const { userSignupValidator } = require('../validator');


const router = express.Router();

router.post('/signup', userSignupValidator, signup );
router.post('/signin', signin );
//Signout
router.get('/signout', signout );

//any routes containing :userId, our app will first execute userByid()
router.param('userId', userById);

module.exports = router;

