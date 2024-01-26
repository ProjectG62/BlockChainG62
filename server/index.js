const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://g62:projectschool@cluster0.gbjrhhp.mongodb.net/";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(uri, {});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const UserSchema = new mongoose.Schema({
  walletAddress: String,
});

const User = mongoose.model("User", UserSchema);

app.post("/api/storeWalletAddress", async (req, res) => {
  const { walletAddress } = req.body;
  try {
    const user = new User({ walletAddress });
    await user.save();
    res.status(200).json("Wallet Address stored successfully");
  } catch (error) {
    console.error("Error storing wallet address:", error);
    res.status(500).json("Internal Server Error");
  }
});

// API endpoint to receive JSON data from the client and save it to a file
app.post("/saveJson", (req, res) => {
  const jsonData = req.body;
  const filePath = path.join(__dirname, "data.json");

  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving data to file");
    }
    console.log("Data saved to file:", filePath);
    res.status(200).send("Data saved successfully");
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});