const { request } = require("express")
const express = require("express")
const Post = require("../models/Post")
const multer  = require('multer')
const jwt = require('jsonwebtoken');


const router = express.Router()

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Missing authorization header' });
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
  
      req.userId = payload.userId;
      next();
    });
  }

router.get('/', authenticateToken, async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.json({
            message: err
        })
    }
})

router.post("/", authenticateToken,  async (req, res) => {
    const postJson = JSON.parse(req.body.postContent);
    console.log(postJson)
    
    const post = new Post({
        title: postJson.title,
        description: postJson.description,
        author: postJson.authorId,
        image: req.body.file,
        categories: req.body.categories
    })
    

    try {
        const savedPost = await post.save()
        res.status(200).send('OK');
    } catch (err) {
        res.json({
            message: err
        })
    }

});

router.get("/:postId", authenticateToken,  async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    } catch (err) {
        res.json({
            message: err
        })
    }

})

router.delete("/:postId", authenticateToken, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId)
        const posts = await Post.find()

        res.json(posts)
    } catch (err) {
        res.json({
            message: err
        })
    }

})

router.put("/:postId", authenticateToken, async (req, res) => {
    try {
        const title = JSON.parse(req.body.postContent)["title"]
        const desc = JSON.parse(req.body.postContent)["body"]
        var updatedPost = await Post.findByIdAndUpdate(req.params.postId,{title: title, description: desc, image: req.body.file})
        res.json(updatedPost)
        
        
    } catch (err) {
        res.json({
            message: err
        })
    }

})

module.exports = router