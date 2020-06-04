const express = require('express');
const DBmethods = require('./userDb');
const DBmethods2 = require('../posts/postDb');
const router = express.Router();

router.use(express.json())

router.post('/', (req, res) => {
  // do your magic!
  DBmethods.insert(req.body)
  .then(res => {
    res.status(201).json({res})
  })
});

router.post('/:id/posts', validateUser, (req, res) => {
  const body = req.body;
  body.user_id = req.params.user_id
  DBmethods2.insert(body)
    .then(resp => {
      res.status(201).json({resp})
    })
    .catch(err => {
      res.status(400).json({message: "API MIA!"})
    })
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  DBmethods.get()
    .then(resp => {
      res.status(200).json({resp})
    })
    .catch(err => {
      res.status(404).json({message:'API MIA!'})
    })
});

router.get('/:id',validateUserId, (req, res) => {
  // do your magic!
  DBmethods.getById(req.params.id)
    .then(resp => {
      res.status(200).json({resp})
    })
    .catch(err => {
      res.status(404).json({message: 'API MIA!'})
    })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // do your magic!
  DBmethods.getUserPosts(req.params.id)
    .then(resp => {
      res.status(200).json({resp})
    })
    .catch(err => {
      res.status(404).json({message:'USER (POSTS) MIA!'})
    })
});

router.delete('/:id',validateUserId, (req, res) => {
  // do your magic!
  console.log(req.body)
  DBmethods2.update(req.params.id, req.body)
  .then(resp => {
    console.log(req.body)
    res.status(200).json({resp})
  })
  .catch(err => {
    res.status(404).json({message:"API MIA"})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  DBmethods.getById(req.params.id)
    .then(user => {
      if(!user) {
        res.status(400).json({message:"USER ID INVALID"})
      }else{
        next()
      }
    })
  // do your magic!
}

function validateUser(req, res, next) {
  DBmethods.getById(req.params.id)
    .then(user => {
      if (user){
        next()
      }else{
        res.status(404).json({message:"USER NOT FOUND"})
      }
    })
    .catch(err => {
      res.status(500).json({message:"API MIA!"})
    })
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
  DBmethods2.getById(req.params.id)
    .then(post => {
      if(post){
        next()
      }else{
        res.status(404).json({message:"POST MIA"})
      }
    })
    .catch(err => {
      res.status(500).json({message:"SERVER IS DOWN"})
    })
}

module.exports = router;
