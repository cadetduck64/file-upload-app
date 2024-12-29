//to do
//add download feature

//boilerplate
const express = require('express');
const app = express();
const path = require('node:path')
const bcrypt = require('bcryptjs')
require('dotenv').config()

//database
const database = require('./database/queries')
const pool = require('./database/pool.js');

//passport boilerplate
const session = require('express-session');
app.use(session({ secret: 'password', resave: false, saveUninitialized: false}));
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

//view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//static assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({extended: true}))

//multer file upload
const multer = require('multer')
const upload  = multer({dest: 'uploads/'})

//passport
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: true}
}))
app.use(passport.session());
app.use(passport.initialize())
app.use(express.urlencoded({extended: false}))


passport.use(
  new LocalStrategy({      
    //custom name options
    usernameField: 'userNameLogin',
    passwordField: 'passwordLogin',
  },
  async (username, password, done) => {
    try {
    const loggedUserData = await database.loginUser(username);
    const loggedUser = loggedUserData
    console.log('logged user: ' + loggedUser)
    if(loggedUser == undefined)
    {return done(null, false, console.log('incorrect credentials'))}
    if(!loggedUser.username) {
      return done(null, false, console.log('no user'))
    }
    const match = await bcrypt.compare(password, loggedUser.password);
    if(!match) {
      return done(null, false, console.log('incorrect Password'))
    }
    return done(null, loggedUser)
    } catch(err) {
      return done(err)
    }
    }
    )
  )
  
//passport
  passport.serializeUser(async (user, done) => {
    console.log('serialized')
    // console.log(user)
    done(null, user);
    });
    
  passport.deserializeUser(async (user, done) => {
    console.log('deserialized')
    // console.log(user)
    done(null, user)
  });

//route imports
const indexRoute = require('./routes/indexRoute')
const signupRoute = require('./routes/signupRoute')
const loginRoute = require('./routes/loginRoute')
const logoutRoute = require('./routes/logoutRoute')
const uploadRoute = require('./routes/uploadRoute')
const profileRoute = require('./routes/profileRoute')

//routes
app.use('/', indexRoute)
app.use('/signup', signupRoute)
app.use('/login', loginRoute)
app.use('/logout', logoutRoute)
app.use('/upload', uploadRoute)
app.use('/profile', profileRoute)

const PORT = 3000;
app.listen(PORT, () => {console.log(`running on port ${PORT}`)})