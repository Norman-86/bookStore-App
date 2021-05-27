const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "verySecureSecret";
const expiry = 3600;

exports.registerNewUser = (req, res)=> {
// fetch user detials from re.body
// check if a user with this username exists
    User.findOne({ username: req.body.username }, (err, existingUser) => {
        if (err) {
            res.status(500).json({err})
        }
        else if (existingUser) {
            res.status(400).json({message: 'this username already exists'})
        }
        //create a new user
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username
        }, (err, newUser) => {
            if (err) {
                res.status(500).json({ err })
            }
            //hash user's password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    res.status(500).json({ err })
                }
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err) {
                        res.status(500).json({ message: 'an error occurred', err })
                    }
                    //save password to db
                    newUser.password = hashedPassword;
                    newUser.save((err, savedUser) => {
                        if (err) {
                            res.status(500).json({ err })
                        }
                        //create jwt for user
                        jwt.sign({
                            id: newUser._id,
                            username: newUser.username,
                            first_name: newUser.first_name,
                            last_name: newUser.last_name
                        }, secret, { expiresIn: expiry }, (err, token) => {
                            if (err) {
                                res.status(500).json({ err })
                            }
                            //send token to the user
                            res.status(200).json({ message: 'user registration successful', token })
                        })
                    })
                })
            })
        })
    })
}

exports.logInUser = (req, res) => {
  //check if user exists
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
          res.status(500).json({err})
        }
        if (!foundUser) {
            res.status(401).json({ message: 'incorrect username' })
        }
        //check if password is correct
            let match = bcrypt.compareSync(req.body.password, foundUser.password);
        if (!match) {
            return res.status(401).json({message: 'incorrect password'})
        }
        //create a token
        jwt.sign({
            id: foundUser._id,
            username: foundUser.username,
            first_name: foundUser.first_name,
            last_name: foundUser.last_name
        }, secret, { expiresIn: expiry }, (err, token) => {
            if (err) {
                return res.status(500).json({err})
            } else {
                return res.status(200).json({message: 'login successful', token})
            }
        })
  })  
}