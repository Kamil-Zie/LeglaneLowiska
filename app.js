const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

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
  origin: process.env.FRONTEND_URL || true,
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Legalne Lowiska Backend is running!');
});

app.use('/api/users', require('./routes/users/readUser'));
app.use('/api/users/signin', require('./routes/users/readUser'));
app.use('/api/users/signup', require('./routes/users/createUser'));
app.use('/api/users/sendOTP', require('./routes/users/sendOTP'));
app.use('/api/users/forgot-password', require('./routes/users/forgotPassword'));
app.use('/api/users/signout', require('./routes/users/clearUser'));
app.use('/api/users/update', require('./routes/users/updateUser'))
app.use('/api/users/update-admin', require('./routes/users/updateUser'));
app.use('/api/users/delete', require('./routes/users/deleteUser'));
app.use('/api/friends', require('./routes/users/friends'));
app.use('/api/lowiska', require('./routes/fishery/readFishery'));
app.use('/api/lowiska/delete', require('./routes/fishery/deleteFishery'));
app.use('/api/lowiska/update', require('./routes/fishery/updateFishery'));
app.use('/api/lowiska/rate', require('./routes/fishery/rateFishery'));
app.use('/api/okregi', require('./routes/district/readDistrict'));
app.use('/api/okregi/delete', require('./routes/district/deleteDistrict'));
app.use('/api/okregi/update', require('./routes/district/updateDistrict'));
app.use('/api/licencje', require('./routes/licence/readLicence'));
app.use('/api/licencje/delete', require('./routes/licence/deleteLicence'));
app.use('/api/licencje/update', require('./routes/licence/updateLicence'));
app.use('/api/payments', require('./routes/payment/order.js'));
app.use('/api/portal/posts', require('./routes/portal/readPosts'));
app.use('/api/portal/create', require('./routes/portal/createPost'));
app.use('/api/portal/update', require('./routes/portal/updatePost'));
app.use('/api/portal/delete', require('./routes/portal/deletePost'));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;