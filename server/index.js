// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uri = "mongodb+srv://g62:projectschool@cluster0.gbjrhhp.mongodb.net/?retryWrites=true&w=majority";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(uri, {});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const UserSchema = new mongoose.Schema({
  walletAddress: String,
  username: String,
  password: String,
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

app.post('/api/register', async (req, res) => {
  const { walletAddress, username, password } = req.body;
  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json('Username already exists');
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      walletAddress,
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json('User registered successfully');
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json('Internal Server Error');
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json('Invalid username or password');
    }

    const token = jwt.sign({ userId: user._id }, 80001, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = "mongodb+srv://g62:projectschool@cluster0.gbjrhhp.mongodb.net/";

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// mongoose.connect(uri, {});

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

// const UserSchema = new mongoose.Schema({
//   walletAddress: String,
// });

// const User = mongoose.model("User", UserSchema);

// app.post("/api/storeWalletAddress", async (req, res) => {
//   const { walletAddress } = req.body;
//   try {
//     const user = new User({ walletAddress });
//     await user.save();
//     res.status(200).json("Wallet Address stored successfully");
//   } catch (error) {
//     console.error("Error storing wallet address:", error);
//     res.status(500).json("Internal Server Error");
//   }
// });

// // API endpoint to receive JSON data from the client and save it to a file
// app.post("/saveJson", (req, res) => {
//   const jsonData = req.body;
//   const filePath = path.join(__dirname, "data.json");

//   fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Error saving data to file");
//     }
//     console.log("Data saved to file:", filePath);
//     res.status(200).send("Data saved successfully");
//   });
// });
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


