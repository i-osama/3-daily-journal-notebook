const express = require('express');
const User = require('../models/User');

const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');

const router = express.Router();

// ------ create user using: POST /api/auth/ 
// router.post('/',[
  
// ------ create user using: POST "/api/auth/createuser"
router.post('/createuser',[
    body('name','Enter your name').isLength({min:2}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
],
   async (req, res)=>{
    // obj = {
    //     a: "Admin0",
    //     number: 22
    // }
    // res.json(obj);


    // --- If there are errors, return bad request and errors ---
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
    // console.log(req.body);

    // const user = User(req.body);
    // user.save();
    // res.send("This is admin0");
    // });


  try {
    // -------- Check wheather there is an user with this email exists already ----------
    let user = await User.findOne({email: req.body.email});
    if (user){
      return res.status(400).json({error: "An user with this email already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    // ---------- create a new user  ---------
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      })
      
        // .then((user) => res.json(user))
        // .catch((err) => {
        //   console.log(err);
        //   res.json({ error: "Enter a unique value", message: err.message });
        // });

        res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured!!");
      }
    }
  );

module.exports = router;