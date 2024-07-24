const express = require('express');
const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "LetsVisitYourDreamPlacesOneDay#"
const { body, validationResult } = require('express-validator');


const router = express.Router();



// ------ create user using: POST /api/auth/ 
// router.post('/',[
  
// Route 1:------ create user using: POST "/api/auth/createuser" . No login needed
router.post('/createuser',[
    body('name','Enter your name').isLength({min:2}),
    body('email', 'please enter a valid email').isEmail(),
    body('password', "password cannot be empty").isLength({min:5}),
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

        const data = {
          user:{
            id: user.id
          }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);

        res.json({authToken:authToken});
        // res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured!!");
      }
    }
  );

  

  // Route 2: ------ create user using: POST "/api/auth/login" . No login needed
router.post('/login',[
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
],
 async (req, res)=>{
  
    // --- If there are errors, return bad request and errors ---
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }

    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: "Please enter valid information!!"});
      }

      const passCompare = await bcrypt.compare(password, user.password);

      if(!passCompare){
        return res.status(400).json({error: "Please enter valid information!!"})
      }

      data = {
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({authToken});
      
    } catch (error) {
      console.log(error.message);
      res.status(500).send({error: "internal server error occured!"})
    }

 });

 
  // Route 3: ------ create user using: POST "/api/auth/getuser" . login needed
  router.post('/getuser', fetchuser,
   async (req, res)=>{
    try {
       userId = req.user.id;
      const user = await User.findById(userId).select("-password");

      res.send(user);
      
    }  catch (error) {
      console.log(error.message);
      res.status(500).send({error: "internal server error occured!"})
    }
   })

module.exports = router;