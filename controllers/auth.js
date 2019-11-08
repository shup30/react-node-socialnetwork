const jwt = require("jsonwebtoken");
require('dotenv').config();
const expressJwt = require('express-jwt');
const _ = require('lodash');
const User = require("../models/user");

exports.signup = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) 
    return res.status(403).json({
        error: "Email is taken!"
    });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: "Signup Success! Please Login" });
};  

exports.signin = (req, res) => {
    //Find the user based on Email
    const { email, password } = req.body
    User.findOne({email}, (err, user) => {
        //if error or no user
        if(err || !user) {
            return res.status(401).json({
                error: "User with that email does not exist. Please Sign in"
            });
        }
        //If user is found make sure email and password match
        //Create Authenticate method in model and use here 
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password Do not Match"
            });
        }   
    
    //Generate token 
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    //Persist the token as 't' in cookie with expiry date 
    res.cookie("t", token, {expire: new Date() + 9999});
    //Return response with user and token in frontend client
    const {_id, name, email} = user
    return res.json({token, user: {_id, email, name}});
    });
};

exports.signout = (req, res) => {
    res.clearCookie("t")
    return res.status({message: "Signout Success!"});
};

exports.requireSignin = expressJwt({
    //if token is valid, express jwt appends the verified users id
    //in an auth key to the request object
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});