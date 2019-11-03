const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const expressValidator = require('express-validator');


dotenv.config()
//db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true })
.then(()=> console.log('db connected'))

mongoose.connection.on('error', err => {
    console.log('DB Connection error: ${err.message}');
});

const { getPosts } = require('./routes/post');

//
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user")



//middleware 
app.use(morgan("dev"));    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({Error: "Unauthorised user" });
    }
  });



const port = process.env.PORT || 8080; 

app.listen(port, () => {console.log('A Node JS API is listening on port: ${port}')});  