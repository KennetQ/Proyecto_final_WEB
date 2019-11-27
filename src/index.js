const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const exphbs = require('express-handlebars');
const multer = require('multer');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');




  // Settings
  app.set('port', process.env.PORT || 5000);
  app.set('views', path.join(__dirname, 'views'));
  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./server/helpers'),
    extname: '.hbs'
  }));
  app.set('view engine', '.hbs');
  app.use(multer({dest: path.join(__dirname, 'public/upload/temp')}).single('image'));

  // middlewares
  app.use(morgan('dev'));
  app.use(methodOverride('method'));
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());
  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  // Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

  // Routes
  app.use(require('./routes/index_routes'));
  app.use(require('./routes/users'));
  

  // Static files
  app.use(express.static(path.join(__dirname, 'public')));

  // Error Handling
  if('development' === app.get('env')) {
    app.use(errorHandler());
  }

  

// database
require('./database');
require('./config/passport');

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
