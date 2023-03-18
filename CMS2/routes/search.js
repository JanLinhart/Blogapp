const express = require('express');
const router = express.Router();
const Post = require("../models/Post")

router.get('/', async (req, res) => {
  try {
    const query = req.query.query;
    const results = await Post.find({ title: { $regex: query, $options: 'i' } });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;