const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017'; // or your Docker network address
const dbName = 'twitterdb';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Show first 10 documents
app.get('/tweets', async (req, res) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const tweets = await db.collection('tweets').find().limit(10).toArray();
    res.json(tweets);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching tweets');
  } finally {
    await client.close();
  }
});

// Insert a new tweet
app.post('/tweets', async (req, res) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection('tweets').insertOne(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting tweet');
  } finally {
    await client.close();
  }
});

// Get last tweet
app.get('/lasttweet', async (req, res) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);
    const tweet = await db.collection('tweets').find().sort({ _id: -1 }).limit(1).toArray();
    res.json(tweet[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching last tweet');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
