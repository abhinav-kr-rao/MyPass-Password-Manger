const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

dotenv.config();
// console.log("hello dotenv");
// console.log(process.env); // remove this after you've confirmed it is working

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "myPass";

client.connect();

// get a password
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// save a password
app.post("/", async (req, res) => {
  const pw = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(pw);
  res.send({ succes: true, result: findResult });
});

//delete a password
app.delete("/", async (req, res) => {
  const pw = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(pw);
  res.json({ succes: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
