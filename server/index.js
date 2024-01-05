// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/crypto_estate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const UserSchema = new mongoose.Schema({
  walletAddress: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/api/storeWalletAddress', async (req, res) => {
  const { walletAddress } = req.body;
  try {
    const user = new User({ walletAddress });
    await user.save();
    res.status(200).json('Wallet Address stored successfully');
  } catch (error) {
    console.error('Error storing wallet address:', error);
    res.status(500).json('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});