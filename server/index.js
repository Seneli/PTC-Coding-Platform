//node dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv'); //EVENTUALLY MAKE THIS DOTENV FILE A THING loser

//import function to initialize connection to database
const connect_to_db = require('./config/db');

//import mongoURI
const config = require('./config/default.json');
const mongoURI = config.mongoURI;

//import routes
const authRoutes = require('./router/userRouter');
const submissionRoutes = require('./router/submissionsRouter');
const adminRoutes = require('./router/adminRouter');
const contextRoutes = require('./router/contextRouter');
const leaderboardRoutes = require('./router/leaderboardRouter');
const aws = require('./router/aws');

dotenv.config();

//set up server
const app = express();
const port = process.env.PORT || 5000; //env accounts for heroku
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => res.send('Hello world!'));

//middleware
app.use(express.json()); //express.json - a text parsing middleware
app.use(cookieParser());

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: true,
  maxAge: 600,
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  // /var err = new Error('Not Found');
  // err.status = 404;
  // next(err);

  // Website you wish to allow to connect
  // res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
  );

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  // Pass to next layer of middleware
  next();
});

//connect to mongoDB
connect_to_db();

//set up routes
app.use('/auth', authRoutes);
app.use('/submission', submissionRoutes);
app.use('/admin', adminRoutes);
app.use('/context', contextRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/aws', aws);
