
const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./data/database');
const port = process.env.PORT || 3002;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next(); // Make sure to call next() to pass control to the next middleware
});
app.use('/', require('./routes'));

const restaurantRoutes = require('./routes/restaurants');
app.use('/restaurants', restaurantRoutes);
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
  }
});