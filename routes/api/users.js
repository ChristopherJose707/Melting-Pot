const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const User = require('../../models/User');
const passport = require('passport');
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');
const mongoose = require("mongoose");

// private auth route
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email,
    });
  }
);

//Get all users 
router.get('/', (req,res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err))
})

// Get User
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

// Edit a User 
router.patch('/edit/:id', (req, res) => {
  mongoose.set('useFindAndModify', false);
  User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(user => res.json(user))
})

// SIGN UP USER 
router.post('/signup', (req, res) => {
  const{errors, isValid} = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
    .then(user => {
      if(user) { // if user exists
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        // user doesn't exist, save the user to database
        const newUser = new User({
          photoId: req.body.photoId,
          photoUrl: req.body.photoUrl,
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password,
          bio: req.body.bio,    
          dietaryRestrictions: req.body.dietaryRestrictions
        });
        // Change given password to a salted and encrypted password hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err,hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                const payload = {user};
                jwt.sign(payload, keys.secretOrKey, {expiresIn: 999999}, (err, token) =>{
                  res.json({
                    user: user,
                    success: true,
                    token: "Bearer " + token
                  })
                })
              })
              .catch(err => console.log(err));
          })
        })
      }
    })
})

// LOGIN USER
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      if (!user) {
        errors.handle = "Incorrect email address"
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // const payload = {id: user.id, handle: user.handle};
            const payload = {user}
            jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, 
              (err, token) => {
                res.json({
                  user: user,
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            )
          } else {
            errors.password = "Incorrect password"
            return res.status(400).json(errors);
          }
        })
    })
})



router.get("/test", (req, res) => res.json({msg: "This is the users route"}));
module.exports = router;