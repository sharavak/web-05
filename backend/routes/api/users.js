const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");
const passport = require('passport');

router.post("/signin", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid)
    return res.status(400).json(errors);
  const { email, password } = req.body
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ emailNotFound: "Email doesn't exists" })
  const isPass = await bcrypt.compare(password, user.password);
  if (!isPass)
    return res.status(400).json({ incorrectPassword: "Password in incorrect" });
  else {
    const payload = {
      id: user.id,
      name: user.name
    };
    jwt.sign(payload, process.env.secretOrKey, { expiresIn: 8640 }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token,
        email,
        _id: user.id,
        CategoryPreference: user.CategoryPreference
      });
    });
  }
})

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  console.log(req.body);
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } try {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        // Hash password before saving in database

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            if ('Category' in req.body)
              newUser.CategoryPreference.push(req.body.Category);
            newUser
              .save()
              .then(user => {
                let { email, _id, CategoryPreference, name } = user;
                res.json({ "success": "true", user: { email, _id, CategoryPreference, name } })
              })
              .catch(err => console.log(err));
          });
        });

      }
    });
    //return res.status(200).json({ "success": "true", ...newUser });
  } catch (e) {
    res.status(400).json({ "error": 'Error in registering!!!' })
  }
});

module.exports = router;