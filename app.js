const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

//Env variables
const dotenv = require('dotenv');
dotenv.config();

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
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Legalne Lowiska Backend is running!');
});

app.use('/api/users/signin', require('./routes/users/signin'));
app.use('/api/users/signup', require('./routes/users/singup'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;