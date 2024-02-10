require('dotenv').config();

const Sequelize = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const cors = require('cors');

const sequelize = require('./config/connection.js');

const app = express();

// Update your session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // Set a session secret in your .env file
  store: new SequelizeStore({
    db: sequelize,
  }),
  resave: false,
  saveUninitialized: false, // may want to set to true depending on your needs
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Cookie is only sent over HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(
  cors({
    origin: 'http://127.0.0.1:5502', // or the specific origin you want to allow change to heroku in production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Log every request
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5502;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./controllers/api/userRoutes.js');
const viewRoutes = require('./controllers/views');

// Allow POST method for /api/users endpoint
app.use(
  '/api/users',
  (req, res, next) => {
    if (req.method == 'POST' || req.method == 'OPTIONS') {
      next(); // Allow POST and OPTIONS requests
    } else {
      res.status(405).send('Method Not Allowed'); // Reject other methods
    }
  },
  userRoutes
);

app.use('/', viewRoutes);

sequelize
  .authenticate()
  .then(() => console.log('Database connected.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// force false in production
sequelize.sync({ force: process.env.NODE_ENV !== 'production' }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
