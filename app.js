const express = require('express');
const cors = require('cors');
const app = express();

//Env variables
const dotenv = require('dotenv');
dotenv.config();

//Cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//API Port
const port = process.env.PORT || 3000;

//MongoDB connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'LegalneLowiska'
})

const db = mongoose.connection;
console.log("Connecting");
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//Cors configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Legalne Lowiska Backend is running!');
});

app.use('/api/users', require('./routes/users/readUser'));
app.use('/api/users/signin', require('./routes/users/readUser'));
app.use('/api/users/signup', require('./routes/users/createUser'));
app.use('/api/users/signout', require('./routes/users/clearUser'));
app.use('/api/lowiska', require('./routes/fishery/readFishery'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;